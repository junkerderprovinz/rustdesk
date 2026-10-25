// Builds the README's pictures in .github/assets/screenshots: the web console
// in a browser window on the dark relief background beside a caption, in the
// house style of the other junkerderprovinz READMEs.
//
// The console is a running container of this image, filled with made-up
// devices, users and an address book by --seed. Use a throwaway container for
// it, never a server with real devices.
//
// Every picture is rendered at twice the size and scaled down in a second
// page, which keeps the text sharp through the window's tilt.
//
// Deps (global): playwright-core with its Chromium installed.
// Run: CONSOLE=http://<host>:21114 node scripts/screenshots/render.mjs [--seed]
// The admin login is admin/admin unless ADMIN_USER and ADMIN_PASSWORD say otherwise.

import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require(`${execSync('npm root -g').toString().trim()}/playwright-core`)

const here = dirname(fileURLToPath(import.meta.url))
const root = dirname(dirname(here))
const out = join(root, '.github', 'assets', 'screenshots')

const CONSOLE = process.env.CONSOLE ?? 'http://localhost:21114'
const USER = process.env.ADMIN_USER ?? 'admin'
const PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin'

const VIEW = { width: 1600, height: 1000 }

const PICTURES = [
  {
    name: 'rustdesk-1',
    menu: ['Peers', 0],
    caption: 'Every device, <em>one console</em>',
    sub: 'RustDesk with a web console, on Unraid or any Docker host',
  },
  {
    name: 'rustdesk-2',
    menu: ['Address Books', 1],
    caption: 'Log in, <em>find them all</em>',
    sub: 'The same address book in every RustDesk client',
  },
]

async function seed() {
  const api = `${CONSOLE}/api/admin`
  const login = await (await fetch(`${api}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: USER, password: PASSWORD }),
  })).json()
  const post = async (path, body) => {
    const res = await (await fetch(`${api}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-token': login.data.token },
      body: JSON.stringify(body),
    })).json()
    if (res.code !== 0) throw new Error(`${path}: ${res.message}`)
  }

  const now = Math.floor(Date.now() / 1000)
  await post('/device_group/create', { name: 'Workshop' })
  await post('/device_group/create', { name: 'Family' })
  await post('/group/create', { name: 'Household', type: 1 })
  const peers = [
    { id: 'Keep-Office', hostname: 'keep-office', os: 'windows / Windows 11 Pro', username: 'anna', cpu: 'AMD Ryzen 7 7700, 8 cores', memory: '32GB', version: '1.4.2', alias: 'Office PC' },
    { id: 'Tower-NAS', hostname: 'tower', os: 'linux / Debian 12', username: 'root', cpu: 'Intel Core i5-12400, 6 cores', memory: '64GB', version: '1.4.2', alias: 'NAS' },
    { id: 'Garden-Laptop', hostname: 'garden-laptop', os: 'macos / macOS 15', username: 'ben', cpu: 'Apple M3', memory: '16GB', version: '1.4.1', alias: 'Laptop' },
    { id: 'Kitchen-Tablet', hostname: 'kitchen-tab', os: 'android / Android 15', username: 'family', cpu: 'Snapdragon 7s Gen 2', memory: '8GB', version: '1.4.2', alias: 'Kitchen tablet' },
    { id: 'Workbench', hostname: 'workbench', os: 'linux / Ubuntu 24.04', username: 'anna', cpu: 'Intel Core i3-1215U, 6 cores', memory: '16GB', version: '1.4.0', alias: 'Workbench' },
  ]
  for (const [i, peer] of peers.entries()) {
    await post('/peer/create', { ...peer, uuid: Buffer.from(`demo-${i}`).toString('base64'), last_online_time: now - i * 900, last_online_ip: `10.0.0.${20 + i}` })
  }
  await post('/user/create', { username: 'anna', nickname: 'Anna', email: 'anna@example.com', status: 1, group_id: 1, is_admin: false })
  await post('/user/create', { username: 'ben', nickname: 'Ben', email: 'ben@example.com', status: 1, group_id: 1, is_admin: false })
  // The colours are ARGB integers, the form the RustDesk client stores.
  for (const tag of [{ name: 'home', color: 4282352361 }, { name: 'work', color: 4294940672 }]) {
    await post('/tag/create', { ...tag, user_id: 1, collection_id: 0 })
  }
  const book = [
    { id: 'Keep-Office', alias: 'Office PC', hostname: 'keep-office', username: 'anna', platform: 'Windows', tags: ['work'] },
    { id: 'Tower-NAS', alias: 'NAS', hostname: 'tower', username: 'root', platform: 'Linux', tags: ['home'] },
    { id: 'Garden-Laptop', alias: 'Laptop', hostname: 'garden-laptop', username: 'ben', platform: 'Mac OS', tags: ['home'] },
    { id: 'Kitchen-Tablet', alias: 'Kitchen tablet', hostname: 'kitchen-tab', username: 'family', platform: 'Android', tags: ['home'] },
  ]
  for (const entry of book) await post('/address_book/create', { ...entry, user_id: 1, collection_id: 0 })
}

/** Logs in, switches the console to English and its dark theme, and opens the System menu. */
async function open(browser) {
  const context = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 2, colorScheme: 'dark', locale: 'en-US' })
  const page = await context.newPage()
  await page.goto(`${CONSOLE}/_admin/`, { waitUntil: 'networkidle' })
  await page.locator('input').first().fill(USER)
  await page.locator('input[type=password]').fill(PASSWORD)
  await page.keyboard.press('Enter')
  await page.locator('.el-menu').first().waitFor()
  // Until a language is picked, the menu shows its translation keys.
  if (!(await page.locator('.el-menu-item', { hasText: /^\s*Peers\s*$/ }).count())) {
    await page.locator('.el-dropdown').first().hover()
    await page.waitForTimeout(800)
    await page.locator('.el-dropdown-menu__item', { hasText: /English/i }).first().click({ force: true })
    await page.waitForTimeout(1000)
  }
  if (!(await page.evaluate(() => document.documentElement.classList.contains('dark')))) {
    await page.locator('.el-switch').first().click()
  }
  await page.locator('.el-sub-menu__title', { hasText: 'System' }).click()
  await page.waitForTimeout(600)
  return page
}

async function capture(page, [item, nth]) {
  await page.locator('.el-menu-item', { hasText: new RegExp(`^\\s*${item}\\s*$`) }).nth(nth).click()
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(1200)
  return page.screenshot()
}

async function cached(file, url) {
  const path = join(tmpdir(), `RustDesk-${file}`)
  if (!existsSync(path)) {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`${file}: fetch ${res.status}`)
    writeFileSync(path, Buffer.from(await res.arrayBuffer()))
  }
  return readFileSync(path)
}

const dataUrl = (buf, type) => `data:${type};base64,${buf.toString('base64')}`
const bree = dataUrl(await cached('BreeSerif-Regular.ttf', 'https://github.com/google/fonts/raw/main/ofl/breeserif/BreeSerif-Regular.ttf'), 'font/ttf')
const lato = dataUrl(await cached('Lato-Regular.ttf', 'https://github.com/google/fonts/raw/main/ofl/lato/Lato-Regular.ttf'), 'font/ttf')
const logo = dataUrl(readFileSync(join(root, '.github', 'assets', 'rustdesk-logo.svg')), 'image/svg+xml')

const STYLE = `
@font-face { font-family: "Bree Serif"; src: url(${bree}); }
@font-face { font-family: Lato; src: url(${lato}); }
* { box-sizing: border-box; margin: 0; }
body { position: relative; overflow: hidden; width: 1920px; height: 1000px; font-family: Lato, sans-serif; background: #0c0c0b; }
.backdrop, .backdrop * { position: absolute; }
.backdrop { inset: 0; overflow: hidden; }
.wall { inset: 0; background: radial-gradient(55% 60% at 62% 35%, #26231d, #0f0e0c 72%); }
.mark { transform: rotate(-10deg); opacity: .32;
  filter: grayscale(1) brightness(.36) contrast(1.2) drop-shadow(-2px -2px 0 rgba(255,255,255,.16)) drop-shadow(12px 18px 26px rgba(0,0,0,.85)); }
.vignette { inset: 0; box-shadow: inset 0 0 200px rgba(0,0,0,.6); }
.copy { position: absolute; left: 84px; top: 0; bottom: 0; width: 470px; display: flex; flex-direction: column; justify-content: center; gap: 28px; }
.copy > img { width: 150px; }
h1 { font: 400 64px/1.12 "Bree Serif", serif; color: #f4f4f4; text-wrap: balance; }
h1 em { font-style: normal; color: #FCC419; }
.sub { font-size: 28px; line-height: 1.35; color: #9d9481; }

.stage { position: absolute; perspective: 2400px; }
.floor { position: absolute; left: 12%; right: 12%; bottom: -4%; height: 8%; border-radius: 50%; background: rgba(0,0,0,.8); filter: blur(30px); }
.glare { position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(118deg, rgba(255,255,255,.09) 0%, rgba(255,255,255,.03) 28%, rgba(255,255,255,0) 42%); }
.win { position: absolute; inset: 0; transform: rotateY(-8deg) rotateX(2deg); border-radius: 14px; overflow: hidden; background: #161616;
  box-shadow: 0 0 0 1px #3c3c3c, 0 2px 4px rgba(0,0,0,.35), 0 18px 36px rgba(0,0,0,.45), 0 52px 100px rgba(0,0,0,.55); }
.win > img { display: block; }
.bar { position: relative; display: flex; align-items: center; background: #242424; color: #d6d6d6; font: 400 17px/1 Lato, sans-serif; }
.tabs { height: 42px; padding: 7px 0 0 12px; background: #1c1c1c; align-items: flex-end; }
.tab { display: flex; align-items: center; gap: 10px; height: 35px; padding: 0 70px 0 14px; border-radius: 10px 10px 0 0; background: #2c2c2c; font-size: 15px; }
.tab img { width: 18px; height: 18px; }
.address { height: 46px; gap: 14px; padding: 0 14px; background: #2c2c2c; border-bottom: 1px solid #111; }
.nav { width: 10px; height: 10px; border-left: 2px solid #9a9a9a; border-bottom: 2px solid #9a9a9a; transform: rotate(45deg); margin: 0 4px; }
.nav.fwd { transform: rotate(-135deg); border-color: #5a5a5a; }
.url { flex: 1; height: 32px; border-radius: 16px; background: #1a1a1a; padding-left: 18px; display: flex; align-items: center; font-size: 15px; color: #c9c9c9; }
`

const BAR = 89

function wideShot(capture, caption, sub) {
  const w = 1240
  const h = Math.round(VIEW.height * (w / VIEW.width))
  const top = Math.round((1000 - h - BAR) / 2)
  return `<!doctype html><html><head><meta charset="utf-8"><style>${STYLE}</style></head><body>
<div class="backdrop"><div class="wall"></div><img class="mark" src="${logo}" style="width:46%;left:-8%;top:10%"><div class="vignette"></div></div>
<div class="copy"><img src="${logo}"><h1>${caption}</h1><p class="sub">${sub}</p></div>
<div class="stage" style="left:620px;top:${top}px;width:${w}px;height:${h + BAR}px">
  <div class="floor"></div>
  <div class="win">
    <div class="bar tabs"><div class="tab"><img src="${logo}"><span>RustDesk</span></div></div>
    <div class="bar address"><i class="nav"></i><i class="nav fwd"></i><div class="url">nas.local:21114/_admin/</div></div>
    <img src="${capture}" style="width:${w}px;height:${h}px"><div class="glare"></div>
  </div>
</div>
</body></html>`
}

/** Renders `html` at twice 1920 x 1000 and writes it scaled down to `file`. */
async function render(browser, html, file) {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1000 }, deviceScaleFactor: 2 })
  await page.setContent(html)
  await page.evaluate(() => document.fonts.ready)
  const big = await page.screenshot()
  await page.close()

  const small = await browser.newPage({ viewport: { width: 1920, height: 1000 } })
  await small.setContent(`<body style="margin:0"><img src="${dataUrl(big, 'image/png')}" style="display:block;width:1920px;height:1000px">`)
  await small.locator('img').evaluate((img) => img.decode())
  await small.screenshot({ path: file })
  await small.close()
}

if (process.argv.includes('--seed')) await seed()

const browser = await chromium.launch()
try {
  mkdirSync(out, { recursive: true })
  const page = await open(browser)
  for (const { name, menu, caption, sub } of PICTURES) {
    const shot = dataUrl(await capture(page, menu), 'image/png')
    await render(browser, wideShot(shot, caption, sub), join(out, `${name}.png`))
    console.log(`wrote .github/assets/screenshots/${name}.png`)
  }
} finally {
  await browser.close()
}

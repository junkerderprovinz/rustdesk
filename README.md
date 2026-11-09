<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/junkerderprovinz/rustdesk/main/.github/assets/rustdesk-banner-dark.png">
    <img src="https://raw.githubusercontent.com/junkerderprovinz/rustdesk/main/.github/assets/rustdesk-banner.png" alt="RustDesk" width="100%">
  </picture>
</p>

<p align="center">
  <a href="https://github.com/junkerderprovinz/rustdesk/actions/workflows/build.yml"><img src="https://img.shields.io/github/actions/workflow/status/junkerderprovinz/rustdesk/build.yml?branch=main&label=Build&style=for-the-badge&logo=githubactions&logoColor=white" alt="Build" height="36"></a>&nbsp;
  <a href="https://github.com/junkerderprovinz/rustdesk/actions/workflows/lint.yml"><img src="https://img.shields.io/github/actions/workflow/status/junkerderprovinz/rustdesk/lint.yml?branch=main&label=Lint&style=for-the-badge&logo=githubactions&logoColor=white" alt="Lint" height="36"></a>&nbsp;
  <a href="https://hub.docker.com/r/junkerderprovinz/rustdesk"><img src="https://img.shields.io/docker/pulls/junkerderprovinz/rustdesk?style=for-the-badge&logo=docker&logoColor=white&label=Pulls&color=1d99f3" alt="Docker Pulls" height="36"></a>&nbsp;
  <a href="https://hub.docker.com/r/junkerderprovinz/rustdesk"><img src="https://img.shields.io/docker/image-size/junkerderprovinz/rustdesk/latest?style=for-the-badge&logo=docker&logoColor=white&label=Size&color=1d99f3" alt="Image Size" height="36"></a>&nbsp;
  <a href="https://github.com/junkerderprovinz/rustdesk/pkgs/container/rustdesk"><img src="https://img.shields.io/badge/Arch-amd64%20%7C%20arm64-success?style=for-the-badge&logo=linux&logoColor=white" alt="Arch" height="36"></a>&nbsp;
  <a href="https://github.com/lejianwen/rustdesk-api"><img src="https://img.shields.io/badge/Console-rustdesk--api-0071ff?style=for-the-badge&logo=rust&logoColor=white" alt="rustdesk-api" height="36"></a>&nbsp;
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-AGPL--3.0-blue?style=for-the-badge&logo=gnu&logoColor=white" alt="License: AGPL-3.0" height="36"></a>
</p>

<br>

<p align="center">
Your own <b>RustDesk</b> server for Unraid, in one container. The ID server and the
relay come with a web console, user accounts, an address book that follows you to
every client and a web client in the browser. Devices can also change their ID,
which the stock open-source server refuses. The buttons under the first row lead
to RustDesk's own clients.
</p>

<br>

<p><a id="table-of-contents" href="#table-of-contents"><picture><source media="(prefers-color-scheme: dark)" srcset=".github/assets/sections/table-of-contents-dark.svg"><img src=".github/assets/sections/table-of-contents.svg" alt="Table of Contents" width="100%"></picture></a></p>

1. [Download](#1-download)
2. [Support](#2-support)
3. [What it looks like](#3-what-it-looks-like)
4. [What it does](#4-what-it-does)
5. [How it compares](#5-how-it-compares)
6. [Getting started](#6-getting-started)
7. [Connecting your devices](#7-connecting-your-devices)
8. [Changing a device's ID](#8-changing-a-devices-id)
9. [Moving from another RustDesk server](#9-moving-from-another-rustdesk-server)
10. [What is inside](#10-what-is-inside)
11. [How AI is used here](#11-how-ai-is-used-here)

<br>

<p><a id="1-download" href="#1-download"><picture><source media="(prefers-color-scheme: dark)" srcset=".github/assets/sections/1-download-dark.svg"><img src=".github/assets/sections/1-download.svg" alt="1. Download" width="100%"></picture></a></p>

<!-- download-buttons: written by scripts/gen_download_buttons.py -->
<p align="center">
  <picture><source media="(prefers-color-scheme: dark)" srcset=".github/assets/sections/group-server-dark.svg"><img src=".github/assets/sections/group-server.svg" alt="Server" width="100%"></picture>
</p>
<p align="center">
  <a href="https://unraid.net/community/apps?q=rustdesk"><img src="https://raw.githubusercontent.com/junkerderprovinz/rustdesk/main/.github/assets/download-buttons/buttons.svg?v=aba9be2b3ea2#svgView(viewBox(0,0,841.9,245.3))" alt="Install from Unraid&#x27;s Community Applications" width="160" height="46.618"></a>
  &nbsp;
  <a href="https://mos-official.net/apps.html?search=RustDesk"><img src="https://raw.githubusercontent.com/junkerderprovinz/rustdesk/main/.github/assets/download-buttons/buttons.svg?v=aba9be2b3ea2#svgView(viewBox(866,0,841.9,245.3))" alt="Install from the MOS Hub" width="160" height="46.618"></a>
  &nbsp;
  <a href="https://github.com/junkerderprovinz/zimaos-apps#install"><img src="https://raw.githubusercontent.com/junkerderprovinz/rustdesk/main/.github/assets/download-buttons/buttons.svg?v=aba9be2b3ea2#svgView(viewBox(1732,0,841.9,245.3))" alt="Install from the ZimaOS and CasaOS store" width="160" height="46.618"></a>
  &nbsp;
  <a href="https://github.com/junkerderprovinz/umbrel-apps#install"><img src="https://raw.githubusercontent.com/junkerderprovinz/rustdesk/main/.github/assets/download-buttons/buttons.svg?v=aba9be2b3ea2#svgView(viewBox(2598,0,841.9,245.3))" alt="Install from the umbrelOS community app store" width="160" height="46.618"></a>
</p>
<p align="center">
  <a href="https://raw.githubusercontent.com/junkerderprovinz/rustdesk/main/compose.yaml"><img src="https://raw.githubusercontent.com/junkerderprovinz/rustdesk/main/.github/assets/download-buttons/buttons.svg?v=aba9be2b3ea2#svgView(viewBox(3464,0,841.9,245.3))" alt="Download the docker-compose file" width="160" height="46.618"></a>
  &nbsp;
  <a href="https://github.com/junkerderprovinz/rustdesk/releases/latest"><img src="https://raw.githubusercontent.com/junkerderprovinz/rustdesk/main/.github/assets/download-buttons/buttons.svg?v=aba9be2b3ea2#svgView(viewBox(4330,0,841.9,245.3))" alt="Download the source archive" width="160" height="46.618"></a>
</p>
<br>
<p align="center">
  <picture><source media="(prefers-color-scheme: dark)" srcset=".github/assets/sections/group-desktop-dark.svg"><img src=".github/assets/sections/group-desktop.svg" alt="Desktop" width="100%"></picture>
</p>
<p align="center">
  <a href="https://github.com/rustdesk/rustdesk/releases/latest"><img src="https://raw.githubusercontent.com/junkerderprovinz/rustdesk/main/.github/assets/download-buttons/buttons.svg?v=aba9be2b3ea2#svgView(viewBox(5196,0,841.9,245.3))" alt="Download for Windows" width="160" height="46.618"></a><a href="https://github.com/rustdesk/rustdesk/releases/latest"><img src="https://raw.githubusercontent.com/junkerderprovinz/rustdesk/main/.github/assets/download-buttons/buttons.svg?v=aba9be2b3ea2#svgView(viewBox(6062,0,457.783,245.3))" alt="Download for Windows on ARM" width="87" height="46.618"></a>
  &nbsp;
  <a href="https://github.com/rustdesk/rustdesk/releases/latest"><img src="https://raw.githubusercontent.com/junkerderprovinz/rustdesk/main/.github/assets/download-buttons/buttons.svg?v=aba9be2b3ea2#svgView(viewBox(6544,0,841.9,245.3))" alt="Download for macOS on Intel or Apple silicon" width="160" height="46.618"></a>
  &nbsp;
  <a href="https://github.com/rustdesk/rustdesk/releases/latest"><img src="https://raw.githubusercontent.com/junkerderprovinz/rustdesk/main/.github/assets/download-buttons/buttons.svg?v=aba9be2b3ea2#svgView(viewBox(7410,0,841.9,245.3))" alt="Download for Linux" width="160" height="46.618"></a><a href="https://github.com/rustdesk/rustdesk/releases/latest"><img src="https://raw.githubusercontent.com/junkerderprovinz/rustdesk/main/.github/assets/download-buttons/buttons.svg?v=aba9be2b3ea2#svgView(viewBox(8276,0,457.783,245.3))" alt="Download for Linux on ARM" width="87" height="46.618"></a>
</p>
<br>
<p align="center">
  <picture><source media="(prefers-color-scheme: dark)" srcset=".github/assets/sections/group-phone-dark.svg"><img src=".github/assets/sections/group-phone.svg" alt="Phone" width="100%"></picture>
</p>
<p align="center">
  <a href="https://f-droid.org/packages/com.carriez.flutter_hbb/"><img src="https://raw.githubusercontent.com/junkerderprovinz/rustdesk/main/.github/assets/download-buttons/buttons.svg?v=aba9be2b3ea2#svgView(viewBox(8758,0,841.9,245.3))" alt="Get it on F-Droid" width="160" height="46.618"></a>
  &nbsp;
  <a href="https://github.com/rustdesk/rustdesk/releases/latest"><img src="https://raw.githubusercontent.com/junkerderprovinz/rustdesk/main/.github/assets/download-buttons/buttons.svg?v=aba9be2b3ea2#svgView(viewBox(9624,0,841.9,245.3))" alt="Download the Android app" width="160" height="46.618"></a>
  &nbsp;
  <a href="https://apps.apple.com/app/rustdesk-remote-desktop/id1581225015"><img src="https://raw.githubusercontent.com/junkerderprovinz/rustdesk/main/.github/assets/download-buttons/buttons.svg?v=aba9be2b3ea2#svgView(viewBox(10490,0,841.9,245.3))" alt="Download on the App Store" width="160" height="46.618"></a>
</p>
<!-- /download-buttons -->

<br>

<p><a id="2-support" href="#2-support"><picture><source media="(prefers-color-scheme: dark)" srcset=".github/assets/sections/2-support-dark.svg"><img src=".github/assets/sections/2-support.svg" alt="2. Support" width="100%"></picture></a></p>

<p align="center">
A one-knight job: I build it, keep it running, work through the issues and add what people ask for, until nothing is missing. It is free, with no accounts, no telemetry, no ads and no paid tier. No asterisk anywhere. Nothing readable ever leaves your own walls. Forged on evenings and weekends, with heart and stubbornness.
</p>

<p align="center">
If it has earned a place on your server or computer, toss a coin to your knight: it helps cover the costs and keeps the project alive. It also makes this knight's heart beat a little faster. Three ways below, whichever suits you.
</p>

<!-- give-buttons: written by scripts/gen_download_buttons.py -->
<p align="center">
  <a href="https://buymeacoffee.com/junkerderprovinz"><img src="https://raw.githubusercontent.com/junkerderprovinz/rustdesk/main/.github/assets/download-buttons/buttons.svg?v=aba9be2b3ea2#svgView(viewBox(11356,0,841.9,245.3))" alt="Buy me a coffee" width="160" height="46.618"></a>
  &nbsp;
  <a href="https://www.paypal.com/donate/?hosted_button_id=76FVV52TKXTUS"><img src="https://raw.githubusercontent.com/junkerderprovinz/rustdesk/main/.github/assets/download-buttons/buttons.svg?v=aba9be2b3ea2#svgView(viewBox(12222,0,841.9,245.3))" alt="PayPal" width="160" height="46.618"></a>
  &nbsp;
  <a href="https://junkerderprovinz.github.io/junkerderprovinz/"><img src="https://raw.githubusercontent.com/junkerderprovinz/rustdesk/main/.github/assets/download-buttons/buttons.svg?v=aba9be2b3ea2#svgView(viewBox(13088,0,841.9,245.3))" alt="Donate with crypto" width="160" height="46.618"></a>
</p>
<!-- /give-buttons -->

<br>

<p><a id="3-what-it-looks-like" href="#3-what-it-looks-like"><picture><source media="(prefers-color-scheme: dark)" srcset=".github/assets/sections/3-what-it-looks-like-dark.svg"><img src=".github/assets/sections/3-what-it-looks-like.svg" alt="3. What it looks like" width="100%"></picture></a></p>

<p align="center">
  <img src=".github/assets/screenshots/rustdesk-1.png" alt="The devices page of the web console in a browser window at nas.local:21114, listing five devices" width="90%">
  <br><em>Every device that registered with your server, with its system, when it was last online and one click to connect.</em>
</p>

<p align="center">
  <img src=".github/assets/screenshots/rustdesk-2.png" alt="The address book page of the web console, with four devices in My Address Book" width="90%">
  <br><em>The address book a user sees in every RustDesk client they log in to.</em>
</p>

<br>

<p><a id="4-what-it-does" href="#4-what-it-does"><picture><source media="(prefers-color-scheme: dark)" srcset=".github/assets/sections/4-what-it-does-dark.svg"><img src=".github/assets/sections/4-what-it-does.svg" alt="4. What it does" width="100%"></picture></a></p>

- `hbbs` hands out IDs and introduces your devices to each other. `hbbr` relays the session when two devices cannot reach each other directly. By default the server accepts encrypted connections only.
- The web console on port 21114, at `/_admin/`, lists devices, users, groups and address books, keeps the connection and file transfer logs, and holds the server's settings.
- You log in once in the RustDesk client and your address book is there on every device you use. Your own server keeps it.
- The web client at `/webclient/` opens a session from a browser on a machine without RustDesk, and you can share access with a guest through it.
- A device can change its ID in the client. The server accepts the change when it comes from the same machine and the new ID is free.
- On Unraid it is one container with two volumes, and every setting is in the template.

<br>

<p><a id="5-how-it-compares" href="#5-how-it-compares"><picture><source media="(prefers-color-scheme: dark)" srcset=".github/assets/sections/5-how-it-compares-dark.svg"><img src=".github/assets/sections/5-how-it-compares.svg" alt="5. How it compares" width="100%"></picture></a></p>

| | **This image** | ich777 AIO | Official server | RustDesk Server Pro |
|---|:---:|:---:|:---:|:---:|
| ID server and relay | ✅ | ✅ | ✅ | ✅ |
| Web console | ✅ | ❌ | ❌ | ✅ |
| Accounts and shared address book | ✅ | ❌ | ❌ | ✅ |
| Web client | ✅ | ❌ | ❌ | ✅ |
| Change a device's ID | ✅ | ❌ | ❌ | ✅ |
| Multi-arch | amd64 + arm64 | amd64 | amd64 + arm64 + armv7 | amd64 + arm64 + armv7 |
| Licence | AGPL-3.0 | AGPL-3.0 | AGPL-3.0 | proprietary |
| Price | free | free | free | paid subscription |

The official server is `rustdesk/rustdesk-server`; ich777's all-in-one image is the one in Unraid's Community Applications.

<br>

<p><a id="6-getting-started" href="#6-getting-started"><picture><source media="(prefers-color-scheme: dark)" srcset=".github/assets/sections/6-getting-started-dark.svg"><img src=".github/assets/sections/6-getting-started.svg" alt="6. Getting started" width="100%"></picture></a></p>

**Unraid:** install RustDesk from [Community Applications](https://unraid.net/community/apps?q=rustdesk) and fill in the address your clients use to reach the server (a DNS name or IP) in the four address fields.

**Docker Compose:** take [compose.yaml](compose.yaml), replace `rustdesk.example.com` with your server's address and run `docker compose up -d`.

- **Synology:** in Container Manager, create a project from the file (DSM 7.2 or newer).
- **Proxmox:** run it in a VM or an LXC container that has Docker.
- **MOS:** install RustDesk from the [MOS Hub](https://mos-official.net/apps.html?search=RustDesk) and fill in the four address fields.
- **ZimaOS and CasaOS:** add the [community store](https://github.com/junkerderprovinz/zimaos-apps#install) and install RustDesk with Custom Installation, where you fill in the four addresses.
- **umbrelOS:** add the [community app store](https://github.com/junkerderprovinz/umbrel-apps#install) and install RustDesk from it. The addresses point to your Umbrel by itself, and the API server for the clients is `http://umbrel.local:35135`.

On the first start the server creates its key pair in `/data` and the console creates the account `admin` and prints its password in the container log:

```
docker logs rustdesk 2>&1 | grep -i password
```

Log in at `http://<server>:21114/_admin/`, change the password, and the server is ready. If the line has scrolled away, set a new one:

```
docker exec rustdesk /app/apimain reset-admin-pwd <new password>
```

Ports: 21114 (console and web client), 21115 (NAT test), 21116 TCP and UDP (ID server), 21117 (relay), 21118 and 21119 (websocket variants for the web client). Forward 21115 to 21117 if devices outside your network should connect; the console does not need to be reachable from outside.

<br>

<p><a id="7-connecting-your-devices" href="#7-connecting-your-devices"><picture><source media="(prefers-color-scheme: dark)" srcset=".github/assets/sections/7-connecting-your-devices-dark.svg"><img src=".github/assets/sections/7-connecting-your-devices.svg" alt="7. Connecting your devices" width="100%"></picture></a></p>

Get the client from RustDesk's [releases](https://github.com/rustdesk/rustdesk/releases/latest), [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) or the [App Store](https://apps.apple.com/app/rustdesk-remote-desktop/id1581225015), or with the buttons at the top. Then open **Settings → Network → ID/Relay server** and enter:

| Field | Value |
| --- | --- |
| ID server | `<server>:21116` |
| Relay server | `<server>:21117` |
| API server | `http://<server>:21114` |
| Key | the content of `/data/id_ed25519.pub` |

With the API server set, the client shows a login. Log in with a user from the console and your address book appears; it syncs to every device where you log in with the same user.

<br>

<p><a id="8-changing-a-devices-id" href="#8-changing-a-devices-id"><picture><source media="(prefers-color-scheme: dark)" srcset=".github/assets/sections/8-changing-a-devices-id-dark.svg"><img src=".github/assets/sections/8-changing-a-devices-id.svg" alt="8. Changing a device's ID" width="100%"></picture></a></p>

The client's **Change ID** works against this server. The server renames the device only when the request comes from the machine that registered the old ID, and only to an ID that is free and follows RustDesk's format (6 to 16 characters, starting with a letter). The stock open-source server answers the same request with "not supported".

<br>

<p><a id="9-moving-from-another-rustdesk-server" href="#9-moving-from-another-rustdesk-server"><picture><source media="(prefers-color-scheme: dark)" srcset=".github/assets/sections/9-moving-from-another-rustdesk-server-dark.svg"><img src=".github/assets/sections/9-moving-from-another-rustdesk-server.svg" alt="9. Moving from another RustDesk server" width="100%"></picture></a></p>

Your devices keep their IDs and trust the new server when it uses the same key pair. Stop the old container and copy `id_ed25519`, `id_ed25519.pub` and `db_v2.sqlite3` from its data folder into this container's `/data` before the first start. The key the clients use stays the same, so nothing has to change on the devices.

<br>

<p><a id="10-what-is-inside" href="#10-what-is-inside"><picture><source media="(prefers-color-scheme: dark)" srcset=".github/assets/sections/10-what-is-inside-dark.svg"><img src=".github/assets/sections/10-what-is-inside.svg" alt="10. What is inside" width="100%"></picture></a></p>

- `hbbs`, `hbbr` and `rustdesk-utils` built from [lejianwen/rustdesk-server](https://github.com/lejianwen/rustdesk-server), a fork of [rustdesk-server](https://github.com/rustdesk/rustdesk-server) that talks to the API, with the patches in [patches/](patches) applied.
- [lejianwen/rustdesk-api](https://github.com/lejianwen/rustdesk-api) for the console, the accounts, the address book and the web client.
- s6-overlay to run the three.

The newer web client that older rustdesk-api images shipped as `/webclient2` was removed upstream after a DMCA notice and is not included.

<br>

<p><a id="11-how-ai-is-used-here" href="#11-how-ai-is-used-here"><picture><source media="(prefers-color-scheme: dark)" srcset=".github/assets/sections/11-how-ai-is-used-here-dark.svg"><img src=".github/assets/sections/11-how-ai-is-used-here.svg" alt="11. How AI is used here" width="100%"></picture></a></p>

One knight builds this, and AI is one of the tools I work with, the same way I work with an editor or a compiler. It helps me write code and documentation and it checks my work, and that saves me a good many evenings. It does not make the decisions, though. I read and understand everything before it ships, and if something here breaks, that is on me and not on the tool.

You do not have to take my word for it. The code is open and every release note is written by hand. The issue tracker shows how problems actually get handled, including the ones I got wrong the first time. If you find something that is not right, open an issue and I will look at it.

<br>

Bugs, ideas or feature requests? Please [open a GitHub issue](https://github.com/junkerderprovinz/rustdesk/issues).

<br>

<sub>The packaging in this repository is AGPL-3.0. RustDesk server, rustdesk-api and s6-overlay keep their own licences; see [NOTICE](NOTICE). RustDesk is a trademark of its owners; this project is not affiliated with them.</sub>

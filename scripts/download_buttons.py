"""The download buttons the README shows, read by gen_download_buttons.py.

Each entry names a button the generator knows and where it leads. The rows,
their order, the colours and the words are the generator's, the same in every
repository.
"""

REPO = "rustdesk"

BUTTONS = {
    "unraid": "https://unraid.net/community/apps?q=rustdesk",
    "mos": "https://mos-official.net/apps.html?search=RustDesk",
    "zimaos": "https://github.com/junkerderprovinz/zimaos-apps#install",
    "umbrel": "https://github.com/junkerderprovinz/umbrel-apps#install",
    "compose": "https://raw.githubusercontent.com/junkerderprovinz/rustdesk/main/compose.yaml",
    # A release's "Source code (zip)" is the whole repository at that tag, and
    # GitHub gives the newest one no fixed address, so this leads to the release
    # that lists it.
    "source": "https://github.com/junkerderprovinz/rustdesk/releases/latest",
}

# The clients are RustDesk's own. Their file names carry the version, so the
# desktop and APK buttons lead to the release that lists them.
CLIENTS = "https://github.com/rustdesk/rustdesk/releases/latest"
BUTTONS.update({
    "windows": CLIENTS,
    "windows-arm": CLIENTS,
    "macos-split": CLIENTS,
    "linux": CLIENTS,
    "linux-arm": CLIENTS,
    "f-droid": "https://f-droid.org/packages/com.carriez.flutter_hbb/",
    "apk": CLIENTS,
    "app-store": "https://apps.apple.com/app/rustdesk-remote-desktop/id1581225015",
})

# syntax=docker/dockerfile:1@sha256:4edf897a3ffa55b89f906fc8cc78afdb3f1834cc9c7083565e611a8a7d5fe99e
# RustDesk server for Unraid: hbbs (ID and rendezvous) and hbbr (relay) built from
# lejianwen's fork with the patches in patches/, on top of lejianwen's rustdesk-api
# image, which brings the web console, user login, the shared address book and the
# web client. s6-overlay runs all three.
ARG RUST_IMAGE=rust:1.99.1-alpine3.24@sha256:b1d5dd5a22a09404d3e798c0cf051b689077360374eb505fa5bb93c479693d87
ARG API_IMAGE=lejianwen/rustdesk-api:v2.7@sha256:ed35016339d3bcadf15c7bb3ae8490af1e3950c33f58fd2261ae009b94f5de45

FROM ${RUST_IMAGE} AS server
# The patches in patches/ are made against this commit.
ARG SERVER_REPO=https://github.com/lejianwen/rustdesk-server.git
ARG SERVER_COMMIT=fb8b5b9cf494d045f0feb370d83913b1a7506388
# The build tools follow the pinned Rust image's Alpine release.
# hadolint ignore=DL3018
RUN apk add --no-cache git musl-dev perl make
WORKDIR /src
RUN git init -q . \
    && git remote add origin "${SERVER_REPO}" \
    && git fetch -q --depth 1 origin "${SERVER_COMMIT}" \
    && git checkout -q FETCH_HEAD \
    && git submodule update -q --init --depth 1
COPY patches/ /patches/
RUN git -c user.name=build -c user.email=build@localhost am -q /patches/*.patch
RUN --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,target=/src/target \
    cargo build --release --bin hbbs --bin hbbr --bin rustdesk-utils \
    && mkdir -p /out \
    && cp target/release/hbbs target/release/hbbr target/release/rustdesk-utils /out/

FROM ${API_IMAGE}
ARG S6_OVERLAY_VERSION=3.2.0.0
ARG TARGETARCH
LABEL org.opencontainers.image.source="https://github.com/junkerderprovinz/rustdesk"
LABEL org.opencontainers.image.description="Self-hosted RustDesk server with web console, address book and web client"
LABEL org.opencontainers.image.licenses="AGPL-3.0-only"

RUN set -eux; \
    case "${TARGETARCH}" in \
      amd64) s6arch=x86_64 ;; \
      arm64) s6arch=aarch64 ;; \
      *) echo "unsupported architecture ${TARGETARCH}"; exit 1 ;; \
    esac; \
    base="https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}"; \
    wget -q -O /tmp/noarch.tar.xz "${base}/s6-overlay-noarch.tar.xz"; \
    wget -q -O /tmp/arch.tar.xz "${base}/s6-overlay-${s6arch}.tar.xz"; \
    tar -C / -Jxpf /tmp/noarch.tar.xz; \
    tar -C / -Jxpf /tmp/arch.tar.xz; \
    rm /tmp/*.tar.xz; \
    ln -sf /run /var/run

COPY --from=server /out/ /usr/bin/
COPY rootfs/ /
COPY .github/assets/banner-raw.txt /usr/local/share/banner-raw.txt
RUN tr -d '\r' < /usr/local/share/banner-raw.txt > /usr/local/share/banner.txt \
    && chmod +x /usr/local/bin/print-banner.sh /usr/bin/healthcheck.sh \
       /etc/s6-overlay/s6-rc.d/*/run /etc/s6-overlay/s6-rc.d/key-secret/up.real

# The *_KEY_FILE values are the path to the public key, not a secret.
# hadolint ignore=DL3064
ENV SERVER_VERSION=1.1.14-change-id \
    API_VERSION=2.7 \
    RELAY=relay.example.com \
    ENCRYPTED_ONLY=1 \
    MUST_LOGIN=N \
    RUSTDESK_API_KEY_FILE=/data/id_ed25519.pub \
    RUSTDESK_API_RUSTDESK_KEY_FILE=/data/id_ed25519.pub

EXPOSE 21114 21115 21116 21116/udp 21117 21118 21119
VOLUME ["/data", "/app/data"]
WORKDIR /app
HEALTHCHECK --interval=10s --timeout=5s CMD ["/usr/bin/healthcheck.sh"]
ENTRYPOINT ["/init"]

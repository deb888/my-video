# my-video

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
    <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
  </picture>
</p>

**15-second animated bar chart video** built with [Remotion](https://remotion.dev) (React-based video framework).

```
┌──────────────────────────────────────────────┐
│  > deb888                       ┌──────────┐ │
│  Hello, I'm                     │   BAR    │ │
│  BRUCE DEB    (glitch fx)       │   CHART  │ │
│  AI Developer · Fullstack ·     │   0─100% │ │
│  AI DevOps Engineer             │  spring  │ │
│  $ LangChain → K8s → OpenClaw   │  bounce  │ │
│  [AI/ML] [LangChain] [MCP] ...  │   92%    │ │
│                                 └──────────┘ │
│  ┌──┐      ┌──┐      ┌──┐      ┌──┐        │
└──────────────────────────────────────────────┘
```

## Contents

| Scene | Time | Description |
|-------|------|-------------|
| Background | 0–15s | Dark cyberpunk theme from [deb888.github.io](https://deb888.github.io) — name, title, skills tag pills, typing terminal, HUD corners, grid + scanline overlay |
| Bar chart | 0–5s | Fills 0 → 100% with `spring()` bounce (damping 12, mass 0.5, stiffness 100) |
| Hold | 5–15s | Bar stays at 100%, percentage counter steady |

## Design

Matches the visual identity of deb888.github.io:

- **Fonts**: Orbitron (headings), JetBrains Mono (code), Inter (body)
- **Colors**: `#0a0a0f` background, `#00ffe7` neon-cyan, `#ff006e` neon-pink
- **Effects**: Glitch text, scan lines, grid pattern, radial vignette

## Commands

```bash
# Install
npm i

# Preview
npm run dev

# Render MP4
npx remotion render MyComp out/video.mp4

# Still frame
npx remotion still MyComp out/frame.png
```

## Stack

- [Remotion 4.0](https://remotion.dev) — React-based video rendering
- [Tailwind CSS v4](https://tailwindcss.com) — utility styles
- [Google Fonts](https://fonts.google.com) — Orbitron, JetBrains Mono, Inter
- TypeScript

## Publishing

This video was published to LinkedIn via the [linkedin-publisher-mastra](https://github.com/deb888/linkedin-publisher-mastra) pipeline:

```
Remotion render → LinkedIn Videos API → Post
```

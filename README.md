# 🗺️ Atlas — Design System Showcase

A living design system: color tokens, typography, spacing, and a full set of reusable UI components — buttons, forms, cards, badges, modals, tooltips — each with live examples and copy-paste code. Switch between light ("Daylight") and dark ("Midnight") themes and watch every single component update, because nothing is hardcoded — it's all CSS custom properties.

![Atlas preview](https://via.placeholder.com/900x500/F6F7F9/4F46E5?text=Atlas+%E2%80%94+Design+System+Showcase)

## Features

- 🎨 **Token-based theming** — every color is a CSS variable; toggling Daylight/Midnight swaps the entire palette instantly, including the live color swatches which read their own values back from the DOM
- 🔤 **Typography scale** — display through caption sizes, with the exact font, weight, and size labeled next to each sample
- 📏 **Spacing scale** — a visual ruler of the spacing tokens used throughout every component
- 🧩 **Full component library** — buttons (5 variants × 3 sizes × disabled states), text inputs with error states, toggles, checkboxes, selects, cards, status badges, a modal, and a hover tooltip
- 📋 **Copy-paste code** — every component section includes a "View code" toggle with the exact HTML, click-to-copy
- 🧭 **Sidebar navigation** — organized like real design-system documentation (Material, Polaris, Carbon), with deep-linkable sections via the URL hash

## Tech Stack

- Vanilla JavaScript (no framework, no build step)
- CSS custom properties for a genuinely token-driven theme system
- `color-mix()` CSS function for tinted badge backgrounds that automatically adapt to either theme
- Google Fonts: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans), [Inter](https://fonts.google.com/specimen/Inter), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

## Getting Started

```bash
git clone https://github.com/YOUR-USERNAME/atlas.git
cd atlas
open index.html   # or just double-click the file
```

No install, no dependencies — pure HTML/CSS/JS.

## Deploying to GitHub Pages (free hosting)

1. Push this repo to GitHub.
2. Go to **Settings → Pages** in your repo.
3. Under **Source**, select the `main` branch and `/ (root)` folder, then **Save**.
4. Your site goes live at `https://YOUR-USERNAME.github.io/atlas/` within a minute or two.
5. Update the "Live Demo" link at the top of this README.

## How the theming works

Every color used anywhere in the site — backgrounds, text, borders, the accent color, status colors — is defined once as a CSS custom property on `:root`/`body[data-theme="light"]`, with a second full set under `body[data-theme="dark"]`. Clicking a theme button simply changes `document.body.dataset.theme`, and the browser repaints every element that references those variables — no per-component JavaScript needed. The color swatches on the Colors page take this a step further: they call `getComputedStyle()` to read back the *actual current value* of each token, so the hex codes shown are always accurate to whichever theme is active.

## Project Structure

```
atlas/
├── index.html      # sidebar nav + all documentation sections
├── styles.css       # design tokens (light + dark) and every component's styles
├── app.js           # nav routing, theme switching, dynamic swatches, copy-to-clipboard
└── README.md
```

## Possible Extensions

- Add a "spacing/typography" playground where values are adjustable live
- Export the current theme's tokens as a JSON or Tailwind config file
- Add more components: pagination, dropdown menus, accordions, progress bars
- Generate a Figma-compatible token file (Figma Tokens plugin format)

## License

MIT — free to use, modify, and share.

---

Built as a portfolio project demonstrating design-system thinking: consistent tokens, reusable components, and documentation that a real team could actually build from.

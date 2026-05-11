# Image Assets Specification

To ensure the website works correctly with local assets, please place the required images in the `/public/assets` directory. All paths are relative to the `/public` folder.

All raster images should be exported as **WebP** (quality ~80–85). Sizes below are the recommended *export* dimensions — they assume 2x density for crisp display on retina screens. Aspect ratio matters most; dimensions are guidance.

## Core Assets

### Hero Backgrounds (`/assets/hero/`)
- `workspace-1.webp` to `workspace-5.webp` (5 images)
- **Size**: 1920 × 1080 px (16:9 landscape)
- **Style**: Grayscale / minimalist workspace shots. Cropped to portrait by `object-cover` on desktop, so keep the subject roughly centered.

### Main Project Thumbnails (`/assets/projects/`)
- `motion.webp`, `graphic.webp`, `short-form.webp`, `long-form.webp`, `photography.webp`, `web-dev.webp`, `data-analysis.webp`, `market-research.webp`, `meta-ads.webp`
- **Size**: 1000 × 1000 px (1:1 square)

### Client Logos (`/assets/clients/`)
- `asahi.svg`, `sats.svg`, `changi.svg`, `pocari.svg`, `wuling.svg`, `rocketindo.svg`, `mantappu.svg`, `mantappu-academy.svg`, `hkjc.svg`, `henshu.svg`
- **Format**: SVG preferred (or PNG with transparency, 400 × 200 px max). Mono-white style recommended.

## Category Assets

### Motion Graphics (`/assets/motion/`)
- **Banners**: `banner-1.webp` to `banner-4.webp` — **1920 × 1080 px** (16:9, scrolls horizontally as hero background, dimmed)
- **Project Thumbnails** (16:9 video stills, displayed in slider):
    - Project 1 — SATS: `project-1-1.webp`, `project-1-2.webp`, `project-1-3.webp` — **1280 × 720 px**
    - Project 2 — ASAHI Group: `project-2-1.webp`, `project-2-2.webp`, `project-2-3.webp` — **1280 × 720 px**
    - Project 3 — Logo Motion (Racing Hearts, HKJC, Mantappu Academy, Mantappu Corp): `project-3-1.webp` to `project-3-4.webp` — **1280 × 720 px**
    - Project 4 — PT Advanced Agri Indonesia (Company Profile): `project-4-1.webp`, `project-4-2.webp` — **1280 × 720 px**

### Graphic Design (`/assets/graphic/`)
- **Banners**: `banner-1.webp` to `banner-4.webp` — **1920 × 1080 px** (16:9)
- **Infographics**: `infographic-1.webp` to `infographic-15.webp` — **1200 × 1500 px** (4:5 portrait)
- **Booklet Slides**: `booklet-1-1.webp` to `booklet-5-7.webp` (5 sets × 7 images) — **1200 × 1600 px** (3:4 portrait)
- **Social Media** (`/assets/social/`): `slide-1-1.webp` to `slide-4-8.webp` (4 sets × 8 images) — **1200 × 1600 px** (3:4 portrait)
- **UI/UX Rows** (`/assets/uiux/`): `row-1-1.webp` to `row-3-4.webp` (3 rows × 4 images) — **1920 × 1080 px** (16:9)
- **Products**:
    - Product 1: `product-1-main.webp` (**1500 × 1500 px**, 1:1) + elements `product-1-element-1.webp` to `4.webp` (**800 × 800 px**, 1:1)
    - Product 2: `product-2-main.webp` (**1500 × 1500 px**) + elements `product-2-element-1.webp` to `4.webp` (**800 × 800 px**)

### Short Form Video (`/assets/shortform/`)
- **Banners**: `banner-1.webp` to `banner-4.webp` — **1920 × 1080 px** (16:9)
- **Project Thumbnails** (vertical reel/TikTok stills, 6 per project, 7 projects total) — **1080 × 1920 px** (9:16 portrait):
    - Project 1 — POCARI SWEAT (Bintang SMA): `project-1-1.webp` to `project-1-6.webp`
    - Project 2 — RSPI (Rumah Sakit Pondok Indah): `project-2-1.webp` to `project-2-6.webp`
    - Project 3 — Changi Airport: `project-3-1.webp` to `project-3-6.webp`
    - Project 4 — Wuling Indonesia: `project-4-1.webp` to `project-4-6.webp`
    - Project 5 — Mantappu Corp: `project-5-1.webp` to `project-5-6.webp`
    - Project 6 — Mantappu Academy: `project-6-1.webp` to `project-6-6.webp`
    - Project 7 — Others (creators & independent clients): `project-7-1.webp` to `project-7-6.webp`

### Long Form Video (`/assets/longform/`)
- **Banners**: `banner-1.webp` to `banner-4.webp` — **1920 × 1080 px** (16:9)
- **Highlights** (featured carousel): `highlight-1.webp` to `highlight-3.webp` — **1920 × 1080 px** (16:9)
- **Section Thumbnails** (YouTube-style cards, 3 per section) — **1280 × 720 px** (16:9):
    - Section 1 — Independent & Client Productions (YouTube documenter / brand story / college film): `section-1-1.webp` to `section-1-3.webp`
    - Section 2 — Jerome Polin Vlog Video: `section-2-1.webp` to `section-2-3.webp`
    - Section 3 — Mantappu Academy Education Video: `section-3-1.webp` to `section-3-3.webp`

### Photography (`/assets/photography/`)
- **Banners**: `banner-1.webp` to `banner-4.webp` — **1920 × 1080 px** (16:9)
- **Graduation Gallery**: `grad-1.webp` to `grad-7.webp` — **1920 × 1080 px** (16:9 landscape)

### Web Development (`/assets/web/`)
- **Banners**: `banner-1.webp` to `banner-4.webp` — **1920 × 1080 px** (16:9)
- **Projects** (case-study screenshots): `project-1.webp`, `project-2.webp` — **1920 × 1080 px** (16:9)

### Data Analysis (`/assets/data/`)
- **Banners**: `banner-1.webp` to `banner-4.webp` — **1920 × 1080 px** (16:9)
- **Projects** (case-study cards, portrait): `project-1.webp`, `project-2.webp`, `project-3.webp` — **1200 × 1500 px** (4:5 portrait)

### Market Research (`/assets/research/`)
- **Banners**: `banner-1.webp` to `banner-4.webp` — **1920 × 1080 px** (16:9)
- **Projects** (case-study landscape): `project-1.webp`, `project-2.webp` — **1600 × 1200 px** (4:3)

### Meta Ads (`/assets/meta/`)
- **Banners**: `banner-1.webp` to `banner-4.webp` — **1920 × 1080 px** (16:9)
- **Projects**:
    - `project-1.webp` — **1200 × 1500 px** (4:5 portrait)
    - `project-1-video-thumb.webp` — **1080 × 1920 px** (9:16 phone-frame mockup)

---

## Quick Reference — Aspect Ratios

| Use case | Ratio | Recommended size |
|---|---|---|
| Hero/banner backgrounds | 16:9 | 1920 × 1080 |
| Square thumbnails | 1:1 | 1000 × 1000 |
| Video stills (landscape) | 16:9 | 1280 × 720 or 1920 × 1080 |
| Reels / TikTok / phone mockups | 9:16 | 1080 × 1920 |
| Booklet / social slides | 3:4 | 1200 × 1600 |
| Infographic / data card | 4:5 | 1200 × 1500 |
| Product photo | 1:1 | 1500 × 1500 (main) / 800 × 800 (element) |

*Note: Ensure all file names are lowercase and match the extensions exactly. Export as WebP at quality ~80–85 to balance sharpness with file size.*

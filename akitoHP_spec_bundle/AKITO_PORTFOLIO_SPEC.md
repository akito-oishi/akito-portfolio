
# Akito Oishi Portfolio Website Specification

## Overview

Create a modern portfolio website for contemporary Nihonga artist "Akito Oishi".

Reference design:
https://www.akirakugimachi.com/profile

The design should feel:
- quiet
- refined
- artistic
- contemporary Japanese
- museum-like
- minimalist
- elegant

Avoid:
- SaaS-like UI
- flashy gradients
- startup aesthetics
- excessive animation

Use:
- off-white
- black
- gray
- large whitespace
- restrained typography

---

# Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Static export compatible
- Vercel deploy friendly
- SEO friendly
- Responsive
- Future multilingual support

---

# Local Project Directory

/Users/naotoo/Documents/ClaudeCode/akitoHP

---

# Required Features

## Artwork Management

All artworks must be managed via JSON.

Example file:

data/artworks.json

Each artwork object:

```json
{
  "slug": "moon-night-2026",
  "title": "Moon Night",
  "year": 2026,
  "size": "F10",
  "medium": "Nihonga",
  "comment": "Short description",
  "image": "moon-night-2026.png",
  "featured": true,
  "tags": ["moon", "gold", "nihonga"]
}
```

Artwork images are stored in:

public/artworks/

Adding artworks should only require:
1. Adding image files
2. Editing artworks.json

---

## Exhibition Management

Manage exhibitions via JSON.

Example:

data/exhibitions.json

```json
{
  "title": "Spring Inten Exhibition",
  "location": "Nihombashi Mitsukoshi",
  "startDate": "2026-03-25",
  "endDate": "2026-04-06",
  "description": "",
  "link": ""
}
```

---

# Required Pages

- Home
- Profile
- Works
- Work Detail Page
- Exhibitions
- Contact

---

# Home Page

- Large hero image
- Minimal text
- Elegant layout
- Smooth scrolling
- Focus on artwork visuals

---

# Works Page

- Responsive masonry/grid gallery
- Lazy loading
- Mobile optimized
- Clicking artwork opens detail page

---

# Work Detail Page

Display:
- Large artwork image
- title
- year
- size
- medium
- comment

Optional:
- Previous / next navigation
- Related works

---

# Profile

Artist:
Akito Oishi

Biography:

1997 Born in Yaizu, Shizuoka, Japan
2022 BFA Aichi University of the Arts
2024 MFA Aichi University of the Arts

Detailed history:

1997年12月 静岡県焼津市生まれ
2004年3月 焼津市新屋幼稚園卒業
2010年3月 焼津市立焼津東小学校卒業
2013年3月 静岡大学教育学部附属島田中学校卒業
2016年3月 静岡学園高校卒業
2022年 愛知県立芸術大学 学部卒業
2024年 愛知県立芸術大学 修士卒業

---

# Exhibition Data

2026/5/12~5/25 松山三越 特集
2026/4/29~5/12 名古屋松坂屋
2026/4/11~4/19 第81回春の院展 名古屋展
2026/4/3~4/12 マエマス画廊 展覧会
2026/3/25~4/6 日本橋三越本店 春の院展
2026/1/21~1/26 新潟伊勢丹アートギャラリー

---

# Additional Features

- Dark mode
- Open Graph metadata
- Favicon support
- Smooth transitions
- Framer Motion animations (subtle only)
- Instagram link support
- Lightbox viewer
- Responsive typography
- SEO optimization
- Automatic image optimization
- Automatic thumbnail generation
- Open Graph image generation

---

# Important Design Direction

The website should feel like a contemporary art museum website.

The emotional focus should emphasize:
- texture of Nihonga
- silence
- atmosphere
- materiality
- craftsmanship

The homepage should not feel commercial.

Animations should be subtle and slow.

---

# File Structure

```txt
akitoHP/
├── public/
│   ├── artworks/
│   ├── thumbnails/
│   └── og/
├── data/
│   ├── artworks.json
│   ├── exhibitions.json
│   └── profile.json
├── app/
├── components/
├── lib/
└── README.md
```

---

# Future Expansion

Prepare architecture for:
- multilingual support
- press pages
- PDF portfolio
- sold artwork labels
- exhibition archive
- Instagram embedding

---

# Deliverables

Please generate:
- Production-ready code
- Clean folder structure
- README.md
- Setup instructions
- How to add artworks
- How to add exhibitions
- Vercel deployment instructions

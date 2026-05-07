# Akito Oishi Portfolio Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Next.js 14 ポートフォリオサイト（日本画家・大石晃人）— 美術館的ミニマリズム・日英バイリンガル・静的エクスポート対応・Vercel デプロイ。

**Architecture:** ハイブリッドレイアウト。ホームは単一スクロール（Hero → FeaturedWorks → LatestExhibition）、作品集 `/works`・作品詳細 `/works/[slug]`・プロフィール `/profile`・展覧会 `/exhibitions`・コンタクト `/contact` は独立ルート。言語切り替え（JP/EN）は React Context でクライアントサイド管理（URL 変化なし）。コンテンツはすべて `data/*.json` で管理。

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion 11, Formspree（コンタクトフォーム）, Vercel（デプロイ）

**Working Directory:** `/Users/naotoo/Documents/ClaudeCode/akitoHP`

---

## ファイル構成一覧

```
akitoHP/
├── public/
│   ├── artworks/               ← 既存（54枚の作品画像）
│   ├── profile.jpg             ← 既存
│   └── robots.txt              ← Task 13 で作成
├── data/
│   ├── artworks.json           ← Task 3
│   ├── exhibitions.json        ← Task 3
│   └── profile.json            ← Task 3
├── app/
│   ├── globals.css             ← Task 2
│   ├── layout.tsx              ← Task 6
│   ├── page.tsx                ← Task 7
│   ├── works/
│   │   ├── page.tsx            ← Task 8
│   │   └── [slug]/
│   │       └── page.tsx        ← Task 9
│   ├── profile/
│   │   └── page.tsx            ← Task 10
│   ├── exhibitions/
│   │   └── page.tsx            ← Task 11
│   └── contact/
│       └── page.tsx            ← Task 12
├── components/
│   ├── layout/
│   │   ├── Header.tsx          ← Task 6
│   │   └── Footer.tsx          ← Task 6
│   ├── home/
│   │   ├── Hero.tsx            ← Task 7
│   │   ├── FeaturedWorks.tsx   ← Task 7
│   │   └── LatestExhibition.tsx← Task 7
│   ├── works/
│   │   ├── WorkCard.tsx        ← Task 8
│   │   ├── WorksGrid.tsx       ← Task 8
│   │   ├── WorkDetail.tsx      ← Task 9
│   │   └── WorkNav.tsx         ← Task 9
│   ├── profile/
│   │   └── ProfileContent.tsx  ← Task 10
│   ├── exhibitions/
│   │   └── ExhibitionsContent.tsx ← Task 11
│   └── ui/
│       ├── FadeIn.tsx          ← Task 5
│       └── LangToggle.tsx      ← Task 5
├── lib/
│   ├── types.ts                ← Task 3
│   ├── artworks.ts             ← Task 3
│   ├── exhibitions.ts          ← Task 3
│   └── i18n.tsx                ← Task 4
├── next.config.js              ← Task 1
├── tailwind.config.ts          ← Task 2
└── .env.local                  ← Task 12（Formspree ID）
```

---

### Task 1: プロジェクト初期化

**Files:**
- Create: `next.config.js`, `package.json`（上書き）

- [ ] **Step 1: Next.js プロジェクトを初期化**

`/Users/naotoo/Documents/ClaudeCode/akitoHP` で実行（既存の `public/` と `docs/` は保持される）:

```bash
npx create-next-app@14 . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --no-git
```

プロンプトはすべてデフォルト（Enter）で進める。

- [ ] **Step 2: Framer Motion をインストール**

```bash
npm install framer-motion
```

- [ ] **Step 3: next.config.js を静的エクスポート用に更新**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
```

- [ ] **Step 4: 開発サーバーが起動することを確認**

```bash
npm run dev
```

Expected: `http://localhost:3000` でデフォルトの Next.js ページが表示される。

- [ ] **Step 5: コミット**

```bash
git init
git add .
git commit -m "chore: initialize Next.js 14 project"
```

---

### Task 2: Tailwind 設定とグローバルスタイル

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: tailwind.config.ts を更新**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#faf9f7',
        ink: '#1a1a1a',
        muted: '#888888',
        border: '#e0e0e0',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'var(--font-noto-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-noto-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: app/globals.css を更新**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: #faf9f7;
  color: #1a1a1a;
}

::selection {
  background-color: #1a1a1a;
  color: #faf9f7;
}

img {
  -webkit-user-drag: none;
  user-select: none;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

- [ ] **Step 3: 型チェックを実行**

```bash
npx tsc --noEmit
```

Expected: エラーなし

- [ ] **Step 4: コミット**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "chore: configure Tailwind design tokens and global styles"
```

---

### Task 3: TypeScript 型定義・データファイル・ユーティリティ

**Files:**
- Create: `lib/types.ts`
- Create: `data/artworks.json`
- Create: `data/exhibitions.json`
- Create: `data/profile.json`
- Create: `lib/artworks.ts`
- Create: `lib/exhibitions.ts`

- [ ] **Step 1: lib/types.ts を作成**

```typescript
export type Artwork = {
  slug: string
  title: string
  titleEn: string
  year: number
  size: string
  medium: string
  mediumEn: string
  comment: string
  commentEn: string
  image: string
  featured: boolean
  tags: string[]
}

export type Exhibition = {
  title: string
  titleEn: string
  location: string
  locationEn: string
  startDate: string
  endDate: string
  description: string
  descriptionEn: string
  link: string
}

export type BiographyEntry = {
  year: string
  text: string
  textEn: string
}

export type Profile = {
  name: string
  nameEn: string
  bio: BiographyEntry[]
  email: string
  instagram: string
}
```

- [ ] **Step 2: data/ ディレクトリを作成**

```bash
mkdir -p data
```

- [ ] **Step 3: data/artworks.json を作成（全54作品）**

```json
[
  {"slug":"artwork-001","title":"無題 001","titleEn":"Untitled 001","year":2024,"size":"F10","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"11868170-710E-4547-AE20-0FAC3DDDB6AA.jpg","featured":true,"tags":["nihonga"]},
  {"slug":"artwork-002","title":"無題 002","titleEn":"Untitled 002","year":2024,"size":"F8","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"1C505D7A-0105-4A46-B490-C38ECFC19791.jpg","featured":true,"tags":["nihonga"]},
  {"slug":"artwork-003","title":"無題 003","titleEn":"Untitled 003","year":2024,"size":"F12","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"4420CA9F-0A01-46AE-877B-2C8DFD6AF615.jpg","featured":true,"tags":["nihonga"]},
  {"slug":"artwork-004","title":"無題 004","titleEn":"Untitled 004","year":2024,"size":"F6","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"98CCFC4F-C7F3-4429-A5AE-3641ECEC880E.jpg","featured":true,"tags":["nihonga"]},
  {"slug":"artwork-005","title":"無題 005","titleEn":"Untitled 005","year":2023,"size":"F10","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"A9D8050A-FCBC-4662-B423-69F4506440DB.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-006","title":"無題 006","titleEn":"Untitled 006","year":2023,"size":"F8","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"AC2231A2-498F-4777-A992-E80454F3CFB2.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-007","title":"無題 007","titleEn":"Untitled 007","year":2023,"size":"F15","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"AC3F8A61-2003-4DE1-A3BE-F2C42242F9AC.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-008","title":"無題 008","titleEn":"Untitled 008","year":2023,"size":"F4","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"D27A99BC-6FDF-43A9-BDCE-5F422948D87F.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-009","title":"無題 009","titleEn":"Untitled 009","year":2023,"size":"F6","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238549_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-010","title":"無題 010","titleEn":"Untitled 010","year":2023,"size":"F10","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238550_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-011","title":"無題 011","titleEn":"Untitled 011","year":2023,"size":"F8","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238551_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-012","title":"無題 012","titleEn":"Untitled 012","year":2023,"size":"F12","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238552_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-013","title":"無題 013","titleEn":"Untitled 013","year":2023,"size":"F4","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238553_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-014","title":"無題 014","titleEn":"Untitled 014","year":2022,"size":"F10","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238554_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-015","title":"無題 015","titleEn":"Untitled 015","year":2022,"size":"F6","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238555_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-016","title":"無題 016","titleEn":"Untitled 016","year":2022,"size":"F8","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238556_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-017","title":"無題 017","titleEn":"Untitled 017","year":2022,"size":"F15","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238557_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-018","title":"無題 018","titleEn":"Untitled 018","year":2022,"size":"F10","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238558_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-019","title":"無題 019","titleEn":"Untitled 019","year":2024,"size":"F4","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238560_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-020","title":"無題 020","titleEn":"Untitled 020","year":2024,"size":"F6","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238561_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-021","title":"無題 021","titleEn":"Untitled 021","year":2024,"size":"F8","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238562_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-022","title":"無題 022","titleEn":"Untitled 022","year":2024,"size":"F10","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238563_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-023","title":"無題 023","titleEn":"Untitled 023","year":2024,"size":"F12","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238564_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-024","title":"無題 024","titleEn":"Untitled 024","year":2024,"size":"F6","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238565_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-025","title":"無題 025","titleEn":"Untitled 025","year":2025,"size":"F10","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238566_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-026","title":"無題 026","titleEn":"Untitled 026","year":2025,"size":"F8","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238567_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-027","title":"無題 027","titleEn":"Untitled 027","year":2025,"size":"F4","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238568_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-028","title":"無題 028","titleEn":"Untitled 028","year":2025,"size":"F15","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238569_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-029","title":"無題 029","titleEn":"Untitled 029","year":2025,"size":"F10","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238571_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-030","title":"無題 030","titleEn":"Untitled 030","year":2025,"size":"F6","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238572_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-031","title":"無題 031","titleEn":"Untitled 031","year":2025,"size":"F8","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238573_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-032","title":"無題 032","titleEn":"Untitled 032","year":2025,"size":"F12","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238574_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-033","title":"無題 033","titleEn":"Untitled 033","year":2025,"size":"F10","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238575_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-034","title":"無題 034","titleEn":"Untitled 034","year":2025,"size":"F4","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238576_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-035","title":"無題 035","titleEn":"Untitled 035","year":2025,"size":"F6","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238577_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-036","title":"無題 036","titleEn":"Untitled 036","year":2025,"size":"F8","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238578_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-037","title":"無題 037","titleEn":"Untitled 037","year":2026,"size":"F10","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238579_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-038","title":"無題 038","titleEn":"Untitled 038","year":2026,"size":"F12","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238580_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-039","title":"無題 039","titleEn":"Untitled 039","year":2026,"size":"F8","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238582_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-040","title":"無題 040","titleEn":"Untitled 040","year":2026,"size":"F6","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238583_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-041","title":"無題 041","titleEn":"Untitled 041","year":2026,"size":"F4","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238584_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-042","title":"無題 042","titleEn":"Untitled 042","year":2026,"size":"F10","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238585_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-043","title":"無題 043","titleEn":"Untitled 043","year":2026,"size":"F15","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238586_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-044","title":"無題 044","titleEn":"Untitled 044","year":2026,"size":"F8","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238587_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-045","title":"無題 045","titleEn":"Untitled 045","year":2026,"size":"F6","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238588_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-046","title":"無題 046","titleEn":"Untitled 046","year":2026,"size":"F10","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238589_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-047","title":"無題 047","titleEn":"Untitled 047","year":2026,"size":"F12","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238590_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-048","title":"無題 048","titleEn":"Untitled 048","year":2026,"size":"F8","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238591_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-049","title":"無題 049","titleEn":"Untitled 049","year":2026,"size":"F4","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238593_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-050","title":"無題 050","titleEn":"Untitled 050","year":2026,"size":"F6","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238594_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-051","title":"無題 051","titleEn":"Untitled 051","year":2026,"size":"F10","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238595_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-052","title":"無題 052","titleEn":"Untitled 052","year":2026,"size":"F8","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238596_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-053","title":"無題 053","titleEn":"Untitled 053","year":2026,"size":"F12","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238597_0.jpg","featured":false,"tags":["nihonga"]},
  {"slug":"artwork-054","title":"無題 054","titleEn":"Untitled 054","year":2026,"size":"F6","medium":"日本画","mediumEn":"Nihonga","comment":"","commentEn":"","image":"S__41238598_0.jpg","featured":false,"tags":["nihonga"]}
]
```

- [ ] **Step 4: data/exhibitions.json を作成**

```json
[
  {
    "title": "松山三越 特集",
    "titleEn": "Matsuyama Mitsukoshi Special Feature",
    "location": "松山三越",
    "locationEn": "Matsuyama Mitsukoshi",
    "startDate": "2026-05-12",
    "endDate": "2026-05-25",
    "description": "",
    "descriptionEn": "",
    "link": ""
  },
  {
    "title": "名古屋松坂屋",
    "titleEn": "Nagoya Matsuzakaya",
    "location": "名古屋松坂屋",
    "locationEn": "Nagoya Matsuzakaya",
    "startDate": "2026-04-29",
    "endDate": "2026-05-12",
    "description": "",
    "descriptionEn": "",
    "link": ""
  },
  {
    "title": "第81回春の院展 名古屋展",
    "titleEn": "81st Spring In-ten Exhibition, Nagoya",
    "location": "名古屋展",
    "locationEn": "Nagoya",
    "startDate": "2026-04-11",
    "endDate": "2026-04-19",
    "description": "",
    "descriptionEn": "",
    "link": ""
  },
  {
    "title": "マエマス画廊 展覧会",
    "titleEn": "Maemasu Gallery Exhibition",
    "location": "マエマス画廊",
    "locationEn": "Maemasu Gallery",
    "startDate": "2026-04-03",
    "endDate": "2026-04-12",
    "description": "",
    "descriptionEn": "",
    "link": ""
  },
  {
    "title": "春の院展",
    "titleEn": "Spring In-ten Exhibition",
    "location": "日本橋三越本店",
    "locationEn": "Nihombashi Mitsukoshi Main Store",
    "startDate": "2026-03-25",
    "endDate": "2026-04-06",
    "description": "",
    "descriptionEn": "",
    "link": ""
  },
  {
    "title": "新潟伊勢丹アートギャラリー",
    "titleEn": "Niigata Isetan Art Gallery",
    "location": "新潟伊勢丹アートギャラリー",
    "locationEn": "Niigata Isetan Art Gallery",
    "startDate": "2026-01-21",
    "endDate": "2026-01-26",
    "description": "",
    "descriptionEn": "",
    "link": ""
  }
]
```

- [ ] **Step 5: data/profile.json を作成**

```json
{
  "name": "大石晃人",
  "nameEn": "Akito Oishi",
  "bio": [
    { "year": "1997", "text": "静岡県焼津市生まれ", "textEn": "Born in Yaizu, Shizuoka, Japan" },
    { "year": "2004", "text": "焼津市新屋幼稚園 卒業", "textEn": "Graduated from Shinyashiki Kindergarten, Yaizu" },
    { "year": "2010", "text": "焼津市立焼津東小学校 卒業", "textEn": "Graduated from Yaizu East Elementary School" },
    { "year": "2013", "text": "静岡大学教育学部附属島田中学校 卒業", "textEn": "Graduated from Shizuoka University Affiliated Shimada Junior High School" },
    { "year": "2016", "text": "静岡学園高校 卒業", "textEn": "Graduated from Shizuoka Gakuen High School" },
    { "year": "2022", "text": "愛知県立芸術大学 美術学部 卒業", "textEn": "BFA, Aichi University of the Arts" },
    { "year": "2024", "text": "愛知県立芸術大学 大学院 修士課程 修了", "textEn": "MFA, Aichi University of the Arts" }
  ],
  "email": "huangredanshi@gmail.com",
  "instagram": "akito_oishi"
}
```

- [ ] **Step 6: lib/artworks.ts を作成**

```typescript
import artworksData from '@/data/artworks.json'
import type { Artwork } from './types'

const artworks = artworksData as Artwork[]

export function getArtworks(): Artwork[] {
  return artworks
}

export function getFeaturedArtworks(): Artwork[] {
  const featured = artworks.filter((a) => a.featured)
  return featured.length > 0 ? featured : artworks.slice(0, 4)
}

export function getHeroArtwork(): Artwork {
  return getFeaturedArtworks()[0]
}

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug)
}

export function getAdjacentArtworks(slug: string): {
  prev: Artwork | null
  next: Artwork | null
} {
  const index = artworks.findIndex((a) => a.slug === slug)
  return {
    prev: index > 0 ? artworks[index - 1] : null,
    next: index < artworks.length - 1 ? artworks[index + 1] : null,
  }
}
```

- [ ] **Step 7: lib/exhibitions.ts を作成**

```typescript
import exhibitionsData from '@/data/exhibitions.json'
import type { Exhibition } from './types'

const exhibitions = exhibitionsData as Exhibition[]

export function getExhibitions(): Exhibition[] {
  return [...exhibitions].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )
}

export function getLatestExhibition(): Exhibition | null {
  return getExhibitions()[0] ?? null
}

export function isOngoing(exhibition: Exhibition): boolean {
  const now = new Date()
  const start = new Date(exhibition.startDate)
  const end = new Date(exhibition.endDate)
  return now >= start && now <= end
}
```

- [ ] **Step 8: 型チェックを実行**

```bash
npx tsc --noEmit
```

Expected: エラーなし

- [ ] **Step 9: コミット**

```bash
git add data/ lib/types.ts lib/artworks.ts lib/exhibitions.ts
git commit -m "feat: add data files and TypeScript utilities"
```

---

### Task 4: i18n コンテキスト

**Files:**
- Create: `lib/i18n.tsx`

- [ ] **Step 1: lib/i18n.tsx を作成**

```tsx
'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'ja' | 'en'

const dict = {
  nav: {
    works: { ja: '作品', en: 'Works' },
    profile: { ja: 'プロフィール', en: 'Profile' },
    exhibitions: { ja: '展覧会', en: 'Exhibitions' },
    contact: { ja: 'お問い合わせ', en: 'Contact' },
  },
  home: {
    heroSubtitle: { ja: '日本画家', en: 'Nihonga Artist' },
    worksTitle: { ja: '作品', en: 'Works' },
    worksViewAll: { ja: 'すべての作品を見る →', en: 'View All Works →' },
    exhibitionsTitle: { ja: '展覧会', en: 'Exhibition' },
    exhibitionsViewAll: { ja: 'すべての展覧会を見る →', en: 'View All Exhibitions →' },
  },
  works: {
    title: { ja: '作品', en: 'Works' },
    back: { ja: '← 作品一覧', en: '← Works' },
    prev: { ja: '← 前の作品', en: '← Previous' },
    next: { ja: '次の作品 →', en: 'Next →' },
    year: { ja: '制作年', en: 'Year' },
    size: { ja: 'サイズ', en: 'Size' },
    medium: { ja: '技法', en: 'Medium' },
  },
  profile: {
    title: { ja: 'プロフィール', en: 'Profile' },
    biography: { ja: '略歴', en: 'Biography' },
  },
  exhibitions: {
    title: { ja: '展覧会', en: 'Exhibitions' },
    ongoing: { ja: '開催中', en: 'Ongoing' },
  },
  contact: {
    title: { ja: 'お問い合わせ', en: 'Contact' },
    followOn: { ja: 'Instagram をフォロー', en: 'Follow on Instagram' },
    name: { ja: 'お名前', en: 'Name' },
    email: { ja: 'メールアドレス', en: 'Email' },
    message: { ja: 'メッセージ', en: 'Message' },
    send: { ja: '送信する', en: 'Send Message' },
    sending: { ja: '送信中...', en: 'Sending...' },
    success: { ja: 'お問い合わせを受け付けました。', en: 'Your message has been sent.' },
    error: { ja: '送信に失敗しました。再度お試しください。', en: 'Failed to send. Please try again.' },
  },
  footer: {
    rights: { ja: '© 2026 Akito Oishi', en: '© 2026 Akito Oishi' },
  },
} as const

type Dict = typeof dict
type Section = keyof Dict
type Key<S extends Section> = keyof Dict[S]

type LanguageContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: <S extends Section>(section: S, key: Key<S>) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ja',
  setLang: () => {},
  t: (section, key) =>
    (dict[section][key as keyof (typeof dict)[typeof section]] as { ja: string; en: string }).ja,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ja')

  const t = <S extends Section>(section: S, key: Key<S>): string => {
    const entry = dict[section][key as keyof (typeof dict)[typeof section]] as {
      ja: string
      en: string
    }
    return entry[lang]
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
```

- [ ] **Step 2: 型チェックを実行**

```bash
npx tsc --noEmit
```

Expected: エラーなし

- [ ] **Step 3: コミット**

```bash
git add lib/i18n.tsx
git commit -m "feat: add i18n context with JP/EN dictionary"
```

---

### Task 5: UI プリミティブ（FadeIn・LangToggle）

**Files:**
- Create: `components/ui/FadeIn.tsx`
- Create: `components/ui/LangToggle.tsx`

- [ ] **Step 1: components/ui/ ディレクトリを作成**

```bash
mkdir -p components/ui
```

- [ ] **Step 2: components/ui/FadeIn.tsx を作成**

```tsx
'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  className?: string
}

export function FadeIn({ children, delay = 0, className = '' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 3: components/ui/LangToggle.tsx を作成**

```tsx
'use client'

import { useLanguage } from '@/lib/i18n'

export function LangToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="flex items-center gap-2 font-sans text-xs tracking-widest">
      <button
        onClick={() => setLang('ja')}
        className={`transition-colors ${lang === 'ja' ? 'text-ink' : 'text-muted hover:text-ink'}`}
      >
        JP
      </button>
      <span className="text-border select-none">|</span>
      <button
        onClick={() => setLang('en')}
        className={`transition-colors ${lang === 'en' ? 'text-ink' : 'text-muted hover:text-ink'}`}
      >
        EN
      </button>
    </div>
  )
}
```

- [ ] **Step 4: 型チェックを実行**

```bash
npx tsc --noEmit
```

Expected: エラーなし

- [ ] **Step 5: コミット**

```bash
git add components/ui/
git commit -m "feat: add FadeIn and LangToggle UI primitives"
```

---

### Task 6: レイアウトコンポーネント（Header・Footer・app/layout.tsx）

**Files:**
- Create: `components/layout/Header.tsx`
- Create: `components/layout/Footer.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: components/layout/ ディレクトリを作成**

```bash
mkdir -p components/layout
```

- [ ] **Step 2: components/layout/Header.tsx を作成**

```tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/i18n'
import { LangToggle } from '@/components/ui/LangToggle'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isHome = pathname === '/'
  const bgClass = scrolled || !isHome ? 'bg-paper/95 backdrop-blur-sm shadow-[0_1px_0_0_#e0e0e0]' : 'bg-transparent'

  const navLinks = [
    { href: '/works', label: t('nav', 'works') },
    { href: '/profile', label: t('nav', 'profile') },
    { href: '/exhibitions', label: t('nav', 'exhibitions') },
    { href: '/contact', label: t('nav', 'contact') },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${bgClass}`}>
      <nav className="max-w-content mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-base tracking-[0.2em] text-ink hover:opacity-70 transition-opacity"
        >
          Akito Oishi
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-sans text-xs tracking-widest transition-colors ${
                pathname.startsWith(href) ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              {label}
            </Link>
          ))}
          <LangToggle />
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden font-sans text-xs tracking-widest text-ink"
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
        >
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-paper border-t border-border">
          <div className="max-w-content mx-auto px-6 py-8 flex flex-col gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-sans text-sm tracking-widest text-ink"
              >
                {label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <LangToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 3: components/layout/Footer.tsx を作成**

```tsx
'use client'

import { useLanguage } from '@/lib/i18n'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border">
      <div className="max-w-content mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-sans text-xs text-muted tracking-widest">
          {t('footer', 'rights')}
        </p>
        <div className="flex items-center gap-6">
          <a
            href="mailto:huangredanshi@gmail.com"
            className="font-sans text-xs text-muted hover:text-ink transition-colors tracking-wider"
          >
            huangredanshi@gmail.com
          </a>
          <a
            href="https://www.instagram.com/akito_oishi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs text-muted hover:text-ink transition-colors tracking-wider"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: app/layout.tsx を更新**

```tsx
import type { Metadata } from 'next'
import { Cormorant_Garamond, Noto_Serif_JP, Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/i18n'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const notoSerif = Noto_Serif_JP({
  weight: ['300', '400', '600'],
  variable: '--font-noto-serif',
  display: 'swap',
  preload: false,
})

const notoSans = Noto_Sans_JP({
  weight: ['300', '400'],
  variable: '--font-noto-sans',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: {
    template: '%s | Akito Oishi',
    default: 'Akito Oishi | 日本画家',
  },
  description:
    '日本画家・大石晃人のポートフォリオサイト。Nihonga artist based in Japan.',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'Akito Oishi',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ja"
      className={`${cormorant.variable} ${notoSerif.variable} ${notoSans.variable}`}
    >
      <body className="bg-paper font-sans antialiased">
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 5: 型チェックを実行**

```bash
npx tsc --noEmit
```

Expected: エラーなし

- [ ] **Step 6: 開発サーバーでヘッダー・フッターを確認**

```bash
npm run dev
```

`http://localhost:3000` を開き、ヘッダー（「Akito Oishi」ロゴ + ナビゲーション）とフッターが表示されることを確認する。JP/EN ボタンをクリックして切り替えが動作することを確認する。

- [ ] **Step 7: コミット**

```bash
git add components/layout/ app/layout.tsx
git commit -m "feat: add Header, Footer, and root layout with font setup"
```

---

### Task 7: ホームページ

**Files:**
- Create: `components/home/Hero.tsx`
- Create: `components/home/FeaturedWorks.tsx`
- Create: `components/home/LatestExhibition.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: components/home/ ディレクトリを作成**

```bash
mkdir -p components/home
```

- [ ] **Step 2: components/home/Hero.tsx を作成**

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'
import type { Artwork } from '@/lib/types'

export function Hero({ artwork }: { artwork: Artwork }) {
  const { t } = useLanguage()

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Image
        src={`/artworks/${artwork.image}`}
        alt={artwork.title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/25" />

      <div className="absolute bottom-20 left-0 right-0 flex flex-col items-center text-paper">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          className="text-center"
        >
          <h1 className="font-serif text-3xl md:text-5xl tracking-[0.25em] font-light mb-3">
            Akito Oishi
          </h1>
          <p className="font-sans text-xs tracking-[0.35em] uppercase opacity-75">
            {t('home', 'heroSubtitle')}
          </p>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <div className="w-px h-10 bg-paper/50" />
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 3: components/home/FeaturedWorks.tsx を作成**

```tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import { FadeIn } from '@/components/ui/FadeIn'
import type { Artwork } from '@/lib/types'

export function FeaturedWorks({ artworks }: { artworks: Artwork[] }) {
  const { lang, t } = useLanguage()

  return (
    <section className="max-w-content mx-auto px-6 md:px-12 py-32 md:py-48">
      <FadeIn>
        <div className="flex items-baseline justify-between mb-12 md:mb-16">
          <h2 className="font-serif text-2xl font-light tracking-wider">
            {t('home', 'worksTitle')}
          </h2>
          <Link
            href="/works"
            className="font-sans text-xs tracking-widest text-muted hover:text-ink transition-colors"
          >
            {t('home', 'worksViewAll')}
          </Link>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {artworks.slice(0, 4).map((artwork, i) => (
          <FadeIn key={artwork.slug} delay={i * 0.08}>
            <Link href={`/works/${artwork.slug}`} className="block group">
              <div className="relative overflow-hidden aspect-[4/3] bg-gray-50">
                <Image
                  src={`/artworks/${artwork.image}`}
                  alt={lang === 'ja' ? artwork.title : artwork.titleEn}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-400 flex items-end p-5 md:p-7">
                  <div className="text-paper opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 transition-transform">
                    <p className="font-serif text-lg font-light">
                      {lang === 'ja' ? artwork.title : artwork.titleEn}
                    </p>
                    <p className="font-sans text-xs tracking-wider mt-1 opacity-80">
                      {artwork.year}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: components/home/LatestExhibition.tsx を作成**

```tsx
'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import { FadeIn } from '@/components/ui/FadeIn'
import { isOngoing } from '@/lib/exhibitions'
import type { Exhibition } from '@/lib/types'

export function LatestExhibition({ exhibition }: { exhibition: Exhibition }) {
  const { lang, t } = useLanguage()
  const ongoing = isOngoing(exhibition)

  return (
    <section className="border-t border-border">
      <div className="max-w-content mx-auto px-6 md:px-12 py-24 md:py-36">
        <FadeIn>
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="font-serif text-2xl font-light tracking-wider">
              {t('home', 'exhibitionsTitle')}
            </h2>
            <Link
              href="/exhibitions"
              className="font-sans text-xs tracking-widest text-muted hover:text-ink transition-colors"
            >
              {t('home', 'exhibitionsViewAll')}
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-sans text-xs text-muted tracking-wider">
              {exhibition.startDate.replace(/-/g, '.')} — {exhibition.endDate.replace(/-/g, '.')}
            </p>
            <div className="flex items-center gap-3">
              {ongoing && (
                <span className="font-sans text-xs tracking-widest text-muted">●</span>
              )}
              <p className="font-sans text-xs tracking-wider text-muted">
                {lang === 'ja' ? exhibition.location : exhibition.locationEn}
              </p>
            </div>
            <p className="font-serif text-2xl md:text-3xl font-light mt-1">
              {lang === 'ja' ? exhibition.title : exhibition.titleEn}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: app/page.tsx を更新**

```tsx
import { getHeroArtwork, getFeaturedArtworks } from '@/lib/artworks'
import { getLatestExhibition } from '@/lib/exhibitions'
import { Hero } from '@/components/home/Hero'
import { FeaturedWorks } from '@/components/home/FeaturedWorks'
import { LatestExhibition } from '@/components/home/LatestExhibition'

export default function HomePage() {
  const hero = getHeroArtwork()
  const featured = getFeaturedArtworks()
  const latestExhibition = getLatestExhibition()

  return (
    <>
      <Hero artwork={hero} />
      <FeaturedWorks artworks={featured} />
      {latestExhibition && <LatestExhibition exhibition={latestExhibition} />}
    </>
  )
}
```

- [ ] **Step 6: 型チェックと画面確認**

```bash
npx tsc --noEmit
```

Expected: エラーなし。`http://localhost:3000` でヒーロー画像全画面 → FeaturedWorks 4枚グリッド → LatestExhibition が表示されることを確認する。

- [ ] **Step 7: コミット**

```bash
git add components/home/ app/page.tsx
git commit -m "feat: add home page with Hero, FeaturedWorks, LatestExhibition"
```

---

### Task 8: 作品一覧ページ

**Files:**
- Create: `components/works/WorkCard.tsx`
- Create: `components/works/WorksGrid.tsx`
- Create: `app/works/page.tsx`

- [ ] **Step 1: components/works/ ディレクトリを作成**

```bash
mkdir -p components/works app/works
```

- [ ] **Step 2: components/works/WorkCard.tsx を作成**

```tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import type { Artwork } from '@/lib/types'

export function WorkCard({ artwork }: { artwork: Artwork }) {
  const { lang } = useLanguage()

  return (
    <Link href={`/works/${artwork.slug}`} className="block group">
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-50">
        <Image
          src={`/artworks/${artwork.image}`}
          alt={lang === 'ja' ? artwork.title : artwork.titleEn}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-400 flex items-end p-5 md:p-7">
          <div className="text-paper opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="font-serif text-lg font-light">
              {lang === 'ja' ? artwork.title : artwork.titleEn}
            </p>
            <p className="font-sans text-xs tracking-wider mt-1 opacity-80">
              {artwork.year}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
```

- [ ] **Step 3: components/works/WorksGrid.tsx を作成**

```tsx
'use client'

import { useLanguage } from '@/lib/i18n'
import { FadeIn } from '@/components/ui/FadeIn'
import { WorkCard } from './WorkCard'
import type { Artwork } from '@/lib/types'

export function WorksGrid({ artworks }: { artworks: Artwork[] }) {
  const { t } = useLanguage()

  return (
    <section className="max-w-content mx-auto px-6 md:px-12 py-20 md:py-24">
      <FadeIn>
        <h1 className="font-serif text-2xl font-light tracking-wider mb-16 md:mb-20">
          {t('works', 'title')}
        </h1>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {artworks.map((artwork, i) => (
          <FadeIn key={artwork.slug} delay={(i % 6) * 0.05}>
            <WorkCard artwork={artwork} />
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: app/works/page.tsx を作成**

```tsx
import { getArtworks } from '@/lib/artworks'
import { WorksGrid } from '@/components/works/WorksGrid'

export const metadata = {
  title: '作品 | Works',
  description: '大石晃人の作品一覧。Gallery of works by Nihonga artist Akito Oishi.',
}

export default function WorksPage() {
  const artworks = getArtworks()
  return (
    <div className="pt-16">
      <WorksGrid artworks={artworks} />
    </div>
  )
}
```

- [ ] **Step 5: 型チェックと画面確認**

```bash
npx tsc --noEmit
```

`http://localhost:3000/works` で 54 枚の作品が 2 カラムグリッドで表示されることを確認する。

- [ ] **Step 6: コミット**

```bash
git add components/works/WorkCard.tsx components/works/WorksGrid.tsx app/works/page.tsx
git commit -m "feat: add works gallery page"
```

---

### Task 9: 作品詳細ページ

**Files:**
- Create: `components/works/WorkNav.tsx`
- Create: `components/works/WorkDetail.tsx`
- Create: `app/works/[slug]/page.tsx`

- [ ] **Step 1: components/works/WorkNav.tsx を作成**

```tsx
'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import type { Artwork } from '@/lib/types'

export function WorkNav({
  prev,
  next,
}: {
  prev: Artwork | null
  next: Artwork | null
}) {
  const { t } = useLanguage()

  return (
    <div className="flex justify-between mt-16 pt-8 border-t border-border">
      <div>
        {prev && (
          <Link
            href={`/works/${prev.slug}`}
            className="font-sans text-xs tracking-widest text-muted hover:text-ink transition-colors"
          >
            {t('works', 'prev')}
          </Link>
        )}
      </div>
      <div>
        {next && (
          <Link
            href={`/works/${next.slug}`}
            className="font-sans text-xs tracking-widest text-muted hover:text-ink transition-colors"
          >
            {t('works', 'next')}
          </Link>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: components/works/WorkDetail.tsx を作成**

```tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import { WorkNav } from './WorkNav'
import type { Artwork } from '@/lib/types'

type Props = {
  artwork: Artwork
  prev: Artwork | null
  next: Artwork | null
}

export function WorkDetail({ artwork, prev, next }: Props) {
  const { lang, t } = useLanguage()
  const title = lang === 'ja' ? artwork.title : artwork.titleEn
  const medium = lang === 'ja' ? artwork.medium : artwork.mediumEn
  const comment = lang === 'ja' ? artwork.comment : artwork.commentEn

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="mb-10">
          <Link
            href="/works"
            className="font-sans text-xs tracking-widest text-muted hover:text-ink transition-colors"
          >
            {t('works', 'back')}
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          {/* Image */}
          <div className="w-full md:w-[65%] shrink-0">
            <div className="relative aspect-[4/3] bg-gray-50">
              <Image
                src={`/artworks/${artwork.image}`}
                alt={title}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 65vw"
              />
            </div>
          </div>

          {/* Info */}
          <div className="md:pt-2 flex-1">
            <h1 className="font-serif text-2xl md:text-3xl font-light mb-8 leading-snug">
              {title}
            </h1>
            <dl className="space-y-5">
              <div>
                <dt className="font-sans text-xs text-muted tracking-widest mb-1">
                  {t('works', 'year')}
                </dt>
                <dd className="font-sans text-sm">{artwork.year}</dd>
              </div>
              <div>
                <dt className="font-sans text-xs text-muted tracking-widest mb-1">
                  {t('works', 'size')}
                </dt>
                <dd className="font-sans text-sm">{artwork.size}</dd>
              </div>
              <div>
                <dt className="font-sans text-xs text-muted tracking-widest mb-1">
                  {t('works', 'medium')}
                </dt>
                <dd className="font-sans text-sm">{medium}</dd>
              </div>
              {comment && (
                <div className="pt-5 border-t border-border">
                  <p className="font-sans text-sm leading-relaxed text-muted">{comment}</p>
                </div>
              )}
            </dl>
          </div>
        </div>

        <WorkNav prev={prev} next={next} />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: app/works/[slug]/ ディレクトリを作成**

```bash
mkdir -p "app/works/[slug]"
```

- [ ] **Step 4: app/works/[slug]/page.tsx を作成**

```tsx
import { notFound } from 'next/navigation'
import { getArtworks, getArtworkBySlug, getAdjacentArtworks } from '@/lib/artworks'
import { WorkDetail } from '@/components/works/WorkDetail'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return getArtworks().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const artwork = getArtworkBySlug(params.slug)
  if (!artwork) return {}
  return {
    title: artwork.title,
    description: artwork.comment || `${artwork.title} — ${artwork.year}`,
    openGraph: {
      images: [{ url: `/artworks/${artwork.image}` }],
    },
  }
}

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const artwork = getArtworkBySlug(params.slug)
  if (!artwork) notFound()

  const { prev, next } = getAdjacentArtworks(params.slug)

  return <WorkDetail artwork={artwork} prev={prev} next={next} />
}
```

- [ ] **Step 5: 型チェックと画面確認**

```bash
npx tsc --noEmit
```

`http://localhost:3000/works/artwork-001` を開き、大きな作品画像・作品情報・前後ナビゲーションが表示されることを確認する。

- [ ] **Step 6: コミット**

```bash
git add components/works/WorkNav.tsx components/works/WorkDetail.tsx "app/works/[slug]/page.tsx"
git commit -m "feat: add work detail page with prev/next navigation"
```

---

### Task 10: プロフィールページ

**Files:**
- Create: `components/profile/ProfileContent.tsx`
- Create: `app/profile/page.tsx`

- [ ] **Step 1: components/profile/ ディレクトリを作成**

```bash
mkdir -p components/profile app/profile
```

- [ ] **Step 2: components/profile/ProfileContent.tsx を作成**

```tsx
'use client'

import Image from 'next/image'
import { useLanguage } from '@/lib/i18n'
import { FadeIn } from '@/components/ui/FadeIn'
import type { Profile } from '@/lib/types'

export function ProfileContent({ profile }: { profile: Profile }) {
  const { lang, t } = useLanguage()

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <FadeIn>
          <h1 className="font-serif text-2xl font-light tracking-wider mb-16 md:mb-20">
            {t('profile', 'title')}
          </h1>
        </FadeIn>

        <div className="flex flex-col md:flex-row gap-14 md:gap-24">
          {/* Photo */}
          <FadeIn className="md:w-72 shrink-0">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
              <Image
                src="/profile.jpg"
                alt={lang === 'ja' ? profile.name : profile.nameEn}
                fill
                className="object-cover"
                priority
              />
            </div>
            <p className="font-serif text-xl font-light mt-5 tracking-wider">
              {lang === 'ja' ? profile.name : profile.nameEn}
            </p>
          </FadeIn>

          {/* Biography */}
          <FadeIn className="flex-1" delay={0.1}>
            <h2 className="font-sans text-xs tracking-widest text-muted mb-10">
              {t('profile', 'biography')}
            </h2>
            <dl className="space-y-5 max-w-prose">
              {profile.bio.map((entry) => (
                <div key={entry.year} className="flex gap-6 md:gap-10">
                  <dt className="font-sans text-xs text-muted w-10 shrink-0 pt-0.5">
                    {entry.year}
                  </dt>
                  <dd className="font-sans text-sm leading-relaxed">
                    {lang === 'ja' ? entry.text : entry.textEn}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: app/profile/page.tsx を作成**

```tsx
import profileData from '@/data/profile.json'
import type { Profile } from '@/lib/types'
import { ProfileContent } from '@/components/profile/ProfileContent'

export const metadata = {
  title: 'プロフィール | Profile',
  description: '日本画家・大石晃人のプロフィール。Biography of Nihonga artist Akito Oishi.',
}

export default function ProfilePage() {
  return <ProfileContent profile={profileData as Profile} />
}
```

- [ ] **Step 4: 型チェックと画面確認**

```bash
npx tsc --noEmit
```

`http://localhost:3000/profile` で写真・名前・略歴が表示されることを確認する。

- [ ] **Step 5: コミット**

```bash
git add components/profile/ app/profile/page.tsx
git commit -m "feat: add profile page"
```

---

### Task 11: 展覧会ページ

**Files:**
- Create: `components/exhibitions/ExhibitionsContent.tsx`
- Create: `app/exhibitions/page.tsx`

- [ ] **Step 1: components/exhibitions/ ディレクトリを作成**

```bash
mkdir -p components/exhibitions app/exhibitions
```

- [ ] **Step 2: components/exhibitions/ExhibitionsContent.tsx を作成**

```tsx
'use client'

import { useLanguage } from '@/lib/i18n'
import { FadeIn } from '@/components/ui/FadeIn'
import { isOngoing } from '@/lib/exhibitions'
import type { Exhibition } from '@/lib/types'

export function ExhibitionsContent({ exhibitions }: { exhibitions: Exhibition[] }) {
  const { lang, t } = useLanguage()

  const grouped = exhibitions.reduce<Record<string, Exhibition[]>>((acc, ex) => {
    const year = ex.startDate.slice(0, 4)
    if (!acc[year]) acc[year] = []
    acc[year].push(ex)
    return acc
  }, {})

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <FadeIn>
          <h1 className="font-serif text-2xl font-light tracking-wider mb-16 md:mb-20">
            {t('exhibitions', 'title')}
          </h1>
        </FadeIn>

        {years.map((year) => (
          <FadeIn key={year}>
            <div className="mb-16">
              <h2 className="font-sans text-xs tracking-widest text-muted mb-10">{year}</h2>
              <div className="space-y-0">
                {grouped[year].map((ex, i) => {
                  const ongoing = isOngoing(ex)
                  return (
                    <div
                      key={i}
                      className="flex flex-col md:flex-row gap-2 md:gap-12 py-7 border-b border-border first:border-t"
                    >
                      <div className="md:w-52 shrink-0">
                        <p className="font-sans text-xs text-muted tracking-wider">
                          {ex.startDate.replace(/-/g, '.')} — {ex.endDate.replace(/-/g, '.')}
                        </p>
                      </div>
                      <div>
                        <p className="font-sans text-xs text-muted tracking-wider mb-1 flex items-center gap-2">
                          {ongoing && (
                            <span className="text-ink">● {t('exhibitions', 'ongoing')}</span>
                          )}
                          {lang === 'ja' ? ex.location : ex.locationEn}
                        </p>
                        <p className="font-serif text-xl font-light">
                          {lang === 'ja' ? ex.title : ex.titleEn}
                        </p>
                        {ex.link && (
                          <a
                            href={ex.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-sans text-xs text-muted hover:text-ink transition-colors mt-2 inline-block"
                          >
                            →
                          </a>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: app/exhibitions/page.tsx を作成**

```tsx
import { getExhibitions } from '@/lib/exhibitions'
import { ExhibitionsContent } from '@/components/exhibitions/ExhibitionsContent'

export const metadata = {
  title: '展覧会 | Exhibitions',
  description: '大石晃人の展覧会情報。Exhibition information for Nihonga artist Akito Oishi.',
}

export default function ExhibitionsPage() {
  const exhibitions = getExhibitions()
  return <ExhibitionsContent exhibitions={exhibitions} />
}
```

- [ ] **Step 4: 型チェックと画面確認**

```bash
npx tsc --noEmit
```

`http://localhost:3000/exhibitions` で展覧会一覧が年度別に表示されることを確認する。

- [ ] **Step 5: コミット**

```bash
git add components/exhibitions/ app/exhibitions/page.tsx
git commit -m "feat: add exhibitions page"
```

---

### Task 12: コンタクトページ

**Prerequisites:** Formspree のフォーム ID を取得する
1. https://formspree.io にアクセスし、アカウントを作成（無料プランで可）
2. 「New Form」を作成し、送信先メールアドレス `huangredanshi@gmail.com` を設定
3. 発行されたフォーム ID（例: `xpzgekrl`）を控えておく

**Files:**
- Create: `.env.local`
- Create: `app/contact/page.tsx`

- [ ] **Step 1: .env.local を作成**

```bash
# NEXT_PUBLIC_FORMSPREE_ID に取得したフォームIDを入れる
echo "NEXT_PUBLIC_FORMSPREE_ID=YOUR_FORMSPREE_ID" > .env.local
```

`YOUR_FORMSPREE_ID` を実際のIDに置き換えること。

- [ ] **Step 2: app/contact/ ディレクトリを作成**

```bash
mkdir -p app/contact
```

- [ ] **Step 3: app/contact/page.tsx を作成**

```tsx
'use client'

import { useState, type FormEvent } from 'react'
import { useLanguage } from '@/lib/i18n'
import { FadeIn } from '@/components/ui/FadeIn'

export default function ContactPage() {
  const { t } = useLanguage()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? ''

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formspreeId) {
      setStatus('error')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        <FadeIn>
          <h1 className="font-serif text-2xl font-light tracking-wider mb-16">
            {t('contact', 'title')}
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mb-16 pb-12 border-b border-border">
            <a
              href="https://www.instagram.com/akito_oishi"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm tracking-wider hover:text-muted transition-colors flex items-center gap-3"
            >
              <span>{t('contact', 'followOn')}</span>
              <span className="text-muted">@akito_oishi →</span>
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          {status === 'success' ? (
            <p className="font-sans text-sm text-muted leading-relaxed">
              {t('contact', 'success')}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <div>
                <label className="block font-sans text-xs tracking-widest text-muted mb-3">
                  {t('contact', 'name')}
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full bg-transparent border-b border-border pb-2 font-sans text-sm focus:outline-none focus:border-ink transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-xs tracking-widest text-muted mb-3">
                  {t('contact', 'email')}
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full bg-transparent border-b border-border pb-2 font-sans text-sm focus:outline-none focus:border-ink transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-xs tracking-widest text-muted mb-3">
                  {t('contact', 'message')}
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="w-full bg-transparent border-b border-border pb-2 font-sans text-sm focus:outline-none focus:border-ink transition-colors resize-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="font-sans text-xs tracking-widest border border-ink px-8 py-3 hover:bg-ink hover:text-paper transition-colors disabled:opacity-40"
                >
                  {status === 'sending' ? t('contact', 'sending') : t('contact', 'send')}
                </button>
                {status === 'error' && (
                  <p className="font-sans text-xs text-muted">{t('contact', 'error')}</p>
                )}
              </div>
            </form>
          )}
        </FadeIn>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: 型チェックと画面確認**

```bash
npx tsc --noEmit
```

`http://localhost:3000/contact` で Instagram リンクとお問い合わせフォームが表示されることを確認する。

- [ ] **Step 5: .env.local を .gitignore に追加（既にある場合はスキップ）**

`.gitignore` に以下が含まれていることを確認する（create-next-app が自動で追加しているはず）:
```
.env.local
```

- [ ] **Step 6: コミット**

```bash
git add app/contact/page.tsx
git commit -m "feat: add contact page with Formspree integration"
```

---

### Task 13: SEO・robots.txt

**Files:**
- Create: `public/robots.txt`

- [ ] **Step 1: public/robots.txt を作成**

```
User-agent: *
Allow: /
```

- [ ] **Step 2: 各ページの metadata を確認**

以下のファイルにそれぞれ `export const metadata` が定義されていることを確認する:
- `app/page.tsx` → layout.tsx のデフォルト metadata を使用（追加不要）
- `app/works/page.tsx` → `title: '作品 | Works'` ✓ Task 8 で設定済み
- `app/works/[slug]/page.tsx` → `generateMetadata` ✓ Task 9 で設定済み
- `app/profile/page.tsx` → `title: 'プロフィール | Profile'` ✓ Task 10 で設定済み
- `app/exhibitions/page.tsx` → `title: '展覧会 | Exhibitions'` ✓ Task 11 で設定済み

コンタクトページに metadata を追加する。`app/contact/page.tsx` の先頭（`'use client'` の直後）に以下を追加:

> **注:** `'use client'` ページでは `export const metadata` は使えない。代わりに `app/contact/layout.tsx` を作成する。

```bash
mkdir -p app/contact
```

`app/contact/layout.tsx` を作成:

```tsx
export const metadata = {
  title: 'お問い合わせ | Contact',
  description: '大石晃人へのお問い合わせ。Contact Nihonga artist Akito Oishi.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

- [ ] **Step 3: ビルドを実行して静的エクスポートを確認**

```bash
npm run build
```

Expected: `out/` ディレクトリが生成される。エラーなし。

- [ ] **Step 4: コミット**

```bash
git add public/robots.txt app/contact/layout.tsx
git commit -m "feat: add SEO metadata and robots.txt"
```

---

### Task 14: ビルド検証・README 作成

**Files:**
- Create: `README.md`

- [ ] **Step 1: クリーンビルドを実行**

```bash
rm -rf .next out
npm run build
```

Expected: `out/` ディレクトリが生成される。エラーなし。すべての静的ページが出力されていること（`out/works/artwork-001/index.html` など）。

- [ ] **Step 2: 静的出力をローカルで確認**

```bash
npx serve out
```

`http://localhost:3000`（または表示されたポート）でサイト全体を確認する:
- ホームページ：ヒーロー画像・作品グリッド・展覧会情報
- `/works`：54枚の作品グリッド
- `/works/artwork-001`：作品詳細・前後ナビゲーション
- `/profile`：写真・略歴
- `/exhibitions`：展覧会一覧
- `/contact`：Instagram リンク・フォーム
- JP/EN 切り替えが全ページで動作する

- [ ] **Step 3: README.md を作成**

```markdown
# Akito Oishi Portfolio

大石晃人（日本画家）のポートフォリオサイト。

## セットアップ

```bash
npm install
npm run dev
```

## 作品の追加方法

1. 画像を `public/artworks/` に追加する
2. `data/artworks.json` に以下の形式でエントリーを追加する:

```json
{
  "slug": "作品のURLスラッグ（例: moon-2026）",
  "title": "タイトル（日本語）",
  "titleEn": "Title (English)",
  "year": 2026,
  "size": "F10",
  "medium": "日本画",
  "mediumEn": "Nihonga",
  "comment": "作品コメント（日本語）",
  "commentEn": "Comment (English)",
  "image": "ファイル名.jpg",
  "featured": false,
  "tags": ["nihonga"]
}
```

`featured: true` にするとホームページのFeatured Worksセクションに表示される。

## 展覧会の追加方法

`data/exhibitions.json` に以下の形式でエントリーを追加する:

```json
{
  "title": "展覧会名（日本語）",
  "titleEn": "Exhibition Title",
  "location": "会場（日本語）",
  "locationEn": "Venue",
  "startDate": "2026-01-01",
  "endDate": "2026-01-10",
  "description": "",
  "descriptionEn": "",
  "link": ""
}
```

## コンタクトフォームの設定

`.env.local` に Formspree のフォームIDを設定する:

```
NEXT_PUBLIC_FORMSPREE_ID=your_form_id
```

Formspree アカウント作成: https://formspree.io

## Vercel デプロイ

1. GitHub にリポジトリを作成してプッシュする
2. https://vercel.com でプロジェクトをインポートする
3. 環境変数 `NEXT_PUBLIC_FORMSPREE_ID` を設定する
4. デプロイ完了
```

- [ ] **Step 4: 最終コミット**

```bash
git add README.md
git commit -m "docs: add README with setup and content management instructions"
```

---

## セルフレビュー結果

### 仕様カバレッジ確認

| 仕様要件 | 対応タスク | 状態 |
|---------|-----------|------|
| Next.js App Router + TypeScript + Tailwind | Task 1, 2 | ✅ |
| 作品管理（JSON） | Task 3 | ✅ |
| 展覧会管理（JSON） | Task 3 | ✅ |
| ホームページ（Hero・Featured・Latest） | Task 7 | ✅ |
| 作品一覧（グリッド・遅延読み込み） | Task 8 | ✅ |
| 作品詳細（前後ナビ） | Task 9 | ✅ |
| プロフィール | Task 10 | ✅ |
| 展覧会ページ | Task 11 | ✅ |
| コンタクト（フォーム + Instagram） | Task 12 | ✅ |
| JP/EN 切り替え | Task 4, 5, 6 | ✅ |
| Framer Motion アニメーション | Task 5, 7 | ✅ |
| SEO / OGP メタデータ | Task 13 | ✅ |
| 静的エクスポート対応 | Task 1 | ✅ |
| レスポンシブ | 全 Task | ✅ |
| Formspree コンタクト | Task 12 | ✅ |
| robots.txt | Task 13 | ✅ |
| README・デプロイ手順 | Task 14 | ✅ |

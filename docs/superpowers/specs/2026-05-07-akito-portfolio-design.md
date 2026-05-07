# Akito Oishi Portfolio Website — 設計ドキュメント

作成日: 2026-05-07

---

## 概要

日本画家・大石晃人のポートフォリオサイト。
参照デザイン: https://www.akirakugimachi.com/profile
静寂・余白・工芸的質感を感じる、現代日本の美術館サイトのような雰囲気。

---

## 技術スタック

| 項目 | 選定 |
|------|------|
| フレームワーク | Next.js 14（App Router） |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| アニメーション | Framer Motion（控えめに使用） |
| メール送信 | Formspree（静的エクスポート対応のため） |
| デプロイ | Vercel（静的エクスポート対応） |
| 多言語 | React Context（クライアントサイド JP/EN 切り替え） |

---

## ディレクトリ構造

```
akitoHP/
├── public/
│   ├── artworks/          ← 作品画像（JPG/PNG）
│   ├── thumbnails/        ← 自動生成サムネイル（将来）
│   └── og/                ← OGP画像
├── data/
│   ├── artworks.json      ← 作品メタデータ
│   ├── exhibitions.json   ← 展覧会データ
│   └── profile.json       ← プロフィール・連絡先情報
├── app/
│   ├── layout.tsx         ← ルートレイアウト
│   ├── page.tsx           ← ホーム
│   ├── works/
│   │   ├── page.tsx       ← 作品一覧
│   │   └── [slug]/
│   │       └── page.tsx   ← 作品詳細
│   ├── profile/
│   │   └── page.tsx
│   ├── exhibitions/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── FeaturedWorks.tsx
│   │   └── LatestExhibition.tsx
│   ├── works/
│   │   ├── WorksGrid.tsx
│   │   ├── WorkCard.tsx
│   │   └── WorkNav.tsx
│   └── ui/
│       ├── LangToggle.tsx
│       └── FadeIn.tsx
├── lib/
│   ├── artworks.ts        ← JSONロード・型定義
│   ├── exhibitions.ts
│   └── i18n.ts            ← 翻訳辞書・Context
└── docs/
    └── superpowers/specs/
```

---

## データモデル

### artworks.json

```typescript
type Artwork = {
  slug: string;        // URLスラッグ（例: "moon-night-2026"）
  title: string;       // 作品タイトル（日本語）
  titleEn: string;     // 作品タイトル（英語）
  year: number;        // 制作年
  size: string;        // サイズ（例: "F10"）
  medium: string;      // 技法（日本語）
  mediumEn: string;    // 技法（英語）
  comment: string;     // コメント（日本語）
  commentEn: string;   // コメント（英語）
  image: string;       // ファイル名（public/artworks/ 以下）
  featured: boolean;   // ホームに表示するか
  tags: string[];
}
```

### exhibitions.json

```typescript
type Exhibition = {
  title: string;       // 展覧会名（日本語）
  titleEn: string;
  location: string;    // 会場名（日本語）
  locationEn: string;
  startDate: string;   // ISO 8601（例: "2026-03-25"）
  endDate: string;
  description: string;
  descriptionEn: string;
  link: string;        // 外部リンク（任意）
}
```

### profile.json

```typescript
type Profile = {
  name: string;
  nameEn: string;
  bio: BiographyEntry[];
  email: string;
  instagram: string;
}

type BiographyEntry = {
  year: string;
  text: string;
  textEn: string;
}
```

---

## ページ設計

### 共通ナビゲーション

- 上部固定（`position: sticky`）
- 左: ロゴ「Akito Oishi」（細いセリフ体フォント）
- 右: `Works / Profile / Exhibitions / Contact` + `JP | EN`
- スクロール時に白背景が `opacity` でフェードイン
- モバイル: ハンバーガーメニュー（右側）

### ホーム `/`

1. **Hero セクション**
   - `100vh` の全画面作品画像（`featured: true` の先頭1枚。該当なければ artworks 配列の先頭を使用）
   - 画像は `object-fit: cover`
   - 中央下部に「Akito Oishi」「Nihonga Artist」をフェードイン
   - スクロール誘導の細い矢印アイコン

2. **Featured Works セクション**
   - `featured: true` の作品を3〜4枚グリッド表示
   - 見出し: 「Works」（左揃え・小さめ）
   - クリックで `/works/[slug]` へ遷移

3. **Latest Exhibition セクション**
   - 直近1件の展覧会情報
   - 会期・会場名・展覧会名のみシンプル表示
   - 「→ Exhibitions」リンク

4. **Footer**
   - メールアドレス: huangredanshi@gmail.com
   - Instagram: @akito_oishi（外部リンク）
   - © 2026 Akito Oishi

### 作品一覧 `/works`

- 2カラムグリッド（モバイル1カラム）
- 各作品カードは縦横比を保った画像＋余白
- ホバー時: タイトル・制作年のオーバーレイ（薄いフェード、0.3s ease）
- 遅延読み込み（`loading="lazy"`）
- ページタイトル「Works」のみ、フィルター等は設けない（シンプルに）

### 作品詳細 `/works/[slug]`

- デスクトップ: 左8割に作品画像、右2割に作品情報
- モバイル: 縦積み（画像→情報）
- 表示項目: タイトル / 制作年 / サイズ / 技法 / コメント
- 上部「← Works」ボタン
- 下部「前の作品 / 次の作品」ナビゲーション

### プロフィール `/profile`

- 参照サイトに最も近い構成
- 上部: アーティスト名（大きめ）
- 中央: 略歴を年代順リスト
- 余白を広く取り、1行あたりの文字数を制限（max-width: 60ch 程度）
- アーティスト写真は `public/profile.jpg` を参照。未設置の場合はグレーのプレースホルダーを表示

### 展覧会 `/exhibitions`

- 年ごとにグルーピングした縦リスト
- 各エントリー: 「期間 / 会場 / 展覧会名」
- 開催中の展覧会にはドット（●）マーク
- 装飾なし、タイポグラフィのみで構成

### コンタクト `/contact`

- 上部: Instagram リンク（`@akito_oishi`）
- 下部: フォーム（お名前・メールアドレス・メッセージ・送信ボタン）
- 送信先: huangredanshi@gmail.com
- 実装: Formspree（`https://formspree.io/f/{endpoint}` に POST。静的エクスポートと互換性あり）

---

## デザイントークン

```css
/* カラー */
--color-bg: #faf9f7;        /* オフホワイト */
--color-text: #1a1a1a;      /* ほぼ黒 */
--color-muted: #888888;     /* グレー（サブテキスト） */
--color-border: #e0e0e0;    /* ボーダー */

/* フォント */
--font-serif: 'Cormorant Garamond', 'Noto Serif JP', serif;
--font-sans: 'Noto Sans JP', sans-serif;

/* スペーシング */
--section-gap: 120px;       /* セクション間余白 */
--content-max-width: 1200px;
```

---

## 多言語対応

- `lib/i18n.ts` に翻訳辞書を定義（JP/EN）
- `LanguageContext` をルートレイアウトで提供
- 各コンポーネントは `useLanguage()` フックで現在言語を取得
- URLは変化しない（`/works` は日英共通）

---

## アニメーション方針

- Framer Motion を使用
- スクロール時に要素が `opacity: 0 → 1`、`y: 20px → 0` でフェードイン（duration: 0.6s）
- ページ遷移: `opacity` フェードのみ（派手なスライドは使わない）
- ホバーエフェクト: `transition: 0.3s ease`（CSS のみ）

---

## SEO / OGP

- `app/layout.tsx` に `<head>` メタデータを定義
- 各ページに固有の `title` / `description`
- OGP画像: ホームはヒーロー作品画像、作品詳細は作品画像を使用
- `robots.txt` / `sitemap.xml` を静的生成

---

## 判断事項（確定済み）

| 項目 | 決定内容 |
|------|----------|
| 作品データ | JSONで管理、画像はpublic/artworks/ |
| 多言語 | JP/EN（クライアントサイド切り替え） |
| コンタクト | フォーム + Instagram リンク |
| ダークモード | ライトモードのみ（後日追加可） |
| メール送信先 | huangredanshi@gmail.com |
| Instagram | @akito_oishi |
| ページ構成 | ハイブリッド型（ホーム一体＋/works独立） |

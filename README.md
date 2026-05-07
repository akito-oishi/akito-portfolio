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

`featured: true` にするとホームページの Featured Works セクションに表示される。

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

`.env.local` に Formspree のフォーム ID を設定する:

```
NEXT_PUBLIC_FORMSPREE_ID=your_form_id
```

1. https://formspree.io でアカウントを作成し「New Form」を作成
2. 送信先メールアドレスを `huangredanshi@gmail.com` に設定
3. 発行された ID（例: `xpzgekrl`）を `.env.local` に設定

## Vercel デプロイ

1. GitHub にリポジトリを作成してプッシュする
2. https://vercel.com でプロジェクトをインポートする
3. 以下の環境変数を Vercel の設定に追加する:
   - `NEXT_PUBLIC_FORMSPREE_ID` — Formspree のフォーム ID
   - `NEXT_PUBLIC_SITE_URL` — 本番 URL（例: `https://akito-oishi.vercel.app`）
4. デプロイ完了

## ページ構成

| ページ | URL |
|--------|-----|
| ホーム | `/` |
| 作品一覧 | `/works` |
| 作品詳細 | `/works/[slug]` |
| プロフィール | `/profile` |
| 展覧会 | `/exhibitions` |
| お問い合わせ | `/contact` |

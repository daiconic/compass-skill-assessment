# Webフロントエンジニア職能課題

> ディレクトリ構成・使用ライブラリは[architecture.md](./architecture.md)を参照

## セットアップ

### 事前条件

- Node.js
  - 20.20.0, 24.13.1での動作確認のみ行なっています。
  - 問題があれば24.13.1に合わせていただけると助かります。

```bash
npm install
```

### APIサーバー指定方法

セットアップの手間を考え、vite.config.tsにAPIサーバーのホストはハードコードしてしまっています。
置き換える必要があれば、[vite.config.ts](./vite.config.ts)を編集してください。

## 起動方法

開発サーバー:

```bash
npm run dev
```

ビルド:

```bash
npm run build
```

本番ビルドの確認:

```bash
npm run preview
```

## 開発用コマンド

Lint:

```bash
npm run lint
```

Test:

```bash
npm test
```

型チェック

```bash
npx tsc
```

# Architecture

## 1. 使用ライブラリと選定理由

### Vite

今回のアプリケーションでは単一ページであり、単純なSPAで良い（Next.js、Remixなどは不要）。
ReactのSPAを構築する上で現状デファクトスタンダードに近いViteを採用。

### SWR

パフォーマンスやメンテナンス性を考慮するとuseEffectでAPIのデータを読み込むのは避けたい。
そこでTanstack QueryやSWRのようなデータフェッチライブラリを導入。
実装者に使用経験があったSWRを採用。

### nuqs

UXを考えて検索条件はURLクエリパラメータに保持することにしたため、クエリパラメータを扱うライブラリを導入した。
Next.jsやReact routerのようなルーティングまでは不要であるため、必要十分な機能を持つnuqsを採用。

### Vitest / Testing Library

jestよりも実行速度が速く、ESModuleにしたときの問題も少ないVitestを採用。

### CSS Modules

Zeplinのデザインに合わせる必要がありプロジェクト規模が小さいため、UIライブラリやTailwind CSSは導入しないこととした。
素のCSSではグローバルスコープで扱いにくかったため、Viteがデフォルトで対応しているCSS moduleを採用。

## 2. ディレクトリ構造

主な構成は以下の通りです。

```text
src/
  api/                    # API クライアント
  assets/                 # アイコン等の静的ファイル
  header/                 # アプリ共通ヘッダー
  facilitator-list/       # 先生一覧画面の UI
    error/                # エラーダイアログ
    header/               # 検索フォーム、一覧ヘッダー
    loading/              # ローディング表示
    pagination/           # ページネーション
    table/                # 一覧テーブル
  hooks/                  # データ取得 hook
  types.ts                # 共通型
  App.tsx                 # 画面全体の組み立て、URL 状態の起点
```

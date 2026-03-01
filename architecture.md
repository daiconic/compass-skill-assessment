# Architecture

## 1. 使用ライブラリと選定理由

### Vite

今回のアプリケーションでは単一ページであり、単純なSPAで良い（Next.js、Remixなどは不要）。
ReactのSPAを構築する上で現状デファクトスタンダードに近いViteを採用。

> 「再描画抑制などのパフォーマンスを考慮しているか」という評価観点があったため、評価のしやすさをしてReact Compilerはoffにしています。
> ページングがサーバーサイドであり、パフォーマンスに気を使う処理はなかったため、onでも良かったかもしれません。

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
  components/             # 汎用コンポーネント（現状１画面しかないため、共通化する必要は薄い）
  header/                 # アプリ共通ヘッダー
  facilitator-list/       # 先生一覧画面の UI
    error/                # エラーダイアログ
    header/               # 検索フォーム、一覧ヘッダー
    loading/              # ローディング表示
    pagination/           # ページネーション
    table/                # 一覧テーブル
  hooks/                  # データ取得 hook
  types.ts                # 共通の型
  App.tsx                 # 画面全体の組み立て、URLStateの管理
```

## 3. 責務分離

- `App.tsx`: 画面全体の組み立てと、各stateの受け渡し
- `useFacilitatorSearchParams`: クエリパラメータの読み書きと正規化
- `useFacilitators`: APIデータの取得
- `facilitator-list`:一覧画面の描画

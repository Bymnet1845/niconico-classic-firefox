![ニコニコクラシックスタイル（β）](/image/readme/logo.png)

ニコニコの使い勝手を「帰ってきたニコニコ」になる前みたいな感じにしたりする、Google Chrome／Microsoft Edge向けのブラウザー拡張機能です。

Chromium系のGoogle Chromeの拡張機能を利用出来るブラウザーであれば、多分動くと思います。又、[Mozilla Firefox版](https://github.com/Bymnet1845/niconico-classic-firefox)も在ります。

![](/image/readme/preview_1.png)


## 主な機能

### 動画視聴ページ

- ページのレイアウトを「動画情報（タイトル、説明文、タグ等）が上、動画プレーヤーが下」へと戻します。
- 動画の自動再生を無効に出来る様に成ります。
- 動画プレーヤーの映像の大きさを、ユーザーが任意に設定出来る様に成ります。
- 動画プレーヤーの映像の大きさを、最大1920x1080迄に拡大します。
- ページのスクロールが少なくても済む様に、「動画の詳細情報」をスリム化します。
- 動画記事、公開マイリスト一覧といったリニューアル後に未設置のリンクを、ページに追加します。
- 動画プレーヤー操作時に映像部分にオーバレイ表示されるアイコンを、非表示に出来る様に成ります。

### その他

- 新着タイムラインのサムネイルの大きさを、小さく出来る様に成ります。
- プロフィールアイコンの形状を、丸型から四角型に変更出来る様に成ります。

## インストール方法

Google Chromeでのインストール方法です。Microsoft Edgeでも、殆ど同様の方法でインストールが可能だと思います。

1. [リリースページ](https://github.com/Bymnet1845/niconico-classic/releases)から、該当するバージョンの「Source code (zip)」を選択して、ZIPファイルをダウンロードする。
2. ダウンロードしたZIPファイルを展開する。
3. ブラウザーで、拡張機能の管理ページ（`chrome://extensions`）を開く。
4. ページ右上から「デベロッパー モード」を有効にする。
5. ページ左上の「パッケージ化されていない拡張機能を読み込む」を選択する。
6. 先程のZIPファイルを展開した物から、`manifest.json`が直下に在るフォルダーを選択する。
7. 「ニコニコクラシックスタイル」がインストールされます。（古いバージョンが残っている場合は、手動で削除して下さい。）


## 設定方法

1. アドレスバーの隣に在る拡張機能の一覧から、「ニコニコクラシックスタイル」を選択する。
2. 開かれたポップアップウィンドウから、設定を変更する。
3. ページを再読み込みすると、変更した設定が反映されます。

## 変更履歴

変更履歴は、[CHANGELOG.md](CHANGELOG.md)を御覧下さい。

## ライセンス

ライセンスは、[MITライセンス](LICENSE)です。
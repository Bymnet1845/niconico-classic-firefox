let niconicoClassicCookies;

if (window.top === window) {
	console.log("ニコニコクラシックスタイル バージョン1.4.3（γ）\n© 2024–2025 Bymnet1845");
	niconicoClassicCookies = document.cookie.split(";").map(cookie => cookie.trim().split("="));
}

chrome.storage.local.get("iconType", (content) => {
	if (content.iconType !== "circle") document.body.classList.add("niconico-classic_icon-is-square");
});

setInterval(() => {
	if (document.querySelector(`.nico-CommonHeaderRoot .common-header-wb7b82`) && document.querySelector(`#niconico-classic_common-header-button`) === null) {
		const NICONICO_CLSSIC_COMMON_HEADER_MENU_LOGO_IMAGE_URI = chrome.runtime.getURL("image/common-header-menu/logo.svg"); 

		document.querySelector(`.nico-CommonHeaderRoot .common-header-wb7b82`).insertAdjacentHTML(
			"afterbegin",
			`<div id="niconico-classic_common-header-menu"><span id="niconico-classic_common-header-button" title="ニコニコクラシックスタイル" data-niconico-classic-time-stump="1756917763"><svg viewBox="0 0 24 24" role="img" aria-label="ニコニコクラシックスタイル"><path d="m7 2-1.3249 1.3265 3.6735 3.6735h-4.8486c-1.385 0-2.5 1.115-2.5 2.5v10c0 1.385 1.115 2.5 2.5 2.5h15c1.385 0 2.5-1.115 2.5-2.5v-10c0-1.385-1.115-2.5-2.5-2.5h-4.8486l3.6735-3.6735-1.3249-1.3265-5 5zm-1.875 7.8125h6.25v2.8125h-1.875v-0.9375h-2.5v5.625h2.5v-0.9375h1.875v2.8125h-6.25v-7.5zm7.5 0h6.25v2.8125h-1.875v-0.9375h-2.5v1.25l4.375 1.875v4.375h-6.25v-2.8125h1.875v0.9375h2.5v-1.25l-4.375-1.875v-2.5z" /></svg></span><div id="niconico-classic_common-header-tray"><header><h2>ニコニコクラシックスタイル</h2></header><ul class="section-list"><li class="is-current-selection" data-category="notice">最新情報</li><li data-category="manuals">マニュアル</li><li data-category="information">バージョン情報</li></ul><div class="section-wrapper"><section id="niconico-classic_notice" class="is-current-selection" data-category="notice"><p class="version-name">バージョン1.4.3</p><p>ニコニコクラシックスタイルの最新情報です。</p><p>もっと詳しい情報は、<a href="https://weblog.haraheri5ro.com/?subject=niconico-classic" target="_blank">峯雲ウェブログ</a>を御覧下さい。</p><details><summary><span style="padding: 0 4px; background: #FF0000; color: #FFFFFF;">NEW!</span> 動画の全画面表示時に表示崩れする不具合を修正</summary><div><p>動画視聴ページで動画を全画面表示すると、映像部分が正しく表示されなくなってしまう不具合が発生していましたので、これを修正しました。</p></div></details><details><summary>新しい動画検索ページに対応！</summary><div><p>先日リリースされたニコニコ動画の新検索ページに対応しました。</p><p><b>クラシック・スタイル</b>：検索結果の表示を、旧検索の「2列」表示の様な見た目に戻します。表示形式が「リスト表示」の際に使えます。</p><p><b>サムネイル画像の縮小</b>：サムネイル画像の大きさを小さく出来ます。動画ランキングページの設定と共通です。</p><p><b>コンテンツの中央寄せ</b>：ページのコンテンツの水平配置を、左寄せから中央寄せに変えます。動画ランキングページの設定と共通です。</p><p><b>動画タイトルの省略の無効化</b>：検索結果に表示される動画のタイトルが、3行以上になっても焼烙されずに表示される様になりました。</p></div></details><details><summary>「簡単マイリスト」機能が登場！</summary><div><p>動画視聴ページで、動画をマイリストに追加するのが簡単になりました。</p><p>今迄は、プレーヤー下のメニュー・ボタンを押して、［マイリストに追加］を選んで、マイリストを選んで……と大分面倒臭くなってしまっていました。</p><p>所が、コメント・リストの下に新しく出来た「簡単マイリスト」を使うと、マイリストを即選んで即追加する事が出来ます。</p></div></details></section><section id="niconico-classic_manuals" data-category="manuals"><details><summary>カスタマイズ設定方法</summary><div><p>（Google Chrome、Microsoft Edge、Mozilla Firefoxの場合）</p><p>アドレス・バーの横のメニューにある拡張機能のリストから「ニコニコクラシックスタイル」を選ぶと、ポップアップ・ウィンドウでカスタマイズ設定画面が表示されます。</p><p>カスタマイズ設定をしたら、ページを再読み込みすると、その変更した設定が反映されます。</p></div></details><details><summary>動画の連続再生</summary><div><p>動画を連続再生する際は、拡張機能のカスタマイズ設定から「動画視聴ページ」の「自動再生」を［有効］にして下さい。</p><p>尚、将来的には、拡張機能で自動再生が［無効］が設定されていても、プレーヤーの「次の動画を自動再生」が［ON］であれば、連続再生がされる様に、アップデートを実施する予定です。</p></div></details><details><summary>紹介動画</summary><div><p>本拡張機能について紹介する動画を、<a href="https://www.nicovideo.jp/watch/sm44884727" target="_blank">ニコニコ動画</a>と<a href="https://www.youtube.com/watch?v=bVTzxLIA5nE" target="_blank" rel="noopener">YouTube</a>で公開しています。</p><p>（一部情報が古い可能性が有ります。予め御了承下さい。）</p></div></details><details><summary>要望／不具合報告</summary><div><p>本拡張機能に関する要望や不具合報告といった問い合わせは、<a href="https://docs.google.com/forms/d/e/1FAIpQLSdEOwTC1dRmUNpD1GHRuIfscbpgUxbhYoOCbuj3432NONKg0w/viewform" target="_blank" rel="noopener">専用のフォーム</a>より御願いします。</p><p>尚、サポート対象外（Google Chrome、Microsoft Edge、Mozilla Firefox以外のプラウザ―等）の環境での不具合は、修正を行わない可能性が有ります。予め御了承下さい。</p></div></details></section><section id="niconico-classic_information" data-category="information"><img src="${NICONICO_CLSSIC_COMMON_HEADER_MENU_LOGO_IMAGE_URI}" alt="ニコニコクラシックスタイル（γ）" /><p class="version-name">バージョン1.4.3</p><p><small>&copy; 2024–2025 Bymnet1845 (Minegumo Productions)</small></p><p><small>本拡張機能は、<a href="https://opensource.org/license/mit" target="_blank" rel="noopener">MITライセンス</a>に基づいてライセンスされています。</small></p><p><small>本拡張機能の動画自動再生無効化機能は、<a href="https://opensource.org/license/mit" target="_blank" rel="noopener">MITライセンス</a>に基づき、<a href="https://github.com/dnek/nicovideo-autoplay-canceler" target="_blank" rel="noopener">nicovideo-autoplay-cancelar</a>を基にしています。<br /> Copyright (c) 2024 DNEK</a></small></p><ul><li><a href="https://weblog.haraheri5ro.com/?subject=niconico-classic" target="_blank" rel="noopener">峯雲ウェブログ</a></li><li><a href="https://x.com/MinegumoPro" target="_blank" rel="noopener">Xアカウント（@MinegumoPro）</a></li><li><a href="https://docs.google.com/forms/d/e/1FAIpQLSdEOwTC1dRmUNpD1GHRuIfscbpgUxbhYoOCbuj3432NONKg0w/viewform" target="_blank" rel="noopener">問い合わせフォーム</a></li><li><a href="https://github.com/Bymnet1845/niconico-classic" target="_blank" rel="noopener">GitHubリポジトリー（Chrome、Edge向け）</a></li><li><a href="https://github.com/Bymnet1845/niconico-classic-firefox" target="_blank" rel="noopener">GitHubリポジトリー（Firefox向け）</a></li></ul></section></div><footer><ul><li><a href="https://docs.google.com/forms/d/e/1FAIpQLSdEOwTC1dRmUNpD1GHRuIfscbpgUxbhYoOCbuj3432NONKg0w/viewform" target="_blank" rel="noopener">問い合わせ（要望／不具合報告）</a></li></ul><p><small>&copy; 2024–2025 Bymnet1845 (Minegumo Productions)</p></small></footer></div></div>`
		);
		
		const NICONICO_CLASSIC_COMMON_HEADER_MENU_LAST_TIME_STUMP = niconicoClassicCookies.find(cookie => cookie[0] === "niconico-classic_common-header-menu-time-stump");
		const NICONICO_CLASSIC_COMMON_HEADER_MENU_TIME_STUMP = document.querySelector(`#niconico-classic_common-header-button`).getAttribute("data-niconico-classic-time-stump");

		if (!NICONICO_CLASSIC_COMMON_HEADER_MENU_LAST_TIME_STUMP || NICONICO_CLASSIC_COMMON_HEADER_MENU_LAST_TIME_STUMP[1] !== NICONICO_CLASSIC_COMMON_HEADER_MENU_TIME_STUMP) {
			document.querySelector(`#niconico-classic_common-header-button`).insertAdjacentHTML("afterbegin", `<div id="niconico-classic_common-header-dot"></div>`);
		}

		document.querySelector(`#niconico-classic_common-header-button`).addEventListener("mouseover", () => {
			if (document.querySelector(`#niconico-classic_common-header-dot`)) document.querySelector(`#niconico-classic_common-header-dot`).remove();
			document.cookie = "niconico-classic_common-header-menu-time-stump=" + NICONICO_CLASSIC_COMMON_HEADER_MENU_TIME_STUMP + "; domain=nicovideo.jp; path=/; max-age=31536000";
		});

		document.querySelectorAll("#niconico-classic_common-header-tray .section-list li").forEach((element) => {
			element.addEventListener("click", () => {
				document.querySelector("#niconico-classic_common-header-tray .section-list li.is-current-selection").classList.remove("is-current-selection");
				element.classList.add("is-current-selection");
				document.querySelector("#niconico-classic_common-header-tray section.is-current-selection").classList.remove("is-current-selection");
				document.querySelector("#niconico-classic_common-header-tray section\[data-category=\"" + element.getAttribute("data-category") + "\"\]").classList.add("is-current-selection");
			});
		});
	}
}, 100);
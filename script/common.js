if (window.top === window) console.log("ニコニコクラシックスタイル バージョン1.3.7（γ）\n© 2024–2025 Bymnet1845");

chrome.storage.local.get("iconType", (content) => {
	if (content.iconType !== "circle") document.body.classList.add("niconico-classic_icon-is-square");
});

setInterval(() => {
	if (document.querySelector(`.nico-CommonHeaderRoot .common-header-wb7b82`) && document.querySelector(`#niconico-classic_common-header-link`) === null) {
		document.querySelector(`.nico-CommonHeaderRoot .common-header-wb7b82`).insertAdjacentHTML(
			"afterbegin",
			`<a id="niconico-classic_common-header-link" href="https://weblog.haraheri5ro.com/?subject=niconico-classic" target="_blank" title="ニコニコクラシックスタイル"><svg viewBox="0 0 24 24" role="img" aria-label="ニコニコクラシックスタイル"><path d="m7 2-1.3249 1.3265 3.6735 3.6735h-4.8486c-1.385 0-2.5 1.115-2.5 2.5v10c0 1.385 1.115 2.5 2.5 2.5h15c1.385 0 2.5-1.115 2.5-2.5v-10c0-1.385-1.115-2.5-2.5-2.5h-4.8486l3.6735-3.6735-1.3249-1.3265-5 5zm-1.875 7.8125h6.25v2.8125h-1.875v-0.9375h-2.5v5.625h2.5v-0.9375h1.875v2.8125h-6.25v-7.5zm7.5 0h6.25v2.8125h-1.875v-0.9375h-2.5v1.25l4.375 1.875v4.375h-6.25v-2.8125h1.875v0.9375h2.5v-1.25l-4.375-1.875v-2.5z" /></svg>「簡単マイリスト」機能が登場！</a>`
		);
	}
}, 100);
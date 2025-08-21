if (window.top === window) console.log("ニコニコクラシックスタイル バージョン1.3.7（γ）\n© 2024–2025 Bymnet1845");
const NICONICO_CLASSIC_COOKIES = document.cookie.split(";").map(cookie => cookie.trim().split("="));

chrome.storage.local.get("iconType", (content) => {
	if (content.iconType !== "circle") document.body.classList.add("niconico-classic_icon-is-square");
});

setInterval(() => {
	if (document.querySelector(`.nico-CommonHeaderRoot .common-header-wb7b82`) && document.querySelector(`#niconico-classic_common-header-button`) === null) {
		document.querySelector(`.nico-CommonHeaderRoot .common-header-wb7b82`).insertAdjacentHTML(
			"afterbegin",
			`<div id="niconico-classic_common-header-menu"><span id="niconico-classic_common-header-button" title="ニコニコクラシックスタイル" data-niconico-classic-time-stump="1750566425"><svg viewBox="0 0 24 24" role="img" aria-label="ニコニコクラシックスタイル"><path d="m7 2-1.3249 1.3265 3.6735 3.6735h-4.8486c-1.385 0-2.5 1.115-2.5 2.5v10c0 1.385 1.115 2.5 2.5 2.5h15c1.385 0 2.5-1.115 2.5-2.5v-10c0-1.385-1.115-2.5-2.5-2.5h-4.8486l3.6735-3.6735-1.3249-1.3265-5 5zm-1.875 7.8125h6.25v2.8125h-1.875v-0.9375h-2.5v5.625h2.5v-0.9375h1.875v2.8125h-6.25v-7.5zm7.5 0h6.25v2.8125h-1.875v-0.9375h-2.5v1.25l4.375 1.875v4.375h-6.25v-2.8125h1.875v0.9375h2.5v-1.25l-4.375-1.875v-2.5z" /></svg></span><div id="niconico-classic_common-header-tray"></div></div>`
		);

		const NICONICO_CLASSIC_COMMON_HEADER_MENU_LAST_TIME_STUMP = NICONICO_CLASSIC_COOKIES.find(cookie => cookie[0] === "niconicoClassicCommonHeaderMenuTimeStump");
		const NICONICO_CLASSIC_COMMON_HEADER_MENU_TIME_STUMP = document.querySelector(`#niconico-classic_common-header-button`).getAttribute("data-niconico-classic-time-stump");

		if (!NICONICO_CLASSIC_COMMON_HEADER_MENU_LAST_TIME_STUMP || NICONICO_CLASSIC_COMMON_HEADER_MENU_LAST_TIME_STUMP[1] !== NICONICO_CLASSIC_COMMON_HEADER_MENU_TIME_STUMP) {
			document.querySelector(`#niconico-classic_common-header-button`).insertAdjacentHTML("afterbegin", `<div id="niconico-classic_common-header-dot"></div>`);

			document.querySelector(`#niconico-classic_common-header-button`).addEventListener("mouseover", () => {
				document.querySelector(`#niconico-classic_common-header-dot`).remove();
				document.cookie = "niconicoClassicCommonHeaderMenuTimeStump=" + NICONICO_CLASSIC_COMMON_HEADER_MENU_TIME_STUMP + "; domain=nicovideo.jp";
			});
		}
	}
}, 100);
let niconicoClassicVideoId = document.querySelector("meta\[property=\"og:url\"\]").content.match(/[a-z]{2}\d+/)[0];

chrome.storage.local.get("videoPlayerSize", (content) => {
	if (content.videoPlayerSize !== undefined && content.videoPlayerSize !== "") {
		document.body.classList.add("niconico-classic_player-size-is-fixed", "niconico-classic_player-width-is-" + content.videoPlayerSize);
	}
});

setInterval(() => {
	if (document.querySelector("meta\[property=\"og:url\"\]") !== null) {
		if (niconicoClassicVideoId !== document.querySelector("meta\[property=\"og:url\"\]").content.match(/[a-z]{2}\d+/)[0]) {
			niconicoClassicVideoId = document.querySelector("meta\[property=\"og:url\"\]").content.match(/[a-z]{2}\d+/)[0];
			document.querySelectorAll("#niconico-classic_additional-link-list").forEach((link) => { link.remove(); });
			niconicoClassicAdjustmentVideoMetaInformaiton();
		}
	}

	if (document.querySelector(".grid-area_\\[meta\\] .d_flex:has(> .grid-template-areas_\\[_\\\"icon_title\\\"_\\\"\\._data\\\"_\\])") !== null && document.querySelector(".niconico-classic_additional-link") === null) {
		niconicoClassicAdjustmentVideoMetaInformaiton();
	}
}, 100);

function niconicoClassicAdjustmentVideoMetaInformaiton() {
	document.querySelector(".grid-area_\\[meta\\] .d_flex:has(> .grid-template-areas_\\[_\\\"icon_title\\\"_\\\"\\._data\\\"_\\])").insertAdjacentHTML(
		"beforeend",
		`<div class="niconico-classic_additional-link pedia"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M6.94 7.82a.44.44 0 0 1-.44-.44v-.44a.44.44 0 0 1 .44-.44h10.12a.44.44 0 0 1 .44.44v.44a.44.44 0 0 1-.44.44h-3.74L12 9.14h4.18a.44.44 0 0 1 .44.44v7.48c0 .24-.2.44-.44.44H7.82a.44.44 0 0 1-.44-.44V9.58a.44.44 0 0 1 .44-.44H9.8l1.32-1.32zm2.86 5.72a.2.2 0 0 0-.22.22v2.2a.2.2 0 0 0 .22.22h4.4a.2.2 0 0 0 .22-.22v-2.2a.2.2 0 0 0-.22-.22zm0-3.08c-.12 0-.22.1-.22.22V12c0 .12.1.22.22.22h4.4c.12 0 .22-.1.22-.22v-1.32c0-.12-.1-.22-.22-.22z" clip-rule="evenodd"></path></svg><span>ニコニコ大百科</span><a href="https://dic.nicovideo.jp/v/${niconicoClassicVideoId}">この動画の動画記事</a></div><div class="niconico-classic_additional-link"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 6h-3.89L12.3 3.99A3 3 0 0 0 10.07 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3"></path></svg><a href="https://www.nicovideo.jp/openlist/${niconicoClassicVideoId}">この動画を登録している公開マイリスト</a></div>`
	);
}
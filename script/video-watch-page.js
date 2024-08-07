console.log("ニコニコ動画クラシックスタイル バージョン1.0（仮）\n© 2024 Bymnet1845 <https://www.haraheri5ro.com/>");

let niconicoClassicVideoId = document.querySelector("meta\[property=\"og:url\"\]").content.match(/[a-z]{2}\d+/)[0];

chrome.storage.local.get("videoPlayerSize", (content) => {
	if (content.videoPlayerSize !== undefined && content.videoPlayerSize !== "") {
		document.body.classList.add("niconico-classic_player-size-is-fixed", "niconico-classic_player-width-is-" + content.videoPlayerSize);
	}
});

chrome.storage.local.get("iconType", (content) => {
	if (content.iconType !== undefined && content.iconType !== "") {
		document.body.classList.add("niconico-classic_icon-is-" + content.iconType);
	}
});

setInterval(function () {
	if (document.querySelector("meta\[property=\"og:url\"\]") != undefined) {
		if (niconicoClassicVideoId !== document.querySelector("meta\[property=\"og:url\"\]").content.match(/[a-z]{2}\d+/)[0]) {
			niconicoClassicVideoId = document.querySelector("meta\[property=\"og:url\"\]").content.match(/[a-z]{2}\d+/)[0];

			if (document.querySelector(".grid-area_\\[meta\\] .d_flex:has(> .grid-template-areas_\\[_\\\"icon_title\\\"_\\\"\\._data\\\"_\\])") != undefined) {
				document.querySelectorAll(".niconico-classic_additional-link").forEach((link) => { link.remove(); });
				niconicoClassicAdjustmentVideoMetaInformaiton();
			}
		}
	}

	if (document.querySelector(".grid-area_\\[meta\\] .d_flex:has(> .grid-template-areas_\\[_\\\"icon_title\\\"_\\\"\\._data\\\"_\\])") != undefined && document.querySelector(".niconico-classic_additional-link") == undefined) {
		niconicoClassicAdjustmentVideoMetaInformaiton();
	}
}, 100);

function niconicoClassicAdjustmentVideoMetaInformaiton() {
	document.querySelector(".grid-area_\\[meta\\] .d_flex:has(> .grid-template-areas_\\[_\\\"icon_title\\\"_\\\"\\._data\\\"_\\])").insertAdjacentHTML(
		"beforeend",
		`<div class="niconico-classic_additional-link pedia"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M6.94 7.82a.44.44 0 0 1-.44-.44v-.44a.44.44 0 0 1 .44-.44h10.12a.44.44 0 0 1 .44.44v.44a.44.44 0 0 1-.44.44h-3.74L12 9.14h4.18a.44.44 0 0 1 .44.44v7.48c0 .24-.2.44-.44.44H7.82a.44.44 0 0 1-.44-.44V9.58a.44.44 0 0 1 .44-.44H9.8l1.32-1.32zm2.86 5.72a.2.2 0 0 0-.22.22v2.2a.2.2 0 0 0 .22.22h4.4a.2.2 0 0 0 .22-.22v-2.2a.2.2 0 0 0-.22-.22zm0-3.08c-.12 0-.22.1-.22.22V12c0 .12.1.22.22.22h4.4c.12 0 .22-.1.22-.22v-1.32c0-.12-.1-.22-.22-.22z" clip-rule="evenodd"></path></svg><span>ニコニコ大百科</span><a href="https://dic.nicovideo.jp/v/${niconicoClassicVideoId}">この動画の動画記事</a></div><div class="niconico-classic_additional-link commons"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.368 21.797a2.507 2.507 0 01-.72-4.91v-2.293H12.72v2.293a2.508 2.508 0 11-1.44 0v-2.293H5.352v2.293a2.508 2.508 0 11-1.44 0v-3.013a.72.72 0 01.72-.72h6.648V10.61H6.86a1.926 1.926 0 01-1.92-1.92V4.692a1.926 1.926 0 011.92-1.92H17.14a1.926 1.926 0 011.92 1.92v4a1.926 1.926 0 01-1.92 1.92H12.72v2.543h6.65a.72.72 0 01.72.72v3.012a2.507 2.507 0 01-.72 4.91h-.002z"></path></svg><span>ニコニ・コモンズ</span><a href="https://commons.nicovideo.jp/works/${niconicoClassicVideoId}">この動画のコンテンツツリー（親作品／子作品）</a></div>`
	);
}
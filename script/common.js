console.log("ニコニコ動画クラシックスタイル\nMozilla Firefox向け バージョン1.0.3（仮）\n© 2024 Bymnet1845");

chrome.storage.local.get("iconType", (content) => {
	if (content.iconType !== undefined && content.iconType !== "" && content.iconType !== "circle") {
		document.body.classList.add("niconico-classic_icon-is-" + content.iconType);
	}
});
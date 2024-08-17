console.log("ニコニコ動画クラシックスタイル バージョン1.0.2（仮）\n© 2024 Bymnet1845");

chrome.storage.local.get("iconType", (content) => {
	if (content.iconType !== undefined && content.iconType !== "") {
		document.body.classList.add("niconico-classic_icon-is-" + content.iconType);
	}
});
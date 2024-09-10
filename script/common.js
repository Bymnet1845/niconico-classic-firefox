console.log("ニコニコ動画クラシックスタイル バージョン1.1.1（β）\n© 2024 Bymnet1845");

chrome.storage.local.get("iconType", (content) => {
	if (content.iconType !== "circle") document.body.classList.add("niconico-classic_icon-is-square");
});
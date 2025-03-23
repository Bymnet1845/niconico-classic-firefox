console.log("ニコニコクラシックスタイル バージョン1.2.0（β）\n© 2024–2025 Bymnet1845");

chrome.storage.local.get("iconType", (content) => {
	if (content.iconType !== "circle") document.body.classList.add("niconico-classic_icon-is-square");
});
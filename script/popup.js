chrome.storage.local.get("videoPlayerSize", (content) => {
	if (content.videoPlayerSize !== undefined && content.videoPlayerSize !== "") {
		document.querySelector("select[name=\"video-player-size\"] option[value=\"" + content.videoPlayerSize + "\"]").setAttribute("selected", "");
	}
});

chrome.storage.local.get("videoPlayerOverlayIcon", (content) => {
	if (content.videoPlayerOverlayIcon !== undefined && content.videoPlayerOverlayIcon !== "") {
		document.querySelector("select[name=\"video-player-overlay-icon\"] option[value=\"" + content.videoPlayerOverlayIcon + "\"]").setAttribute("selected", "");
	}
});

chrome.storage.local.get("iconType", (content) => {
	if (content.iconType !== undefined && content.iconType !== "") {
		document.querySelector("select[name=\"icon-type\"] option[value=\"" + content.iconType + "\"]").setAttribute("selected", "");
	}
});

document.querySelector("select[name=\"video-player-size\"]").addEventListener("change", () => {
	chrome.storage.local.set({ videoPlayerSize: document.querySelector("select[name=\"video-player-size\"]").value });
});

document.querySelector("select[name=\"video-player-overlay-icon\"]").addEventListener("change", () => {
	chrome.storage.local.set({ videoPlayerOverlayIcon: document.querySelector("select[name=\"video-player-overlay-icon\"]").value });
});

document.querySelector("select[name=\"icon-type\"]").addEventListener("change", () => {
	chrome.storage.local.set({ iconType: document.querySelector("select[name=\"icon-type\"]").value });
});
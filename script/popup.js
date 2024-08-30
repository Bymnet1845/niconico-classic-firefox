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

chrome.storage.local.get("videoAutoPlayback", (content) => {
	if (content.videoAutoPlayback !== undefined) document.querySelector("select[name=\"video-auto-playback\"] option[value=\"" + content.videoAutoPlayback + "\"]").setAttribute("selected", "");
});

chrome.storage.local.get("iconType", (content) => {
	if (content.iconType !== undefined && content.iconType !== "") {
		document.querySelector("select[name=\"icon-type\"] option[value=\"" + content.iconType + "\"]").setAttribute("selected", "");
	}
});

chrome.storage.local.get("timelineThumbnailSize", (content) => {
	if (content.timelineThumbnailSize !== undefined && content.timelineThumbnailSize !== "") {
		document.querySelector("select[name=\"timeline-thumbnail-size\"] option[value=\"" + content.timelineThumbnailSize + "\"]").setAttribute("selected", "");
	}
});

document.querySelector("select[name=\"video-player-size\"]").addEventListener("change", () => {
	chrome.storage.local.set({ videoPlayerSize: document.querySelector("select[name=\"video-player-size\"]").value });
});

document.querySelector("select[name=\"video-player-overlay-icon\"]").addEventListener("change", () => {
	chrome.storage.local.set({ videoPlayerOverlayIcon: document.querySelector("select[name=\"video-player-overlay-icon\"]").value });
});

document.querySelector("select[name=\"video-auto-playback\"]").addEventListener("change", () => {
	chrome.storage.local.set({ videoAutoPlayback: document.querySelector("select[name=\"video-auto-playback\"]").value });
});

document.querySelector("select[name=\"icon-type\"]").addEventListener("change", () => {
	chrome.storage.local.set({ iconType: document.querySelector("select[name=\"icon-type\"]").value });
});

document.querySelector("select[name=\"timeline-thumbnail-size\"]").addEventListener("change", () => {
	chrome.storage.local.set({ timelineThumbnailSize: document.querySelector("select[name=\"timeline-thumbnail-size\"]").value });
});

/* document.querySelectorAll("#category-list button").forEach((element) => {
	element.addEventListener("click", () => {
		document.querySelector("#category-list button.is-current-selection").classList.remove("is-current-selection");
		element.classList.add("is-current-selection");
		document.querySelector(".panel.is-current-selection").classList.remove("is-current-selection");
		document.querySelector(".panel\[data-category=\"" + element.getAttribute("data-category") + "\"\]").classList.add("is-current-selection");
	});
}); */
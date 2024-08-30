const OPTIONS = [
	[ "iconType", "icon-type" ],
	[ "timelineThumbnailSize", "timeline-thumbnail-size" ],
	[ "videoAutoPlayback", "video-auto-playback"],
	[ "videoPlayerSize", "video-player-size"],
	[ "videoPlayerOverlayIcon", "video-player-overlay-icon"]
];

OPTIONS.forEach((property) => {
	chrome.storage.local.get(property[0], (content) => {
		if (content[property[0]] !== undefined) {
			document.querySelector("select[name=\"" + property[1] + "\"] option[selected]").removeAttribute("selected");
			document.querySelector("select[name=\"" + property[1] + "\"] option[value=\"" + content[property[0]] + "\"]").setAttribute("selected", "");
		}
	});
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
chrome.storage.local.get("timelineThumbnailSize", (content) => {
	if (content.timelineThumbnailSize !== "large") document.body.classList.add("niconico-classic_timeline-thumbnail-size-is-medium");
});
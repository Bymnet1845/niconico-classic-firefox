chrome.storage.local.get("timelineThumbnailSize", (content) => {
	if (content.timelineThumbnailSize !== undefined) {
		document.body.classList.add("niconico-classic_timeline-thumbnail-size-is-" + content.timelineThumbnailSize);
	}
});
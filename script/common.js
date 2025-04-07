console.log("ニコニコクラシックスタイル バージョン1.2.1（β）\n© 2024–2025 Bymnet1845");

chrome.storage.local.get("iconType", (content) => {
	if (content.iconType !== "circle") document.body.classList.add("niconico-classic_icon-is-square");
});

const NICONICO_CLASSIC_COMMON_MUTATION_OBSERVER = new MutationObserver(() => {
	if (document.querySelector(`a[data-anchor-area="web_header"][href="/video_top"]`) !== null && document.querySelector("#niconico-classic_hidariue") === null) {
		const NICONICO_CLASSIC_HIDARIUE_NUMBER = Math.floor(Math.random() * 100).toString().padStart(3, "0");

		document.querySelector(`a[data-anchor-area="web_header"][href="/video_top"]`).insertAdjacentHTML(
			"beforebegin",
			`<a id="niconico-classic_hidariue" href="/hidariue" target="_blank"><img src="https://resource.video.nimg.jp/web/img/base/head/icon/nico/${NICONICO_CLASSIC_HIDARIUE_NUMBER}.gif" alt="" /></a>`
		);
	}
});

NICONICO_CLASSIC_COMMON_MUTATION_OBSERVER.observe(document.body, { childList: true });
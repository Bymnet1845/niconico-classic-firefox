/*
 * The video auto playback canceling feature is based on "niconico-autoplay-canceler", licensed under the MIT license.
 * Copyright (c) 2024 DNEK
 * Source code: https://github.com/dnek/nicovideo-autoplay-canceler
 * Lisence document: https://opensource.org/license/mit
 */

let niconicoClassicCurrentUri, niconicoClassicPreviousUri, niconicoClassicPageType;
let niconicoClassicVideoId, niconicoClassicVideoAutoPlayback = true, niconicoClassicVideoAutoPlaybackIsCanceled = false;

chrome.storage.local.get("videoPlayerSize", (content) => { if (content.videoPlayerSize !== undefined && content.videoPlayerSize !== "" && content.videoPlayerSize !== "variable") document.body.classList.add("niconico-classic_video-player-size-is-fixed", "niconico-classic_video-player-width-is-" + content.videoPlayerSize); });
chrome.storage.local.get("videoPlayerOverlayIcon", (content) => { if (content.videoPlayerOverlayIcon !== "shown") document.body.classList.add("niconico-classic_video-player-overlay-icon-is-hidden"); });
chrome.storage.local.get("videoAutoPlayback", (content) => { if (content.videoAutoPlayback !== "true") niconicoClassicVideoAutoPlayback = false; });
chrome.storage.local.get("videoRankingAlign", (content) => { if (content.videoRankingAlign !== "left") document.body.classList.add("niconico-classic_video-ranking-align-is-center"); });
chrome.storage.local.get("videoRankingThumbnailSize", (content) => { if (content.videoRankingThumbnailSize !== "large") document.body.classList.add("niconico-classic_video-ranking-thumbnail-size-is-medium"); });

setInterval(() => {
	niconicoClassicCurrentUri = window.location.pathname;
	
	if (niconicoClassicPreviousUri !== niconicoClassicCurrentUri) {
		niconicoClassicPreviousUri = niconicoClassicCurrentUri;

		if (niconicoClassicPageType !== niconicoClasicCheckPageType(niconicoClassicCurrentUri)) {
			niconicoClassicPageType = niconicoClasicCheckPageType(niconicoClassicCurrentUri);
			document.body.setAttribute("data-niconico-classic", niconicoClassicPageType);
			niconicoClassicInsertHidariueImage();
		}
	}

	switch (niconicoClassicPageType) {
		case "video-watch":
			if (!niconicoClassicVideoAutoPlayback) niconicoClassicCancelVideoAutoPlayback();
			
			if (document.querySelector(`.grid-area_\\[bottom\\] h1`)) {
				document.body.style.setProperty("--niconico-classic-video-player-offset-height", document.querySelector(`.grid-area_\\[player\\]`).offsetHeight + "px");
				document.body.style.setProperty("--niconico-classic-video-player-offset-top", document.querySelector(`.grid-area_\\[bottom\\] > div.flex-wrap_wrap`).offsetTop + document.querySelector(`.grid-area_\\[bottom\\] > div.flex-wrap_wrap`).offsetHeight + 16 + "px");
				document.body.style.setProperty("--niconico-classic-video-player-offset-left", document.querySelector(`.grid-area_\\[bottom\\] > div.flex-wrap_wrap`).offsetLeft + "px");
				document.body.style.setProperty("--niconico-classic-video-sidebar-origin-offset-top", document.querySelector(`.grid-area_\\[bottom\\]`).offsetTop + document.querySelector(`.grid-area_\\[bottom\\]`).offsetHeight + 16 + "px");

				if (niconicoClassicVideoId !== niconicoClassicCurrentUri.match(/[a-z]{2}\d+/)[0]) {
					niconicoClassicVideoId = niconicoClassicCurrentUri.match(/[a-z]{2}\d+/)[0];
					niconicoClassicVideoAutoPlaybackIsCanceled = false;
					document.querySelectorAll(`.niconico-classic_video-details-additional-link`).forEach((link) => { link.remove(); });
					niconicoClassicInsertHidariueImage();
					niconicoClassicAddScrollEventToVideoOwnerMenuButton();
					niconicoClassicInsertVideoDetailsAdditionalLinks();
				}
			}

			break;
		case "video-ranking_for-you":
		case "video-ranking_genre":
		case "video-ranking_custom":
			break;
	}
}, 10);

const NICONICO_CLASSIC_NICOVIDEO_MUTATION_OBSERVER = new MutationObserver(() => {
	if (document.querySelector(`#niconico-classic_hidariue`) === null) niconicoClassicInsertHidariueImage();
});

function niconicoClasicCheckPageType(uri) {
	if (uri.match(/^\/watch\//)) {
		return "video-watch";
	} else if (uri.match(/^\/ranking/)) {
		if (uri.match(/^\/ranking\/genre/)) {
			return "video-ranking_genre";
		} else if (uri.match(/^\/ranking\/custom/)) {
			return "video-ranking_custom";
		} else {
			return "video-ranking_for-you";
		}
	} else {
		return "default";
	}
}

function niconicoClassicInsertHidariueImage() {
	if (document.querySelector(`a[data-anchor-area="web_header"][href="/video_top"]`)) {
		if (document.querySelector(`#niconico-classic_hidariue`)) {
			document.querySelector(`#niconico-classic_hidariue img`).setAttribute("src", "https://resource.video.nimg.jp/web/img/base/head/icon/nico/" + Math.floor(Math.random() * 100).toString().padStart(3, "0") + ".gif");
		} else {
			document.querySelector(`a[data-anchor-area="web_header"][href="/video_top"]`).insertAdjacentHTML(
				"beforebegin",
				`<a id="niconico-classic_hidariue" href="/hidariue" target="_blank"><img src="https://resource.video.nimg.jp/web/img/base/head/icon/nico/${Math.floor(Math.random() * 100).toString().padStart(3, "0")}.gif" alt="" /></a>`
			);
		}
	}
}

function niconicoClassicCancelVideoAutoPlayback() {
	const NICONICO_CLASSIC_VIDEO_PLAYER_PLAY_BUTTON_ELEMENT = document.querySelector(`.grid-area_\\[player\\] button:has(> svg > path[d="M21.17 10.6a1.6 1.6 0 0 1 0 2.8L6.31 20.85A1.6 1.6 0 0 1 4 19.44V4.56a1.6 1.6 0 0 1 2.31-1.4z"])`);
	const NICONICO_CLASSIC_VIDEO_PLAYER_CONTEXT_TRIGGER_ELEMENT = document.querySelector(`.grid-area_\\[player\\] [data-part="context-trigger"]`);

	if (NICONICO_CLASSIC_VIDEO_PLAYER_PLAY_BUTTON_ELEMENT && !NICONICO_CLASSIC_VIDEO_PLAYER_PLAY_BUTTON_ELEMENT.dataset.niconicoClassicClicked) {
		NICONICO_CLASSIC_VIDEO_PLAYER_PLAY_BUTTON_ELEMENT.addEventListener("click", () => {
			if (niconicoClassicVideoAutoPlaybackIsCanceled) return;
			niconicoClassicVideoAutoPlaybackIsCanceled = true;
		});

		NICONICO_CLASSIC_VIDEO_PLAYER_PLAY_BUTTON_ELEMENT.dataset.niconicoClassicClicked = true;
	}

	if (NICONICO_CLASSIC_VIDEO_PLAYER_CONTEXT_TRIGGER_ELEMENT && !NICONICO_CLASSIC_VIDEO_PLAYER_CONTEXT_TRIGGER_ELEMENT.dataset.niconicoClassicClicked) {
		NICONICO_CLASSIC_VIDEO_PLAYER_CONTEXT_TRIGGER_ELEMENT.addEventListener("click", () => {
			if (niconicoClassicVideoAutoPlaybackIsCanceled) return;
			niconicoClassicVideoAutoPlaybackIsCanceled = true;
		});

		NICONICO_CLASSIC_VIDEO_PLAYER_CONTEXT_TRIGGER_ELEMENT.dataset.niconicoClassicClicked = true;
	}

	if (niconicoClassicPageType !== "video-watch" || niconicoClassicVideoAutoPlaybackIsCanceled) return;
	let niconicoClassicVideoContentElement = document.querySelector(`video[data-name="video-content"]`);
	if (niconicoClassicVideoContentElement === null || niconicoClassicVideoContentElement.paused || niconicoClassicVideoContentElement.ended) return;
	niconicoClassicVideoContentElement.pause();
	if (niconicoClassicVideoContentElement.currentTime < 3) niconicoClassicVideoContentElement.currentTime = 0;
	niconicoClassicVideoAutoPlaybackIsCanceled = true;
}

function niconicoClassicAddScrollEventToVideoOwnerMenuButton() {
	const NICONICO_CLASSIC_VIDEO_OWNER_MENU_BUTTON_ELEMENT = document.querySelector(`.grid-area_\\[bottom\\] .w_\\[var\\(--watch-owner-information-width\\)\\] button[data-watch-floating-panel]`);

	if(NICONICO_CLASSIC_VIDEO_OWNER_MENU_BUTTON_ELEMENT) {
		NICONICO_CLASSIC_VIDEO_OWNER_MENU_BUTTON_ELEMENT.addEventListener("click", () => {
			window.scrollTo({
				top: document.querySelector(`.grid-area_\\[player\\]`).getBoundingClientRect().top + window.pageYOffset - 160,
				behavior: "smooth"
			});
		});

		NICONICO_CLASSIC_VIDEO_OWNER_MENU_BUTTON_ELEMENT.setAttribute("data-event-added", "");
	}
}

function niconicoClassicInsertVideoDetailsAdditionalLinks() {
	document.querySelector(`.grid-area_\\[bottom\\] > section:has(dl) dl + .d_flex:has(> .grid-template-areas_\\[_\\"icon_title\\"_\\"\\._data\\"_\\])`).insertAdjacentHTML(
		"beforeend",
		`<div class="niconico-classic_video-details-additional-link pedia"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M6.94 7.82a.44.44 0 0 1-.44-.44v-.44a.44.44 0 0 1 .44-.44h10.12a.44.44 0 0 1 .44.44v.44a.44.44 0 0 1-.44.44h-3.74L12 9.14h4.18a.44.44 0 0 1 .44.44v7.48c0 .24-.2.44-.44.44H7.82a.44.44 0 0 1-.44-.44V9.58a.44.44 0 0 1 .44-.44H9.8l1.32-1.32zm2.86 5.72a.2.2 0 0 0-.22.22v2.2a.2.2 0 0 0 .22.22h4.4a.2.2 0 0 0 .22-.22v-2.2a.2.2 0 0 0-.22-.22zm0-3.08c-.12 0-.22.1-.22.22V12c0 .12.1.22.22.22h4.4c.12 0 .22-.1.22-.22v-1.32c0-.12-.1-.22-.22-.22z" clip-rule="evenodd"></path></svg><span>ニコニコ大百科</span><a href="https://dic.nicovideo.jp/v/${niconicoClassicVideoId}">この動画の動画記事</a></div><div class="niconico-classic_video-details-additional-link"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 6h-3.89L12.3 3.99A3 3 0 0 0 10.07 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3"></path></svg><a href="https://www.nicovideo.jp/openlist/${niconicoClassicVideoId}">この動画を登録している公開マイリスト</a></div>`
	);
}

NICONICO_CLASSIC_NICOVIDEO_MUTATION_OBSERVER.observe(document.body, { childList: true });
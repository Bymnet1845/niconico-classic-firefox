/*
 * The video auto playback canceling feature is based on "niconico-autoplay-canceler", licensed under the MIT license.
 * Copyright (c) 2024 DNEK
 * Source code: https://github.com/dnek/nicovideo-autoplay-canceler
 * Lisence document: https://opensource.org/license/mit
 */

let niconicoClassicCurrentUri, niconicoClassicPreviousUri, niconicoClassicPageType;
let niconicoClassicVideoRankingDefaultType = "custom";
let niconicoClassicVideoId, niconicoClassicVideoAutoPlayback = true, niconicoClassicVideoAutoPlaybackIsCanceled = false;
let niconicoClassicEasyMylistEnabled = true;

chrome.storage.local.get("videoWatchPageLayout", (content) => { if (content.videoWatchPageLayout !== undefined && content.videoWatchPageLayout !== "") document.body.classList.add("niconico-classic_video-watch-page-layout-is-" + content.videoWatchPageLayout); });
chrome.storage.local.get("videoPlayerSize", (content) => { if (content.videoPlayerSize !== undefined && content.videoPlayerSize !== "" && content.videoPlayerSize !== "variable") document.body.classList.add("niconico-classic_video-player-size-is-fixed", "niconico-classic_video-player-width-is-" + content.videoPlayerSize); });
chrome.storage.local.get("videoPlayerOverlayIcon", (content) => { if (content.videoPlayerOverlayIcon !== "shown") document.body.classList.add("niconico-classic_video-player-overlay-icon-is-hidden"); });
chrome.storage.local.get("videoAutoPlayback", (content) => { if (content.videoAutoPlayback !== "true") niconicoClassicVideoAutoPlayback = false; });
chrome.storage.local.get("videoRankingAlign", (content) => { if (content.videoRankingAlign !== "left") document.body.classList.add("niconico-classic_video-page-align-is-center"); });
chrome.storage.local.get("videoRankingThumbnailSize", (content) => { if (content.videoRankingThumbnailSize !== "large") document.body.classList.add("niconico-classic_video-thumbnail-size-is-medium"); });
chrome.storage.local.get("videoRankingDefaultType", (content) => { if (content.videoRankingDefaultType !== undefined && content.videoRankingDefaultType !== "") niconicoClassicVideoRankingDefaultType = content.videoRankingDefaultType; });
chrome.storage.local.get("easyMylist", (content) => { if (content.easyMylist === "false") niconicoClassicEasyMylistEnabled = false; });

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

	if (niconicoClassicVideoRankingDefaultType !== "default") {
		let niconicoClassicVideoRankingLinkUrl, niconicoClassicVideoRankingDefaultTypeName;

		if (niconicoClassicVideoRankingDefaultType === "for-you") {
			niconicoClassicVideoRankingLinkUrl = "/ranking/for_you";
			niconicoClassicVideoRankingDefaultTypeName = "For you";
		} else {
			niconicoClassicVideoRankingLinkUrl = "/ranking/" + niconicoClassicVideoRankingDefaultType;

			switch (niconicoClassicVideoRankingDefaultType) {
				case "genre": niconicoClassicVideoRankingDefaultTypeName = "総合"; break;
				case "custom": niconicoClassicVideoRankingDefaultTypeName = "カスタム"; break;
			}
		}

		if (document.querySelector(`.simplebar-content a[href^="/ranking"]:not(.niconico-classic_video-simplebar-link)`)) {
			const NICOCNICO_CLASSIC_VIDEO_SIMPLEBAR_RANKING_LINK_ELEMENT = document.querySelector(`.simplebar-content a[href^="/ranking"]`);

			NICOCNICO_CLASSIC_VIDEO_SIMPLEBAR_RANKING_LINK_ELEMENT.insertAdjacentHTML(
				"afterend",
				`<a class="niconico-classic_video-simplebar-link" href="${niconicoClassicVideoRankingLinkUrl}"><svg viewBox="0 0 24 24"><path d="m7 2-1.3249 1.3265 3.6735 3.6735h-4.8486c-1.385 0-2.5 1.115-2.5 2.5v10c0 1.385 1.115 2.5 2.5 2.5h15c1.385 0 2.5-1.115 2.5-2.5v-10c0-1.385-1.115-2.5-2.5-2.5h-4.8486l3.6735-3.6735-1.3249-1.3265-5 5zm-1.875 7.8125h6.25v2.8125h-1.875v-0.9375h-2.5v5.625h2.5v-0.9375h1.875v2.8125h-6.25v-7.5zm7.5 0h6.25v2.8125h-1.875v-0.9375h-2.5v1.25l4.375 1.875v4.375h-6.25v-2.8125h1.875v0.9375h2.5v-1.25l-4.375-1.875v-2.5z" /></svg><span><span>${niconicoClassicVideoRankingDefaultTypeName}</span><span>ランキング</span></span></a>`
			);

			NICOCNICO_CLASSIC_VIDEO_SIMPLEBAR_RANKING_LINK_ELEMENT.remove();
		}

		if (document.querySelector(`.nico-CommonHeaderRoot a[href^="https://www.nicovideo.jp/ranking"]:not(.niconico-classic_common-header-menu-link)`)) {
			const NICOCNICO_CLASSIC_COMMON_HEADER_RANKING_LINK_ELEMENT = document.querySelector(`.nico-CommonHeaderRoot a[href^="https://www.nicovideo.jp/ranking"]`);

			NICOCNICO_CLASSIC_COMMON_HEADER_RANKING_LINK_ELEMENT.insertAdjacentHTML(
				"afterend",
				`<a class="niconico-classic_common-header-menu-link" href="${niconicoClassicVideoRankingLinkUrl}"><span>動画ランキング<br />（${niconicoClassicVideoRankingDefaultTypeName}）</span><svg viewBox="0 0 24 24"><path d="M17.357 12a.498.498 0 01-.146.356l-8.29 8.29a.5.5 0 01-.708 0l-1.41-1.41a.5.5 0 010-.707L13.333 12l-6.53-6.53a.5.5 0 010-.707l1.41-1.41a.5.5 0 01.707 0l8.29 8.29a.499.499 0 01.147.357Z" fill-rule="evenodd" clip-rule="evenodd" /></svg></a>`
			);

			NICOCNICO_CLASSIC_COMMON_HEADER_RANKING_LINK_ELEMENT.remove();
		}
	}

	switch (niconicoClassicPageType) {
		case "video-watch":
			if (!niconicoClassicVideoAutoPlayback) niconicoClassicCancelVideoAutoPlayback();
			
			if (document.querySelector(`.grid-area_\\[bottom\\] h1`)) {
				if (!document.querySelector(`.grid-area_\\[player\\] > .w_\\[100dvw\\].h_\\[100dvh\\]`)) {
					document.body.style.setProperty("--niconico-classic-nicovideo-content-width", document.querySelector(`[aria-label="nicovideo-content"]`).offsetWidth + "px");
					document.body.style.setProperty("--niconico-classic-video-player-offset-height", document.querySelector(`.grid-area_\\[player\\]`).offsetHeight + "px");
					document.body.style.setProperty("--niconico-classic-video-player-offset-top", document.querySelector(`.grid-area_\\[bottom\\] > div.flex-wrap_wrap`).offsetTop + document.querySelector(`.grid-area_\\[bottom\\] > div.flex-wrap_wrap`).offsetHeight + 16 + "px");
					document.body.style.setProperty("--niconico-classic-video-sidebar-initial-offset-top", document.querySelector(`.grid-area_\\[bottom\\]`).offsetTop + document.querySelector(`.grid-area_\\[bottom\\]`).offsetHeight + 16 + "px");
				}

				if (niconicoClassicVideoId !== niconicoClassicCurrentUri.match(/[a-z]{2}\d+/)[0]) {
					niconicoClassicVideoId = niconicoClassicCurrentUri.match(/[a-z]{2}\d+/)[0];
					niconicoClassicVideoAutoPlaybackIsCanceled = false;
					document.querySelectorAll(`.niconico-classic_video-details-additional-link`).forEach((link) => { link.remove(); });
					niconicoClassicInsertHidariueImage();
					niconicoClassicAddScrollEventToVideoOwnerMenuButton();
				}

				if (niconicoClassicEasyMylistEnabled && document.querySelector(`.grid-area_\\[sidebar\\] > .d_flex > .d_flex:has(header.h_var\\(--watch-collapsible-panel-header-height\\))`) && !document.querySelector(`#niconico-classic_easy-mylist`)) niconicoClassicInsertEasyMylist();
				niconicoClassicInsertVideoDetailsAdditionalLinks();
			} else {
				document.body.style.setProperty("--niconico-classic-nicovideo-content-width", "100%");
				document.body.style.setProperty("--niconico-classic-nicovideo-content-margin-top", "24px");
			}

			break;
		case "video-ranking_for-you":
		case "video-ranking_genre":
		case "video-ranking_custom":
			break;
	}
}, 10);

const NICONICO_CLASSIC_VIDEO_COMMON_MUTATION_OBSERVER = new MutationObserver(() => {
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
	} else if (uri.match(/^\/search\//)) {
		return "video-search_video_keyword";
	} else if (uri.match(/^\/tag\//)) {
		return "video-search_video_tag";
	} else if (uri.match(/^\/series_search\//)) {
		return "video-search_series";
	} else if (uri.match(/^\/mylist_search\//)) {
		return "video-search_mylist";
	} else if (uri.match(/^\/user_search\//)) {
		return "video-search_user";
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
	const NICONICO_CLASSIC_VIDEO_PLAYER_VIDEO_CONTENT_ELEMENT = document.querySelector(`video[data-name="video-content"]`);
	if (NICONICO_CLASSIC_VIDEO_PLAYER_VIDEO_CONTENT_ELEMENT === null || NICONICO_CLASSIC_VIDEO_PLAYER_VIDEO_CONTENT_ELEMENT.paused || NICONICO_CLASSIC_VIDEO_PLAYER_VIDEO_CONTENT_ELEMENT.ended) return;
	NICONICO_CLASSIC_VIDEO_PLAYER_VIDEO_CONTENT_ELEMENT.pause();
	if (NICONICO_CLASSIC_VIDEO_PLAYER_VIDEO_CONTENT_ELEMENT.currentTime < 3) NICONICO_CLASSIC_VIDEO_PLAYER_VIDEO_CONTENT_ELEMENT.currentTime = 0;
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
	if (document.querySelector(`section:has(header.h_var\\(--watch-collapsible-panel-header-height\\)) dl`) && !document.querySelector(`.niconico-classic_video-details-additional-link`)) {
		document.querySelector(`section:has(header.h_var\\(--watch-collapsible-panel-header-height\\)) dl + .d_flex:has(> .grid-template-areas_\\[_\\"icon_title\\"_\\"\\._data\\"_\\])`).insertAdjacentHTML(
			"beforeend",
			`<div class="niconico-classic_video-details-additional-link pedia"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M6.94 7.82a.44.44 0 0 1-.44-.44v-.44a.44.44 0 0 1 .44-.44h10.12a.44.44 0 0 1 .44.44v.44a.44.44 0 0 1-.44.44h-3.74L12 9.14h4.18a.44.44 0 0 1 .44.44v7.48c0 .24-.2.44-.44.44H7.82a.44.44 0 0 1-.44-.44V9.58a.44.44 0 0 1 .44-.44H9.8l1.32-1.32zm2.86 5.72a.2.2 0 0 0-.22.22v2.2a.2.2 0 0 0 .22.22h4.4a.2.2 0 0 0 .22-.22v-2.2a.2.2 0 0 0-.22-.22zm0-3.08c-.12 0-.22.1-.22.22V12c0 .12.1.22.22.22h4.4c.12 0 .22-.1.22-.22v-1.32c0-.12-.1-.22-.22-.22z" clip-rule="evenodd"></path></svg><span>ニコニコ大百科</span><a href="https://dic.nicovideo.jp/v/${niconicoClassicVideoId}">この動画の動画記事</a></div><div class="niconico-classic_video-details-additional-link"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 6h-3.89L12.3 3.99A3 3 0 0 0 10.07 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3"></path></svg><a href="https://www.nicovideo.jp/openlist/${niconicoClassicVideoId}">この動画を登録している公開マイリスト</a></div>`
		);
	}
}

async function niconicoClassicInsertEasyMylist() {
	document.querySelector(`.grid-area_\\[sidebar\\] > .d_flex > .d_flex:has(header.h_var\\(--watch-collapsible-panel-header-height\\))`).insertAdjacentHTML(
		"afterend",
		`<section id="niconico-classic_easy-mylist"><h2><svg viewBox="0 0 24 24"><path d="m7 2-1.3249 1.3265 3.6735 3.6735h-4.8486c-1.385 0-2.5 1.115-2.5 2.5v10c0 1.385 1.115 2.5 2.5 2.5h15c1.385 0 2.5-1.115 2.5-2.5v-10c0-1.385-1.115-2.5-2.5-2.5h-4.8486l3.6735-3.6735-1.3249-1.3265-5 5zm-1.875 7.8125h6.25v2.8125h-1.875v-0.9375h-2.5v5.625h2.5v-0.9375h1.875v2.8125h-6.25v-7.5zm7.5 0h6.25v2.8125h-1.875v-0.9375h-2.5v1.25l4.375 1.875v4.375h-6.25v-2.8125h1.875v0.9375h2.5v-1.25l-4.375-1.875v-2.5z"></path></svg>ニコニコクラシックスタイル 簡単マイリスト</h2></section>`
	);
	
	const NICONICO_CLASSIC_EASY_MYLIST_ELEMENT = document.querySelector(`#niconico-classic_easy-mylist`);
	
	await fetch(`https://nvapi.nicovideo.jp/v1/users/me/mylists`, {
		headers: {"X-Frontend-Id": 6, "X-Frontend-Version": 0}, credentials: "include"
	}).then(
		response => response.json()
	).then((result) => {
		switch (result.meta.status) {
			case 200:
				NICONICO_CLASSIC_EASY_MYLIST_ELEMENT.insertAdjacentHTML(
					"beforeend",
					`<div id="niconico-classic_easy-mylist-form"></div><div id="niconico-classic_easy-mylist-menu"><button id="niconico-classic_easy-deflist-button" type="button">あとで見るに追加</button><button id="niconico-classic_easy-mylist-option-button" class="niconico-classic_easy-mylist-tray-action" type="button">追加オプション</button></div><section id="niconico-classic_easy-mylist-option-form"><h3>簡単マイリストの追加オプション</h3><div><label for="niconico-classic_easy-mylist-description">メモ（マイリストコメント）</label><textarea name="niconico-classic_easy-mylist-description"></textarea></div></section>`
				);

				const NICONICO_CLASSIC_EASY_MYLIST_FORM_ELEMENT = document.querySelector(`#niconico-classic_easy-mylist-form`);
				const NICONICO_CLASSIC_EASY_MYLIST_OPTION_BUTTON_ELEMENT = document.querySelector(`#niconico-classic_easy-mylist-option-button`);
				const NICONICO_CLASSIC_EASY_MYLIST_OPTION_FORM_ELEMENT = document.querySelector(`#niconico-classic_easy-mylist-option-form`);
				const NICONICO_CLASSIC_EASY_MYLIST_DESCRIPTION_TEXTAREA_ELEMENT = document.querySelector(`textarea[name="niconico-classic_easy-mylist-description"]`);

				if (result.data.mylists.length === 0) {
					NICONICO_CLASSIC_EASY_MYLIST_FORM_ELEMENT.insertAdjacentHTML("afterbegin", `<p>マイリストが在りません。</p>`);
				} else {
					NICONICO_CLASSIC_EASY_MYLIST_FORM_ELEMENT.insertAdjacentHTML("afterbegin", `<select class="niconico-classic_easy-mylist-tray-action"></select><button>追加</button>`);
					const NICONICO_CLASSIC_EASY_MYLIST_SELECT_ELEMENT = document.querySelector(`#niconico-classic_easy-mylist-form select`);

					result.data.mylists.forEach((mylist) => {
						NICONICO_CLASSIC_EASY_MYLIST_SELECT_ELEMENT.insertAdjacentHTML(
							"beforeend",
							`<option value="${mylist.id}">${mylist.isPublic ? "📁" : "🔒️"} ${mylist.name}</option>`
						);
					});

					document.querySelector(`#niconico-classic_easy-mylist-form button`).addEventListener("click", async () => {
						let niconicoClassicEasyMylistId = document.querySelector(`#niconico-classic_easy-mylist-form select`).value;
						let niconicoClassicEasyMylistApiUrl = `https://nvapi.nicovideo.jp/v1/users/me/mylists/${niconicoClassicEasyMylistId}/items?itemId=${niconicoClassicVideoId}`;
						if (NICONICO_CLASSIC_EASY_MYLIST_DESCRIPTION_TEXTAREA_ELEMENT.value.length > 0) niconicoClassicEasyMylistApiUrl += "&description=" + encodeURIComponent(NICONICO_CLASSIC_EASY_MYLIST_DESCRIPTION_TEXTAREA_ELEMENT.value);
						
						await fetch(niconicoClassicEasyMylistApiUrl, {
							method: "POST",
							headers: {"Content-Type": "application/x-www-form-urlencoded", "X-Frontend-Id": 6, "X-Frontend-Version": 0, "X-Request-With": "https://www.nicovideo.jp"},
							credentials: "include"
						}).then((response) => {
							switch (response.status) {
								case 201: niconicoClassicDisplayEasyMylistAlert("マイリストに追加しました。"); break;
								case 200: niconicoClassicDisplayEasyMylistAlert("このマイリストには既に登録されています。"); break;
								case 409: niconicoClassicDisplayEasyMylistAlert("このマイリストがいっぱいで追加出来ません。"); break;
								default: niconicoClassicDisplayEasyMylistAlert("マイリストに追加出来ませんでした。");
							}
						});
					});
				}

				document.querySelector(`#niconico-classic_easy-deflist-button`).addEventListener("click", async () => {
					let niconicoClassicEasyDeflistApiUrl = `https://nvapi.nicovideo.jp/v1/users/me/watch-later?watchId=${niconicoClassicVideoId}`;
					if (NICONICO_CLASSIC_EASY_MYLIST_DESCRIPTION_TEXTAREA_ELEMENT.value.length > 0) niconicoClassicEasyDeflistApiUrl += "&memo=" + encodeURIComponent(NICONICO_CLASSIC_EASY_MYLIST_DESCRIPTION_TEXTAREA_ELEMENT.value);
					
					await fetch(niconicoClassicEasyDeflistApiUrl, {
						method: "POST",
						headers: {"Content-Type": "application/x-www-form-urlencoded", "X-Frontend-Id": 6, "X-Frontend-Version": 0, "X-Request-With": "https://www.nicovideo.jp"},
						credentials: "include"
					}).then((response) => {
						switch (response.status) {
							case 201: niconicoClassicDisplayEasyMylistAlert("あとで見るに追加しました。"); break;
							case 409: niconicoClassicDisplayEasyMylistAlert("あとで見るには既に登録されています。"); break;
							default: niconicoClassicDisplayEasyMylistAlert("あとで見るに追加出来ませんでした。");
						}
					});
				});

				NICONICO_CLASSIC_EASY_MYLIST_OPTION_BUTTON_ELEMENT.addEventListener("click", async () => {
					NICONICO_CLASSIC_EASY_MYLIST_OPTION_FORM_ELEMENT.classList.toggle("is-open");
					NICONICO_CLASSIC_EASY_MYLIST_DESCRIPTION_TEXTAREA_ELEMENT.value = "";

					if (NICONICO_CLASSIC_EASY_MYLIST_OPTION_FORM_ELEMENT.classList.contains("is-open") && window.innerHeight < NICONICO_CLASSIC_EASY_MYLIST_OPTION_FORM_ELEMENT.getBoundingClientRect().bottom) {
						NICONICO_CLASSIC_EASY_MYLIST_OPTION_FORM_ELEMENT.style.top = "auto";
						NICONICO_CLASSIC_EASY_MYLIST_OPTION_FORM_ELEMENT.style.bottom = "128px";
					} else {
						NICONICO_CLASSIC_EASY_MYLIST_OPTION_FORM_ELEMENT.style.top = "96px";
						NICONICO_CLASSIC_EASY_MYLIST_OPTION_FORM_ELEMENT.style.bottom = "auto";
					}
				});

				break;
			
			case 401: NICONICO_CLASSIC_EASY_MYLIST_ELEMENT.insertAdjacentHTML("afterbegin", `<p>ログインするとマイリストが使えます。</p>`); break;
			default: NICONICO_CLASSIC_EASY_MYLIST_ELEMENT.insertAdjacentHTML("afterbegin", `<p>マイリストを取得出来ませんでした。</p>`);
		}
	}).catch((error) => {
		NICONICO_CLASSIC_EASY_MYLIST_ELEMENT.insertAdjacentHTML("afterbegin", `<p>マイリストを取得出来ませんでした。</p>`);
	});
}

function niconicoClassicDisplayEasyMylistAlert(message) {
	if(document.querySelector(`#niconico-classic_easy-mylist-alert`)) document.querySelector(`#niconico-classic_easy-mylist-alert`).remove();
	document.querySelector(`#niconico-classic_easy-mylist`).insertAdjacentHTML("beforeend", `<span id="niconico-classic_easy-mylist-alert">${message}</span>`);
	const NICONICO_CLASSIC_EASY_MYLIST_ALERT_ELEMENT = document.querySelector(`#niconico-classic_easy-mylist-alert`);
	NICONICO_CLASSIC_EASY_MYLIST_ALERT_ELEMENT.animate([{ opacity: 0, easing: "linear" }, { opacity: 1 }], 250);
	
	setTimeout(() => {
		NICONICO_CLASSIC_EASY_MYLIST_ALERT_ELEMENT.animate([{ opacity: 1, easing: "linear" }, { opacity: 0 }, { opacity: 0 }], 500);
		setTimeout(() => { NICONICO_CLASSIC_EASY_MYLIST_ALERT_ELEMENT.remove(); }, 250);
	}, 4000);
}

NICONICO_CLASSIC_VIDEO_COMMON_MUTATION_OBSERVER.observe(document.body, { childList: true });
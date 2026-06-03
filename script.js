// ================= কনফিগারেশন =================
const CLOUDFLARE_WORKER_URL = "https://iptv.ryvoxtb.workers.dev";
const SECRET_KEY = "my_super_secret_tv_key_2026";

// ================= সিকিউরিটি: কোড দেখা বন্ধ =================
(function() {
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showSecurityWarning();
        return false;
    });

    document.addEventListener('keydown', function(e) {
        if (
            e.keyCode === 123 ||
            (e.ctrlKey && e.keyCode === 85) ||
            (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
            (e.ctrlKey && e.shiftKey && e.keyCode === 74) ||
            (e.ctrlKey && e.shiftKey && e.keyCode === 67) ||
            (e.ctrlKey && e.keyCode === 83)
        ) {
            e.preventDefault();
            showSecurityWarning();
            return false;
        }
    });

    let devtoolsOpen = false;
    const threshold = 160;
    setInterval(function() {
        const widthDiff  = window.outerWidth  - window.innerWidth  > threshold;
        const heightDiff = window.outerHeight - window.innerHeight > threshold;
        if (!devtoolsOpen && (widthDiff || heightDiff)) {
            devtoolsOpen = true;
            showSecurityWarning();
        } else if (!widthDiff && !heightDiff) {
            devtoolsOpen = false;
        }
    }, 1000);

    function showSecurityWarning() {
        const existing = document.getElementById('security-warning-overlay');
        if (existing) return;
        const overlay = document.createElement('div');
        overlay.id = 'security-warning-overlay';
        overlay.style.cssText = `
            position:fixed;inset:0;z-index:9999999;
            background:rgba(0,0,0,0.97);
            display:flex;align-items:center;justify-content:center;
            font-family:'Rajdhani',sans-serif;
        `;
        overlay.innerHTML = `
            <div style="
                background:linear-gradient(135deg,#0f1018,#1a0a0a);
                border:1.5px solid rgba(255,0,0,0.6);
                border-radius:16px;padding:40px 36px;
                max-width:380px;text-align:center;
                box-shadow:0 0 60px rgba(255,0,0,0.2);
            ">
                <div style="font-size:48px;margin-bottom:12px;">🔒</div>
                <div style="color:#ff4444;font-size:22px;font-weight:700;
                    letter-spacing:2px;margin-bottom:10px;">ACCESS DENIED</div>
                <div style="color:rgba(255,255,255,0.7);font-size:14px;
                    font-family:'Noto Sans Bengali',sans-serif;line-height:1.7;">
                    এই পেজের সোর্স কোড দেখা নিষিদ্ধ।<br>
                    RYVOX TV সংরক্ষিত সম্পত্তি।
                </div>
                <button onclick="document.getElementById('security-warning-overlay').remove()"
                    style="margin-top:24px;background:linear-gradient(135deg,#ff0000,#cc0000);
                    color:white;border:none;border-radius:8px;padding:10px 28px;
                    font-size:14px;font-weight:700;cursor:pointer;letter-spacing:1px;">
                    বন্ধ করুন
                </button>
            </div>
        `;
        document.body.appendChild(overlay);
    }
})();

// ================= চ্যানেল লিস্ট =================
const channels = [
    { id: 'zee-bangla', name: 'Zee Bangla', logo: 'https://i.ibb.co/zee-bangla-logo.png' },
    { id: 'star-jalsa-hd', name: 'Star Jalsa HD', logo: 'https://i.ibb.co/star-jalsa-hd-logo.png' },
    { id: 'jalsha-movies-hd', name: 'Jalsha Movies HD', logo: 'https://i.ibb.co/jalsha-movies-hd-logo.png' },
    { id: 'btv-chattogram', name: 'BTV Chattogram', logo: 'https://i.ibb.co/btv-chattogram-logo.png' },
    { id: 'movie-bangla', name: 'Movie Bangla', logo: 'https://i.ibb.co/movie-bangla-logo.png' },
    { id: 'banglavision', name: 'Banglavision', logo: 'https://i.ibb.co/banglavision-logo.png' },
    { id: 'rtv', name: 'RTV', logo: 'https://i.ibb.co/rtv-logo.png' },
    { id: 'somoy-tv', name: 'Somoy TV', logo: 'https://i.ibb.co/somoy-tv-logo.png' },
    { id: 'jamuna', name: 'Jamuna TV', logo: 'https://i.ibb.co/jamuna-logo.png' },
    { id: 'atn-bangla', name: 'ATN Bangla', logo: 'https://i.ibb.co/atn-bangla-logo.png' },
    { id: 'ntv', name: 'NTV', logo: 'https://i.ibb.co/ntv-logo.png' },
    { id: 'al-jazeera', name: 'Al Jazeera', logo: 'https://i.ibb.co/al-jazeera-logo.png' },
    { id: 'ananda-tv', name: 'Ananda TV', logo: 'https://i.ibb.co/ananda-tv-logo.png' },
    { id: 'asian-tv', name: 'Asian TV', logo: 'https://i.ibb.co/asian-tv-logo.png' },
    { id: 'atn-bangla-uk', name: 'ATN Bangla UK', logo: 'https://i.ibb.co/atn-bangla-uk-logo.png' },
    { id: 'atn-news', name: 'ATN News', logo: 'https://i.ibb.co/atn-news-logo.png' },
    { id: 'ayna-tv', name: 'Ayna TV', logo: 'https://i.ibb.co/ayna-tv-logo.png' },
    { id: 'azan-tv-canada', name: 'Azan TV Canada', logo: 'https://i.ibb.co/azan-tv-canada-logo.png' },
    { id: 'boishakhi-tv', name: 'Boishakhi TV', logo: 'https://i.ibb.co/boishakhi-tv-logo.png' },
    { id: 'channel-1', name: 'Channel 1', logo: 'https://i.ibb.co/channel-1-logo.png' },
    { id: 'channel-24', name: 'Channel 24', logo: 'https://i.ibb.co/channel-24-logo.png' },
    { id: 'channel-9', name: 'Channel 9', logo: 'https://i.ibb.co/channel-9-logo.png' },
    { id: 'channel-s-bd', name: 'Channel S BD', logo: 'https://i.ibb.co/channel-s-bd-logo.png' },
    { id: 'channel-s-uk', name: 'Channel S UK', logo: 'https://i.ibb.co/channel-s-uk-logo.png' },
    { id: 'channeli', name: 'Channel i', logo: 'https://i.ibb.co/channeli-logo.png' },
    { id: 'dbc-news', name: 'DBC News', logo: 'https://i.ibb.co/dbc-news-logo.png' },
    { id: 'deen-tv-uk', name: 'Deen TV UK', logo: 'https://i.ibb.co/deen-tv-uk-logo.png' },
    { id: 'desh-tv', name: 'Desh TV', logo: 'https://i.ibb.co/desh-tv-logo.png' },
    { id: 'deshebideshe-tv-canada', name: 'Deshebideshe TV Canada', logo: 'https://i.ibb.co/deshebideshe-tv-canada-logo.png' },
    { id: 'deshi-tv', name: 'Deshi TV', logo: 'https://i.ibb.co/deshi-tv-logo.png' },
    { id: 'dw-news', name: 'DW News', logo: 'https://i.ibb.co/dw-news-logo.png' },
    { id: 'ekattor-tv', name: 'Ekattor TV', logo: 'https://i.ibb.co/ekattor-tv-logo.png' },
    { id: 'ekhon-tv', name: 'Ekhon TV', logo: 'https://i.ibb.co/ekhon-tv-logo.png' },
    { id: 'ekushey-tv', name: 'Ekushey TV', logo: 'https://i.ibb.co/ekushey-tv-logo.png' },
    { id: 'enter-tv', name: 'Enter TV', logo: 'https://i.ibb.co/enter-tv-logo.png' },
    { id: 'ep-tv', name: 'EP TV', logo: 'https://i.ibb.co/ep-tv-logo.png' },
    { id: 'galaxy-tv', name: 'Galaxy TV', logo: 'https://i.ibb.co/galaxy-tv-logo.png' },
    { id: 'gazi-television-gtv', name: 'Gazi Television (GTV)', logo: 'https://i.ibb.co/gazi-television-gtv-logo.png' },
    { id: 'global-tv-bangladesh', name: 'Global TV Bangladesh', logo: 'https://i.ibb.co/global-tv-bangladesh-logo.png' },
    { id: 'green-tv', name: 'Green TV', logo: 'https://i.ibb.co/green-tv-logo.png' },
    { id: 'iqra-bangla-tv-uk', name: 'Iqra Bangla TV UK', logo: 'https://i.ibb.co/iqra-bangla-tv-uk-logo.png' },
    { id: 'islam-ch-bangla', name: 'Islam Ch Bangla', logo: 'https://i.ibb.co/islam-ch-bangla-logo.png' },
    { id: 'jago-news-24', name: 'Jago News 24', logo: 'https://i.ibb.co/jago-news-24-logo.png' },
    { id: 'madani-ch-bangla', name: 'Madani Ch Bangla', logo: 'https://i.ibb.co/madani-ch-bangla-logo.png' },
    { id: 'makkah-live', name: 'Makkah Live', logo: 'https://i.ibb.co/makkah-live-logo.png' },
    { id: 'makkah-tv', name: 'Makkah TV', logo: 'https://i.ibb.co/makkah-tv-logo.png' },
    { id: 'medina-live', name: 'Medina Live', logo: 'https://i.ibb.co/medina-live-logo.png' },
    { id: 'mohona-tv', name: 'Mohona TV', logo: 'https://i.ibb.co/mohona-tv-logo.png' },
    { id: 'movie-bangla-2', name: 'Movie Bangla 2', logo: 'https://i.ibb.co/movie-bangla-2-logo.png' },
    { id: 'my-tv', name: 'My TV', logo: 'https://i.ibb.co/my-tv-logo.png' },
    { id: 'news24-tv', name: 'News24 TV', logo: 'https://i.ibb.co/news24-tv-logo.png' },
    { id: 'nexus-tv', name: 'Nexus TV', logo: 'https://i.ibb.co/nexus-tv-logo.png' },
    { id: 'peace-tv-bangla', name: 'Peace TV Bangla', logo: 'https://i.ibb.co/peace-tv-bangla-logo.png' },
    { id: 'sa-tv', name: 'SA TV', logo: 'https://i.ibb.co/sa-tv-logo.png' }
];

// ================= স্টেট =================
let player;
let hlsInstance      = null;
let currentChannelId = "";
let currentLinkIndex = 0;

let inactivityTimeout;
const HIDE_DELAY      = 5000;
let isHoveringSidebar = false;
let isMobile          = false;
let mobileSidebarOpen = false;

// অ্যাড-ফ্রি মোড
let adShownForCurrentChannel = true;

// ================= ডিভাইস ডিটেকশন =================
function isSmartTV() {
    const ua = navigator.userAgent.toLowerCase();
    return [
        "smarttv","smart-tv","googletv","appletv","hbbtv",
        "netcast","viera","webos","tizen","philipstv",
        "sony-tv","androidtv","mibox","firetv","firestick"
    ].some(k => ua.includes(k));
}

function isMobileDevice() {
    return !isSmartTV() && (
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        window.innerWidth <= 768 ||
        // landscape মোডেও মোবাইল হিসেবে ধরব
        (window.innerHeight <= 500 && 'ontouchstart' in window)
    );
}

// ================= ফুলস্ক্রিন =================
function requestFullscreen(element) {
    if (element.requestFullscreen) return element.requestFullscreen();
    else if (element.webkitRequestFullscreen) return element.webkitRequestFullscreen();
    else if (element.mozRequestFullScreen) return element.mozRequestFullScreen();
    else if (element.msRequestFullscreen) return element.msRequestFullscreen();
    return Promise.resolve();
}

// ================= অরিয়েন্টেশন লক =================
function handleOrientation() {
    // orientation lock - screen rotation আটকাই না, তার পরিবর্তে UI সব orientation এ কাজ করে
    // কারণ lock ব্লক করলেই চ্যানেল লিস্ট নিচে চলে যাওয়ার সমস্যা হত
}

// ================= মোবাইল লঞ্চ স্ক্রিন =================
function showMobileLaunchScreen() {
    const ls = document.getElementById('mobile-launch-screen');
    if (ls) ls.style.display = 'flex';
}

function hideMobileLaunchScreen() {
    const ls = document.getElementById('mobile-launch-screen');
    if (ls) {
        ls.classList.add('fade-out');
        setTimeout(() => { ls.style.display = 'none'; }, 500);
    }
}

function startMobileApp() {
    hideMobileLaunchScreen();
    const appContainer = document.querySelector('.app-container');
    requestFullscreen(appContainer || document.documentElement).catch(() => {});
    handleOrientation();
    initializeApp();
    // সামান্য বিলম্বের পর ট্যাপ হিন্ট দেখাও
    setTimeout(showTapHint, 1500);
}

// ================= ট্যাপ হিন্ট =================
function showTapHint() {
    let hint = document.getElementById('tap-hint');
    if (!hint) {
        hint = document.createElement('div');
        hint.id = 'tap-hint';
        hint.className = 'mobile-tap-hint';
        hint.textContent = 'স্ক্রিনে ট্যাপ করুন • চ্যানেল লিস্ট দেখুন';
        document.body.appendChild(hint);
    }
    hint.style.display = 'block';
    hint.style.animation = 'none';
    void hint.offsetWidth; // reflow
    hint.style.animation = 'hintFade 3.5s ease forwards';
    setTimeout(() => { hint.style.display = 'none'; }, 3500);
}

// ================= মোবাইল সাইডবার =================
function toggleMobileSidebar() {
    if (mobileSidebarOpen) {
        closeMobileSidebar();
    } else {
        openMobileSidebar();
    }
}

function openMobileSidebar() {
    const sidebar   = document.getElementById('sidebar-panel');
    const backdrop  = document.getElementById('mobile-sidebar-backdrop');
    if (!sidebar) return;

    mobileSidebarOpen = true;
    sidebar.classList.add('mobile-visible');
    sidebar.classList.remove('hidden');

    if (backdrop) {
        backdrop.style.display = 'block';
        // reflow দিয়ে transition চালু করো
        void backdrop.offsetWidth;
        backdrop.classList.add('visible');
    }
}

function closeMobileSidebar() {
    const sidebar  = document.getElementById('sidebar-panel');
    const backdrop = document.getElementById('mobile-sidebar-backdrop');
    if (!sidebar || !mobileSidebarOpen) return;

    mobileSidebarOpen = false;
    sidebar.classList.remove('mobile-visible');

    if (backdrop) {
        backdrop.classList.remove('visible');
        setTimeout(() => {
            if (!mobileSidebarOpen) backdrop.style.display = 'none';
        }, 300);
    }
}

// ================= বাফারিং =================
function showBuffering(visible) {
    const loader = document.getElementById('buffering-loader');
    if (!loader) return;
    loader.style.display = visible ? 'flex' : 'none';
}

// ================= প্রি-লোডার =================
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    preloader.classList.add('fade-out');
    setTimeout(() => { preloader.style.display = 'none'; }, 650);
}

// ================= আনমিউট =================
function forceUnmute() {
    const v = document.getElementById('tv-player');
    if (v) v.muted = false;
    if (player) { player.muted = false; player.volume = 1.0; }
}

// ================= ডেস্কটপ সাইডবার =================
function showSidebar() {
    if (isMobile) return;
    const sidebar = document.getElementById('sidebar-panel');
    if (sidebar) sidebar.classList.remove('hidden');
}

function hideSidebar() {
    if (isMobile) return;
    const v = document.getElementById('tv-player');
    if (isHoveringSidebar || (v && v.paused)) return;
    const sidebar = document.getElementById('sidebar-panel');
    if (sidebar) sidebar.classList.add('hidden');
}

function resetInactivityTimer() {
    if (isMobile) return;
    showSidebar();
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(hideSidebar, HIDE_DELAY);
}

function setupInactivityTimer() {
    if (isMobile) return;
    const sidebar = document.getElementById('sidebar-panel');
    if (!sidebar) return;
    sidebar.addEventListener('mouseenter', () => {
        isHoveringSidebar = true;
        clearTimeout(inactivityTimeout);
        showSidebar();
    });
    sidebar.addEventListener('mouseleave', () => {
        isHoveringSidebar = false;
        resetInactivityTimer();
    });
    ['mousemove','mousedown','keypress','touchstart','touchmove'].forEach(e => {
        window.addEventListener(e, resetInactivityTimer, { passive: true });
    });
    resetInactivityTimer();
}

// ================= কীবোর্ড নেভিগেশন =================
function setupKeyboardNavigation() {
    window.addEventListener('keydown', function(event) {
        if (!['ArrowUp','ArrowDown'].includes(event.key)) return;
        event.preventDefault();
        let idx = channels.findIndex(c => c.id === currentChannelId);
        if (idx === -1) idx = 0;
        idx = event.key === 'ArrowUp'
            ? (idx - 1 + channels.length) % channels.length
            : (idx + 1) % channels.length;
        const target = document.getElementById(`chan-${channels[idx].id}`);
        if (target) changeChannel(channels[idx].id, target);
    });
}

// ================= চ্যানেল সার্চ =================
function filterChannels(query) {
    const q = query.toLowerCase().trim();
    document.querySelectorAll('.channel-item').forEach(item => {
        const name = item.querySelector('.channel-name')?.textContent.toLowerCase() || '';
        item.style.display = (!q || name.includes(q)) ? '' : 'none';
    });
}

// ================= এরর =================
function showError(visible) {
    const el = document.getElementById('error-overlay');
    if (!el) return;
    el.style.display = visible ? 'flex' : 'none';
}

// ================= অ্যাড-ফ্রি (নিষ্ক্রিয়) =================
function showInterstitialAd() {}
function skipAd() {}
function scheduleNextAd() {}
function startAdProgressBar() {}

// ================= সিকিউর লিংক =================
function generateSecureLink(channelId, index) {
    const t    = Math.floor(Date.now() / 1000).toString();
    const hash = CryptoJS.MD5(channelId + t + SECRET_KEY).toString().toLowerCase();
    return `${CLOUDFLARE_WORKER_URL}/live/${channelId}.m3u8?time=${t}&token=${hash}&link_index=${index}`;
}

// ================= চ্যানেল লোড (অপ্টিমাইজড) =================
function loadChannel(channelId, index) {
    currentChannelId = channelId;
    currentLinkIndex = index;

    adShownForCurrentChannel = true;
    showError(false);
    showBuffering(true);

    const url          = generateSecureLink(channelId, index);
    const videoElement = document.getElementById('tv-player');

    // পুরনো HLS নষ্ট করো
    if (hlsInstance) {
        hlsInstance.destroy();
        hlsInstance = null;
    }

    if (Hls.isSupported()) {
        hlsInstance = new Hls({
            // দ্রুত শুরু
            startLevel:               -1,
            abrEwmaDefaultEstimate:   1000000,
            abrEwmaFastLive:          3.0,
            abrEwmaSlowLive:          9.0,
            // লাইভ বাফার - ছোট রাখো
            maxBufferLength:          8,
            maxMaxBufferLength:       20,
            maxBufferSize:            6 * 1024 * 1024,
            maxBufferHole:            0.3,
            backBufferLength:         2,
            // লাইভ লেটেন্সি
            liveSyncDuration:         2,
            liveMaxLatencyDuration:   8,
            liveDurationInfinity:     true,
            lowLatencyMode:           true,
            // পারফরম্যান্স
            enableWorker:             true,
            // দ্রুত failover
            manifestLoadingTimeOut:   6000,
            manifestLoadingMaxRetry:  2,
            manifestLoadingRetryDelay: 300,
            levelLoadingTimeOut:      6000,
            levelLoadingMaxRetry:     2,
            levelLoadingRetryDelay:   300,
            fragLoadingTimeOut:       12000,
            fragLoadingMaxRetry:      3,
            fragLoadingRetryDelay:    300,
            abrMaxWithRealBitrate:    true,
            testBandwidth:            true,
            progressive:              false,
            xhrSetup: function(xhr) { xhr.timeout = 10000; },
        });

        hlsInstance.loadSource(url);
        hlsInstance.attachMedia(videoElement);

        hlsInstance.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
            if (data.levels.length > 1) hlsInstance.currentLevel = -1;
            videoElement.play().catch(() => {
                videoElement.muted = true;
                videoElement.play().catch(() => {});
            });
        });

        let networkRetryCount = 0;
        let mediaErrorCount   = 0;

        hlsInstance.on(Hls.Events.ERROR, function(event, data) {
            if (data.fatal) {
                if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
                    networkRetryCount++;
                    if (networkRetryCount <= 1) {
                        setTimeout(() => {
                            if (hlsInstance) hlsInstance.startLoad();
                        }, 500);
                    } else {
                        if (currentLinkIndex < 2) {
                            currentLinkIndex++;
                            loadChannel(currentChannelId, currentLinkIndex);
                        } else {
                            showError(true);
                            showBuffering(false);
                        }
                    }
                } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
                    mediaErrorCount++;
                    if (mediaErrorCount <= 1) {
                        hlsInstance.recoverMediaError();
                    } else {
                        if (currentLinkIndex < 2) {
                            currentLinkIndex++;
                            loadChannel(currentChannelId, currentLinkIndex);
                        } else {
                            showError(true);
                            showBuffering(false);
                        }
                    }
                }
            }
        });

    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        // iOS Safari native HLS
        videoElement.src = url;
        videoElement.addEventListener('loadedmetadata', function onMeta() {
            videoElement.removeEventListener('loadedmetadata', onMeta);
            videoElement.play().catch(() => {
                videoElement.muted = true;
                videoElement.play().catch(() => {});
            });
        });
        videoElement.addEventListener('error', function onErr() {
            videoElement.removeEventListener('error', onErr);
            if (currentLinkIndex < 2) {
                currentLinkIndex++;
                loadChannel(currentChannelId, currentLinkIndex);
            } else {
                showError(true);
                showBuffering(false);
            }
        });
    }
}

// ================= চ্যানেল পরিবর্তন =================
function changeChannel(channelId, buttonElement) {
    if (channelId === currentChannelId) return;

    document.querySelectorAll('.channel-item').forEach(i => i.classList.remove('active'));
    buttonElement.classList.add('active');
    buttonElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    if (!isMobile) resetInactivityTimer();
    closeMobileSidebar();
    loadChannel(channelId, 0);
}

// ================= চ্যানেল লিস্ট রেন্ডার =================
function renderChannels() {
    const listContainer = document.getElementById('channel-list');
    if (!listContainer) return;
    listContainer.innerHTML = '';

    const countEl = document.getElementById('launch-ch-count');
    if (countEl) countEl.textContent = `${channels.length}+ চ্যানেল লাইভ`;

    channels.forEach((ch, idx) => {
        const item = document.createElement('div');
        item.className = 'channel-item' + (idx === 0 ? ' active' : '');
        item.id = `chan-${ch.id}`;
        item.style.animationDelay = `${idx * 40}ms`;
        item.onclick = function() { changeChannel(ch.id, this); };
        item.innerHTML = `
            <div class="channel-logo-wrap">
                <img class="channel-logo"
                     src="${ch.logo}"
                     alt="${ch.name}"
                     loading="lazy"
                     onerror="this.src='https://placehold.co/52x28/1a1d2e/ffffff?text=${encodeURIComponent(ch.name)}'">
            </div>
            <div class="channel-info">
                <div class="channel-name">${ch.name}</div>
                <div class="channel-number">CH ${String(idx + 1).padStart(2, '0')}</div>
            </div>
            <div class="channel-status"></div>
        `;
        listContainer.appendChild(item);
    });
}

// ================= অ্যাপ ইনিশিয়ালাইজেশন =================
function initializeApp() {
    const videoElement = document.getElementById('tv-player');

    player = new Plyr(videoElement, {
        autoplay:  true,
        muted:     false,
        volume:    1.0,
        controls:  ['play-large','play','progress','current-time','mute','volume','fullscreen'],
        fullscreen: {
            enabled:   true,
            fallback:  true,
            iosNative: false,
            container: '.app-container'
        },
        tooltips:     { controls: false, seek: true },
        hideControls: true,
        speed:        { selected: 1, options: [1] },
    });

    // বাফারিং ইভেন্ট
    videoElement.addEventListener('waiting',   () => showBuffering(true));
    videoElement.addEventListener('seeking',   () => showBuffering(true));
    videoElement.addEventListener('loadstart', () => showBuffering(true));
    videoElement.addEventListener('playing',   () => showBuffering(false));
    videoElement.addEventListener('canplay',   () => showBuffering(false));

    player.once('playing', hidePreloader);
    setTimeout(hidePreloader, 5000);

    ['click','touchstart','keydown'].forEach(e => {
        document.addEventListener(e, forceUnmute, { passive: true });
    });

    renderChannels();

    if (!isMobile) setupInactivityTimer();
    setupKeyboardNavigation();

    // মোবাইলে স্ক্রিন ট্যাপে সাইডবার টগল
    if (isMobile) {
        setupMobileTapToOpen();
    }

    if (channels.length > 0) loadChannel(channels[0].id, 0);
}

// ================= মোবাইল: স্ক্রিনে ট্যাপ → সাইডবার =================
function setupMobileTapToOpen() {
    const appContainer = document.querySelector('.app-container');
    const playerWrapper = document.querySelector('.player-wrapper');

    // ভিডিও এলাকায় ট্যাপ করলে সাইডবার টগল হবে
    if (playerWrapper) {
        playerWrapper.addEventListener('click', function(e) {
            // সাইডবার বা বাটনে ক্লিক হলে ignore
            const sidebar   = document.getElementById('sidebar-panel');
            const toggleBtn = document.getElementById('mobile-channel-toggle');
            const backdrop  = document.getElementById('mobile-sidebar-backdrop');

            if (sidebar && sidebar.contains(e.target)) return;
            if (toggleBtn && toggleBtn.contains(e.target)) return;
            if (backdrop && backdrop.contains(e.target)) return;

            // plyr controls এ ক্লিক হলে ignore
            if (e.target.closest('.plyr__controls') ||
                e.target.closest('.plyr__control') ||
                e.target.closest('.buffering-overlay') ||
                e.target.closest('.error-overlay')) return;

            if (mobileSidebarOpen) {
                closeMobileSidebar();
            } else {
                openMobileSidebar();
            }
        });
    }

    // ব্যাকড্রপে ক্লিক করলে সাইডবার বন্ধ
    const backdrop = document.getElementById('mobile-sidebar-backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', closeMobileSidebar);
    }
}

// ================= পেজ লোড =================
window.addEventListener('load', function() {
    isMobile = isMobileDevice();

    // ব্যাকড্রপ তৈরি (যদি HTML এ না থাকে)
    if (!document.getElementById('mobile-sidebar-backdrop')) {
        const bd = document.createElement('div');
        bd.id = 'mobile-sidebar-backdrop';
        bd.className = 'mobile-sidebar-backdrop';
        document.body.appendChild(bd);
    }

    if (isMobile) {
        showMobileLaunchScreen();

        // প্রি-লোডার লুকাও
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.style.display = 'none';

        // সাইডবার শুরুতে লুকানো রাখো
        const sidebar = document.getElementById('sidebar-panel');
        if (sidebar) {
            sidebar.classList.remove('mobile-visible');
        }

        // টগল বাটন দেখাও
        const toggleBtn = document.getElementById('mobile-channel-toggle');
        if (toggleBtn) toggleBtn.style.display = 'flex';

    } else {
        // ডেস্কটপ
        const launchScreen = document.getElementById('mobile-launch-screen');
        if (launchScreen) launchScreen.style.display = 'none';

        const toggleBtn = document.getElementById('mobile-channel-toggle');
        if (toggleBtn) toggleBtn.style.display = 'none';

        initializeApp();
    }

    // orientation পরিবর্তনে UI আপডেট
    window.addEventListener('orientationchange', function() {
        // reload ছাড়াই handle করো
        setTimeout(() => {
            isMobile = isMobileDevice();
            // সাইডবার সঠিকভাবে পজিশন করো
            if (mobileSidebarOpen) {
                closeMobileSidebar();
            }
        }, 300);
    });

    // resize এ শুধু desktop ↔ mobile transition এ reload
    window.addEventListener('resize', () => {
        const wasMobile = isMobile;
        isMobile = isMobileDevice();
        if (wasMobile !== isMobile) {
            // শুধু desktop ↔ mobile পরিবর্তনে reload, orientation change এ না
            if (Math.abs(window.innerWidth - (wasMobile ? 400 : 1200)) > 100) {
                location.reload();
            }
        }
    });
});

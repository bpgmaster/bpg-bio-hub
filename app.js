/**
 * Bloody Path Gaming — Bio-Hub Client Logic
 * Handles interactive Creator-Code copy, Map-Code copy, Web Share API,
 * Dynamic Live Category Filtering, Web Audio Sound Effects, Pointer-Spotlight & Admin Analytics.
 */

document.addEventListener('DOMContentLoaded', () => {
  initEntranceAnimation();
  initSoundEngine();
  initCardPointerSpotlight();
  initCreatorCodeCopy();
  initStickyCreatorBar();
  initMapCodeCopy();
  initShareHub();
  initCategoryNavigation();
  initLegalModal();
  initSecretAnalyticsDashboard();
  initAnalyticsTracking();
});

/**
 * Futuristic Web Audio API Sound Engine (Zero external assets required)
 */
let audioCtx = null;
let soundEnabled = true;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTapSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.04);

    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.045);
  } catch (e) {
    // AudioContext blocked or not supported
  }
}

function playSuccessChime() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + i * 0.06;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.09, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.16);
    });
  } catch (e) {
    // AudioContext blocked
  }
}

function playFilterSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.065);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  } catch (e) {
    // AudioContext blocked
  }
}

function initSoundEngine() {
  const soundBtn = document.getElementById('soundToggleBtn');
  const storedSound = localStorage.getItem('bpg_sound_enabled');
  if (storedSound !== null) {
    soundEnabled = storedSound === 'true';
  }

  const updateSoundUI = () => {
    if (!soundBtn) return;
    const iconOn = soundBtn.querySelector('.sound-icon-on');
    const iconOff = soundBtn.querySelector('.sound-icon-off');
    const label = soundBtn.querySelector('.sound-label');

    if (soundEnabled) {
      soundBtn.classList.remove('sound-muted');
      if (iconOn) iconOn.style.display = 'block';
      if (iconOff) iconOff.style.display = 'none';
      if (label) label.textContent = 'Audio';
      soundBtn.title = 'Sound-Effekte aktiv (Klicken für Mute)';
    } else {
      soundBtn.classList.add('sound-muted');
      if (iconOn) iconOn.style.display = 'none';
      if (iconOff) iconOff.style.display = 'block';
      if (label) label.textContent = 'Mute';
      soundBtn.title = 'Sound-Effekte stumm (Klicken für Audio)';
    }
  };

  updateSoundUI();

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      localStorage.setItem('bpg_sound_enabled', String(soundEnabled));
      updateSoundUI();
      if (soundEnabled) {
        playSuccessChime();
        showToast('Sound-Effekte aktiviert! 🔊', '🎵');
      } else {
        showToast('Sound-Effekte deaktiviert 🔇', '🔕');
      }
    });
  }
}

/**
 * Dynamic Pointer Spotlight Effect for Cards & Widgets
 */
function initCardPointerSpotlight() {
  const cards = document.querySelectorAll('.deal-card, .creator-card, .map-showcase-card, .ig-banner-wrapper');
  cards.forEach(card => {
    const handleMove = (clientX, clientY) => {
      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    card.addEventListener('pointermove', (e) => {
      handleMove(e.clientX, e.clientY);
    });

    card.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });
  });
}

/**
 * Staggered Entrance Animation for Loaded Elements
 */
function initEntranceAnimation() {
  const items = document.querySelectorAll('.filterable-item');
  items.forEach((item, idx) => {
    item.style.animationDelay = `${0.045 * (idx + 1)}s`;
  });
}

/**
 * Reusable dynamic Toast notification helper
 */
let toastTimeout = null;
function showToast(messageHtml, icon = '✅') {
  const toast = document.getElementById('copyToast');
  const toastMsg = document.getElementById('toastMessage');
  const toastIcon = toast?.querySelector('.toast-icon');

  if (!toast) return;

  if (toastMsg) toastMsg.innerHTML = messageHtml;
  if (toastIcon) toastIcon.textContent = icon;

  clearTimeout(toastTimeout);
  toast.classList.add('show');
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2700);
}

/**
 * 1-Click Copy functionality for Epic Games / Fortnite Creator Code
 */
function initCreatorCodeCopy() {
  const card = document.getElementById('creatorCodeCard');
  const codeTextElem = document.getElementById('creatorCodeText');
  const copyBadge = document.getElementById('copyBadge');

  if (!card || !codeTextElem) return;

  const codeToCopy = codeTextElem.innerText.trim();

  const performCopy = async () => {
    try {
      await copyToClipboard(codeToCopy);
      playSuccessChime();

      if (navigator.vibrate && (!navigator.userActivation || navigator.userActivation.isActive)) {
        navigator.vibrate([40, 30, 50]);
      }

      if (copyBadge) {
        const originalHtml = copyBadge.innerHTML;
        copyBadge.innerHTML = `<span>Kopiert! ✅</span>`;
        copyBadge.style.background = '#10b981';

        setTimeout(() => {
          copyBadge.innerHTML = originalHtml;
          copyBadge.style.background = '';
        }, 2200);
      }

      showToast(`Creator Code <strong>${codeToCopy}</strong> kopiert!`, '✅');
      trackEvent('copy_creator_code', { target: 'creator_code', code: codeToCopy });

    } catch (err) {
      console.error('Kopieren fehlgeschlagen:', err);
    }
  };

  card.addEventListener('click', performCopy);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      performCopy();
    }
  });
}

/**
 * Sticky Floating Creator Code Bar Logic
 * Automatically appears when the main Creator Code card scrolls out of view.
 */
function initStickyCreatorBar() {
  const stickyBar = document.getElementById('stickyCreatorBar');
  const mainCard = document.getElementById('creatorCodeCard');
  const stickyBtn = document.getElementById('stickyCopyBtn');
  const codeTextElem = document.getElementById('creatorCodeText');

  if (!stickyBar || !mainCard) return;

  const codeToCopy = codeTextElem ? codeTextElem.innerText.trim() : 'BloodyPathGaming';

  // Responsive scroll visibility check
  const checkVisibility = () => {
    const isCardHidden = mainCard.classList.contains('is-hidden');
    const rect = mainCard.getBoundingClientRect();
    if ((isCardHidden && window.scrollY > 220) || (!isCardHidden && rect.bottom < 0)) {
      stickyBar.classList.add('is-visible');
    } else {
      stickyBar.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', () => requestAnimationFrame(checkVisibility), { passive: true });
  checkVisibility();

  // Copy on button click or bar tap
  const copyStickyCode = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await copyToClipboard(codeToCopy);
      playSuccessChime();

      if (navigator.vibrate && (!navigator.userActivation || navigator.userActivation.isActive)) {
        navigator.vibrate([40, 30, 50]);
      }

      if (stickyBtn) {
        const btnText = stickyBtn.querySelector('.sticky-btn-text');
        if (btnText) {
          const orig = btnText.textContent;
          btnText.textContent = 'Kopiert! ✅';
          stickyBtn.style.background = '#10b981';
          setTimeout(() => {
            btnText.textContent = orig;
            stickyBtn.style.background = '';
          }, 2200);
        }
      }

      showToast(`Creator Code <strong>${codeToCopy}</strong> kopiert!`, '⚔️');
      trackEvent('copy_creator_code', { target: 'sticky_creator_bar', code: codeToCopy });
    } catch (err) {
      console.error('Sticky Code Copy fehlgeschlagen:', err);
    }
  };

  if (stickyBtn) stickyBtn.addEventListener('click', copyStickyCode);
  stickyBar.addEventListener('click', copyStickyCode);
}

/**
 * 1-Click Map-Code copy on all Map Cards
 */
function initMapCodeCopy() {
  const copyButtons = document.querySelectorAll('.map-copy-code-btn');
  if (!copyButtons.length) return;

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const code = btn.getAttribute('data-code') || btn.textContent.trim();
      const copyTag = btn.querySelector('.map-copy-tag');
      const mapTitle = btn.closest('.map-card-content')?.querySelector('.map-title')?.textContent.trim() || 'Map';

      try {
        await copyToClipboard(code);
        playSuccessChime();

        if (navigator.vibrate && (!navigator.userActivation || navigator.userActivation.isActive)) {
          navigator.vibrate([40, 30, 50]);
        }

        if (copyTag) {
          const origText = copyTag.textContent;
          copyTag.textContent = 'Kopiert! ✅';
          copyTag.style.background = '#10b981';

          setTimeout(() => {
            copyTag.textContent = origText;
            copyTag.style.background = '';
          }, 2200);
        }

        showToast(`${mapTitle} Code <strong>${code}</strong> kopiert!`, '🎮');
        trackEvent('link_click', { target: `map_code_${code}`, code });

      } catch (err) {
        console.error('Map-Code kopieren fehlgeschlagen:', err);
      }
    });
  });
}

/**
 * Native Web Share API or Clipboard Fallback
 */
function initShareHub() {
  const shareBtn = document.getElementById('shareHubBtn');
  if (!shareBtn) return;

  shareBtn.addEventListener('click', async () => {
    playTapSound();
    const shareData = {
      title: 'Bloody Path Gaming | Deals, Hardware & Keys',
      text: 'Exklusive Gaming-Deals, Hardware-Rabatte & offizielle UEFN Fortnite Maps von Bloody Path Gaming!',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        trackEvent('link_click', { target: 'share_hub' });
      } catch (err) {
        // User cancelled share
      }
    } else {
      try {
        await copyToClipboard(window.location.href);
        playSuccessChime();
        showToast('Bio-Hub Link in die Zwischenablage kopiert! 🔗', '📋');
        trackEvent('link_click', { target: 'share_hub' });
      } catch (err) {
        console.error('Teilen fehlgeschlagen:', err);
      }
    }
  });
}

/**
 * Dynamic Live Category Navigation & Filtering
 */
function initCategoryNavigation() {
  const chips = document.querySelectorAll('.nav-chip');
  const filterableItems = document.querySelectorAll('.filterable-item');
  const dividers = document.querySelectorAll('.section-divider');
  if (!chips.length) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const category = chip.getAttribute('data-category') || 'all';
      const targetId = chip.getAttribute('data-target');

      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      playFilterSound();

      // Filter deal and map items
      filterableItems.forEach((item, idx) => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          item.classList.remove('is-hidden');
          item.style.animationDelay = `${idx * 0.035}s`;
        } else {
          item.classList.add('is-hidden');
        }
      });

      // Filter section divider headers
      dividers.forEach(divider => {
        const dividerCat = divider.getAttribute('data-category-divider');
        if (category === 'all' || dividerCat === category) {
          divider.classList.remove('is-hidden');
        } else {
          divider.classList.add('is-hidden');
        }
      });

      // Smooth scroll navigation (keeps category chips in view at top)
      if (category === 'all') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const navElem = document.getElementById('categoryNav');
        if (navElem && window.scrollY > navElem.offsetTop) {
          navElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

/**
 * Legal Compliance Modal (§ 5 DDG & Datenschutz / DSGVO)
 */
function initLegalModal() {
  const modal = document.getElementById('legalModal');
  const openBtn = document.getElementById('openLegalBtn');
  const closeBtn = document.getElementById('closeLegalBtn');
  const confirmBtn = document.getElementById('confirmLegalBtn');
  const backdrop = document.getElementById('legalModalBackdrop');

  if (!modal || !openBtn) return;

  const openModal = () => {
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (confirmBtn) confirmBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
      closeModal();
    }
  });
}

/**
 * Secret Timbo Admin Analytics Dashboard (Triple-Tap on Footer Avatar)
 */
function initSecretAnalyticsDashboard() {
  const emblem = document.getElementById('footerBrandEmblem');
  const modal = document.getElementById('analyticsModal');
  const closeBtn = document.getElementById('closeAnalyticsBtn');
  const confirmBtn = document.getElementById('confirmAnalyticsBtn');
  const resetBtn = document.getElementById('resetAnalyticsBtn');
  const backdrop = document.getElementById('analyticsModalBackdrop');

  if (!emblem || !modal) return;

  let tapCount = 0;
  let lastTapTime = 0;

  emblem.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastTapTime < 900) {
      tapCount++;
    } else {
      tapCount = 1;
    }
    lastTapTime = now;

    if (tapCount >= 3) {
      tapCount = 0;
      openAnalyticsDashboard();
    }
  });

  const openAnalyticsDashboard = () => {
    renderAnalyticsView();
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeAnalyticsDashboard = () => {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeAnalyticsDashboard);
  if (confirmBtn) confirmBtn.addEventListener('click', closeAnalyticsDashboard);
  if (backdrop) backdrop.addEventListener('click', closeAnalyticsDashboard);

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Möchtest du die lokale Klick-Statistik wirklich auf 0 zurücksetzen?')) {
        localStorage.removeItem('bpg_hub_analytics');
        renderAnalyticsView();
        showToast('Klick-Statistik zurückgesetzt! 🗑️', '🔄');
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
      closeAnalyticsDashboard();
    }
  });
}

/**
 * Renders local analytics counts into the secret dashboard
 */
function renderAnalyticsView() {
  const totalClicksElem = document.getElementById('analyticsTotalClicks');
  const topPerformerElem = document.getElementById('analyticsTopPerformer');
  const listContainer = document.getElementById('analyticsListContainer');

  if (!listContainer) return;

  const storageKey = 'bpg_hub_analytics';
  const data = JSON.parse(localStorage.getItem(storageKey) || '{"clicks":{}}');
  const clicks = data.clicks || {};

  const nameMap = {
    'instant-gaming': '⚡ Instant Gaming Store',
    'instant-gaming-banner': '🔥 Instant Gaming Live Banner',
    'nbb-hardware': '💻 notebooksbilliger.de Hardware',
    'gamivo': '🕹️ Gamivo Game-Keys',
    'eneba': '🎁 Eneba Guthaben-Karten',
    'eklipse': '🎬 Eklipse.gg AI Clipping',
    'creator_code': '⚔️ Creator Code BloodyPathGaming (Kopiert)',
    'sticky_creator_bar': '📌 Sticky Creator Bar (Code Kopiert)',
    'map_exotic': '🏝️ Exotic Gun Game (Play Launch)',
    'map_code_8440-7299-2792': '📋 Exotic Gun Game (Code Kopiert)',
    'map_nobuild_arena': '🏆 No-Build Arena Ranked (Play Launch)',
    'map_code_8655-3576-5634': '📋 No-Build Arena Ranked (Code Kopiert)',
    'epic_creator_portal': '🌟 BPG Fortnite Creator Portal',
    'portfolio_3d': '🎨 3D Asset Portfolio (Discord)',
    'discord': '🎧 BPG Discord Community',
    'share_hub': '🔗 Bio-Hub geteilt'
  };

  let total = 0;
  let topTarget = '-';
  let topClicks = 0;

  Object.entries(clicks).forEach(([key, count]) => {
    total += count;
    if (count > topClicks) {
      topClicks = count;
      topTarget = nameMap[key] || key;
    }
  });

  if (totalClicksElem) totalClicksElem.textContent = total;
  if (topPerformerElem) topPerformerElem.textContent = topClicks > 0 ? topTarget : 'Noch keine Klicks';

  listContainer.innerHTML = '';

  const allKeys = Object.keys(nameMap);
  allKeys.forEach(key => {
    const count = clicks[key] || 0;
    const label = nameMap[key];
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

    const row = document.createElement('div');
    row.className = 'analytics-row';
    row.innerHTML = `
      <div class="analytics-row-info">
        <span>${label}</span>
        <span class="analytics-row-count">${count} <small>(${percentage}%)</small></span>
      </div>
      <div class="analytics-bar-bg" style="width: ${percentage}%"></div>
    `;
    listContainer.appendChild(row);
  });
}

/**
 * Universal safe clipboard helper (handles secure contexts & older webviews)
 */
async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (e) {
      // Fallback for TikTok/Instagram in-app webviews or restricted clipboard permissions
    }
  }
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand('copy');
  textArea.remove();
}

/**
 * Lightweight Client-Side Analytics Tracker
 */
function initAnalyticsTracking() {
  const trackedLinks = document.querySelectorAll('[data-analytics]');

  trackedLinks.forEach(link => {
    link.addEventListener('click', () => {
      playTapSound();
      const targetId = link.getAttribute('data-analytics');
      trackEvent('link_click', { target: targetId, timestamp: new Date().toISOString() });
    });
  });
}

function trackEvent(eventName, payload) {
  try {
    const storageKey = 'bpg_hub_analytics';
    const existingData = JSON.parse(localStorage.getItem(storageKey) || '{"clicks":{}}');

    if (payload.target) {
      existingData.clicks[payload.target] = (existingData.clicks[payload.target] || 0) + 1;
    }

    existingData.lastInteraction = new Date().toISOString();
    localStorage.setItem(storageKey, JSON.stringify(existingData));
  } catch (e) {
    // Graceful fallback for restricted storage environments
  }
}

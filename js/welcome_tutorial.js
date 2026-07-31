/* ==========================================================================
   WELCOME TUTORIAL MODAL ("HƯỚNG DẪN THAO TÁC") CONTROLLER
   ========================================================================== */

(function () {
  'use strict';

  // ═════════════════════════════════════════════════════════════════════════
  // SINGLE SOURCE OF TRUTH CONFIGURATION
  // ═════════════════════════════════════════════════════════════════════════
  window.TUTORIAL_CONFIG = {
    sessionKey: 'latien_welcome_tutorial_dismissed',
    title: 'HƯỚNG DẪN THAO TÁC',
    subtitle: 'Khám phá dự án bằng các thao tác đơn giản dưới đây.',
    btnText: 'BẮT ĐẦU THAM QUAN',
    checkboxText: 'Không hiển thị lại trong phiên này',
    cards: [
      {
        id: 'card_mouse',
        title: '🖱️ Chuột',
        desc: 'Kéo để xoay góc nhìn.',
        svg: `<svg class="tutorial-icon-svg" viewBox="0 0 24 24"><path d="M12 2C8.686 2 6 4.686 6 8v8c0 3.314 2.686 6 6 6s6-2.686 6-6V8c0-3.314-2.686-6-6-6z"/><line x1="12" y1="6" x2="12" y2="10"/></svg>`
      },
      {
        id: 'card_zoom',
        title: '🔍 Thu phóng',
        desc: 'Cuộn chuột hoặc chụm hai ngón tay để zoom.',
        svg: `<svg class="tutorial-icon-svg" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`
      },
      {
        id: 'card_hotspot',
        title: '📍 Hotspot',
        desc: 'Chạm hoặc nhấp vào các điểm đánh dấu để xem các khu vực của dự án.',
        svg: `<svg class="tutorial-icon-svg" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`
      },
      {
        id: 'card_mobile',
        title: '📱 Thiết bị di động',
        desc: 'Vuốt để xoay góc nhìn. Chạm vào các nút để sử dụng công cụ.',
        svg: `<svg class="tutorial-icon-svg" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`
      }
    ]
  };

  let escKeyHandler = null;

  // ═════════════════════════════════════════════════════════════════════════
  // SHOW WELCOME TUTORIAL MODAL
  // ═════════════════════════════════════════════════════════════════════════
  window.showWelcomeTutorial = function () {
    const config = window.TUTORIAL_CONFIG;

    // 1. Check Session Preference
    try {
      const isDismissed = sessionStorage.getItem(config.sessionKey);
      if (isDismissed === 'true') {
        console.log('ℹ️ Welcome Tutorial suppressed by session preference.');
        return;
      }
    } catch (e) {}

    // Avoid duplicate injection
    if (document.getElementById('welcome-tutorial-overlay')) return;

    // 2. Build Cards HTML
    const cardsHtml = config.cards.map(card => `
      <div class="tutorial-card">
        <div class="tutorial-icon-box">
          ${card.svg}
        </div>
        <div class="tutorial-card-body">
          <h3 class="tutorial-card-title">${card.title}</h3>
          <p class="tutorial-card-desc">${card.desc}</p>
        </div>
      </div>
    `).join('');

    // 3. Build Modal Overlay HTML
    const overlay = document.createElement('div');
    overlay.id = 'welcome-tutorial-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', config.title);

    overlay.innerHTML = `
      <div class="tutorial-modal-card">
        <button type="button" class="tutorial-close-btn" id="tutorial-close-x" aria-label="Đóng hướng dẫn">&times;</button>
        
        <header class="tutorial-header">
          <h2 class="tutorial-title">${config.title}</h2>
          <p class="tutorial-subtitle">${config.subtitle}</p>
        </header>

        <div class="tutorial-cards-grid">
          ${cardsHtml}
        </div>

        <footer class="tutorial-footer">
          <button type="button" class="tutorial-start-btn" id="tutorial-start-btn" aria-label="${config.btnText}">
            <span>${config.btnText}</span>
            <svg style="width:16px; height:16px; fill:none; stroke:currentColor; stroke-width:2.5;" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>

          <label class="tutorial-session-option">
            <input type="checkbox" id="tutorial-checkbox-session">
            <span class="tutorial-custom-checkbox"></span>
            <span>${config.checkboxText}</span>
          </label>
        </footer>
      </div>
    `;

    document.body.appendChild(overlay);

    // 4. Attach Event Listeners
    const startBtn = overlay.querySelector('#tutorial-start-btn');
    const closeX = overlay.querySelector('#tutorial-close-x');
    const checkbox = overlay.querySelector('#tutorial-checkbox-session');

    function closeTutorial() {
      // Save session preference if checked
      if (checkbox && checkbox.checked) {
        try {
          sessionStorage.setItem(config.sessionKey, 'true');
        } catch (e) {}
      }

      // Add fade out class
      overlay.classList.add('tutorial-fade-out');

      // Remove ESC listener
      if (escKeyHandler) {
        document.removeEventListener('keydown', escKeyHandler);
        escKeyHandler = null;
      }

      setTimeout(() => {
        if (overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
        console.log('✨ Welcome Tutorial Modal closed.');
      }, 400);
    }

    if (startBtn) startBtn.addEventListener('click', closeTutorial);
    if (closeX) closeX.addEventListener('click', closeTutorial);

    // Close on backdrop click (click outside modal card)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeTutorial();
    });

    // Keyboard ESC key accessibility listener
    escKeyHandler = function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        closeTutorial();
      }
    };
    document.addEventListener('keydown', escKeyHandler);

    console.log('🎓 Welcome Tutorial Modal active.');
  };

})();

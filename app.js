/* ===========================================================
   Atlas — app logic
   Nav routing, theme switching, dynamic token rendering, copy-to-clipboard.
   =========================================================== */

(function () {
  'use strict';

  // -----------------------------------------------------------
  // Toast
  // -----------------------------------------------------------
  const toastEl = document.getElementById('toast');
  let toastTimeout = null;
  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toastEl.classList.remove('show'), 1600);
  }

  function copyText(text, label) {
    navigator.clipboard.writeText(text).then(() => showToast(label)).catch(() => showToast('Could not copy'));
  }

  // -----------------------------------------------------------
  // Sidebar navigation
  // -----------------------------------------------------------
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.doc-section');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.dataset.section;
      navLinks.forEach(l => l.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));
      link.classList.add('active');
      document.getElementById(target).classList.add('active');
      history.replaceState({}, '', `#${target}`);
    });
  });

  window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const link = document.querySelector(`.nav-link[data-section="${hash}"]`);
      if (link) link.click();
    }
  });

  // -----------------------------------------------------------
  // Theme switching
  // -----------------------------------------------------------
  const themeButtons = document.querySelectorAll('.theme-btn');

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      themeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.body.dataset.theme = btn.dataset.themeChoice;
      renderColorSwatches(); // re-read the new computed token values
    });
  });

  // -----------------------------------------------------------
  // Color swatches — read live CSS variable values so they always
  // reflect the currently active theme
  // -----------------------------------------------------------
  const COLOR_TOKENS = [
    { name: '--bg', label: 'Background' },
    { name: '--panel', label: 'Panel' },
    { name: '--panel-alt', label: 'Panel alt' },
    { name: '--border', label: 'Border' },
    { name: '--text', label: 'Text' },
    { name: '--text-dim', label: 'Text dim' },
    { name: '--accent', label: 'Accent' },
    { name: '--accent-dim', label: 'Accent dim' },
    { name: '--success', label: 'Success' },
    { name: '--warn', label: 'Warning' },
    { name: '--danger', label: 'Danger' }
  ];

  function renderColorSwatches() {
    const container = document.getElementById('colorSwatches');
    const computed = getComputedStyle(document.body);
    container.innerHTML = '';

    COLOR_TOKENS.forEach(token => {
      const value = computed.getPropertyValue(token.name).trim();
      const swatch = document.createElement('div');
      swatch.className = 'color-swatch';
      swatch.innerHTML = `
        <div class="color-swatch-fill" style="background:${value}"></div>
        <div class="color-swatch-meta">
          <span class="color-swatch-name">${token.label}</span>
          <span class="color-swatch-hex">${token.name}</span>
        </div>
      `;
      swatch.addEventListener('click', () => copyText(value, `Copied ${value}`));
      container.appendChild(swatch);
    });
  }

  // -----------------------------------------------------------
  // Spacing scale
  // -----------------------------------------------------------
  const SPACING_STEPS = [4, 8, 12, 16, 24, 32, 48, 64];

  function renderSpacingScale() {
    const container = document.getElementById('spacingScale');
    container.innerHTML = '';
    SPACING_STEPS.forEach(px => {
      const row = document.createElement('div');
      row.className = 'spacing-row';
      row.innerHTML = `
        <span class="spacing-label">${px}px</span>
        <div class="spacing-bar" style="width:${px * 3}px"></div>
      `;
      container.appendChild(row);
    });
  }

  // -----------------------------------------------------------
  // Code toggle + copy
  // -----------------------------------------------------------
  document.querySelectorAll('.code-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      target.hidden = !target.hidden;
      btn.textContent = target.hidden ? '</> View code' : '</> Hide code';
    });
  });

  document.querySelectorAll('.code-block').forEach(block => {
    block.addEventListener('click', () => {
      copyText(block.textContent.trim(), 'Code copied to clipboard');
    });
  });

  // -----------------------------------------------------------
  // Modal demo
  // -----------------------------------------------------------
  const modalBackdrop = document.getElementById('modalBackdrop');
  document.getElementById('openModalBtn').addEventListener('click', () => {
    modalBackdrop.hidden = false;
  });
  document.getElementById('modalCancelBtn').addEventListener('click', () => {
    modalBackdrop.hidden = true;
  });
  document.getElementById('modalConfirmBtn').addEventListener('click', () => {
    modalBackdrop.hidden = true;
    showToast('File deleted (demo only)');
  });
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) modalBackdrop.hidden = true;
  });

  // -----------------------------------------------------------
  // Init
  // -----------------------------------------------------------
  renderColorSwatches();
  renderSpacingScale();

})();

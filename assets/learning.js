/* ================================================================
   Learning Tracker — Shared Chapter Behavior
   Provides: dark/light theme toggle + topic progress tracking.
   Progress syncs with learning-tracker.htm via the shared
   localStorage key 'learning-progress-v1' and data-topic IDs.
   Loaded via: <script src="../../assets/learning.js"></script>
   ================================================================ */

(function () {
  'use strict';

  /* ---- Theme Toggle (same storage key as the tracker) ---- */
  const toggle = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');
  const stored = localStorage.getItem('learning-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('learning-theme', theme);
    const isDark = theme === 'dark';
    if (icon) icon.textContent = isDark ? '☀️' : '🌙';
    if (label) label.textContent = isDark ? 'Light' : 'Dark';
  }
  setTheme(stored || (prefersDark ? 'dark' : 'light'));
  if (toggle) {
    toggle.addEventListener('click', () => {
      setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---- Progress tracking ---- */
  const PROGRESS_KEY = 'learning-progress-v1';
  const progress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
  const boxes = document.querySelectorAll('input[data-topic]');

  boxes.forEach(box => { box.checked = !!progress[box.dataset.topic]; });

  function updateChapterProgress() {
    const topics = document.querySelectorAll('.topic-check input[data-topic]');
    const done = [...topics].filter(b => b.checked).length;
    const fill = document.getElementById('chapterFill');
    const lbl = document.getElementById('chapterLabel');
    if (fill) fill.style.width = topics.length ? (done / topics.length * 100) + '%' : '0%';
    if (lbl) lbl.textContent = done + '/' + topics.length + ' topics';
  }

  document.addEventListener('change', e => {
    const box = e.target.closest('input[data-topic]');
    if (!box) return;
    progress[box.dataset.topic] = box.checked;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    updateChapterProgress();
  });

  updateChapterProgress();
})();

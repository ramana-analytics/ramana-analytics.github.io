function initPageCounter() {
  const counter = document.querySelector('[data-page-id]');
  if (!counter) return;
  const pageId = counter.getAttribute('data-page-id');
  const storageKey = `page-counter-${pageId}`;

  const style = document.createElement('style');
  style.textContent = `
    .page-counter { margin: 1.6em 0 0; font-size: 0.95em; color: #4a5568; }
    .page-counter strong { color: #1a202c; }
  `;
  document.head.appendChild(style);

  try {
    const storedValue = localStorage.getItem(storageKey);
    let count = storedValue ? parseInt(storedValue, 10) : 0;
    if (Number.isNaN(count)) count = 0;
    count += 1;
    localStorage.setItem(storageKey, count);
    counter.textContent = count.toLocaleString();
  } catch (error) {
    counter.textContent = 'N/A';
  }
}

document.addEventListener('DOMContentLoaded', initPageCounter);

function initPageCounter() {
  const counter = document.querySelector('[data-page-id]');
  if (!counter) return;
  const pageId = counter.getAttribute('data-page-id');
  const apiUrl = `https://api.countapi.xyz/hit/ramana-analytics-github-io/${pageId}`;

  const style = document.createElement('style');
  style.textContent = `
    .page-counter { margin: 1.6em 0 0; font-size: 0.95em; color: #4a5568; }
    .page-counter strong { color: #1a202c; }
  `;
  document.head.appendChild(style);

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data && typeof data.value === 'number') {
        counter.textContent = data.value.toLocaleString();
      } else {
        counter.textContent = 'N/A';
      }
    })
    .catch(() => {
      counter.textContent = 'N/A';
    });
}

document.addEventListener('DOMContentLoaded', initPageCounter);

/* ================================================================
   Learning Tracker — Markdown + LaTeX Chapter Renderer
   Lets chapters be written as Markdown with LaTeX math inside a
   <script type="text/markdown"> block. Renders it into the page,
   enables "- [ ]" checklists, and assigns data-topic IDs so progress
   still syncs with learning-tracker.htm.

   Usage in a chapter page:
     <div class="chapter-body" id="chapter-content"></div>
     <script type="text/markdown" id="chapter-md" data-topic-prefix="a">
       ...markdown content...
     </script>
     <script src="https://cdn.jsdelivr.net/npm/marked@12/marked.min.js"></script>
     <script src="../../assets/learning-md.js"></script>
     <script src="../../assets/learning.js"></script>

   Checkbox items ("- [ ] Topic") are numbered with the prefix:
   data-topic-prefix="a" → a1, a2, a3 ... in document order.
   ================================================================ */

(function () {
  'use strict';

  const src = document.querySelector('script[type="text/markdown"]#chapter-md');
  const target = document.getElementById('chapter-content');
  if (!src || !target) return;

  const md = src.textContent.replace(/^\n+/, ''); // trim leading blank line

  /* ---- Render Markdown ---- */
  if (window.marked) {
    target.innerHTML = marked.parse(md, { gfm: true, breaks: false });
  } else {
    // Fallback: show raw Markdown if the CDN script failed to load
    target.textContent = md;
    return;
  }

  /* ---- Turn "- [ ]" items into live, tracker-synced checkboxes ---- */
  const prefix = src.dataset.topicPrefix || '';
  let n = 0;
  target.querySelectorAll('li input[type="checkbox"]').forEach(box => {
    box.disabled = false;
    n += 1;
    if (prefix) box.dataset.topic = prefix + n;
  });

  /* ---- Typeset LaTeX math ($...$ and $$...$$) via MathJax ---- */
  if (window.MathJax && MathJax.startup && MathJax.startup.promise) {
    MathJax.startup.promise.then(() => {
      if (MathJax.typesetPromise) MathJax.typesetPromise([target]).catch(() => {});
    });
  }
  // If MathJax hasn't finished loading yet, its initial typeset will
  // process this content automatically once it does.
})();

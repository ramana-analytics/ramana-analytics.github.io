# Learning System — How It All Fits Together

This repo has **three** connected pieces for your learning content:

| Piece | Where | What it's for |
|-------|-------|---------------|
| **Tracker page** | `learning-tracker.htm` | The public dashboard: 16 skill categories, per-topic checkboxes, progress meters, chapter table-of-contents |
| **Web chapters** | `chapters/<area>/<topic>.htm` | Readable pages on ramanaai.com, written in **Markdown + LaTeX**, progress synced with the tracker |
| **Book** | `book/` | A Quarto project that builds the same learning notes into an HTML book, PDF, and EPUB |

You write content in Markdown with LaTeX math. No CSS or JS needed — those are
shared in `assets/`.

---

## Quick reference: create a new learning page

1. Copy `chapters/chapter-template.htm` → `chapters/<area>/<topic>.htm`
2. Fill in the header fields (title, description, kicker, h1, deck)
3. Write your notes as **Markdown + LaTeX** in the `<script type="text/markdown">` block
4. Set `data-topic-prefix` to the category letter (e.g. `a` for GenAI)
5. Change `robots` to `index, follow`, delete the author note
6. Link the chapter card in `learning-tracker.htm`
7. `git add -A && git commit && git push`

Full details: **[chapters/README.md](chapters/README.md)**

## Quick reference: add to the book

1. Create `book/chapters/<area>/<topic>.qmd`
2. Add it to the `chapters:` list in `book/_quarto.yml`
3. `cd book && quarto preview` to write with live reload
4. `quarto render` to build HTML + PDF + EPUB

Full details: **[book/README.md](book/README.md)**

---

## Folder map

```
learning-tracker.htm          ← tracker dashboard (public page)
chapters/
  chapter-template.htm        ← copy this for each new web chapter
  README.md                   ← web chapter authoring guide
  genai/llm-foundations.htm   ← example chapter (Markdown + LaTeX)
assets/
  learning.css                ← chapter styles
  learning.js                 ← theme toggle + progress tracking
  learning-md.js              ← Markdown + LaTeX renderer
book/
  _quarto.yml                 ← book config (outputs, macros, chapter list)
  README.md                   ← book authoring guide
  chapters/**.qmd             ← book chapters (Markdown + LaTeX)
  references.bib              ← book bibliography
```

## Topic IDs

Checkboxes sync between chapter pages and the tracker via `data-topic` IDs:
category letter + topic number, in the order topics appear on the tracker.
Example: `a1` = GenAI → LLMs. In Markdown chapters, set `data-topic-prefix="a"`
and `- [ ]` items are numbered automatically (`a1`, `a2`, ...).

Full map: [chapters/README.md](chapters/README.md)

# AI/ML Learning Notes — Quarto Book

This folder is a [Quarto](https://quarto.org) **book** project. It builds your
learning chapters into a real book from a single source:

- **HTML website** (searchable, dark/light, navigation)
- **PDF** (LaTeX-typeset, numbered equations, bibliography)
- **EPUB** (e-readers)

You write chapters in **Markdown + LaTeX math** (`.qmd` files). No HTML.

---

## Install Quarto (one time)

```bash
brew install --cask quarto          # macOS
# or download from https://quarto.org/docs/get-started/
```

For the PDF build you also need a LaTeX engine (once):

```bash
quarto install tinytex
```

## Daily workflow

```bash
cd book
quarto preview                      # live-reload in the browser while you write
```

Write in any `chapters/**.qmd` file — save, and the browser updates instantly.

## Build the book

```bash
cd book
quarto render                       # builds HTML (+ PDF/EPUB if configured)
```

Output lands in `book/_book/`.

## Add a new chapter

1. Create `chapters/<area>/<topic>.qmd` (copy `chapters/genai/llm-foundations.qmd`
   as a starting point).
2. Add it to the `chapters:` list in `_quarto.yml` under the right part.
3. Save — `quarto preview` picks it up automatically.

## Multiple pages in one part (e.g. GenAI)

A folder can hold as many `.qmd` files as you like — one per topic. The book's
order is controlled by the **list in `_quarto.yml`**, not by the folder. Each
part has an `index.qmd` (part intro page) followed by its chapters:

```yaml
- part: "GenAI & Foundation Models"
  chapters:
    - chapters/genai/index.qmd            ← part intro page
    - chapters/genai/llm-foundations.qmd  ← chapter 1
    - chapters/genai/prompt-engineering.qmd ← add when written
    - chapters/genai/rag.qmd              ← add when written
```

To grow the book: create the `.qmd`, add one line to `_quarto.yml`, rebuild.
Chapters auto-number (1.1, 1.2, ...) and get prev/next navigation for free.

## Writing conventions

- **Math**: `$...$` inline, `$$...$$` display. Numbered + cross-referenceable:

  ```
  $$y = f(w \cdot x + b)$$ {#eq-neuron}

  ... as shown in @eq-neuron ...
  ```

- **Citations**: add the reference to `references.bib`, cite with
  `[@vaswani2017attention]`. The bibliography renders automatically in
  `references.qmd`.

- **Code**: fenced blocks with a language, e.g. ```` ```{python} ````.
  Add `#| eval: false` for non-executed examples.

- **Callouts**:

  ```
  ::: {.callout-note}
  Text
  :::
  ```

  Types: `note`, `tip`, `important`, `caution`, `warning`.

- **Checklist items** in the book are plain Markdown (`- [ ] ...`) — for the
  website tracker, keep ticking topics on `learning-tracker.htm` (the book does
  not sync with localStorage).

## Shared LaTeX macros

Defined once in `book/_macros.qmd` and included at the top of every `.qmd`
file, so HTML, PDF, and EPUB all recognize them:

| Macro | Expands to |
|-------|-----------|
| `\R` | $\mathbb{R}$ |
| `\E` | $\mathbb{E}$ |
| `\softmax` | $\mathrm{softmax}$ |
| `\attention` | $\mathrm{attention}$ |

Add new macros to `_macros.qmd` and every chapter can use them. When creating
a new chapter file, start it with the include line:

- In `book/` root files: `{{< include _macros.qmd >}}`
- In `book/chapters/<area>/` files: `{{< include ../../_macros.qmd >}}`

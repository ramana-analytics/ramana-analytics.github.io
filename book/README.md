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

Defined in `_quarto.yml` under `format: pdf: header-includes` (PDF) and usable
in HTML math too:

| Macro | Expands to |
|-------|-----------|
| `\R` | $\mathbb{R}$ |
| `\E` | $\mathbb{E}$ |
| `\softmax` | $\mathrm{softmax}$ |
| `\attention` | $\mathrm{attention}$ |

Add your own once in `_quarto.yml` and every chapter can use them.

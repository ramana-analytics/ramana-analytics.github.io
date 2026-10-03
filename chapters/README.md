# Learning Chapters — How to Write a New Chapter

Chapters are written in **Markdown + LaTeX** — no HTML knowledge needed for the
content. Styling, the dark/light theme toggle, math rendering, and progress
tracking all come from shared files:

- `assets/learning.css` — chapter styling
- `assets/learning.js` — theme toggle + progress checkboxes
- `assets/learning-md.js` — renders your Markdown and typesets LaTeX math

---

## Add a chapter in 5 steps

1. **Copy the template**

   ```
   chapters/chapter-template.htm  →  chapters/<area>/<topic-slug>.htm
   ```

   Example: `chapters/genai/prompt-engineering.htm`

   Area folders: `genai/`, `nlp/`, `recommenders/`, `cv/`, `3d-vision/`,
   `graph-ml/`, `time-series/`, `iot/`, `fraud/`, `rl/`, `classical-ml/`,
   `tabular/`, `multimodal/`, `mlops/`, `data-eng/`, `system-design/`
   (create the folder if it doesn't exist).

2. **Fill in the header fields** — `<title>`, meta description, kicker, `<h1>`,
   and the deck sentence. These are plain text replacements in the HTML shell.

3. **Write the content** inside the
   `<script type="text/markdown" ...>` block, using Markdown:

   ```markdown
   ## 1. Overview
   Regular text, **bold**, *italic*, and > blockquotes.

   Inline math like $h_t = f(Wx_t + Uh_{t-1} + b)$ and display math:

   $$\mathrm{attention}(Q, K, V) = \mathrm{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right)V$$

   ```python
   # fenced code blocks
   ```
   ```

4. **Set the topic prefix** on the markdown block to the category letter, and
   list the chapter's topics as `- [ ]` checkboxes:

   ```html
   <script type="text/markdown" id="chapter-md" data-topic-prefix="a">
   ...
   - [ ] LLMs — foundations
   - [ ] Prompt engineering
   ```

   Checkboxes are auto-numbered `a1`, `a2`, ... in order and sync both ways
   with `learning-tracker.htm`. Use the ID map below to match the tracker.

5. **Publish**: change robots to `index, follow`, delete the author note,
   and link the chapter card in the Chapters section of `learning-tracker.htm`:

   ```html
   <a class="chapter-card" href="chapters/genai/prompt-engineering.htm">
   ```

Done. Commit and push to publish.

---

## Topic ID map

IDs are the category letter + topic number, in the order topics appear on
`learning-tracker.htm`. Set `data-topic-prefix` to the letter; checkboxes are
numbered automatically in document order.

| Category | Prefix | Topics |
|----------|--------|--------|
| A. GenAI | `a` | LLMs, Prompt Eng, Fine-tuning, RAG, Agents, Safety, Evaluation |
| B. NLP | `b` | Transformers, Text Classification, NER, Summarization, QA, Embeddings |
| C. Recommenders | `c` | Multi-product, Cold-start, Graph-based, Sequential, Multi-task, Unified embeddings |
| D. CV | `d` | CNNs, ViTs, Detection, Segmentation, OCR, VLMs |
| E. 3D Vision | `e` | 3D CNNs, Point Clouds, NeRF, SLAM, Depth |
| F. Graph ML | `f` | GNNs, Heterogeneous, Embeddings, Anomaly |
| G. Time-Series | `g` | Transformers, LSTM/GRU, Temporal CNNs, Forecasting, Anomaly |
| H. IoT | `h` | Autoencoders, Spectral, Sensor fusion, Temporal GNNs, TinyML |
| I. Fraud | `i` | Graph fraud, Isolation Forest, GBDT, Hybrid, Sequence |
| J. Opt/RL | `j` | RLHF, Policy gradients, Bandits, Multi-agent, Constrained |
| K. Classical ML | `k` | Logistic, Random forest, SVM, KNN, Clustering |
| L. Tabular | `l` | XGBoost/LGBM/CatBoost, TabTransformer, Wide & Deep |
| M. Multi-modal | `m` | CLIP, BLIP, Fusion, Audio+text+vision |
| N. MLOps | `n` | Feature stores, Monitoring, Drift, CI/CD, Vector DBs |
| O. Data Eng | `o` | Distributed, Modeling, ETL |
| P. System Design | `p` | Architecture, Recommenders at scale, LLM systems, Real-time |

---

## Optional: HTML blocks inside Markdown

Raw HTML passes through, so you can drop in richer blocks when needed:

- **Concept ladder** (numbered steps):

  ```html
  <div class="ladder">
    <div class="rung"><span class="num">1</span><div><h4>Step title</h4><p>Description.</p></div></div>
  </div>
  ```

- **Image with caption**:

  ```html
  <figure><img src="../../images/example.png"><figcaption>Figure 1: ...</figcaption></figure>
  ```

See `chapters/genai/llm-foundations.htm` for a complete working example.

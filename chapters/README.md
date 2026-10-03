# Learning Chapters — How to Add a New Chapter

The learning system is built so you only write **content**. Styling, the dark/light
theme toggle, and progress tracking all come from two shared files:

- `assets/learning.css` — all chapter styling
- `assets/learning.js` — theme toggle + progress checkboxes

You never need to touch CSS or JS for a new chapter.

---

## Add a chapter in 5 steps

1. **Copy the template**

   ```
   chapters/chapter-template.htm  →  chapters/<area>/<topic-slug>.htm
   ```

   Example: `chapters/genai/prompt-engineering.htm`

   Use the matching area folder (create it if it doesn't exist):

   | Area | Folder |
   |------|--------|
   | GenAI & Foundation Models | `chapters/genai/` |
   | NLP | `chapters/nlp/` |
   | Recommender Systems | `chapters/recommenders/` |
   | Computer Vision | `chapters/cv/` |
   | 3D Vision & Spatial AI | `chapters/3d-vision/` |
   | Graph ML | `chapters/graph-ml/` |
   | Time-Series | `chapters/time-series/` |
   | IoT & Predictive Maintenance | `chapters/iot/` |
   | Fraud / Risk / Security | `chapters/fraud/` |
   | Optimization & RL | `chapters/rl/` |
   | Classical ML | `chapters/classical-ml/` |
   | Tabular ML | `chapters/tabular/` |
   | Multi-modal AI | `chapters/multimodal/` |
   | MLOps | `chapters/mlops/` |
   | Data Engineering | `chapters/data-eng/` |
   | ML System Design | `chapters/system-design/` |

2. **Fill in the content** — replace every `[BRACKETED]` placeholder in the
   title, description, kicker, headings, paragraphs, code, and resources.

3. **Set the topic IDs** in the Topics checklist. IDs must match the tracker
   (map below) so ticking a topic on the chapter page also ticks it on
   `learning-tracker.htm` (and vice versa).

4. **Publish-ready**: change `<meta name="robots" content="noindex, nofollow">`
   to `index, follow` and delete the author note at the top of `<body>`.

5. **Link it from the tracker**: in `learning-tracker.htm`, find the chapter's
   card in the Chapters section and point its `href` at the new file, e.g.

   ```html
   <a class="chapter-card" href="chapters/genai/prompt-engineering.htm">
   ```

Done. Commit and push to publish.

---

## Topic ID map

IDs are the category letter + topic number, in the order they appear on
`learning-tracker.htm`. For example `a2` = GenAI topic 2 = Prompt Engineering.

| Category | IDs | Topics |
|----------|-----|--------|
| A. GenAI | a1–a7 | LLMs, Prompt Eng, Fine-tuning, RAG, Agents, Safety, Evaluation |
| B. NLP | b1–b6 | Transformers, Text Classification, NER, Summarization, QA, Embeddings |
| C. Recommenders | c1–c6 | Multi-product, Cold-start, Graph-based, Sequential, Multi-task, Unified embeddings |
| D. CV | d1–d6 | CNNs, ViTs, Detection, Segmentation, OCR, VLMs |
| E. 3D Vision | e1–e5 | 3D CNNs, Point Clouds, NeRF, SLAM, Depth |
| F. Graph ML | f1–f4 | GNNs, Heterogeneous, Embeddings, Anomaly |
| G. Time-Series | g1–g5 | Transformers, LSTM/GRU, Temporal CNNs, Forecasting, Anomaly |
| H. IoT | h1–h5 | Autoencoders, Spectral, Sensor fusion, Temporal GNNs, TinyML |
| I. Fraud | i1–i5 | Graph fraud, Isolation Forest, GBDT, Hybrid, Sequence |
| J. Opt/RL | j1–j5 | RLHF, Policy gradients, Bandits, Multi-agent, Constrained |
| K. Classical ML | k1–k5 | Logistic, Random forest, SVM, KNN, Clustering |
| L. Tabular | l1–l3 | XGBoost/LGBM/CatBoost, TabTransformer, Wide & Deep |
| M. Multi-modal | m1–m4 | CLIP, BLIP, Fusion, Audio+text+vision |
| N. MLOps | n1–n5 | Feature stores, Monitoring, Drift, CI/CD, Vector DBs |
| O. Data Eng | o1–o3 | Distributed, Modeling, ETL |
| P. System Design | p1–p4 | Architecture, Recommenders at scale, LLM systems, Real-time |

---

## Optional content blocks

These classes are available in the shared stylesheet — just use the markup:

- **Concept ladder** (numbered steps):

  ```html
  <div class="ladder">
    <div class="rung"><span class="num">1</span><div><h4>Step title</h4><p>Description.</p></div></div>
  </div>
  ```

- **Highlighted principle**: `<blockquote>...</blockquote>`
- **Code**: `<pre><code>...</code></pre>`
- **Image with caption**: `<figure><img src="..."><figcaption>...</figcaption></figure>`

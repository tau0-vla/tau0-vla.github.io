// Archived project-page layout retained for reference. It is not published.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute:
      "τ0-VLA: a Hierarchical Robot Foundation Model with World-Model-Guided Test-Time Computation",
  },
  description:
    "A hierarchical vision-language-action foundation model for long-horizon mobile manipulation.",
};

const rolloutTasks = [
  {
    title: "Clean Room",
    description: "21-step mobile manipulation",
  },
  {
    title: "Ingredient Prep",
    description: "18-step mobile manipulation",
  },
  {
    title: "Tomato and Egg Stir Fry",
    description: "13-step mobile manipulation",
  },
  {
    title: "Make Milk Tea",
    description: "13-step manipulation",
  },
];

const mainResults = [
  {
    method: "GR00T N1.7",
    clean: "0 / 10",
    prep: "1 / 10",
    cook: "0 / 10",
    tea: "0 / 10",
    average: "2.5%",
  },
  {
    method: "LingBot-VLA",
    clean: "0 / 10",
    prep: "0 / 10",
    cook: "0 / 10",
    tea: "0 / 10",
    average: "0.0%",
  },
  {
    method: "π0.5",
    clean: "4 / 10",
    prep: "2 / 10",
    cook: "0 / 10",
    tea: "1 / 10",
    average: "17.5%",
  },
  {
    method: "τ0-VLA",
    clean: "4 / 10",
    prep: "4 / 10",
    cook: "0 / 10",
    tea: "7 / 10",
    average: "37.5%",
  },
  {
    method: "τ0-VLA w/ Hierarchical System",
    clean: "8 / 10",
    prep: "8 / 10",
    cook: "4 / 10",
    tea: "5 / 10",
    average: "62.5%",
    highlight: true,
  },
];

const bibtex = `@article{tau0vla2026,
  title   = {Tau0-VLA: a Hierarchical Robot Foundation Model
             with World-Model-Guided Test-Time Computation},
  author  = {Anonymous},
  year    = {2026}
}`;

export default function Home() {
  return (
    <main id="top">
      <nav className="site-nav" aria-label="Main navigation">
        <a className="site-name" href="#top">
          τ0-VLA
        </a>
        <div className="nav-links">
          <a href="#demo">Demo</a>
          <a href="#overview">Overview</a>
          <a href="#rollouts">Rollouts</a>
          <a href="#method">Method</a>
          <a href="#results">Results</a>
          <Link href="/blog/">Blog View</Link>
          <a className="nav-button" href="/tau0-vla.pdf" target="_blank">
            Paper
          </a>
        </div>
      </nav>

      <header className="paper-header page-width">
        <h1>
          <span>τ0-VLA:</span> a Hierarchical Robot Foundation Model with
          World-Model-Guided Test-Time Computation
        </h1>
        <div className="paper-meta">
          <span>Published</span>
          <span>2026</span>
          <span>Paper</span>
          <a href="/tau0-vla.pdf" target="_blank">τ0-VLA.pdf</a>
        </div>
      </header>

      <section className="demo-section" id="demo" aria-label="Project video">
        <div className="wide-width">
          <div className="main-video">
            <video
              controls
              playsInline
              preload="metadata"
              poster="/media/demo-poster.jpg"
            >
              <source src="/media/demo-full.mp4" type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          </div>
        </div>
      </section>

      <section className="abstract-section page-width" id="overview">
        <div className="section-title">
          <p>Overview</p>
          <h2>One instruction, many consequential decisions.</h2>
        </div>
        <div className="overview-copy">
          <p>
            Imagine asking a robot to make milk tea: prepare the cup, add the
            toppings, pour the milk and tea, seal the lid, and insert a straw.
            People make this look easy because we keep track of what has
            happened, what failed, and what should happen next.
          </p>
          <p>
            Vision-language-action models can now execute many bounded skills,
            but long-horizon tasks are often limited by a different question:
            can the robot choose the right next subtask? A single stale memory
            or premature decision can derail the procedure even when each
            individual motion is correct.
          </p>
          <p>
            τ0-VLA turns next-subtask selection into a compute-scalable
            inference problem. At subtask boundaries, a memory-augmented policy
            either acts immediately or searches over candidate subtasks,
            predicts their physical consequences, and reflects before
            commitment. A generalist VLA then executes the selected step across
            multiple robot embodiments.
          </p>
        </div>
        <div className="contribution-list">
          <article>
            <h3>Compute-scalable planning</h3>
            <p>
              Spend additional inference compute on uncertain decisions and
              compare their likely physical consequences.
            </p>
          </article>
          <article>
            <h3>Correctable execution memory</h3>
            <p>
              Track task progress, then revise stale beliefs when the latest
              observation contradicts the plan.
            </p>
          </article>
          <article>
            <h3>Generalist VLA execution</h3>
            <p>
              Ground each committed subtask across fixed-base, bimanual, and
              mobile robot embodiments.
            </p>
          </article>
        </div>
        <div className="result-strip" aria-label="Results at a glance">
          <article>
            <strong>62.5%</strong>
            <span>average long-horizon success rate</span>
          </article>
          <article>
            <strong>92.99%</strong>
            <span>average prerequisite-aware progress</span>
          </article>
          <article>
            <strong>+11.0 pp</strong>
            <span>next-subtask accuracy from execution memory</span>
          </article>
        </div>
      </section>

      <section className="rollout-section" id="rollouts">
        <div className="wide-width">
          <div className="section-title">
            <h2>Long-horizon rollouts</h2>
          </div>
          <p className="rollout-intro">
            We evaluate room cleaning, ingredient preparation, stir fry, and
            milk tea. Each episode spans 13–21 ordered steps and combines
            navigation, object interaction, tool use, and recovery from
            imperfect execution.
          </p>
          <div className="rollout-grid">
            {rolloutTasks.map((task, index) => (
              <article className="rollout-card" key={task.title}>
                <div className="video-placeholder" aria-label={`${task.title} video placeholder`}>
                  <span>Video {String(index + 1).padStart(2, "0")}</span>
                  <small>16:9 rollout</small>
                </div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="method-section" id="method">
        <div className="page-width">
          <div className="section-title method-heading">
            <h2>How τ0-VLA makes and executes decisions.</h2>
          </div>
          <p className="method-intro">
            At each subtask boundary, the high-level policy reads the current
            observation and an execution memory that summarizes task progress.
            Confident decisions take a fast route. Difficult decisions invoke
            world-model-guided search before a subtask is committed.
          </p>
          <p className="method-intro method-intro-follow">
            The selected language subtask is passed to the low-level VLA,
            which converts it into short action chunks for coordinated mobile
            manipulation. The next observation closes the loop: memory is
            updated, progress is reassessed, and the system plans again.
          </p>
          <div className="method-figure">
            <Image
              src="/media/framework-latest.png"
              alt="Latest architecture of the high-level policy, low-level policy, and reflective test-time planning"
              width={3046}
              height={1172}
              priority
            />
          </div>
          <p className="figure-caption">
            The complete architecture: memory-aware high-level planning,
            selective world-model-guided search, and low-level VLA execution.
          </p>
        </div>
      </section>

      <section className="mechanism-section page-width">
        <article>
          <h2>Memory that can be corrected.</h2>
          <p>
            Execution memory summarizes completed stages and the current task
            state. Unlike a fixed plan trace, it remains revisable: new visual
            evidence can advance progress, roll back an over-optimistic state,
            or trigger a retry.
          </p>
          <p>
            The memory-repair behavior is trained with perturbed,
            demonstration-derived memories, so the planner learns to reconcile
            language history with what the robot actually sees without
            requiring extra task annotations.
          </p>
          <div className="result-note">
            <strong>+11.0 percentage points</strong>
            <span>next-subtask accuracy with execution memory</span>
          </div>
        </article>
        <article>
          <h2>Search before commitment.</h2>
          <p>
            Routine decisions use a fast route. For difficult choices, the
            planner proposes candidate subtasks, predicts their visual outcomes,
            evaluates progress with a value model, and reflects before
            committing.
          </p>
          <p>
            Search operates over language subtasks rather than raw action
            sequences. This keeps the reasoning horizon tractable while still
            grounding each choice in its expected physical consequence; only
            the selected subtask is sent to the robot.
          </p>
          <div className="planning-sequence" aria-label="Planning sequence">
            <span>Propose</span>
            <i>→</i>
            <span>Imagine</span>
            <i>→</i>
            <span>Evaluate</span>
            <i>→</i>
            <span>Reflect</span>
          </div>
        </article>
      </section>

      <section className="results-section page-width" id="results">
        <div className="section-title">
          <h2>Long-horizon system performance</h2>
        </div>
        <p className="results-intro">
          Across four long-horizon tasks, the hierarchical system reaches 62.5%
          average success versus 37.5% for direct whole-task execution with the
          same low-level policy. Each result reports ten closed-loop physical
          trials per task.
        </p>

        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th>Method</th>
                <th>Clean Room</th>
                <th>Ingredient Prep</th>
                <th>Stir Fry</th>
                <th>Milk Tea</th>
                <th>Average</th>
              </tr>
            </thead>
            <tbody>
              {mainResults.map((row) => (
                <tr className={row.highlight ? "highlight-row" : ""} key={row.method}>
                  <td>{row.method}</td>
                  <td>{row.clean}</td>
                  <td>{row.prep}</td>
                  <td>{row.cook}</td>
                  <td>{row.tea}</td>
                  <td>{row.average}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="table-caption">
          Closed-loop success over ten physical trials per task. The complete
          hierarchical system improves average success from 37.5% under direct
          whole-task execution to 62.5% while using the same low-level policy.
        </p>

        <div className="analysis-heading">
          <h3>More planning compute, better decisions.</h3>
          <p>
            Across in-domain and distribution-shifted settings, additional
            test-time computation improves next-subtask prediction by 15–24
            percentage points. These open-loop gains translate into higher
            closed-loop success, with the largest improvements appearing at
            low-to-moderate compute budgets.
          </p>
        </div>
        <div className="paper-result-grid">
          <figure>
            <div className="result-figure">
              <Image
                src="/media/ttc-accuracy.png"
                alt="Open-loop next-subtask prediction accuracy for Plan Once, Best-of-N, and TTC"
                width={1353}
                height={765}
              />
            </div>
            <figcaption>
              TTC achieves the highest next-subtask accuracy across all four
              evaluation settings.
            </figcaption>
          </figure>
          <figure>
            <div className="result-figure">
              <Image
                src="/media/ttc-scaling.png"
                alt="Compute-accuracy trade-off for Milk Tea and Book Organization"
                width={1268}
                height={533}
              />
            </div>
            <figcaption>
              Accuracy improves rapidly at low-to-moderate test-time compute
              budgets, then approaches a plateau.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="executor-section">
        <div className="page-width executor-layout">
          <div className="section-title compact">
            <h2>A generalist VLA across robot embodiments.</h2>
          </div>
          <div className="executor-copy">
            <p>
              A pretrained vision-language backbone and Mixture-of-Transformers
              action head decode short action chunks from multi-view
              observations, robot state, and the committed subtask.
            </p>
            <p>
              A shared 40-dimensional representation spans end-effector motion,
              arms, grippers, waist, and mobile base across multiple
              embodiments, allowing one policy interface to support fixed-base,
              bimanual, and mobile platforms.
            </p>
            <p>
              Training combines heterogeneous robot demonstrations with
              multimodal data. The dataset includes approximately 40,115 hours
              of real-world robot experience; here, its role is to provide a
              broad execution prior rather than serve as the central claim.
            </p>
          </div>
        </div>
      </section>

      <section className="closing-section">
        <div className="page-width">
          <h2>Plan, preview, act, and revise.</h2>
          <p>
            τ0-VLA treats long-horizon manipulation as a sequence of
            consequential decisions. It combines correctable execution memory,
            selective world-model-guided search, and a generalist low-level
            executor in one closed-loop system.
          </p>
          <p className="closing-statement">
            The central result is simple: when the next subtask is uncertain,
            spending more computation before commitment can improve both the
            decision and the behavior that follows.
          </p>
          <a className="primary-link light-link" href="/tau0-vla.pdf" target="_blank">
            Read Paper
          </a>
        </div>
      </section>

      <section className="citation-section page-width" id="citation">
        <details>
          <summary>
            Citation
            <span aria-hidden="true">+</span>
          </summary>
          <pre>{bibtex}</pre>
        </details>
      </section>

      <footer className="site-footer wide-width">
        <strong>τ0-VLA</strong>
        <p>
          a Hierarchical Robot Foundation Model with World-Model-Guided Test-Time
          Computation
        </p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}

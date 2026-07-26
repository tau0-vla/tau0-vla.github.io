import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: {
    absolute:
      "τ0-VLA: a Hierarchical Robot Foundation Model with World-Model-Guided Test-Time Computation",
  },
  description:
    "A research-note view of τ0-VLA and compute-scalable high-level decision making.",
};

const rolloutVideos = [
  {
    id: "clean-room",
    title: "Clean Room",
    description: "25 steps",
    src: "/media/rollout-clean-room.mp4",
    poster: "/media/rollout-clean-room-poster.jpg",
  },
  {
    id: "milk-tea",
    title: "Make Milk Tea",
    description: "13 steps",
    src: "/media/rollout-milk-tea.mp4",
    poster: "/media/rollout-milk-tea-poster.jpg",
  },
  {
    id: "stir-fry-front",
    title: "Tomato and Egg Stir Fry",
    description: "Front view · 22 steps",
    src: "/media/rollout-stir-fry-front.mp4",
    poster: "/media/rollout-stir-fry-front-poster.jpg",
  },
  {
    id: "stir-fry-rear",
    title: "Tomato and Egg Stir Fry",
    description: "Rear view · 22 steps",
    src: "/media/rollout-stir-fry-rear.mp4",
    poster: "/media/rollout-stir-fry-rear-poster.jpg",
  },
];

const embodimentVideos = [
  {
    id: "collect-laundry",
    title: "Collect Laundry",
    description: "ARX AC One · 5 steps",
    src: "/media/rollout-collect-laundry.mp4",
    poster: "/media/rollout-collect-laundry-poster.jpg",
  },
  {
    id: "tidy-makeup-table",
    title: "Tidy Makeup Table",
    description: "Franka · Makeup Puff · 4 steps",
    src: "/media/rollout-tidy-makeup-table.mp4",
    poster: "/media/rollout-tidy-makeup-table-poster.jpg",
  },
];

const results = [
  ["GR00T N1.7", "0 / 10", "1 / 10", "0 / 10", "0 / 10", "2.5%"],
  ["LingBot-VLA", "0 / 10", "0 / 10", "0 / 10", "0 / 10", "0.0%"],
  ["π0.5", "4 / 10", "2 / 10", "0 / 10", "3 / 10", "22.5%"],
  ["τ0-VLA", "4 / 10", "2 / 10", "0 / 10", "5 / 10", "27.5%"],
  [
    "τ0-VLA (Hierarchical System, Plan Once)",
    "5 / 10",
    "4 / 10",
    "4 / 10",
    "5 / 10",
    "45.0%",
  ],
];

const bibtex = `@article{tau0vla2026,
  title   = {Tau0-VLA: a Hierarchical Robot Foundation Model
             with World-Model-Guided Test-Time Computation},
  author  = {Tau0 VLA Team},
  year    = {2026}
}`;

function TauName() {
  return (
    <span className="tau-name">
      <span className="tau-symbol">τ</span>0-VLA
    </span>
  );
}

export default function Home() {
  return (
    <main className="blog-view" id="top">
      <nav className="blog-nav" aria-label="Blog navigation">
        <a className="blog-wordmark" href="#top"><TauName /></a>
        <div>
          <a href="#research">Research</a>
          <a href="#citation">Citation</a>
        </div>
      </nav>

      <article className="blog-article" id="research">
        <header className="blog-header">
          <div className="blog-breadcrumb" aria-label="Breadcrumb">
            <span>Research</span>
            <i aria-hidden="true" />
            <TauName />
          </div>
          <h1>
            <TauName />: a Hierarchical Robot Foundation Model with
            World-Model-Guided Test-Time Computation
          </h1>
          <p className="blog-date">July 27, 2026</p>
          <div className="blog-actions">
            <a
              className="blog-action-primary"
              href="/tau0-vla.pdf"
              target="_blank"
            >
              Read Paper
            </a>
            <span className="blog-action-outline" aria-disabled="true">
              Github
            </span>
            <span className="blog-action-outline" aria-disabled="true">
              Huggingface
            </span>
          </div>
        </header>

        <div className="blog-media blog-hero-video" aria-label="Project video">
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

        <section className="blog-copy blog-opening">
          <h2>One Instruction, Many Consequential Decisions</h2>
          <p>
            Imagine asking a robot to make milk tea. The recipe sounds simple:
            prepare the cup, add the toppings, pour the milk and tea, seal the
            lid, and insert a straw. Yet that single instruction must coordinate
            many subtasks over minutes of interaction.
          </p>
          <p>
            People make this look easy because we continuously track what has
            happened, what just failed, and what should come next. A robot can
            execute each motion correctly and still fail by choosing the wrong
            next subtask.
          </p>
          <p>
            Vision-language-action models are increasingly capable at bounded
            skills such as picking, placing, wiping, opening, and closing.
            Longer tasks add a different burden: searching for objects,
            verifying outcomes, preserving progress, and recovering from
            failures. The challenge is not simply producing more actions, but
            making a sequence of consequential decisions.
          </p>
        </section>

        <section className="blog-copy blog-continuation">
          <p>
            Hierarchical VLAs expose language subtasks as an interface between
            reasoning and control, but most still select the next subtask with
            one amortized prediction under a fixed inference budget. They do
            not compare alternatives through the physical states those choices
            may produce, so mistakes are often discovered only after execution.
          </p>
          <p>
            <TauName /> instead turns next-subtask selection into an
            inference-time reasoning problem. Subtasks provide the right search
            unit: sparse enough to compare, but long enough to produce
            meaningful and observable consequences.
          </p>
        </section>

        <section className="blog-wide-section blog-demo-section">
          <div className="blog-copy">
            <h2>Long-Horizon Manipulation in the Real World</h2>
            <p>
              We study four long-horizon tasks spanning 13–25 ordered steps:
              cleaning a room, preparing ingredients, cooking tomato and egg
              stir fry, and making milk tea. Episodes last up to 12 minutes and
              require navigation, object search, articulated interaction, tool
              use, cooking, and recovery from imperfect execution.
            </p>
            <p>
              These tasks are deliberately procedural. Clean Room requires the
              robot to retain progress while moving between rooms. Prepare
              Ingredients contains early manipulation steps whose failure blocks
              everything downstream. Stir Fry includes visually ambiguous
              stages such as seasoning, and Milk Tea tests whether the system
              can maintain a precise order through repeated pouring and
              assembly operations.
            </p>
          </div>
          <div className="blog-rollout-grid">
            {rolloutVideos.map((video) => (
              <article className="blog-video-card" key={video.id}>
                <div className="blog-video-frame">
                  <video
                    controls
                    playsInline
                    preload="none"
                    poster={video.poster}
                    aria-label={`${video.title}, ${video.description}`}
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support HTML video.
                  </video>
                </div>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
              </article>
            ))}
          </div>
          <figure className="blog-task-figure">
            <Image
              src="/media/paper-demo-tasks.png"
              alt="Physical-robot evaluation tasks from the paper across three robot embodiments"
              width={3118}
              height={2041}
            />
            <figcaption>
              Physical-robot evaluation tasks from the paper. Panels (a)–(d)
              show the four long-horizon tasks; panels (e)–(f) evaluate the
              shared low-level policy on mobile ARX and fixed-base Franka
              platforms.
            </figcaption>
          </figure>
          <div className="blog-copy blog-after-grid">
            <p>
              The broader evaluation also includes Collect Laundry on a mobile
              ARX platform and instruction-following tasks on a fixed-base
              Franka arm. Those shorter tasks are executed directly, without
              high-level search, so they isolate the shared low-level policy
              from the long-horizon planning system.
            </p>
          </div>
        </section>

        <section className="blog-copy">
          <h2>Two Systems, Two Time Scales</h2>
          <p>
            <TauName /> operates through two policies at different time scales.
            The high-level policy chooses subtasks and tracks progress at
            decision boundaries, while the low-level policy executes each
            choice at the faster control rate. At a boundary, the planner reads
            the instruction, observation, and execution memory, then proposes a
            subtask and memory update.
          </p>
          <p>
            Token-level confidence determines whether to act immediately or
            spend more computation. For uncertain decisions, the policy
            proposes alternatives, a visual world model previews their terminal
            observations, and a value model scores the predicted progress.
            Search and reflection compare these branches before commitment.
          </p>
          <p>
            Only the selected subtask reaches the executor. Its observed outcome
            updates memory before the next decision, closing the loop between
            imagined and physical consequences. This selective test-time
            computation improves next-subtask prediction by 15–24 percentage
            points across in-domain and shifted settings.
          </p>
        </section>

        <figure className="blog-media blog-figure">
          <Image
            src="/media/framework-latest.png"
            alt="τ0-VLA high-level decision making and low-level execution architecture"
            width={3046}
            height={1172}
            priority
          />
          <figcaption>
            Memory-aware high-level decision making, selective
            world-model-guided search, and low-level VLA execution.
          </figcaption>
        </figure>

        <section className="blog-copy blog-continuation">
          <p>
            Planning across two time scales requires the execution memory to
            remain synchronized with the physical world. A failed grasp or a
            missing object can invalidate an otherwise plausible progress
            record.
          </p>
          <p>
            <TauName /> can advance, roll back, or retry when new visual
            evidence disagrees with memory. This corrects both lagging records
            and over-optimistic ones without discarding valid earlier progress.
          </p>
          <p>
            These corrections are learned by perturbing memories derived from
            existing demonstrations, without collecting a separate correction
            corpus. The resulting revisable memory improves next-subtask
            accuracy by 11.0 percentage points.
          </p>
        </section>

        <section className="blog-wide-section blog-continuation-wide">
          <div className="blog-copy">
            <p>
              Across these four physical tasks, the hierarchical system with
              Plan Once reaches 45.0% average success, compared with 27.5% for
              direct execution with the same low-level policy. Both variants
              run without beam search, and every entry below reports ten
              physical trials per task.
            </p>
            <p>
              This is a controlled comparison: the observations, action
              representation, and low-level policy remain fixed. The direct
              system receives the full task instruction throughout the episode,
              while the hierarchical system receives bounded subtasks selected
              from the latest observation and execution memory.
            </p>
          </div>
          <div className="table-shell blog-table">
            <table>
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Clean Room</th>
                  <th>Prepare Ingredients</th>
                  <th>Stir Fry</th>
                  <th>Milk Tea</th>
                  <th>Average</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row, index) => (
                  <tr
                    className={index === results.length - 1 ? "highlight-row" : ""}
                    key={row[0]}
                  >
                    {row.map((cell, cellIndex) => (
                      <td key={`${row[0]}-${cellIndex}`}>
                        {cellIndex === 0 && cell.startsWith("τ0-VLA") ? (
                          <>
                            <TauName />
                            {cell.slice("τ0-VLA".length)}
                          </>
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="blog-wide-section">
          <div className="blog-copy">
            <h2>More compute, better decisions</h2>
            <p>
              We isolate high-level decision quality on Make Milk Tea, Clean
              Room, and both in-domain and out-of-domain Book Organization.
              Plan Once makes a single high-level prediction. Best-of-N samples
              and scores several one-step candidates. TTC additionally expands
              multi-step branches and uses reflection before commitment.
            </p>
            <p>
              The distinction is clearest under distribution shift. On the
              unseen Book Organization layouts, TTC reaches 74.0% next-subtask
              accuracy, compared with 50.0% for Plan Once and 57.5% for
              Best-of-N. Predicting consequences at decision time provides
              evidence that is unavailable to a single pattern-matched
              prediction.
            </p>
            <p>
              The open-loop improvement carries into physical execution. With
              the low-level policy held fixed, TTC raises success from 5/10 to
              7/10 on Milk Tea, from 6/10 to 9/10 on Book Organization, and from
              5/10 to 7/10 on Clean Room.
            </p>
            <p>
              The gains do not come from searching indefinitely. Accuracy rises
              quickly at low-to-moderate compute budgets and then approaches a
              plateau. Confidence-based routing therefore matters twice: it
              avoids paying for search on routine steps and avoids revising
              predictions that were already reliable.
            </p>
          </div>
          <div className="blog-result-grid">
            <figure>
              <Image
                src="/media/ttc-accuracy.png"
                alt="Next-subtask prediction accuracy across evaluation settings"
                width={1353}
                height={765}
              />
              <figcaption>
                TTC achieves the highest next-subtask accuracy across all four
                evaluation settings.
              </figcaption>
            </figure>
            <figure>
              <Image
                src="/media/ttc-scaling.png"
                alt="Test-time compute and accuracy trade-off"
                width={1268}
                height={533}
              />
              <figcaption>
                Accuracy improves rapidly before approaching a plateau.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="blog-copy">
          <h2>A generalist VLA across robot embodiments</h2>
          <p>
            Once a subtask is selected, a pretrained vision-language backbone
            and Mixture-of-Transformers action head produce short action chunks
            from multi-view observations, robot state, and language. The same
            policy receives either the original instruction for direct
            execution or a bounded subtask from the high-level planner, keeping
            the control interface unchanged across both settings.
          </p>
          <p>
            A shared 40-dimensional interface supports end-effector motion,
            arms, grippers, waist, and mobile base across fixed-base, bimanual,
            and mobile platforms. Each embodiment maps its available state and
            control dimensions into this representation while masking unused
            slots, allowing one model to operate across different robot
            configurations.
          </p>
          <p>
            Training combines 40,115 hours of heterogeneous real-world robot
            experience with multimodal data. Short-horizon evaluations on ARX
            and Franka bypass the high-level planner, isolating the resulting
            cross-embodiment, language-conditioned execution capability from
            the memory and search mechanisms used on longer tasks.
          </p>
        </section>

        <div className="blog-media blog-embodiment-grid">
          {embodimentVideos.map((video) => (
            <article className="blog-video-card" key={video.id}>
              <div className="blog-video-frame">
                <video
                  controls
                  playsInline
                  preload="none"
                  poster={video.poster}
                  aria-label={`${video.title}, ${video.description}`}
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support HTML video.
                </video>
              </div>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </article>
          ))}
        </div>

        <section className="blog-copy blog-ending">
          <h2>Scaling Robot Intelligence at the Decision Boundary</h2>
          <p>
            A low-level VLA can be excellent at mapping the current observation
            to the next action chunk, yet still fail when it does not know
            whether that action belongs to the right stage of the task. A
            language planner can produce a plausible sequence of steps, yet
            still fail if it does not know what actually happened in the
            physical world. <TauName /> connects the two: a planner that tracks
            progress and imagines consequences, paired with an executor that
            grounds the selected subtask in robot actions.
          </p>
          <p>
            The interface between them is the subtask. <TauName /> plans in
            subtasks, previews their outcomes, selects one, acts, and then
            updates its state from the next observation. For long-horizon
            robots, this is the difference between merely following an
            instruction and tracking progress through a task.
          </p>
          <p>
            Looking ahead, the goal is to extend this closed loop to richer
            tasks and longer deployments: robots that know when to deliberate,
            verify what actually happened, and revise their plans before small
            errors become task-level failures.
          </p>
          <a className="blog-paper-link" href="/tau0-vla.pdf" target="_blank">
            Read the paper ↗
          </a>
        </section>

        <section className="blog-citation" id="citation">
          <details open>
            <summary>Citation</summary>
            <pre>{bibtex}</pre>
          </details>
        </section>
      </article>

      <footer className="blog-footer">
        <strong><TauName /></strong>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}

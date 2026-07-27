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
    title: "Prepare Ingredients & Clean Room",
    description: "14-step and 25-step tasks",
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
            <a
              className="blog-action-outline"
              href="https://github.com/sii-research/tau-0-vla"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="blog-action-outline"
              href="https://huggingface.co/sii-research/tau-0-vla"
              target="_blank"
              rel="noreferrer"
            >
              Huggingface
            </a>
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
            Imagine asking a robot to make milk tea. The goal sounds simple,
            but achieving it may require preparing a cup, adding toppings,
            pouring milk and tea, sealing the lid, and inserting a straw. From
            this single goal, the robot must repeatedly decide what to do next
            over several minutes of interaction.
          </p>
          <p>
            Humans do this naturally by tracking progress, verifying outcomes,
            and adjusting what comes next. A robot, however, can execute each
            individual skill correctly and still fail by selecting the wrong
            next subtask—or the right one at the wrong stage.
          </p>
          <p>
            Vision-language-action models are increasingly capable at bounded
            skills such as picking, placing, wiping, opening, and closing.
            Long-horizon tasks impose an additional burden: tracking task
            state, preserving progress, verifying outcomes, and recovering from
            failures. Success therefore depends not only on executing actions,
            but on making a coherent sequence of consequential decisions.
          </p>
        </section>

        <section className="blog-copy blog-continuation">
          <p>
            Hierarchical VLAs expose language subtasks as an interface between
            high-level reasoning and low-level control. Many still select each
            subtask with a fixed inference budget, while recent systems have
            begun exploring high-level search or recursive refinement. The open
            problem is how to combine open-ended language-subtask search with
            visual outcome prediction and execution memory in a generalist
            real-robot hierarchy.
          </p>
          <p>
            <TauName /> instead treats next-subtask selection as an
            inference-time reasoning problem. It proposes alternatives,
            predicts their visual outcomes, and compares the resulting branches
            before commitment. Subtasks form a compact, semantically structured
            search space: they occur at sparse decision boundaries, align with
            the logical stages of a task, and produce meaningful changes that
            can be visually evaluated.
          </p>
        </section>

        <section className="blog-wide-section blog-demo-section">
          <div className="blog-copy">
            <h2>Long-Horizon Manipulation in the Real World</h2>
            <p>
              We evaluate four long-horizon tasks spanning 13–25 ordered steps:
              Clean Room, Prepare Ingredients, Tomato and Egg Stir Fry, and Make
              Milk Tea. The tasks range from ingredient preparation and room
              organization to cooking and drink assembly. Episodes last up to
              12 minutes and require navigation, object search, articulated
              interaction, tool use, cooking, and recovery from imperfect
              execution.
            </p>
            <p>
              The rollout row below covers all four tasks: Prepare Ingredients
              and Clean Room are presented in one video, Make Milk Tea in
              another, and Tomato and Egg Stir Fry from both front and rear
              views. Together, these tasks test whether the robot can preserve
              progress, verify outcomes, and recover across extended
              procedures.
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
              The first four panels summarize the long-horizon evaluation. The
              final two panels belong to the shorter cross-embodiment evaluation;
              their ARX and Franka rollout videos appear later with the
              generalist VLA discussion.
            </p>
          </div>
        </section>

        <section className="blog-copy">
          <h2>Two Systems, Two Time Scales</h2>
          <p>
            <TauName /> operates through two policies at different time scales.
            At subtask boundaries, the high-level policy reads the task
            instruction, current observation, and execution memory to select
            the next subtask and update its progress record. The low-level
            policy then executes the selected subtask at a faster control rate.
          </p>
          <p>
            Token-confidence statistics determine whether the high-level policy
            acts immediately or allocates additional computation. For uncertain
            decisions, it proposes alternative subtasks, uses a world model to
            predict their post-execution outcomes, and applies a value model to
            score candidate quality from those predicted outcomes. Search and
            reflection compare these branches before committing to one.
          </p>
          <p>
            The observed outcome of the selected subtask updates memory before
            the next decision, closing the loop between predicted and physical
            outcomes. This selective test-time computation improves next-subtask
            accuracy by 15–24 percentage points across in-domain and
            distribution-shifted settings.
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
            For this loop to remain reliable, execution memory must stay
            synchronized with the physical world. A failed grasp or missing
            object can make an otherwise plausible progress record incorrect.
            When new visual evidence conflicts with memory, <TauName /> can
            advance, roll back, or retry, correcting both lagging and
            over-optimistic records while preserving valid earlier progress.
          </p>
          <p>
            These correction behaviors are learned by perturbing memories
            derived from existing demonstrations, without collecting a separate
            correction dataset. The resulting revisable memory improves
            next-subtask accuracy by 11.0 percentage points.
          </p>
        </section>

        <section className="blog-wide-section blog-continuation-wide">
          <div className="blog-copy">
            <p>
              Across the four long-horizon physical tasks, the hierarchical
              system with Plan Once achieves 45.0% average success, compared
              with 27.5% for direct execution. Both settings use the same
              low-level policy and run without beam search, with ten physical
              trials per task.
            </p>
            <p>
              The key difference lies in how the low-level policy is guided.
              Direct execution conditions every action on the full task
              instruction, leaving the policy to infer the current stage
              throughout the episode. Hierarchical execution instead provides a
              bounded subtask selected from the latest observation and execution
              memory. The improvement therefore reflects the benefit of
              explicitly tracking progress and deciding what to do next, rather
              than a change in the underlying execution policy.
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
            <h2>More Compute, Better Decisions</h2>
            <p>
              We evaluate high-level decision quality on Make Milk Tea, Clean
              Room, and both in-domain and out-of-domain Book Organization. Plan
              Once makes a single subtask prediction, Best-of-N samples and
              scores multiple one-step candidates, and TTC further expands
              multi-step branches with consequence prediction and reflection
              before commitment.
            </p>
            <p>
              The benefit is most evident under distribution shift. On unseen
              Book Organization layouts, TTC achieves 74.0% next-subtask
              accuracy, compared with 50.0% for Plan Once and 57.5% for
              Best-of-N. Predicting consequences at decision time provides
              additional evidence beyond a single forward prediction or
              one-step candidate ranking.
            </p>
            <p>
              These improvements in decision quality translate to physical
              execution. With the low-level policy fixed, TTC improves success
              from 5/10 to 7/10 on Milk Tea, from 6/10 to 9/10 on Book
              Organization, and from 5/10 to 7/10 on Clean Room.
            </p>
            <p>
              On Milk Tea, both variants already complete more than 91% of the
              sequence on average; the remaining failures concentrate at lid
              attachment and straw insertion. TTC raises progress to 95.38%,
              identifying final contact-rich manipulation as the main remaining
              bottleneck.
            </p>
            <p>
              The gains do not require unlimited computation. Accuracy improves
              rapidly at low-to-moderate compute budgets and then gradually
              saturates. Confidence-based routing enables selective test-time
              computation by allocating additional reasoning only when the
              decision is uncertain, while allowing high-confidence decisions
              to proceed directly.
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
          <h2>A Generalist VLA across Robot Embodiments</h2>
          <p>
            Once a subtask is selected, a pretrained vision-language backbone
            and Mixture-of-Transformers action expert produce action chunks from
            multi-view observations, robot state, and language. The same
            low-level policy receives either the original instruction for
            direct execution or a bounded subtask selected by the high-level
            policy, keeping the control interface consistent across both
            settings.
          </p>
          <p>
            A shared 40-dimensional interface supports end-effector motion,
            arm joints, grippers, waist, and mobile base across fixed-base,
            bimanual, and mobile platforms. Each embodiment maps its available
            state and control dimensions into this representation while masking
            unused slots, providing a common interface for adaptation across
            diverse robot configurations.
          </p>
          <p>
            Training combines 40,115 hours of heterogeneous real-world robot
            experience with multimodal data to establish a shared pretrained
            foundation across tasks and embodiments. Each deployment is then
            fine-tuned separately for its target setting. The ARX and Franka
            rollouts below illustrate these adapted policies on distinct robot
            configurations.
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
          <h2>Scaling Robot Intelligence Through Next-Subtask Prediction</h2>
          <p>
            A low-level VLA can reliably map observations to action chunks, yet
            still fail when it cannot determine whether those actions
            correspond to the right stage of a long-horizon task. Conversely, a
            high-level policy can propose plausible plans but fail without
            feedback about what actually happened. <TauName /> connects the two:
            a high-level policy that tracks progress and predicts outcomes,
            paired with an executor that grounds selected subtasks in robot
            actions.
          </p>
          <p>
            The interface between them is the subtask. <TauName /> plans at the
            subtask level, predicts possible outcomes, selects a decision,
            executes it, and updates its state from subsequent observations. For
            long-horizon robots, this transforms instruction following from
            executing isolated steps into continuously tracking progress through
            a task.
          </p>
          <p>
            Future systems can extend this closed loop to richer tasks and
            longer deployments, where robots decide when to deliberate, verify
            outcomes, and revise their plans before small errors compound into
            task-level failures.
          </p>
          <a className="blog-paper-link" href="/tau0-vla.pdf" target="_blank">
            Read the paper ↗
          </a>
        </section>

      </article>

      <footer className="blog-footer">
        <strong><TauName /></strong>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}

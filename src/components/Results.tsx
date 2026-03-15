import { Award, Compass, Activity, SlidersHorizontal, UserCheck, GitBranch, BarChart3 } from "lucide-react";
import "./Results.css";

export function Results() {
  const results = [
    "Clear positioning",
    "Increased inbound conversations",
    "Sharper brand perception",
    "Content that feels intentional",
    "A system — not chaos",
  ];

  const fluxReasons = [
    {
      icon: Compass,
      title: "Narrative Architecture",
      description:
        "We don’t just create content; we build the map. We bridge the gap between your raw expertise and your audience’s psychological needs.",
    },
    {
      icon: Activity,
      title: "Psychological Resonance",
      description:
        "Every word is engineered to build immediate authority. We architect how your audience perceives you, ensuring your voice sticks.",
    },
    {
      icon: SlidersHorizontal,
      title: "Adaptive Scoping",
      description:
        "Forget rigid, bloated packages. We identify your specific growth bottleneck and build a custom scope to solve it—nothing more, nothing less.",
    },
    {
      icon: UserCheck,
      title: "Founder Alignment",
      description:
        'We understand the nuance of personal branding. We capture your "soul" and translate it into a strategy that feels genuine, not manufactured.',
    },
    {
      icon: GitBranch,
      title: "Content Ecosystems",
      description:
        "A narrative shouldn't break across platforms. We build cohesive systems that scale your message from LinkedIn to deep-dive newsletters.",
    },
    {
      icon: BarChart3,
      title: "Revenue-Led Logic",
      description:
        "Content is a business asset, not a vanity project. Every narrative pivot is aligned with your specific revenue goals and growth targets.",
    },
  ];

  return (
    <section id="Results" className="results-section">
      <div className="gradient-mesh-results" />

      <div className="results-container">

        <div className="results-header">
          <h2 className="results-title">
            Measurable
            <br />
            <span className="results-highlight">Results</span>
          </h2>
        </div>

        <div className="results-list">
          {results.map((result, index) => (
            <div key={index} className="result-item">
              <div className="result-number">
                {String(index + 1).padStart(2, "0")}
              </div>
              <span className="result-text">{result}</span>
              <div className="result-accent" />
            </div>
          ))}
        </div>

        <div className="results-cta">
          <p className="cta-text">
            Not a promise. <span className="cta-highlight">A guarantee.</span>
          </p>
        </div>

        {/* Custom Scopes Section */}
{/* 
        <div className="custom-scope">
          <h3 className="scope-title">Custom Scopes. Real Results.</h3>
          <p className="scope-description">
            We build roadmaps based on your current revenue targets and audience psychology.
            Tell us where you are, and we’ll show you the next step.
          </p>

          <button className="scope-button">
            Start Your 2-Minute Narrative Audit
          </button>

          <p className="scope-note">
            This is the inquiry form that asks for information from people filling it.
          </p>
        </div> */}

        {/* Why Founders Choose The Flux */}

        <div className="flux-section">
          <h3 className="flux-title">
            Why Founders and Strategists Choose The Flux
          </h3>

          <p className="flux-intro">
            Once you build a narrative that resonates, you stop chasing attention
            and start commanding it.
          </p>

          <div className="flux-grid">
            {fluxReasons.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={index} className="flux-card">
                  <div className="flux-icon">
                    <Icon size={20} />
                  </div>

                  <h4 className="flux-card-title">{item.title}</h4>

                  <p className="flux-card-description">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* <div className="flux-cta">
            <button className="scope-button">
              Start Your 2-Minute Narrative Audit
            </button>
          </div> */}
        </div>

      </div>
    </section>
  );
}









// import { Award } from "lucide-react";
// import "./Results.css";

// export function Results() {
//   const results = [
//     "Clear positioning",
//     "Increased inbound conversations",
//     "Sharper brand perception",
//     "Content that feels intentional",
//     "A system — not chaos",
//   ];

//   return (
//     <section id="results" className="results-section">
//       <div className="gradient-mesh-results" />

//       <div className="results-container">

//         <div className="results-header">
//           {/* <div className="results-badge">
//             <Award size={18} />
//             <span>What Clients Actually Get</span>
//           </div> */}
//           <h2 className="results-title">
//             Measurable
//             <br />
//             <span className="results-highlight">Results</span>
//           </h2>
//         </div>

//         <div className="results-list">
//           {results.map((result, index) => (
//             <div key={index} className="result-item">
//               <div className="result-number">{String(index + 1).padStart(2, "0")}</div>
//               <span className="result-text">{result}</span>
//               <div className="result-accent" />
//             </div>
//           ))}
//         </div>

//         <div className="results-cta">
//           <p className="cta-text">
//             Not a promise. <span className="cta-highlight">A guarantee.</span>
//           </p>
//         </div>

//       </div>
//     </section>
//   );
// }
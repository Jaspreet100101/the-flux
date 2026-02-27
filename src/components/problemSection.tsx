import "./Problem.css";

const features = [
  {
    icon: "⊞",
    title: "Quality Checks",
    desc: "Every video is handled by a pro before it reaches you. Flawless every time.",
  },
  {
    icon: "◎",
    title: "Lightning Fast Delivery",
    desc: "Your professionally edited video is ready within 48 hours — No Delays, No Drama.",
  },
  {
    icon: "⟳",
    title: "Simple, Flat Pricing",
    desc: "No hidden fees, no surprises — just clear, predictable pricing that works for you.",
  },
  {
    icon: "✦",
    title: "Random Reels",
    desc: "Short-form content handled with strategy, not guesswork.",
  },
  {
    icon: "⟡",
    title: "Trend Chasing",
    desc: "We build narratives that last — not spikes that fade.",
  },
  {
    icon: "◉",
    title: "Consistent Voice",
    desc: "Your brand identity stays sharp across every piece of content.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="problem-section">
      <div className="gradient-mesh-problem" />

      <div className="problem-container">

        <div className="problem-header">
          <span className="problem-badge">Features</span>

          <h2 className="problem-title">
            Reasons <span className="problem-highlight">Creators</span> and{" "}
            <span className="problem-highlight">Brands</span> Choose Us
          </h2>

          <p className="problem-subtitle">
            Once you try it, you'll never go anywhere else for video editing. Seriously.
          </p>
        </div>

        <div className="problems-list">
          {features.map((feature, index) => (
            <div key={index} className="problem-item">
              <div className="problem-icon">
                <span>{feature.icon}</span>
              </div>

              <p className="problem-item-title">{feature.title}</p>

              <span className="problem-text">{feature.desc}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
import { TrendingUp, Zap, Brain } from "lucide-react";
import "./Investment.css";

interface InvestProps {
  onOpenModal: () => void;
}

export function Investment({ onOpenModal }: InvestProps) {
  const factors = [
    {
      icon: TrendingUp,
      label: "Scope",
      description: "From positioning to full-scale execution.",
    },
    {
      icon: Zap,
      label: "Intensity",
      description: "Monthly sprints to continuous partnership.",
    },
    {
      icon: Brain,
      label: "Narrative Complexity",
      description: "Emerging brands to established market leaders.",
    },
  ];

  return (
    <section id="investment" className="investment-section">
      <div className="gradient-mesh-investment" />

      <div className="investment-container">

        <div className="investment-header">
          <h2 className="investment-title">
            Investments Are
            <br />
            <span className="investment-highlight">Customized</span>
          </h2>
        </div>

        <p className="investment-statement">
          Engagements are built around your specific needs — not generic packages.
        </p>

        <div className="factors-grid">
          {factors.map((factor, index) => {
            const Icon = factor.icon;
            return (
              <div key={index} className="factor-card">
                <div className="factor-icon-wrapper">
                  <Icon size={28} className="factor-icon" />
                </div>

                <h3 className="factor-label">{factor.label}</h3>

                <p className="factor-description">{factor.description}</p>
              </div>
            );
          })}
        </div>

        <div className="investment-cta-wrapper">
          <p className="cta-statement">
            Ready to explore what's possible?
          </p>

          <button className="cta-button" onClick={onOpenModal}>
            Request a Strategy Call
          </button>

          <p className="cta-subtext">
            We'll assess your situation, timeline, and goals.
            <br />
            No obligation. Just clarity.
          </p>
        </div>

      </div>
    </section>
  );
}
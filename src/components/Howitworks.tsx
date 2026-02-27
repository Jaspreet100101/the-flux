import { MessageSquare, Lightbulb, Rocket } from "lucide-react";
import "./HowItWorks.css";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: MessageSquare,
      title: "Strategy Call",
      description: "We assess alignment, positioning, and leverage potential.",
    },
    {
      number: "02",
      icon: Lightbulb,
      title: "Custom Narrative Blueprint",
      description: "If aligned, we craft a tailored proposal built around your objectives.",
    },
    {
      number: "03",
      icon: Rocket,
      title: "Structured Execution",
      description: "Clear deliverables. Clear timelines. Clear outcomes.",
    },
  ];

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="gradient-mesh-how-it-works" />

      <div className="how-it-works-container">

        <div className="how-it-works-header">
          <h2 className="how-it-works-title">
            How Engagements
            <br />
            <span className="how-it-works-highlight">Work</span>
          </h2>
        </div>

        <div className="steps-wrapper">
          <div className="steps-connector" />

          <div className="steps-grid">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="step-card">
                  <div className="step-number-bg" />
                  <div className="step-number">{step.number}</div>
                  <div className="step-icon-wrapper">
                    <Icon size={32} className="step-icon" />
                  </div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                  <div className="step-accent" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="how-it-works-footer">
          <p className="footer-statement">
            No guessing. <span className="footer-accent">No surprises.</span>
            <br />
            <span className="footer-secondary">Just clarity and results.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
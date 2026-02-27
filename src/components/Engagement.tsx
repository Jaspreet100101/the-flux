import { Handshake, Lightbulb, Zap } from "lucide-react";
import "./Engagement.css";

export function Engagement() {
  const engagementTypes = [
    {
      icon: Lightbulb,
      stage: "Stage One",
      title: "Positioning Clarity",
      description:
        "Some need to understand their unique market position and core narrative foundation.",
      color: "blue",
    },
    {
      icon: Zap,
      stage: "Stage Two",
      title: "Narrative Infrastructure",
      description:
        "Some need structured content systems and distribution frameworks that compound.",
      color: "purple",
    },
    {
      icon: Handshake,
      stage: "Stage Three",
      title: "Full-Scale Execution",
      description:
        "Some need complete authority engines with execution and distribution alignment.",
      color: "pink",
    },
  ];

  return (
    <section id="engagement" className="engagement-section">
      <div className="gradient-mesh-engagement" />

      <div className="engagement-container">

        <div className="engagement-header">
          <h2 className="engagement-title">
            Strategic
            <br />
            <span className="engagement-highlight">Partnerships.</span>
            <br />
            Not Packages.
          </h2>
          <p className="engagement-subtitle">
            Every brand we work with is at a different stage.
          </p>
        </div>

        <div className="engagement-types">
          {engagementTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <div
                key={index}
                className={`engagement-card engagement-${type.color}`}
              >
                <div className="engagement-stage">{type.stage}</div>

                <div className="engagement-icon-wrapper">
                  <Icon size={32} className="engagement-icon" />
                </div>

                <h3 className="engagement-card-title">{type.title}</h3>

                <p className="engagement-card-description">
                  {type.description}
                </p>

                <div className="engagement-accent" />
              </div>
            );
          })}
        </div>

        <div className="engagement-philosophy">
          <p className="philosophy-text">
            We don't sell <span className="philosophy-strike">plans</span>.
            <br />
            <span className="philosophy-highlight">We design solutions.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
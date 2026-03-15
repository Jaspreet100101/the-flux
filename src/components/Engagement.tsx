import { Handshake, Lightbulb, Zap } from "lucide-react";
import "./Engagement.css";

export function Engagement() {
  const engagementTypes = [
    {
      icon: Lightbulb,
      stage: "Phase 01",
      title: "Emergent",
      description:
        "For brands finding their voice. We focus on psychological positioning and building the audience foundation, bridging the gap between what you do and why they care.",
      color: "blue",
    },
    {
      icon: Zap,
      stage: "Phase 02",
      title: "Established",
      description:
        "For brands ready to dominate. We build content ecosystems and high-intent conversion systems to scale reach without losing your brand’s soul.",
      color: "purple",
    },
    {
      icon: Handshake,
      stage: "Custom Scope",
      title: "Strategic Execution",
      description:
        "We don’t offer fixed packages. Every engagement is scoped around your exact bottleneck so the solution solves the real constraint holding your growth back.",
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
            We build scopes around your bottleneck — nothing more, nothing less.
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
            We don't sell <span className="philosophy-strike">packages</span>.
            <br />
            <span className="philosophy-highlight">We design solutions.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
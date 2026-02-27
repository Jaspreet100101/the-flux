import { Zap, Heart, Crown, Cog } from "lucide-react";
import "./Differentiation.css";

export function Differentiation() {
  const differentiators = [
    {
      icon: Zap,
      title: "Built for Leverage",
      description: "Every piece moves perception forward.",
    },
    {
      icon: Heart,
      title: "Retention-First Strategy",
      description: "We optimize for depth, not dopamine spikes.",
    },
    {
      icon: Crown,
      title: "Positioning Over Popularity",
      description: "Attention without authority is fragile.",
    },
    {
      icon: Cog,
      title: "Systemized Growth",
      description: "No random posting. Structured compounding.",
    },
  ];

  return (
    <section id="differentiation" className="differentiation-section">
      <div className="gradient-mesh-differentiation" />

      <div className="differentiation-container">

        <div className="differentiation-header">
          <h2 className="differentiation-tagline">
            <span className="tagline-primary">Psychology dictates.</span>
            <br />
            <span className="tagline-secondary">Systems execute.</span>
          </h2>
        </div>

        <div className="differentiators-grid">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="differentiator-card">
                <div className="card-icon-wrapper">
                  <Icon size={28} className="card-icon" />
                </div>

                <h3 className="card-title">{item.title}</h3>

                <p className="card-description">{item.description}</p>

                <div className="card-accent" />
              </div>
            );
          })}
        </div>

        <div className="differentiation-footer">
          <p className="footer-text">
            This is how we build{" "}
            <span className="footer-highlight">brands that last.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
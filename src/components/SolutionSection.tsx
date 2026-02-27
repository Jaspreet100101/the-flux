import { Check } from "lucide-react";
import "./Solution.css";

export function Solution() {
  const benefits = [
    "Clarify your positioning",
    "Turn content into inbound leverage",
    "Increase retention and trust",
    "Compound your digital presence",
  ];

  return (
    <section id="solution" className="solution-section">
      <div className="gradient-mesh-solution" />

      <div className="solution-container">

        <div className="solution-header">
          <p className="solution-intro">
            We don't edit videos.
            <br />
            <span className="solution-intro-highlight">
              We design narrative systems.
            </span>
          </p>
        </div>

        <div className="solution-content">
          <h2 className="solution-title">
            The Flux builds{" "}
            <span className="solution-highlight">authority engines</span> —
            structured, repeatable content systems that:
          </h2>
        </div>

        <div className="benefits-list">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-item">
              <div className="benefit-icon">
                <Check size={20} strokeWidth={3} />
              </div>
              <span className="benefit-text">{benefit}</span>
            </div>
          ))}
        </div>

        <div className="solution-conclusion">
          <p className="conclusion-text">
            This is not{" "}
            <span className="conclusion-emphasis">volume editing.</span>
            <br />
            <span className="conclusion-highlight">This is controlled growth.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
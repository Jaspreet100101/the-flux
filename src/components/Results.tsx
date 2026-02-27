import { Award } from "lucide-react";
import "./Results.css";

export function Results() {
  const results = [
    "Clear positioning",
    "Increased inbound conversations",
    "Sharper brand perception",
    "Content that feels intentional",
    "A system — not chaos",
  ];

  return (
    <section id="results" className="results-section">
      <div className="gradient-mesh-results" />

      <div className="results-container">

        <div className="results-header">
          <div className="results-badge">
            <Award size={18} />
            <span>What Clients Actually Get</span>
          </div>
          <h2 className="results-title">
            Measurable
            <br />
            <span className="results-highlight">Results</span>
          </h2>
        </div>

        <div className="results-list">
          {results.map((result, index) => (
            <div key={index} className="result-item">
              <div className="result-number">{String(index + 1).padStart(2, "0")}</div>
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

      </div>
    </section>
  );
}
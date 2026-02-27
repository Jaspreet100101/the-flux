import { motion } from "framer-motion";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="results" className="results-section">
      <div className="gradient-mesh-results" />

      <div className="results-container">
        {/* Results Header */}
        <motion.div
          className="results-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="results-badge">
            <Award size={18} />
            <span>What Clients Actually Get</span>
          </div>
          <h2 className="results-title">
            Measurable
            <br />
            <span className="results-highlight">Results</span>
          </h2>
        </motion.div>

        {/* Results List */}
        <motion.div
          className="results-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {results.map((result, index) => (
            <motion.div
              key={index}
              className="result-item"
            //   variants={itemVariants}
            >
              <div className="result-number">{String(index + 1).padStart(2, "0")}</div>
              <span className="result-text">{result}</span>
              <div className="result-accent" />
            </motion.div>
          ))}
        </motion.div>

        {/* Results CTA */}
        <motion.div
          className="results-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="cta-text">
            Not a promise. <span className="cta-highlight">A guarantee.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
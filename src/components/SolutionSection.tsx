import { motion } from "framer-motion";
import { Check } from "lucide-react";
import "./Solution.css";

export function Solution() {
  const benefits = [
    "Clarify your positioning",
    "Turn content into inbound leverage",
    "Increase retention and trust",
    "Compound your digital presence",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="solution" className="solution-section">
      <div className="gradient-mesh-solution" />

      <div className="solution-container">
        {/* Solution Header */}
        <motion.div
          className="solution-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="solution-intro">
            We don't edit videos.
            <br />
            <span className="solution-intro-highlight">
              We design narrative systems.
            </span>
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="solution-content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="solution-title">
            The Flux builds{" "}
            <span className="solution-highlight">authority engines</span> —
            structured, repeatable content systems that:
          </h2>
        </motion.div>

        {/* Benefits List */}
        <motion.div
          className="benefits-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="benefit-item"
            //   variants={itemVariants}
            >
              <div className="benefit-icon">
                <Check size={20} strokeWidth={3} />
              </div>
              <span className="benefit-text">{benefit}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Solution Conclusion */}
        <motion.div
          className="solution-conclusion"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="conclusion-text">
            This is not{" "}
            <span className="conclusion-emphasis">volume editing.</span>
            <br />
            <span className="conclusion-highlight">This is controlled growth.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
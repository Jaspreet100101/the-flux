import { motion } from "framer-motion";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const factorVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="investment" className="investment-section">
      <div className="gradient-mesh-investment" />

      <div className="investment-container">
        {/* Header */}
        <motion.div
          className="investment-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="investment-title">
            Investments Are
            <br />
            <span className="investment-highlight">Customized</span>
          </h2>
        </motion.div>

        {/* Main Statement */}
        <motion.p
          className="investment-statement"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Engagements are built around your specific needs — not generic packages.
        </motion.p>

        {/* Factors Grid */}
        <motion.div
          className="factors-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {factors.map((factor, index) => {
            const Icon = factor.icon;
            return (
              <motion.div
                key={index}
                className="factor-card"
                // variants={factorVariants}
              >
                <div className="factor-icon-wrapper">
                  <Icon size={28} className="factor-icon" />
                </div>

                <h3 className="factor-label">{factor.label}</h3>

                <p className="factor-description">{factor.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="investment-cta-wrapper"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}
import { motion } from "framer-motion";
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="engagement" className="engagement-section">
      <div className="gradient-mesh-engagement" />

      <div className="engagement-container">
        {/* Header */}
        <motion.div
          className="engagement-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
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
        </motion.div>

        {/* Engagement Types */}
        <motion.div
          className="engagement-types"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {engagementTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={index}
                className={`engagement-card engagement-${type.color}`}
                // variants={cardVariants}
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
              </motion.div>
            );
          })}
        </motion.div>

        {/* Philosophy Footer */}
        <motion.div
          className="engagement-philosophy"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="philosophy-text">
            We don't sell <span className="philosophy-strike">plans</span>.
            <br />
            <span className="philosophy-highlight">We design solutions.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
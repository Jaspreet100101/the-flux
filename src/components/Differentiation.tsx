import { motion } from "framer-motion";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="differentiation" className="differentiation-section">
      <div className="gradient-mesh-differentiation" />

      <div className="differentiation-container">
        {/* Header */}
        <motion.div
          className="differentiation-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="differentiation-tagline">
            <span className="tagline-primary">Psychology dictates.</span>
            <br />
            <span className="tagline-secondary">Systems execute.</span>
          </h2>
        </motion.div>

        {/* Differentiators Grid */}
        <motion.div
          className="differentiators-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="differentiator-card"
                // variants={cardVariants}
              >
                <div className="card-icon-wrapper">
                  <Icon size={28} className="card-icon" />
                </div>

                <h3 className="card-title">{item.title}</h3>

                <p className="card-description">{item.description}</p>

                <div className="card-accent" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer Statement */}
        <motion.div
          className="differentiation-footer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="footer-text">
            This is how we build{" "}
            <span className="footer-highlight">brands that last.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
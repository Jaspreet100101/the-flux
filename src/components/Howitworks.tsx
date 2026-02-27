import { motion } from "framer-motion";
import { MessageSquare, Lightbulb, Rocket } from "lucide-react";
import "./HowItWorks.css";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: MessageSquare,
      title: "Strategy Call",
      description:
        "We assess alignment, positioning, and leverage potential.",
    },
    {
      number: "02",
      icon: Lightbulb,
      title: "Custom Narrative Blueprint",
      description:
        "If aligned, we craft a tailored proposal built around your objectives.",
    },
    {
      number: "03",
      icon: Rocket,
      title: "Structured Execution",
      description:
        "Clear deliverables. Clear timelines. Clear outcomes.",
    },
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

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="gradient-mesh-how-it-works" />

      <div className="how-it-works-container">
        {/* Header */}
        <motion.div
          className="how-it-works-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="how-it-works-title">
            How Engagements
            <br />
            <span className="how-it-works-highlight">Work</span>
          </h2>
        </motion.div>

        {/* Steps Container */}
        <div className="steps-wrapper">
          {/* Connecting Line */}
          <motion.div
            className="steps-connector"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          />

          {/* Steps Grid */}
          <motion.div
            className="steps-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  className="step-card"
                //   variants={stepVariants}
                >
                  {/* Step Number Background */}
                  <div className="step-number-bg" />

                  {/* Step Number */}
                  <div className="step-number">{step.number}</div>

                  {/* Icon */}
                  <div className="step-icon-wrapper">
                    <Icon size={32} className="step-icon" />
                  </div>

                  {/* Title */}
                  <h3 className="step-title">{step.title}</h3>

                  {/* Description */}
                  <p className="step-description">{step.description}</p>

                  {/* Accent Line */}
                  <div className="step-accent" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Footer Statement */}
        <motion.div
          className="how-it-works-footer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="footer-statement">
            No guessing. <span className="footer-accent">No surprises.</span>
            <br />
            <span className="footer-secondary">Just clarity and results.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
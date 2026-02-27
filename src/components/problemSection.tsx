import { motion } from "framer-motion";
import "./Problem.css";

const features = [
  {
    icon: "⊞",
    title: "Quality Checks",
    desc: "Every video is handled by a pro before it reaches you. Flawless every time.",
  },
  {
    icon: "◎",
    title: "Lightning Fast Delivery",
    desc: "Your professionally edited video is ready within 48 hours — No Delays, No Drama.",
  },
  {
    icon: "⟳",
    title: "Simple, Flat Pricing",
    desc: "No hidden fees, no surprises — just clear, predictable pricing that works for you.",
  },
  {
    icon: "✦",
    title: "Random Reels",
    desc: "Short-form content handled with strategy, not guesswork.",
  },
  {
    icon: "⟡",
    title: "Trend Chasing",
    desc: "We build narratives that last — not spikes that fade.",
  },
  {
    icon: "◉",
    title: "Consistent Voice",
    desc: "Your brand identity stays sharp across every piece of content.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export function Problem() {
  return (
    <section id="problem" className="problem-section">
      <div className="gradient-mesh-problem" />

      <div className="problem-container">
        {/* Header */}
        <motion.div
          className="problem-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="problem-badge">Features</span>

          <h2 className="problem-title">
            Reasons <span className="problem-highlight">Creators</span> and{" "}
            <span className="problem-highlight">Brands</span> Choose Us
          </h2>

          <p className="problem-subtitle">
            Once you try it, you'll never go anywhere else for video editing.
            Seriously.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="problems-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="problem-item"
              // variants={itemVariants}
            >
              <div className="problem-icon">
                <span>{feature.icon}</span>
              </div>

              <p className="problem-item-title">{feature.title}</p>

              <span className="problem-text">{feature.desc}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
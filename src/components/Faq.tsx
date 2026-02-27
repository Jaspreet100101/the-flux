import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import "./FAQ.css";

export function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do you just edit videos?",
      answer:
        "No. Editing is execution. We build positioning systems — the strategic narrative frameworks that guide every piece of content you create. Editing without positioning is just noise with better production value.",
    },
    {
      question: "Is this for beginners?",
      answer:
        "We work with operators serious about long-term brand leverage. Whether you're a founder, creator, or established brand, you need to be committed to building real authority — not chasing quick wins.",
    },
    {
      question: "What platforms do you focus on?",
      answer:
        "Short-form dominant ecosystems — where perception compounds fastest. That's where the leverage lives. But your positioning system works across all channels because it's built on your core narrative, not platform trends.",
    },
    {
      question: "Do you guarantee virality?",
      answer:
        "No. We design authority. Virality is fragile and dependent on algorithms. Authority is built. It lasts. It compounds. That's what creates real, sustainable growth for your brand.",
    },
  ];

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="faq" className="faq-section">
      <div className="gradient-mesh-faq" />

      <div className="faq-container">
        {/* Header */}
        <motion.div
          className="faq-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="faq-title">
            Common
            <br />
            <span className="faq-highlight">Questions</span>
          </h2>
          <p className="faq-subtitle">
            Clear answers. No fluff.
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          className="faq-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`faq-item ${expandedIndex === index ? "expanded" : ""}`}
            //   variants={itemVariants}
            >
              {/* Question */}
              <button
                className="faq-question"
                onClick={() => toggleExpanded(index)}
                aria-expanded={expandedIndex === index}
              >
                <span className="question-text">{faq.question}</span>
                <motion.div
                  className="chevron-icon"
                  animate={{
                    rotate: expandedIndex === index ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={24} />
                </motion.div>
              </button>

              {/* Answer */}
              <motion.div
                className="faq-answer-wrapper"
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expandedIndex === index ? "auto" : 0,
                  opacity: expandedIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="faq-answer">{faq.answer}</div>
              </motion.div>

              {/* Divider */}
              <div className="faq-divider" />
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Footer */}
        <motion.div
          className="faq-footer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="footer-text">
            Still have questions?
            <br />
            <span className="footer-link-text">Let's talk during a Strategy Call.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
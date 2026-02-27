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

  return (
    <section id="faq" className="faq-section">
      <div className="gradient-mesh-faq" />

      <div className="faq-container">

        <div className="faq-header">
          <h2 className="faq-title">
            Common
            <br />
            <span className="faq-highlight">Questions</span>
          </h2>
          <p className="faq-subtitle">Clear answers. No fluff.</p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${expandedIndex === index ? "expanded" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleExpanded(index)}
                aria-expanded={expandedIndex === index}
              >
                <span className="question-text">{faq.question}</span>
                <ChevronDown size={24} className="chevron-icon" />
              </button>

              <div className="faq-answer-wrapper">
                <div className="faq-answer">{faq.answer}</div>
              </div>

              <div className="faq-divider" />
            </div>
          ))}
        </div>

        <div className="faq-footer">
          <p className="footer-text">
            Still have questions?
            <br />
            <span className="footer-link-text">Let's talk during a Strategy Call.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
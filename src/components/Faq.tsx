
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import "./FAQ.css";

export function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do you just write content?",
      answer:
        "No. Writing is just the output. We architect positioning systems that ensure your expertise is actually perceived as value by your audience.",
    },
    {
      question: "Is this for beginners?",
      answer:
        "We partner with founders and operators who are past the 'experimental' phase. This is for those ready to turn their raw traction into long-term brand leverage.",
    },
    {
      question: "Which platforms do you focus on?",
      answer:
        "We build for dominant ecosystems—LinkedIn, high-intent newsletters, and Twitter. We go where your narrative can compound and turn followers into business assets.",
    },
    {
      question: "Do you guarantee virality?",
      answer:
        "No. Going viral is a vanity metric. We design authority. We’d rather you have 1,000 of the right people trusting you than a million people who forget you in ten seconds.",
    },
    {
      question: "How involved do I need to be?",
      answer:
        "Through our Founder-Sync process, your involvement is minimal. We capture your 'soul' and vision through brief, high-level touchpoints so you can stay in your zone of genius.",
    },
    {
      question: "Is my niche too technical?",
      answer:
        "The more complex, the better. We translate your logic into a narrative the market actually understands and values.",
    },
    {
      question: "How are you different from an agency?",
      answer:
        "Agencies sell noise; we sell leverage. We skip the vanity volume to focus on the 20% of content that builds 80% of your authority.",
    },
    {
      question: "Why trust you over a ghostwriter?",
      answer:
        "They guess; we architect. Our Founder-Sync process ensures it sounds like your voice, not a generic template.",
    },
    {
      question: "Do you handle distribution?",
      answer:
        "Yes, but only after fixing your positioning. Scaling a broken narrative is just an expensive way to be ignored.",
    },
    {
      question: "When do I see results?",
      answer:
        "Clarity is instant. Within 40 days, your engagement will shift from random likes to high-intent business conversations.",
    },
  ];

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="FAQ" className="faq-section">
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
// import { ChevronDown } from "lucide-react";
// import { useState } from "react";
// import "./FAQ.css";

// export function FAQ() {
//   const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

//   const faqs = [
//     {
//       question: "Do you just edit videos?",
//       answer:
//         "No. Editing is execution. We build positioning systems — the strategic narrative frameworks that guide every piece of content you create. Editing without positioning is just noise with better production value.",
//     },
//     {
//       question: "Is this for beginners?",
//       answer:
//         "We work with operators serious about long-term brand leverage. Whether you're a founder, creator, or established brand, you need to be committed to building real authority — not chasing quick wins.",
//     },
//     {
//       question: "What platforms do you focus on?",
//       answer:
//         "Short-form dominant ecosystems — where perception compounds fastest. That's where the leverage lives. But your positioning system works across all channels because it's built on your core narrative, not platform trends.",
//     },
//     {
//       question: "Do you guarantee virality?",
//       answer:
//         "No. We design authority. Virality is fragile and dependent on algorithms. Authority is built. It lasts. It compounds. That's what creates real, sustainable growth for your brand.",
//     },
//   ];

//   const toggleExpanded = (index: number) => {
//     setExpandedIndex(expandedIndex === index ? null : index);
//   };

//   return (
//     <section id="faq" className="faq-section">
//       <div className="gradient-mesh-faq" />

//       <div className="faq-container">

//         <div className="faq-header">
//           <h2 className="faq-title">
//             Common
//             <br />
//             <span className="faq-highlight">Questions</span>
//           </h2>
//           <p className="faq-subtitle">Clear answers. No fluff.</p>
//         </div>

//         <div className="faq-list">
//           {faqs.map((faq, index) => (
//             <div
//               key={index}
//               className={`faq-item ${expandedIndex === index ? "expanded" : ""}`}
//             >
//               <button
//                 className="faq-question"
//                 onClick={() => toggleExpanded(index)}
//                 aria-expanded={expandedIndex === index}
//               >
//                 <span className="question-text">{faq.question}</span>
//                 <ChevronDown size={24} className="chevron-icon" />
//               </button>

//               <div className="faq-answer-wrapper">
//                 <div className="faq-answer">{faq.answer}</div>
//               </div>

//               <div className="faq-divider" />
//             </div>
//           ))}
//         </div>

//         <div className="faq-footer">
//           <p className="footer-text">
//             Still have questions?
//             <br />
//             <span className="footer-link-text">Let's talk during a Strategy Call.</span>
//           </p>
//         </div>

//       </div>
//     </section>
//   );
// }
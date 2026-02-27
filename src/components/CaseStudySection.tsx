import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import "./CaseStudySection.css";

const caseStudies = [
  {
    client: "Nexus Digital",
    industry: "SaaS",
    challenge:
      "Struggling with inconsistent lead flow and low brand authority in a saturated market.",
    strategy:
      "Rebuilt positioning, launched authority content series, and implemented conversion-optimized funnels.",
    impact: "3x revenue in 8 months, 450% increase in qualified leads.",
  },
  {
    client: "Prism Studios",
    industry: "Creative Agency",
    challenge:
      "High-quality work but invisible to ideal clients; over-reliance on referrals.",
    strategy:
      "Brand repositioning, thought leadership content, and strategic outbound systems.",
    impact: "$1.2M in new contracts within 6 months.",
  },
  {
    client: "Zenith Coaching",
    industry: "Coaching",
    challenge:
      "Founder-dependent growth with no scalable client acquisition system.",
    strategy:
      "Built automated lead generation ecosystem with high-ticket funnel architecture.",
    impact: "From $30k to $150k/mo in recurring revenue.",
  },
];

export function CaseStudySection() {
  return (
    <section id="work" className="case-section">
      <div className="case-container">

        <motion.div
          className="case-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="case-title">Growth Stories</h2>
          <p className="case-subtext">
            Real results from businesses that trusted The Flux to engineer their growth.
          </p>
        </motion.div>

        <div className="case-wrapper">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.client}
              className="case-item"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="case-card">

                <div className="case-card-header">
                  <div>
                    <h3>{study.client}</h3>
                    <span className="industry">{study.industry}</span>
                  </div>
                  <div className="arrow-circle">
                    <ArrowRight size={18} />
                  </div>
                </div>

                <div className="case-content">
                  <div>
                    <span className="label">Challenge</span>
                    <p>{study.challenge}</p>
                  </div>

                  <div>
                    <span className="label">Strategy</span>
                    <p>{study.strategy}</p>
                  </div>

                  <div className="impact-section">
                    <span className="impact-label">Impact</span>
                    <p className="impact-text">{study.impact}</p>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}







// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";

// const caseStudies = [
//   {
//     client: "Nexus Digital",
//     industry: "SaaS",
//     challenge: "Struggling with inconsistent lead flow and low brand authority in a saturated market.",
//     strategy: "Rebuilt positioning, launched authority content series, and implemented conversion-optimized funnels.",
//     impact: "3x revenue in 8 months, 450% increase in qualified leads.",
//   },
//   {
//     client: "Prism Studios",
//     industry: "Creative Agency",
//     challenge: "High-quality work but invisible to ideal clients; over-reliance on referrals.",
//     strategy: "Brand repositioning, thought leadership content, and strategic outbound systems.",
//     impact: "$1.2M in new contracts within 6 months.",
//   },
//   {
//     client: "Zenith Coaching",
//     industry: "Coaching",
//     challenge: "Founder-dependent growth with no scalable client acquisition system.",
//     strategy: "Built automated lead generation ecosystem with high-ticket funnel architecture.",
//     impact: "From $30k to $150k/mo in recurring revenue.",
//   },
// ];

// export function CaseStudySection() {
//   return (
//     <section id="work" className="py-32 relative overflow-hidden">
//       <div className="container mx-auto px-6">
//         <motion.div
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-6">
//             Growth Stories
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Real results from businesses that trusted The Flux to engineer their growth.
//           </p>
//         </motion.div>

//         {/* Horizontal scroll on mobile, grid on desktop */}
//         <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide snap-x snap-mandatory">
//           {caseStudies.map((study, index) => (
//             <motion.div
//               key={study.client}
//               className="flex-shrink-0 w-[85vw] md:w-auto snap-center"
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: index * 0.15 }}
//             >
//               <div className="h-full p-8 rounded-2xl bg-card border border-[hsl(0_0%_100%/0.08)] hover:border-primary/30 transition-all duration-300 group">
//                 {/* Header */}
//                 <div className="flex items-center justify-between mb-6">
//                   <div>
//                     <h3 className="text-xl font-bold">{study.client}</h3>
//                     <span className="text-sm text-primary">{study.industry}</span>
//                   </div>
//                   <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
//                     <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-0.5 transition-transform" />
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="space-y-4">
//                   <div>
//                     <span className="text-xs text-muted-foreground uppercase tracking-wider">Challenge</span>
//                     <p className="text-sm text-foreground/80 mt-1">{study.challenge}</p>
//                   </div>
//                   <div>
//                     <span className="text-xs text-muted-foreground uppercase tracking-wider">Strategy</span>
//                     <p className="text-sm text-foreground/80 mt-1">{study.strategy}</p>
//                   </div>
//                   <div className="pt-4 border-t border-[hsl(0_0%_100%/0.08)]">
//                     <span className="text-xs text-primary uppercase tracking-wider">Impact</span>
//                     <p className="text-lg font-semibold mt-1">{study.impact}</p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

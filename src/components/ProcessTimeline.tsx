import { motion } from "framer-motion";
import { Eye, Layers, Zap, Target } from "lucide-react";
import "./ProcessTimeline.css";

const steps = [
  {
    number: "01",
    title: "Diagnose",
    description:
      "We audit positioning, audience leverage, and growth intent.",
    icon: Eye,
  },
  {
    number: "02",
    title: "Architect",
    description:
      "We design your narrative structure and content frameworks.",
    icon: Layers,
  },
  {
    number: "03",
    title: "Execute",
    description:
      "We produce and refine high-impact content.",
    icon: Zap,
  },
  {
    number: "04",
    title: "Compound",
    description:
      "We optimize for authority, not vanity metrics.",
    icon: Target,
  },
];

export function ProcessTimeline() {
  return (
    <section id="Approach" className="process-section">
      <div className="process-container">

        <motion.div
          className="process-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>How It Works</h2>
          <p>
            A proven framework for building sustainable, scalable growth systems.
          </p>
        </motion.div>

        <div className="timeline-wrapper">
          <div className="timeline-line" />

          <div className="timeline-steps">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className={`timeline-step ${
                  index % 2 === 1 ? "reverse" : ""
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Content */}
                <div className="timeline-content">
                  <span className="step-number">
                    STEP {step.number}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>

                {/* Icon */}
                <div className="timeline-icon-wrapper">
                  <motion.div
                    className="timeline-icon"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <step.icon size={30} />
                  </motion.div>
                </div>

                {/* Spacer */}
                <div className="timeline-spacer" />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
// import { motion } from "framer-motion";
// import { Search, Compass, Rocket, TrendingUp } from "lucide-react";

// const steps = [
//   {
//     number: "01",
//     title: "Discovery & Positioning Audit",
//     description: "We audit brand positioning, audience psychology, and revenue bottlenecks.",
//     icon: Search,
//   },
//   {
//     number: "02",
//     title: "Strategy Engineering",
//     description: "We design tailored growth frameworks aligned with your market and expansion goals.",
//     icon: Compass,
//   },
//   {
//     number: "03",
//     title: "Execution Deployment",
//     description: "Content, funnels, and marketing systems are built and launched.",
//     icon: Rocket,
//   },
//   {
//     number: "04",
//     title: "Optimization & Scale",
//     description: "Continuous testing, analytics monitoring, and growth amplification.",
//     icon: TrendingUp,
//   },
// ];

// export function ProcessTimeline() {
//   return (
//     <section id="process" className="py-32 bg-secondary/30">
//       <div className="container mx-auto px-6">
//         <motion.div
//           className="text-center mb-20"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-6">
//             Our Growth Execution Model
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             A proven framework for building sustainable, scalable growth systems.
//           </p>
//         </motion.div>

//         <div className="relative">
//           {/* Timeline line */}
//           <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[hsl(0_0%_100%/0.1)]" />

//           <div className="space-y-16 md:space-y-24">
//             {steps.map((step, index) => (
//               <motion.div
//                 key={step.number}
//                 className={`flex flex-col md:flex-row items-center gap-8 ${
//                   index % 2 === 1 ? "md:flex-row-reverse" : ""
//                 }`}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: index * 0.15 }}
//               >
//                 {/* Content */}
//                 <div className={`flex-1 ${index % 2 === 1 ? "md:text-left" : "md:text-right"}`}>
//                   <div className={`max-w-md ${index % 2 === 1 ? "" : "md:ml-auto"}`}>
//                     <span className="text-primary text-sm font-semibold tracking-wider">
//                       STEP {step.number}
//                     </span>
//                     <h3 className="text-2xl font-bold mt-2 mb-4">{step.title}</h3>
//                     <p className="text-muted-foreground leading-relaxed">
//                       {step.description}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Icon */}
//                 <div className="relative z-10">
//                   <motion.div
//                     className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center"
//                     whileHover={{ scale: 1.1, rotate: 5 }}
//                   >
//                     <step.icon className="w-8 h-8 text-primary" />
//                   </motion.div>
//                 </div>

//                 {/* Spacer for alternating layout */}
//                 <div className="flex-1 hidden md:block" />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

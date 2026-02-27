import { motion } from "framer-motion";
// import { Lightbulb, Film, Target } from "lucide-react";
import { Lightbulb, Film, Clapperboard, Target } from "lucide-react";
import { ServiceCard } from "./ServiceCard";
import "./ServicesSection.css";

// const services = [
//   {
//     title: "Strategic Growth Consulting",
//     description:
//       "We architect growth strategies rooted in positioning, market psychology, and scalable system design.",
//     icon: Lightbulb,
//   },
//   {
//     title: "Brand Authority & Content Scaling",
//     description:
//       "Cinematic storytelling, high-retention content, and authority-building brand narratives engineered for audience trust.",
//     icon: Film,
//   },
//   {
//     title: "Lead Generation & Conversion Systems",
//     description:
//       "Funnels, automation, and client acquisition systems built to convert attention into predictable revenue.",
//     icon: Target,
//   },
// ];
const services = [
  {
    title: "Brand Positioning Architecture",
    description:
      "Sharpen your identity, message, and strategic angle to create clear differentiation and market authority.",
    icon: Lightbulb,
  },
  {
    title: "Narrative Content Systems",
    description:
      "Recurring content frameworks engineered for retention, audience loyalty, and long-term authority building.",
    icon: Film,
  },
  {
    title: "High-Impact Short-Form Execution",
    description:
      "Strategic reels and clips designed to shape perception, elevate positioning, and drive meaningful engagement.",
    icon: Clapperboard, // or Film if you prefer keeping same import
  },
  {
    title: "Funnel-Driven Distribution",
    description:
      "Every piece of content aligned to a positioning objective and integrated into a revenue-focused funnel system.",
    icon: Target,
  },
];
export function ServicesSection() {
  return (
    <section id="Results" className="services-section">
      <div className="services-container">

        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* <h2 className="services-title">
            Growth Infrastructure Services
          </h2>

          <p className="services-subtext">
            Comprehensive systems designed to transform your business into a scalable growth engine.
          </p> */}
          <h2 className="services-title">
            Brand & Narrative Infrastructure
          </h2>

          <p className="services-subtext">
            Positioning architecture, content systems, and distribution frameworks engineered for authority and scalable impact.
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}





// import { motion } from "framer-motion";
// import { Lightbulb, Film, Target } from "lucide-react";
// import { ServiceCard } from "./ServiceCard";

// const services = [
//   {
//     title: "Strategic Growth Consulting",
//     description: "We architect growth strategies rooted in positioning, market psychology, and scalable system design.",
//     icon: Lightbulb,
//   },
//   {
//     title: "Brand Authority & Content Scaling",
//     description: "Cinematic storytelling, high-retention content, and authority-building brand narratives engineered for audience trust.",
//     icon: Film,
//   },
//   {
//     title: "Lead Generation & Conversion Systems",
//     description: "Funnels, automation, and client acquisition systems built to convert attention into predictable revenue.",
//     icon: Target,
//   },
// ];

// export function ServicesSection() {
//   return (
//     <section id="services" className="py-32 relative">
//       <div className="container mx-auto px-6">
//         <motion.div
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-6">
//             Growth Infrastructure Services
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Comprehensive systems designed to transform your business into a scalable growth engine.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {services.map((service, index) => (
//             <ServiceCard key={service.title} {...service} index={index} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

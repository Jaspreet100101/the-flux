
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import "./ServiceCard.css";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

export function ServiceCard({
  title,
  description,
  icon: Icon,
  index,
}: ServiceCardProps) {
  return (
    <motion.div
      className="service-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{
        boxShadow: "0 20px 60px -15px rgba(99, 102, 241, 0.2)",
      }}
    >
      {/* Hover Glow */}
      <div className="service-card-glow" />

      <div className="service-card-content">
        <div className="service-icon-wrapper">
          <Icon className="service-icon" />
        </div>

        <h3 className="service-title">{title}</h3>
        <p className="service-description">{description}</p>
      </div>
    </motion.div>
  );
}
// import { motion } from "framer-motion";
// import { LucideIcon } from "lucide-react";

// interface ServiceCardProps {
//   title: string;
//   description: string;
//   icon: LucideIcon;
//   index: number;
// }

// export function ServiceCard({ title, description, icon: Icon, index }: ServiceCardProps) {
//   return (
//     <motion.div
//       className="card-tilt group relative p-8 rounded-2xl bg-card border border-[hsl(0_0%_100%/0.08)] hover:border-primary/30 transition-all duration-300"
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6, delay: index * 0.15 }}
//       whileHover={{
//         boxShadow: "0 20px 60px -15px hsl(252 100% 67% / 0.2)",
//       }}
//     >
//       {/* Glow effect on hover */}
//       <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
//       <div className="relative z-10">
//         <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
//           <Icon className="w-7 h-7 text-primary" />
//         </div>
        
//         <h3 className="text-xl font-bold mb-4">{title}</h3>
//         <p className="text-muted-foreground leading-relaxed">{description}</p>
//       </div>
//     </motion.div>
//   );
// }

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import "./ConversionBlock.css";

interface ConversionBlockProps {
  onOpenModal: () => void;
}

export function ConversionBlock({ onOpenModal }: ConversionBlockProps) {
  return (
    <section id="FAQ" className="conversion-section">
      <div className="conversion-container">

        <motion.div
          className="conversion-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Background layers */}
          <div className="conversion-bg" />
          <div className="conversion-radial" />
          <div className="conversion-border" />

          <div className="conversion-content">

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="highlight">
                Build a Brand That Compounds.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              This isn't content outsourcing. It's narrative ownership.{" "}
              <br />
              Psychology dictates. Systems execute.
            </motion.p>

            <motion.button
              className="conversion-button"
              onClick={onOpenModal}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Strategy Call
              <ArrowRight size={20} className="arrow-icon" />
            </motion.button>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface ConversionBlockProps {
//   onOpenModal: () => void;
// }

// export function ConversionBlock({ onOpenModal }: ConversionBlockProps) {
//   return (
//     <section id="contact" className="py-32 relative">
//       <div className="container mx-auto px-6">
//         <motion.div
//           className="relative rounded-3xl overflow-hidden"
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//         >
//           {/* Background */}
//           <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-card to-card" />
//           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(252_100%_67%/0.2),transparent)]" />
          
//           {/* Border glow */}
//           <div className="absolute inset-0 rounded-3xl border border-primary/20" />

//           <div className="relative z-10 p-12 md:p-20 text-center">
//             <motion.h2
//               className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.2 }}
//             >
//               Ready to Engineer{" "}
//               <span className="text-primary">Predictable Growth?</span>
//             </motion.h2>

//             <motion.p
//               className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.3 }}
//             >
//               If your brand or business is serious about scaling influence, revenue, 
//               and client acquisition, The Flux builds the system behind it.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.4 }}
//             >
//               <Button variant="hero" size="xl" onClick={onOpenModal} className="group">
//                 Start Your Flux Growth System
//                 <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
//               </Button>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

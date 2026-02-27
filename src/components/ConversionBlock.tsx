import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import "./ConversionBlock.css";

interface ConversionBlockProps {
  onOpenModal: () => void;
}

export function ConversionBlock({ onOpenModal }: ConversionBlockProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="FAQ" className="conversion-section">
      <div className="conversion-container">

        <div ref={cardRef} className="conversion-card fade-up">
          {/* Background layers */}
          <div className="conversion-bg" />
          <div className="conversion-radial" />
          <div className="conversion-border" />

          <div className="conversion-content">

            <h2 className="stagger-1">
              <span className="highlight">
                Build a Brand That Compounds.
              </span>
            </h2>

            <p className="stagger-2">
              This isn't content outsourcing. It's narrative ownership.{" "}
              <br />
              Psychology dictates. Systems execute.
            </p>

            <button
              className="conversion-button stagger-3"
              onClick={onOpenModal}
            >
              Book a Strategy Call
              <ArrowRight size={20} className="arrow-icon" />
            </button>

          </div>
        </div>

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

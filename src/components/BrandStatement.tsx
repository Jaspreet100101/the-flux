import { motion } from "framer-motion";
import "./BrandStatement.css";

export function BrandStatement() {
  return (
    <section className="brand-section">

      {/* Background Gradient */}
      <div className="brand-gradient" />

      {/* Animated Glow */}
      {/* <motion.div
        className="brand-glow"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      /> */}

      <div className="brand-container">
        <motion.div
          className="brand-content"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>
            <span className="muted-line">
              We don't market brands.
            </span>

            <span className="primary-line glow-text">
              We build authority ecosystems.
            </span>
          </h2>
        </motion.div>
      </div>

    </section>
  );
}







// import { motion } from "framer-motion";

// export function BrandStatement() {
//   return (
//     <section className="py-40 relative overflow-hidden">
//       {/* Background gradient */}
//       <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
//       {/* Animated glow */}
//       <motion.div
//         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/10 blur-[150px]"
//         animate={{
//           scale: [1, 1.2, 1],
//           opacity: [0.3, 0.5, 0.3],
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />

//       <div className="container mx-auto px-6 relative z-10">
//         <motion.div
//           className="text-center"
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//         >
//           <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
//             <span className="block text-muted-foreground">We don't market brands.</span>
//             <span className="block mt-4 text-primary glow-text">
//               We build authority ecosystems.
//             </span>
//           </h2>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

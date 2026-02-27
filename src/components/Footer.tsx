import { motion } from "framer-motion";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >

          <div className="footer-logo">
            <div className="logo-main">The Flux</div>
            <div className="logo-subtitle">Narrative Systems Studio</div>
          </div>

          <nav className="footer-nav">
            <a href="#contact">Contact</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </nav>

          <p className="footer-copy">
            © The Flux
          </p>

        </motion.div>
      </div>
    </footer>
  );
}





// import { motion } from "framer-motion";
// import "./Footer.css";

// export function Footer() {
//   return (
//     <footer className="footer">
//       <div className="footer-container">

//         <motion.div
//           className="footer-content"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//         >

//           <div className="footer-logo">
//             THE FLUX
//           </div>

//           <nav className="footer-nav">
//             <a href="#Results">Results</a>
//             <a href="#work">Work</a>
//             <a href="#Approach">Approach</a>
//             <a href="#FAQ">FAQ</a>
//           </nav>

//           <p className="footer-copy">
//             © {new Date().getFullYear()} theflux. All rights reserved.
//           </p>

//         </motion.div>
//       </div>
//     </footer>
//   );
// }





// import { motion } from "framer-motion";

// export function Footer() {
//   return (
//     <footer className="py-12 border-t border-[hsl(0_0%_100%/0.08)]">
//       <div className="container mx-auto px-6">
//         <motion.div
//           className="flex flex-col md:flex-row items-center justify-between gap-6"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//         >
//           <div className="text-2xl font-bold">THE FLUX</div>
          
//           <div className="flex items-center gap-8">
//             <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//               Services
//             </a>
//             <a href="#work" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//               Work
//             </a>
//             <a href="#process" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//               Process
//             </a>
//             <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//               Contact
//             </a>
//           </div>

//           <p className="text-sm text-muted-foreground">
//             © {new Date().getFullYear()} The Flux. All rights reserved.
//           </p>
//         </motion.div>
//       </div>
//     </footer>
//   );
// }

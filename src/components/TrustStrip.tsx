import { motion } from "framer-motion";
import "./TrustStrip.css";

const rowOne = [
  { icon: "✦", label: "Cinematic Edits" },
  { icon: "🖥", label: "Event Recaps" },
  { icon: "🖵", label: "Commercials" },
  { icon: "☑", label: "Brand Videos" },
  { icon: "✦", label: "Short-Form Content" },
  { icon: "🎬", label: "Podcast Clips" },
  { icon: "📱", label: "Reels & TikToks" },
  { icon: "🎞", label: "Documentary Edits" },
];

const rowTwo = [
  { icon: "📈", label: "Snippets" },
  { icon: "🎙", label: "Podcasts" },
  { icon: "〜", label: "Talking Head" },
  { icon: "📷", label: "Explainer Videos" },
  { icon: "🎬", label: "Trailers" },
  { icon: "📱", label: "Reels" },
  { icon: "✦", label: "YouTube Edits" },
  { icon: "🖥", label: "Webinar Recaps" },
];

export function TrustStrip() {
  const row1 = [...rowOne, ...rowOne];
  const row2 = [...rowTwo, ...rowTwo];

  return (
    <section className="trust-section">

      {/* Header */}
      <div className="trust-header">
        <span className="trust-line" />
        <motion.p
          className="trust-text"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          Brands and creators trust The Flux 
        </motion.p>
        <span className="trust-line" />
      </div>

      {/* Row 1 — Right to Left */}
      <motion.div
        className="trust-scroll-wrapper"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        viewport={{ once: true }}
      >
        <ul className="trust-scroll trust-scroll--rtl">
          {row1.map((item, i) => (
            <li key={i} className="trust-logo">
              <span className="trust-logo-icon">{item.icon}</span>
              <span className="trust-logo-text">{item.label}</span>
              <span className="trust-sep" />
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Row 2 — Left to Right */}
      <motion.div
        className="trust-scroll-wrapper"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
        viewport={{ once: true }}
      >
        <ul className="trust-scroll trust-scroll--ltr">
          {row2.map((item, i) => (
            <li key={i} className="trust-logo">
              <span className="trust-logo-icon">{item.icon}</span>
              <span className="trust-logo-text">{item.label}</span>
              <span className="trust-sep" />
            </li>
          ))}
        </ul>
      </motion.div>

    </section>
  );
}



// import { motion } from "framer-motion";
// import "./TrustStrip.css";

// const logos = [
//   "VELOCITY",
//   "NEXUS",
//   "PRISM",
//   "AXIOM",
//   "ZENITH",
//   "PULSE",
//   "ORBIT",
//   "FORGE",
// ];

// export function TrustStrip() {
//   const doubled = [...logos, ...logos];

//   return (
//     <section className="trust-section">

//       <div className="trust-header">
//         <span className="trust-line" />
//         <motion.p
//           className="trust-text"
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//           viewport={{ once: true }}
//         >
//           Brands and creators trust The Flux to scale impact and revenue
//         </motion.p>
//         <span className="trust-line" />
//       </div>

//       <motion.div
//         className="trust-scroll-wrapper"
//         initial={{ opacity: 0, y: 16 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
//         viewport={{ once: true }}
//       >
//         <div className="trust-scroll">
//           {doubled.map((logo, index) => (
//             <div key={index} className="trust-logo">
//               <span className="trust-logo-text">{logo}</span>
//               <span className="trust-sep" />
//             </div>
//           ))}
//         </div>
//       </motion.div>

//     </section>
//   );
// }




// // import { motion } from "framer-motion";
// // import "./TrustStrip.css";

// // const logos = [
// //   "VELOCITY",
// //   "NEXUS",
// //   "PRISM",
// //   "AXIOM",
// //   "ZENITH",
// //   "PULSE",
// //   "ORBIT",
// //   "FORGE",
// // ];

// // export function TrustStrip() {
// //   return (
// //     <section className="trust-section">

// //       <div className="trust-header">
// //         <motion.p
// //           className="trust-text"
// //           initial={{ opacity: 0, y: 20 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true }}
// //         >
// //           Brands and creators trust The Flux to scale impact and revenue
// //         </motion.p>
// //       </div>

// //       {/* Scrolling Logos */}
// //       <div className="trust-scroll-wrapper">
// //         <div className="trust-scroll">
// //           {[...logos, ...logos].map((logo, index) => (
// //             <div key={index} className="trust-logo">
// //               {logo}
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //     </section>
// //   );
// // }








// // // import { motion } from "framer-motion";

// // // const logos = [
// // //   "VELOCITY",
// // //   "NEXUS",
// // //   "PRISM",
// // //   "AXIOM",
// // //   "ZENITH",
// // //   "PULSE",
// // //   "ORBIT",
// // //   "FORGE",
// // // ];

// // // export function TrustStrip() {
// // //   return (
// // //     <section className="py-16 border-y border-[hsl(0_0%_100%/0.08)] overflow-hidden bg-secondary/30">
// // //       <div className="container mx-auto px-6 mb-8">
// // //         <motion.p
// // //           className="text-center text-muted-foreground text-sm uppercase tracking-widest"
// // //           initial={{ opacity: 0, y: 20 }}
// // //           whileInView={{ opacity: 1, y: 0 }}
// // //           viewport={{ once: true }}
// // //         >
// // //           Brands and creators trust The Flux to scale impact and revenue
// // //         </motion.p>
// // //       </div>

// // //       {/* Scrolling logos */}
// // //       <div className="relative">
// // //         <div className="flex animate-scroll">
// // //           {[...logos, ...logos].map((logo, index) => (
// // //             <div
// // //               key={index}
// // //               className="flex-shrink-0 mx-12 text-2xl font-bold text-muted-foreground/40 hover:text-muted-foreground transition-colors duration-300"
// // //             >
// // //               {logo}
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }

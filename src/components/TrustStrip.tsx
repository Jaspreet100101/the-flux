import { motion } from "framer-motion";
import "./TrustStrip.css";

const services = [
  { icon: "✦",  label: "Narrative Blueprint" },
  { icon: "🖥",  label: "Recurring Content Frameworks" },
  { icon: "🎬", label: "High-Retention Video Execution" },
  { icon: "📡", label: "Multi-Platform Distribution" },
  { icon: "📈", label: "Inbound Conversion Funnels" },
  { icon: "✂️", label: "Authority-First Editing" },
  { icon: "🔍", label: "The Compounding Growth Audit" },
  { icon: "⚙️", label: "Infrastructure Management" },
];

const servicesTwo = [
  { icon: "🎨", label: "Branding" },
  { icon: "👤", label: "Personal Brand Building" },
  { icon: "🖌",  label: "Brand Design" },
  { icon: "✦",  label: "Narrative Blueprint" },
  { icon: "📱", label: "Recurring Content Frameworks" },
  { icon: "🎬", label: "High-Retention Video Execution" },
  { icon: "📡", label: "Multi-Platform Distribution" },
  { icon: "📈", label: "Inbound Conversion Funnels" },
];

export function TrustStrip() {
  const row1 = [...services, ...services];
  const row2 = [...servicesTwo, ...servicesTwo];

  return (
    <section className="trust-section">
      {/* Decorative layers */}
      <div className="trust-grain" aria-hidden="true" />
      <div className="trust-ambient" aria-hidden="true" />
      <div className="trust-section-bottom-line" aria-hidden="true" />

      {/* Eyebrow badge */}
      {/* <motion.span
        className="trust-badge"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        What We Do
      </motion.span> */}

      {/* Heading */}
      <motion.h2
        className="trust-heading"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        viewport={{ once: true }}
      >
        Content is a Liability<br />
        <em>Systems</em> are <em>Assets</em>
      </motion.h2>

      {/* Description */}
      <motion.div
        className="trust-description"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
        viewport={{ once: true }}
      >
        <p className="trust-desc-text">
          Most brands are built on sand — random reels, trend-chasing, and
          inconsistent logic. We replace the chaos with a{" "}
          <span className="trust-desc-highlight">narrative infrastructure</span>{" "}
          designed for founders who value{" "}
          <span className="trust-desc-highlight">leverage over vanity</span>
          We don't just edit; we architect the engine that makes your authority
          compound
        </p>
      </motion.div>

      {/* Scrolling rows */}
      <motion.div
        className="trust-rows"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
        viewport={{ once: true }}
      >
        <div className="trust-row-divider" />
        {/* Row 1 — Right to Left */}
        <div className="trust-scroll-wrapper">
          <ul className="trust-scroll trust-scroll--rtl">
            {row1.map((item, i) => (
              <li key={i} className="trust-logo">
                <span className="trust-logo-icon">{item.icon}</span>
                <span className="trust-logo-text">{item.label}</span>
                {/* <span className="trust-sep" /> */}
              </li>
            ))}
          </ul>
        </div>

        <div className="trust-row-divider" />

        {/* Row 2 — Left to Right */}
        <div className="trust-scroll-wrapper">
          <ul className="trust-scroll trust-scroll--ltr">
            {row2.map((item, i) => (
              <li key={i} className="trust-logo">
                <span className="trust-logo-icon">{item.icon}</span>
                <span className="trust-logo-text">{item.label}</span>
                {/* <span className="trust-sep" /> */}
              </li>
            ))}
          </ul>
        </div>
        <div className="trust-row-divider" />
      </motion.div>

    </section>
  );
}

// import { motion } from "framer-motion";
// import "./TrustStrip.css";

// const services = [
//   { icon: "✦", label: "Narrative Blueprint" },
//   { icon: "🖥", label: "Recurring Content Frameworks" },
//   { icon: "🎬", label: "High-Retention Video Execution" },
//   { icon: "📡", label: "Multi-Platform Distribution" },
//   { icon: "📈", label: "Inbound Conversion Funnels" },
//   { icon: "✂️", label: "Authority-First Editing" },
//   { icon: "🔍", label: "The Compounding Growth Audit" },
//   { icon: "⚙️", label: "Infrastructure Management" },
// ];

// const servicesTwo = [
//   { icon: "🎨", label: "Branding" },
//   { icon: "👤", label: "Personal Brand Building" },
//   { icon: "🖌", label: "Brand Design" },
//   { icon: "✦", label: "Narrative Blueprint" },
//   { icon: "📱", label: "Recurring Content Frameworks" },
//   { icon: "🎬", label: "High-Retention Video Execution" },
//   { icon: "📡", label: "Multi-Platform Distribution" },
//   { icon: "📈", label: "Inbound Conversion Funnels" },
// ];

// export function TrustStrip() {
//   const row1 = [...services, ...services];
//   const row2 = [...servicesTwo, ...servicesTwo];

//   return (
//     <section className="trust-section">

//       {/* Header */}
//       {/* <div className="trust-header">
//         <span className="trust-line" />
//         <motion.p
//           className="trust-text"
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//           viewport={{ once: true }}
//         >
//           Content is a Liability.{" "}
//           <em className="trust-text-serif">Systems are Assets.</em>
//         </motion.p>
//         <span className="trust-line" />
//       </div> */}

//       {/* Description */}
//       <motion.div
//         className="trust-description"
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
//         viewport={{ once: true }}
//       >
//         <p className="trust-desc-text">
//           Most brands are built on sand—random reels, trend-chasing, and
//           inconsistent logic. We replace the chaos with a{" "}
//           <span className="trust-desc-highlight">narrative infrastructure</span>{" "}
//           designed for founders who value{" "}
//           <span className="trust-desc-highlight">leverage over vanity</span>.
//           We don't just edit; we architect the engine that makes your authority
//           compound.
//         </p>
//       </motion.div>

//       {/* Row 1 — Right to Left */}
//       <motion.div
//         className="trust-scroll-wrapper"
//         initial={{ opacity: 0, y: 16 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
//         viewport={{ once: true }}
//       >
//         <ul className="trust-scroll trust-scroll--rtl">
//           {row1.map((item, i) => (
//             <li key={i} className="trust-logo">
//               <span className="trust-logo-icon">{item.icon}</span>
//               <span className="trust-logo-text">{item.label}</span>
//               <span className="trust-sep" />
//             </li>
//           ))}
//         </ul>
//       </motion.div>

//       {/* Row 2 — Left to Right */}
//       <motion.div
//         className="trust-scroll-wrapper"
//         initial={{ opacity: 0, y: 16 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.33 }}
//         viewport={{ once: true }}
//       >
//         <ul className="trust-scroll trust-scroll--ltr">
//           {row2.map((item, i) => (
//             <li key={i} className="trust-logo">
//               <span className="trust-logo-icon">{item.icon}</span>
//               <span className="trust-logo-text">{item.label}</span>
//               <span className="trust-sep" />
//             </li>
//           ))}
//         </ul>
//       </motion.div>

//     </section>
//   );
// }
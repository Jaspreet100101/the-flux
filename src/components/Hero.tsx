import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import "./Hero.css";

interface HeroProps {
  onOpenModal: () => void;
}

export function Hero({ onOpenModal }: HeroProps) {
  return (
    <section id="home" className="hero-section">

      {/* <div className="gradient-mesh" /> */}

      <div className="hero-container">
        <div className="hero-content">

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* <motion.span className="block">
              Growth isn't accidental.
            </motion.span>

            <motion.span className="block">
            </motion.span>

            <motion.span className="block highlight_t glow-text">
              It's engineered.
            </motion.span> */}

            <div className="hero-text-wrapper">

              <motion.span className="hero-line-1">
                We builld {" "}
                <span className="word-accidental">personal </span>
                <span className="word2 word-accidental">brands</span>
              </motion.span>

              {/* <motion.span className="hero-line-spacer" /> */}

              <motion.span className="hero-line-2 highlight_t glow-text">
                that{" "}
                <span className="word-engineered">compound.</span>
              </motion.span>

            </div>
          </motion.h1>

          {/* <motion.p
            className="hero-subtext"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            The Flux designs growth ecosystems for brands, creators, and businesses
            that want measurable authority, consistent leads, and scalable revenue.
          </motion.p> */}
          {/* <motion.p
            className="hero-subtext"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            The Flux designs{" "}
            <span className="sub-brand">growth ecosystems</span>{" "}
            for{" "}
            <span className="sub-audience">brands, creators, and businesses</span>{" "}
            that want{" "}
            <span className="sub-highlight-italic">measurable authority</span>,{" "}
            <span className="sub-highlight-blue">consistent leads</span>, and{" "}
            <span className="sub-highlight-blue">scalable revenue</span>.
          </motion.p> */}
<motion.p
  className="hero-subtext"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.75 }}
>
  <span className="sub-highlight-italic">
    Strategic storytelling
  </span>,{" "}
  <span className="sub-highlight-blue">
    high-retention content systems
  </span>,{" "}
  and{" "}
  <span className="sub-brand">
    distribution architecture
  </span>
  {" "}— engineered for{" "}
  <span className="sub-audience">
    founders and creators
  </span>{" "}
  who refuse to be invisible.
  <br />
  <br />
  {/* <span className="sub-highlight-blue">
    Psychology dictates.
  </span>{" "}
  <span className="sub-brand">
    Systems execute.
  </span> */}
</motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <button className="btn-primary1" onClick={onOpenModal}>
              Book a call
            </button>

            <a href="#work" className="btn-secondary">
              View Case Studies
            </a>
          </motion.div>

        </div>
      </div>

      {/* <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span>Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <a href="#Results">
          <ChevronDown size={24} />
          </a>
        </motion.div>
      </motion.div> */}

    </section>
  );
}













// import { motion } from "framer-motion";
// import { ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import "./Hero.css";

// interface HeroProps {
//   onOpenModal: () => void;
// }

// export function Hero({ onOpenModal }: HeroProps) {
//   return (
//     <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
//       {/* Animated Gradient Mesh Background */}
//       <div className="absolute inset-0 gradient-mesh" />
      
//       {/* Animated orbs
//       <motion.div
//         className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px]"
//         animate={{
//           x: [0, 50, 0],
//           y: [0, 30, 0],
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[hsl(280_100%_50%/0.08)] blur-[100px]"
//         animate={{
//           x: [0, -40, 0],
//           y: [0, -20, 0],
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       /> */}
// {/* 
//       <div className="container mx-auto px-6 relative z-10"> */}
//       <div className="container mx-auto px-6 relative z-10 flex flex-col justify-center items-center min-h-screen">

//         {/* <div className="max-w-4xl"> */}
//         <div className="max-w-4xl flex flex-col justify-center items-center min-h-screen">

//           {/* Headline */}

//           <motion.h1
//             className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8"
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <motion.span
//               className="block"
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//             >
//               Growth isn't
//             </motion.span>
//             <motion.span
//               className="block"
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.45 }}
//             >
//               accidental.
//             </motion.span>
//             <motion.span
//               className="block text-primary glow-text"
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.6 }}
//             >
//               It's engineered.
//             </motion.span>

//           </motion.h1>

//           {/* Subtext */}
//           <motion.p
//             className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.75 }}
//           >
//             The Flux designs growth ecosystems for brands, creators, and businesses 
//             that want measurable authority, consistent leads, and scalable revenue.
//           </motion.p>

//           {/* CTAs */}
//           <motion.div
//             className="flex flex-col sm:flex-row gap-4"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.9 }}
//           >
//             <Button variant="hero" size="xl" onClick={onOpenModal}>
//               Start Your Flux Growth System
//             </Button>
//             <Button variant="subtle" size="xl" asChild>
//               <a href="#work">View Case Studies</a>
//             </Button>
//           </motion.div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <motion.div
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.2 }}
//       >
//         <span className="text-sm">Scroll to Explore</span>
//         <motion.div
//           animate={{ y: [0, 8, 0] }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//         >
//           <ChevronDown size={24} />
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }

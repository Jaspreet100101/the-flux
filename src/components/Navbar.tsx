
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

interface NavbarProps {
  onOpenModal: () => void;
}

// const navItems = [
//   { label: "Home", href: "#home" },
//   { label: "Services", href: "#services" },
//   { label: "Work", href: "#work" },
//   { label: "Process", href: "#process" },
//   { label: "Contact", href: "#contact" },
// ];
const navItems = [
  { label: "Home", href: "#home" },
  { label: "Results", href: "#Results" },
  { label: "Work", href: "#work" },
  { label: "Approach", href: "#Approach" },
  { label: "FAQ", href: "#FAQ" },
];
export function Navbar({ onOpenModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
    >
      <div className="navbar-container">
        <div className="navbar-inner">

          <motion.a
            href="#home"
            className="navbar-logo"
            whileHover={{ scale: 1.05 }}
          >
            <img className="LOgo" src="/FLX.jpeg" alt="theflux" />
          </motion.a>

          {/* Desktop Nav */}
          <div className="navbar-links">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="navbar-cta">
            <button className="btn-glow" onClick={onOpenModal}>
              Book a Call
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu"
          >
            <div className="mobile-menu-inner">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="mobile-link"
                  // onClick={() => setMobileOpen(false)}
                  onClick={() => {
                    setTimeout(() => setMobileOpen(false), 980);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <button
                className="btn-glow mobile-btn"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenModal();
                }}
              >
                Book a Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}







// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface NavbarProps {
//   onOpenModal: () => void;
// }

// const navItems = [
//   { label: "Home", href: "#home" },
//   { label: "Services", href: "#services" },
//   { label: "Work", href: "#work" },
//   { label: "Process", href: "#process" },
//   { label: "Contact", href: "#contact" },
// ];

// export function Navbar({ onOpenModal }: NavbarProps) {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 80);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled
//           ? "bg-background/90 backdrop-blur-xl border-b border-[hsl(0_0%_100%/0.08)]"
//           : "bg-transparent"
//       }`}
//     >
//       <div className="container mx-auto px-6">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <motion.a
//             href="#home"
//             className="text-2xl font-bold tracking-tight"
//             whileHover={{ scale: 1.02 }}
//           >
//             THE FLUX
//           </motion.a>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center gap-8">
//             {navItems.map((item) => (
//               <a
//                 key={item.label}
//                 href={item.href}
//                 className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
//               >
//                 {item.label}
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
//               </a>
//             ))}
//           </div>

//           {/* CTA */}
//           <div className="hidden md:block">
//             <Button variant="glow" size="lg" onClick={onOpenModal}>
//               Book a Call
//             </Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden p-2"
//             onClick={() => setMobileOpen(!mobileOpen)}
//           >
//             {mobileOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="md:hidden bg-background/95 backdrop-blur-xl border-b border-[hsl(0_0%_100%/0.08)]"
//           >
//             <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
//               {navItems.map((item) => (
//                 <a
//                   key={item.label}
//                   href={item.href}
//                   className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2"
//                   onClick={() => setMobileOpen(false)}
//                 >
//                   {item.label}
//                 </a>
//               ))}
//               <Button variant="glow" size="lg" onClick={() => { setMobileOpen(false); onOpenModal(); }} className="mt-4">
//                 Book a Call
//               </Button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// }

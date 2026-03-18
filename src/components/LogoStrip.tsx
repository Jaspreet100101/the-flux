// LogoStrip.tsx

import './LogoStrip.css';

/* ── Types ── */
interface LogoItem {
    src: string;
    alt: string;
    width?: number;
}

/* ── Logo data ── */
const logos: LogoItem[] = [
    { src: '/logo1.png',  alt: 'Woodland',   width: 110 },
    { src: '/logo2.png',  alt: 'Redbull',    width: 130 },
    { src: '/logo3.png',  alt: 'Zerodha',    width: 48  },
    { src: '/logo4.png',  alt: 'Wildstone',  width: 120 },
    { src: '/logo5.png',  alt: 'Salesforce', width: 100 },
    { src: '/logo6.jpeg', alt: 'Fittr',      width: 100 },
    { src: '/logo7.png',  alt: 'Snitch',     width: 100 },
    { src: '/logo8.webp', alt: 'Garnier',    width: 100 },
];

/* ── Component ── */
export default function LogoStrip() {
    const doubled = [...logos, ...logos];

    return (
        <section id='work'  className="logo-strip-root">

            {/* Eyebrow badge
            <span className="logo-strip-badge">Trusted Work</span> */}

            {/* Heading */}
            <h2 className="logo-strip-heading">
                Our work has been <em>trusted</em> by<br />
                <em>Brands</em> and Creators
            </h2>

            {/* Subtext */}
            <p className="logo-strip-sub">
                Worked with founders, creators and operators
                building serious brands
            </p>

            {/* Scrolling logos */}
            <div className="logo-strip-wrapper">
                <ul className="logo-strip-track" aria-label="Partner logos">
                    {doubled.map((logo, index) => (
                        <li
                            key={`${logo.alt}-${index}`}
                            className="logo-strip-item"
                            title={logo.alt}
                        >
                            <img
                                src={logo.src}
                                alt={logo.alt}
                                width={logo.width}
                                draggable={false}
                                loading="lazy"
                                decoding="async"
                            />
                        </li>
                    ))}
                </ul>
            </div>

        </section>
    );
}
// // LogoStrip.tsx
// // Drop your logo images in /public/logos/ and update the `logos` array below.
// // Each item needs: `src` (path from /public), `alt` (brand name), and optional `width` override.

// import './LogoStrip.css';

// /* ── Types ── */
// interface LogoItem {
//     src: string;
//     alt: string;
//     /** Optional: override the natural rendered width for visual balance. */
//     width?: number;
// }

// /* ── Logo data ─────────────────────────────────────────────────────────────
//    Add / remove / reorder freely. The component duplicates the array
//    automatically so the infinite loop never shows a seam.
//    ─────────────────────────────────────────────────────────────────────── */
// const logos: LogoItem[] = [
//     { src: '/logo1.png', alt: 'Woodland', width: 110 },
//     { src: '/logo2.png', alt: 'Redbull', width: 130 },
//     { src: '/logo3.png', alt: 'zerodha', width: 48 },
//     { src: '/logo4.png', alt: 'wildstone', width: 120 },
//     { src: '/logo5.png', alt: 'salesforce', width: 100 },
//     { src: '/logo6.jpeg', alt: 'Fittr', width: 100 },
//     { src: '/logo7.png', alt: 'Snitch', width: 100 },
//     { src: '/logo8.webp', alt: 'Garnier', width: 100 },
//     // ↓ Add more logos here
// ];

// /* ── Component ── */
// export default function LogoStrip() {
//     // Duplicate the array once — translateX(-50%) then snaps back seamlessly.
//     const doubled = [...logos, ...logos];

//     return (
//         <section className="logo-strip-root" >
//             <div className="logo_txt_sec">
//                 <p className="trust_text">
//                     Our{" "}
//                     <span className="trust-desc-highlight"> work </span>{" "}
//                     has been  {" "}
//                     <span className="trust-desc-highlight"> trusted.</span>.
//                 </p>
//             </div>



//             {/* Scrolling track */}
//             <div className="logo-strip-wrapper">
//                 <ul className="logo-strip-track" aria-hidden="true">
//                     {doubled.map((logo, index) => (
//                         <li
//                             key={`${logo.alt}-${index}`}
//                             className="logo-strip-item"
//                             title={logo.alt}
//                         >
//                             <img
//                                 src={logo.src}
//                                 alt={logo.alt}
//                                 width={logo.width}
//                                 draggable={false}
//                                 loading="lazy"
//                                 decoding="async"
//                             />
//                         </li>
//                     ))}
//                 </ul>
//             </div>


//             <div className="logo_txt_sec">
//                 <p className="trust_text">
//                     Worked with founders, creators{" "}
//                     <span className="trust-desc-highlight"> and </span>{" "}
//                     operators {" "}
//                     building
//                     <span className="trust-desc-highlight"> serious brands.</span>.
//                     compound.
//                 </p>
//             </div>

//         </section>
//     );
// }
import { useState, useRef, useEffect } from "react";
import "./ShowreelSection.css";

interface ReelItem {
  id: string;
  videoSrc: string;
}

const reels: ReelItem[] = [
  { id: "1", videoSrc: "/v1.mp4" },
  { id: "2", videoSrc: "/v2.mp4" },
  { id: "3", videoSrc: "/v3.mp4" },
  { id: "4", videoSrc: "/v4.mp4" },
  { id: "5", videoSrc: "/v5.mp4" },
  { id: "6", videoSrc: "/v6.mp4" },
];

// Triplicate for seamless loop — needs enough cards to fill viewport width
const looped = [...reels, ...reels, ...reels];

function ReelCard({ reel }: { reel: ReelItem }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <li
      className={`reel-li ${hovered ? "reel-li--hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <video
        ref={videoRef}
        src={reel.videoSrc}
        className="reel-media"
        muted
        loop
        playsInline
        autoPlay
      />
      <span className={`reel-overlay ${hovered ? "reel-overlay--on" : ""}`}>
        Playing
      </span>
    </li>
  );
}

export function Reels() {
  const trackRef = useRef<HTMLUListElement>(null);

  const handleMouseEnter = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const handleMouseLeave = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  return (
    <section className="reel-section">
      <div className="reel-header">
        <h2 className="reel-title">Reels</h2>
        <p className="reel-sub">Hover to preview · Auto-playing</p>
      </div>

      <div className="reel-band">
        <ul
          ref={trackRef}
          className="reel-ul"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {looped.map((reel, i) => (
            <ReelCard key={`${reel.id}-${i}`} reel={reel} />
          ))}
        </ul>
      </div>
    </section>
  );
}




// import { useState, useRef, useEffect } from "react";
// import "./ShowreelSection.css";

// interface ReelItem {
//   id: string;
//   videoSrc: string;
// }

// const reels: ReelItem[] = [
//   { id: "1", videoSrc: "/v1.mp4" },
//   { id: "2", videoSrc: "/v2.mp4" },
//   { id: "3", videoSrc: "/v3.mp4" },
//   { id: "4", videoSrc: "/v4.mp4" },
// ];

// const DURATION = 20; // seconds for one full pass

// function ReelCard({ reel, index, total }: { reel: ReelItem; index: number; total: number }) {
//   const [hovered, setHovered] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     videoRef.current?.play().catch(() => {});
//   }, []);

//   // Negative delay so all cards are already in motion on load
//   const delay = -((DURATION / total) * index);

//   return (
//     <li
//       className={`reel-li ${hovered ? "reel-li--hovered" : ""}`}
//       style={{ animationDelay: `${delay}s` }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <video
//         ref={videoRef}
//         src={reel.videoSrc}
//         className="reel-media"
//         muted
//         loop
//         playsInline
//         autoPlay
//       />
//       <span className={`reel-overlay ${hovered ? "reel-overlay--on" : ""}`}>
//         Playing
//       </span>
//     </li>
//   );
// }

// export function Reels() {
//   return (
//     <section className="reel-section">
//       <div className="reel-header">
//         <h2 className="reel-title">Reels</h2>
//         <p className="reel-sub">Hover to preview · Auto-playing</p>
//       </div>

//       <div className="reel-mask">
//         <ul className="reel-ul">
//           {reels.map((reel, i) => (
//             <ReelCard key={reel.id} reel={reel} index={i} total={reels.length} />
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// }
// // import { useState, useRef, useEffect } from "react";
// // import "./ShowreelSection.css";

// // interface ReelItem {
// //   id: string;
// //   videoSrc: string;
// // }

// // const reels: ReelItem[] = [
// //   { id: "1", videoSrc: "/v1.mp4" },
// //   { id: "2", videoSrc: "/v2.mp4" },
// //   { id: "3", videoSrc: "/v3.mp4" },
// //   { id: "4", videoSrc: "/v4.mp4" },
// // ];

// // function ReelCard({ reel }: { reel: ReelItem }) {
// //   const [hovered, setHovered] = useState(false);
// //   const videoRef = useRef<HTMLVideoElement>(null);

// //   useEffect(() => {
// //     videoRef.current?.play().catch(() => {});
// //   }, []);

// //   return (
// //     <li
// //       className="reel-li"
// //       onMouseEnter={() => setHovered(true)}
// //       onMouseLeave={() => setHovered(false)}
// //     >
// //       <video
// //         ref={videoRef}
// //         src={reel.videoSrc}
// //         className="reel-media"
// //         muted
// //         loop
// //         playsInline
// //         autoPlay
// //       />
// //       <span className={`reel-overlay ${hovered ? "reel-overlay--on" : ""}`}>
// //         Playing
// //       </span>
// //     </li>
// //   );
// // }

// // export function Reels() {
// //   const looped = [...reels, ...reels];

// //   return (
// //     <section className="reel-section">
// //       <div className="reel-header">
// //         <h2 className="reel-title">Reels</h2>
// //         <p className="reel-sub">Hover to preview · Auto-playing</p>
// //       </div>

// //       <div className="reel-mask">
// //         <div className="reel-tilt">
// //           <ul className="reel-ul">
// //             {looped.map((reel, i) => (
// //               <ReelCard key={`${reel.id}-${i}`} reel={reel} />
// //             ))}
// //           </ul>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // // import { useRef, useState, useEffect } from "react";
// // // import "./ShowreelSection.css";

// // // interface ReelItem {
// // //   id: string;
// // //   videoSrc: string;
// // // }

// // // const reels: ReelItem[] = [
// // //   { id: "1", videoSrc: "/v1.mp4" },
// // //   { id: "2", videoSrc: "/v2.mp4" },
// // //   { id: "3", videoSrc: "/v3.mp4" },
// // //   { id: "4", videoSrc: "/v4.mp4" },
// // // ];

// // // // card width (172px) + gap (16px) — must match CSS
// // // const CARD_W = 188;
// // // // scroll speed in px/second
// // // const SPEED = 20;

// // // function ReelCard({ reel }: { reel: ReelItem }) {
// // //   const [hovered, setHovered] = useState(false);
// // //   const videoRef = useRef<HTMLVideoElement>(null);

// // //   // Start playing as soon as the component mounts (background autoplay)
// // //   useEffect(() => {
// // //     videoRef.current?.play().catch(() => {});
// // //   }, []);

// // //   const handleEnter = () => setHovered(true);
// // //   const handleLeave = () => setHovered(false);

// // //   return (
// // //     <li
// // //       className="reel-li"
// // //       onMouseEnter={handleEnter}
// // //       onMouseLeave={handleLeave}
// // //     >
// // //       <div className="reel-li-inner">
// // //         <video
// // //           ref={videoRef}
// // //           src={reel.videoSrc}
// // //           className="reel-media"
// // //           muted
// // //           loop
// // //           playsInline
// // //           autoPlay
// // //           preload="auto"
// // //         />

// // //         <span className={`reel-overlay ${hovered ? "reel-overlay--on" : ""}`}>
// // //           <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="16" height="16">
// // //             <polygon points="5 3 19 12 5 21 5 3" fill="white" stroke="none" />
// // //           </svg>
// // //           Playing
// // //         </span>
// // //       </div>
// // //     </li>
// // //   );
// // // }

// // // export function Reels() {
// // //   const ulRef = useRef<HTMLUListElement>(null);
// // //   const xRef = useRef(0);
// // //   const pausedRef = useRef(false);
// // //   const lastTimeRef = useRef<number | null>(null);
// // //   const rafRef = useRef<number>(0);

// // //   useEffect(() => {
// // //     const totalWidth = reels.length * CARD_W; // width of one full set

// // //     const tick = (now: number) => {
// // //       if (!pausedRef.current) {
// // //         if (lastTimeRef.current !== null) {
// // //           const delta = (now - lastTimeRef.current) / 1000;
// // //           xRef.current -= SPEED * delta;
// // //           // wrap seamlessly: once first set scrolled off, jump forward by one set
// // //           if (xRef.current <= -totalWidth) {
// // //             xRef.current += totalWidth;
// // //           }
// // //         }
// // //         lastTimeRef.current = now;

// // //         if (ulRef.current) {
// // //           ulRef.current.style.transform = `translateX(${xRef.current}px)`;
// // //         }
// // //       } else {
// // //         // reset lastTime while paused so no delta jump on resume
// // //         lastTimeRef.current = null;
// // //       }

// // //       rafRef.current = requestAnimationFrame(tick);
// // //     };

// // //     rafRef.current = requestAnimationFrame(tick);
// // //     return () => cancelAnimationFrame(rafRef.current);
// // //   }, []);

// // //   const looped = [...reels, ...reels];

// // //   return (
// // //     <section id="Reels" className="reel-section">
// // //       <div className="reel-header">
// // //         <h2 className="reel-title">Reels</h2>
// // //         <p className="reel-sub">Hover to preview · Auto-playing</p>
// // //       </div>

// // //       <div className="reel-skew">
// // //         <div
// // //           className="reel-mask"
// // //           onMouseEnter={() => { pausedRef.current = true; }}
// // //           onMouseLeave={() => { pausedRef.current = false; }}
// // //         >
// // //           <ul ref={ulRef} className="reel-ul">
// // //             {looped.map((reel, i) => (
// // //               <ReelCard key={`${reel.id}-${i}`} reel={reel} />
// // //             ))}
// // //           </ul>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }
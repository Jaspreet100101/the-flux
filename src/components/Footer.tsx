

import "./Footer.css";

export function Footer() {
  return (
<footer className="footer">
  <div className="footer-container">

    <div className="footer-top">
      <img className="Logo" src="/FLX.jpeg" alt="theflux" />
      <p className="footer-tagline">Narrative Systems Studio</p>
    </div>

    <div className="footer-main">

      <div className="footer-left">
        <div className="footer-links">
          <a href="#contact">Contact</a>
          <a href="https://instagram.com" target="_blank">Instagram</a>
          <a href="https://linkedin.com" target="_blank">LinkedIn</a>
        </div>
      </div>

    </div>

    {/* BOTTOM */}
    <div className="footer-bottom">
      © The Flux
    </div>

  </div>
</footer>
  );
}










// import "./Footer.css";

// export function Footer() {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         <div className="footer-content">

//           <div className="footer-logo">
//             <img className="LOgo" src="/FLX.jpeg" alt="theflux" />
//           </div>

//           <nav className="footer-nav">
//             <a href="#contact">Contact</a>
//             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
//             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
//           </nav>

//           <p className="footer-copy">© The Flux</p>

//         </div>
//       </div>
//     </footer>
//   );
// }
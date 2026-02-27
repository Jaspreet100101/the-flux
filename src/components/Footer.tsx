import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">

          <div className="footer-logo">
            <div className="logo-main">The Flux</div>
            <div className="logo-subtitle">Narrative Systems Studio</div>
          </div>

          <nav className="footer-nav">
            <a href="#contact">Contact</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </nav>

          <p className="footer-copy">© The Flux</p>

        </div>
      </div>
    </footer>
  );
}
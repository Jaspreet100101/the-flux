import "./LogoStrip.css";

interface Logo {
  src: string;
  alt: string;
}

interface LogoStripProps {
  logos: Logo[];
  label?: string;
}

export function Logos({
  logos,
  label = "Our work has been trusted by",
}: LogoStripProps) {

  // Duplicate logos for seamless loop
  const doubled = [...logos, ...logos];

  return (
    <section className="logo-strip-section">

      {label && (
        <p className="logo-strip-label">
          {label}
        </p>
      )}

      <div className="logo-track-wrapper">

        <div className="logo-track">

          {doubled.map((logo, i) => (
            <div className="logo-group" key={i}>

              <div className="logo-item">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  draggable={false}
                />
              </div>

              {i < doubled.length - 1 && (
                <span className="logo-divider" />
              )}

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}
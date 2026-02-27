/**
 * OnboardingModal.tsx — Production-ready, fully typed
 * npm install framer-motion lucide-react
 *
 * USAGE:
 *   import OnboardingModal from "./OnboardingModal";
 *
 *   <OnboardingModal
 *     isOpen={open}
 *     onClose={() => setOpen(false)}
 *     calendlyUrl="https://calendly.com/yourname/30min"
 *     onSuccess={(data) => console.log("Lead:", data)}
 *   />
 */

import { useState, useEffect, useCallback } from "react";
import type { CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Check, AlertCircle } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────
interface FormData {
  businessType: string;
  revenue:      string;
  growthGoal:   string;
  channels:     string[];
  bottleneck:   string;
  timeline:     string;
  budget:       string;
  name:         string;
  email:        string;
  phone:        string;
  company:      string;
}

interface StepErrors {
  businessType?: string;
  revenue?:      string;
  growthGoal?:   string;
  channels?:     string;
  bottleneck?:   string;
  timeline?:     string;
  budget?:       string;
  name?:         string;
  email?:        string;
}

interface OnboardingModalProps {
  isOpen:       boolean;
  onClose:      () => void;
  calendlyUrl?: string;
  onSuccess?:   (data: FormData) => void;
}

// ── Config ────────────────────────────────────────────────────
const DEFAULT_CALENDLY_URL = "https://calendly.com/jaspreet99100/30min";

const STEPS: Record<number, { heading: string; sub: string }> = {
  1: { heading: "Tell us about your business",  sub: "Help us understand where you are right now."       },
  2: { heading: "Your growth infrastructure",   sub: "What you're working with and where it's breaking." },
  3: { heading: "Scope & contact",              sub: "Last step — then you'll book a call directly."     },
  4: { heading: "Book your strategy call",      sub: "Pick a time that works for you. We'll be ready."   },
};

const OPTIONS = {
  businessTypes: ["Agency", "SaaS", "E-commerce", "Creator", "Consultant", "Other"],
  revenueRanges: ["$0–$10k/mo", "$10k–$50k/mo", "$50k–$100k/mo", "$100k–$500k/mo", "$500k+/mo"],
  growthGoals:   ["Brand Awareness", "Lead Generation", "Revenue Growth", "Authority Building", "Market Expansion"],
  channels:      ["Social Media", "Paid Ads", "Content Marketing", "Email", "SEO", "Referrals"],
  bottlenecks:   ["No Clear Strategy", "Inconsistent Leads", "Low Conversion", "Scaling Issues", "Brand Positioning"],
  timelines:     ["ASAP", "1–3 Months", "3–6 Months", "6–12 Months"],
  budgets:       ["$2k–$5k/mo", "$5k–$10k/mo", "$10k–$25k/mo", "$25k+/mo"],
};

const EMPTY_FORM: FormData = {
  businessType: "",
  revenue:      "",
  growthGoal:   "",
  channels:     [],
  bottleneck:   "",
  timeline:     "",
  budget:       "",
  name:         "",
  email:        "",
  phone:        "",
  company:      "",
};

// ── Validation ────────────────────────────────────────────────
function validateStep(step: number, f: FormData): StepErrors {
  const e: StepErrors = {};
  if (step === 1) {
    if (!f.businessType)     e.businessType = "Pick a business type";
    if (!f.revenue)          e.revenue      = "Select a revenue range";
    if (!f.growthGoal)       e.growthGoal   = "Choose a primary goal";
  }
  if (step === 2) {
    if (!f.channels.length)  e.channels   = "Select at least one channel";
    if (!f.bottleneck)       e.bottleneck = "Pick your biggest bottleneck";
    if (!f.timeline)         e.timeline   = "Choose a timeline";
  }
  if (step === 3) {
    if (!f.budget)                           e.budget = "Select a budget range";
    if (!f.name.trim())                      e.name   = "Name is required";
    if (!f.email.trim())                     e.email  = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(f.email)) e.email  = "Enter a valid email";
  }
  return e;
}

// ── OptionChip ────────────────────────────────────────────────
function OptionChip({
  label, selected, onClick, error,
}: {
  label: string; selected: boolean; onClick: () => void; error?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding:       "8px 16px",
        borderRadius:  8,
        border:        `1px solid ${selected ? "#e8d5b0" : error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
        background:    selected ? "rgba(232,213,176,0.15)" : "rgba(255,255,255,0.03)",
        color:         selected ? "#e8d5b0" : "#94a3b8",
        fontSize:      13,
        fontFamily:    "'DM Mono', monospace",
        cursor:        "pointer",
        transition:    "all 0.15s",
        letterSpacing: "0.01em",
        whiteSpace:    "nowrap",
      } satisfies CSSProperties}
    >
      {selected && <span style={{ marginRight: 6, fontSize: 10 }}>✦</span>}
      {label}
    </button>
  );
}

// ── FieldError ────────────────────────────────────────────────
function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 8 }}>
      <AlertCircle size={12} color="#ef4444" />
      <span style={{ fontSize: 12, color: "#ef4444", fontFamily: "'DM Mono', monospace" }}>
        {msg}
      </span>
    </div>
  );
}

// ── TextInput ─────────────────────────────────────────────────
function TextInput({
  label, type = "text", value, onChange, placeholder, error, required,
}: {
  label:        string;
  type?:        string;
  value:        string;
  onChange:     (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?:       string;
  required?:    boolean;
}) {
  return (
    <div>
      <label style={css.label}>
        {label}
        {required && <span style={{ color: "#e8d5b0", marginLeft: 3 }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          ...css.input,
          borderColor: error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)",
        }}
      />
      <FieldError msg={error} />
    </div>
  );
}

// ── StepSection ───────────────────────────────────────────────
function StepSection({
  label, children, error,
}: {
  label:    string;
  children: React.ReactNode;
  error?:   string;
}) {
  return (
    <div>
      <label style={css.label}>{label}</label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
        {children}
      </div>
      <FieldError msg={error} />
    </div>
  );
}

// ── CalendlyEmbed ─────────────────────────────────────────────
// ✅ CHANGE 1: buildCalendlyUrl now packs ALL form data into the
// Calendly "name" field so it shows up in your calendar event.
// Result: "Jane Smith | @ Acme Inc | Agency | $10k–50k | Lead Gen | $5k–10k | Inconsistent Leads | Timeline: ASAP | Via: Email, SEO | 📞 +91 98765 43210"
function buildCalendlyUrl(base: string, f: Partial<FormData> = {}): string {
  const url = new URL(base);

  // Pack all qualifying info into the name field
  const parts = [
    f.name,
    f.company      ? `@ ${f.company}`                    : null,
    f.businessType,
    f.revenue,
    f.growthGoal,
    f.budget,
    f.bottleneck,
    f.timeline     ? `Timeline: ${f.timeline}`            : null,
    f.channels?.length ? `Via: ${f.channels.join(", ")}` : null,
    f.phone        ? `📞 ${f.phone}`                     : null,
  ].filter(Boolean);

  url.searchParams.set("name",  parts.join(" | "));
  url.searchParams.set("email", f.email ?? "");
  url.searchParams.set("hide_event_type_details", "1");
  url.searchParams.set("hide_gdpr_banner", "1");

  return url.toString();
}

function CalendlyEmbed({ url, prefill }: { url: string; prefill: Partial<FormData> }) {
  const embedUrl = buildCalendlyUrl(url, prefill);

  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="560"
      frameBorder="0"
      title="Schedule a call"
      style={{ borderRadius: 12, border: "none", display: "block" }}
    />
  );
}

// ── Main Modal ────────────────────────────────────────────────
export function OnboardingModal({
  isOpen,
  onClose,
  calendlyUrl = DEFAULT_CALENDLY_URL,
  onSuccess,
}: OnboardingModalProps) {

  const [step,      setStep]      = useState(1);
  const [formData,  setFormData]  = useState<FormData>(EMPTY_FORM);
  const [errors,    setErrors]    = useState<StepErrors>({});
  const [direction, setDirection] = useState(1);

  const reset = useCallback(() => {
    setStep(1);
    setFormData(EMPTY_FORM);
    setErrors({});
    setDirection(1);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(reset, 300);
  }, [onClose, reset]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isOpen, handleClose]);

  const select = (field: keyof FormData, value: string) => {
    if (field === "channels") {
      const cur = formData.channels;
      setFormData(f => ({
        ...f,
        channels: cur.includes(value)
          ? cur.filter(c => c !== value)
          : [...cur, value],
      }));
    } else {
      setFormData(f => ({ ...f, [field]: value }));
    }
    setErrors(e => ({ ...e, [field]: undefined }));
  };

  const handleInput =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(f => ({ ...f, [field]: e.target.value }));
      setErrors(er => ({ ...er, [field]: undefined }));
    };

  const handleNext = () => {
    const errs = validateStep(step, formData);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep(s => s + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep(s => s - 1);
  };

  const handleSubmit = () => {
    const errs = validateStep(3, formData);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSuccess?.(formData);
    setStep(4);
  };

  const goNext   = () => { setDirection(1);  handleNext();   };
  const goBack   = () => { setDirection(-1); handleBack();   };
  const goSubmit = () => { setDirection(1);  handleSubmit(); };

  const slideVariants = {
    enter:  (dir: number) => ({ opacity: 0, x: dir > 0 ?  32 : -32 }),
    center: { opacity: 1, x: 0 },
    exit:   (dir: number) => ({ opacity: 0, x: dir > 0 ? -32 :  32 }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          style={css.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            style={css.backdrop}
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            style={{ ...css.modal, maxWidth: step === 4 ? 780 : 640 }}
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.96,  y: 24 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <div style={css.noise} />

            <button onClick={handleClose} style={css.closeBtn} aria-label="Close">
              <X size={16} />
            </button>

            {step < 4 && (
              <div style={css.progressWrap}>
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    style={{
                      ...css.progressSegment,
                      background: i < step ? "#e8d5b0" : "rgba(255,255,255,0.08)",
                    }}
                  />
                ))}
              </div>
            )}

            <div style={{ padding: step === 4 ? "32px 36px 36px" : "40px 44px 44px" }}>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`head-${step}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                >
                  <div style={css.stepLabel}>
                    {step < 4 ? `Step ${step} of 3` : "Almost there"}
                  </div>
                  <h2 style={css.heading}>{STEPS[step].heading}</h2>
                  <p style={css.sub}>{STEPS[step].sub}</p>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`body-${step}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  style={{ marginTop: 32 }}
                >
                  {/* Step 1 */}
                  {step === 1 && (
                    <div style={css.stack}>
                      <StepSection label="Business type" error={errors.businessType}>
                        {OPTIONS.businessTypes.map(v => (
                          <OptionChip key={v} label={v}
                            selected={formData.businessType === v}
                            onClick={() => select("businessType", v)}
                            error={errors.businessType} />
                        ))}
                      </StepSection>
                      <StepSection label="Monthly revenue" error={errors.revenue}>
                        {OPTIONS.revenueRanges.map(v => (
                          <OptionChip key={v} label={v}
                            selected={formData.revenue === v}
                            onClick={() => select("revenue", v)}
                            error={errors.revenue} />
                        ))}
                      </StepSection>
                      <StepSection label="Primary growth goal" error={errors.growthGoal}>
                        {OPTIONS.growthGoals.map(v => (
                          <OptionChip key={v} label={v}
                            selected={formData.growthGoal === v}
                            onClick={() => select("growthGoal", v)}
                            error={errors.growthGoal} />
                        ))}
                      </StepSection>
                    </div>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <div style={css.stack}>
                      <StepSection label="Active marketing channels (select all)" error={errors.channels}>
                        {OPTIONS.channels.map(v => (
                          <OptionChip key={v} label={v}
                            selected={formData.channels.includes(v)}
                            onClick={() => select("channels", v)}
                            error={errors.channels} />
                        ))}
                      </StepSection>
                      <StepSection label="Biggest growth bottleneck" error={errors.bottleneck}>
                        {OPTIONS.bottlenecks.map(v => (
                          <OptionChip key={v} label={v}
                            selected={formData.bottleneck === v}
                            onClick={() => select("bottleneck", v)}
                            error={errors.bottleneck} />
                        ))}
                      </StepSection>
                      <StepSection label="Desired timeline to results" error={errors.timeline}>
                        {OPTIONS.timelines.map(v => (
                          <OptionChip key={v} label={v}
                            selected={formData.timeline === v}
                            onClick={() => select("timeline", v)}
                            error={errors.timeline} />
                        ))}
                      </StepSection>
                    </div>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <div style={css.stack}>
                      <StepSection label="Monthly budget range" error={errors.budget}>
                        {OPTIONS.budgets.map(v => (
                          <OptionChip key={v} label={v}
                            selected={formData.budget === v}
                            onClick={() => select("budget", v)}
                            error={errors.budget} />
                        ))}
                      </StepSection>
                      <div style={css.grid2}>
                        <TextInput label="Full name" required
                          value={formData.name} onChange={handleInput("name")}
                          placeholder="Jane Smith" error={errors.name} />
                        <TextInput label="Work email" type="email" required
                          value={formData.email} onChange={handleInput("email")}
                          placeholder="you@company.com" error={errors.email} />
                        <TextInput label="Phone" type="tel"
                          value={formData.phone} onChange={handleInput("phone")}
                          placeholder="+1 555 000 0000" />
                        <TextInput label="Company"
                          value={formData.company} onChange={handleInput("company")}
                          placeholder="Your company name" />
                      </div>
                    </div>
                  )}

                  {/* ✅ CHANGE 2: Pass full formData so buildCalendlyUrl gets all fields */}
                  {step === 4 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                    >
                      <div style={css.confirmBanner}>
                        <Check size={14} style={{ flexShrink: 0 }} />
                        <span>Application received — now lock in your call time below.</span>
                      </div>
                      <CalendlyEmbed
                        url={calendlyUrl}
                        prefill={formData}
                      />
                    </motion.div>
                  )}

                </motion.div>
              </AnimatePresence>

              {step < 4 && (
                <div style={css.navRow}>
                  {step > 1
                    ? <button style={css.ghostBtn} onClick={goBack}><ArrowLeft size={15} /> Back</button>
                    : <div />
                  }
                  {step < 3
                    ? <button style={css.primaryBtn} onClick={goNext}>Continue <ArrowRight size={15} /></button>
                    : <button style={css.primaryBtn} onClick={goSubmit}><Check size={15} /> Submit Application</button>
                  }
                </div>
              )}

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Styles ────────────────────────────────────────────────────
const css: Record<string, CSSProperties> = {
  overlay: {
    position:       "fixed",
    inset:          0,
    zIndex:         50,
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    padding:        16,
  },
  backdrop: {
    position:             "absolute",
    inset:                0,
    background:           "rgba(0,0,0,0.75)",
    backdropFilter:       "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },
  modal: {
    position:     "relative",
    width:        "100%",
    background:   "#0e0e0e",
    border:       "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20,
    overflow:     "hidden",
    boxShadow:    "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
    maxHeight:    "92vh",
    overflowY:    "auto",
    transition:   "max-width 0.35s ease",
  },
  noise: {
    position:        "absolute",
    inset:           0,
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
    pointerEvents:   "none",
    zIndex:          0,
    opacity:         0.4,
  },
  closeBtn: {
    position:       "absolute",
    top:            16,
    right:          16,
    zIndex:         10,
    width:          32,
    height:         32,
    borderRadius:   "50%",
    border:         "1px solid rgba(255,255,255,0.1)",
    background:     "rgba(255,255,255,0.05)",
    color:          "#94a3b8",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    cursor:         "pointer",
    transition:     "all 0.15s",
  },
  progressWrap: {
    display:  "flex",
    gap:      4,
    padding:  "20px 44px 0",
    position: "relative",
    zIndex:   1,
  },
  progressSegment: {
    flex:         1,
    height:       2,
    borderRadius: 99,
    transition:   "background 0.3s ease",
  },
  stepLabel: {
    fontFamily:    "'DM Mono', monospace",
    fontSize:      11,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color:         "#475569",
    marginBottom:  12,
  },
  heading: {
    fontFamily:    "'Playfair Display', 'Georgia', serif",
    fontSize:      28,
    fontWeight:    700,
    color:         "#f1f5f9",
    letterSpacing: "-0.02em",
    lineHeight:    1.25,
    marginBottom:  6,
  },
  sub: {
    fontFamily: "'DM Mono', monospace",
    fontSize:   13,
    color:      "#64748b",
    lineHeight: 1.6,
  },
  stack: {
    display:       "flex",
    flexDirection: "column",
    gap:           28,
  },
  label: {
    display:       "block",
    fontFamily:    "'DM Mono', monospace",
    fontSize:      11,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color:         "#64748b",
    marginBottom:  2,
  },
  input: {
    display:      "block",
    width:        "100%",
    padding:      "10px 14px",
    background:   "rgba(255,255,255,0.04)",
    border:       "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    color:        "#e2e8f0",
    fontSize:     14,
    fontFamily:   "'DM Mono', monospace",
    outline:      "none",
    transition:   "border-color 0.15s",
    boxSizing:    "border-box",
  },
  grid2: {
    display:             "grid",
    gridTemplateColumns: "1fr 1fr",
    gap:                 16,
  },
  navRow: {
    display:        "flex",
    alignItems:     "center",
    justifyContent: "space-between",
    marginTop:      40,
  },
  primaryBtn: {
    display:       "inline-flex",
    alignItems:    "center",
    gap:           8,
    padding:       "11px 24px",
    background:    "#e8d5b0",
    color:         "#0a0a0a",
    border:        "none",
    borderRadius:  8,
    fontSize:      13,
    fontFamily:    "'DM Mono', monospace",
    fontWeight:    600,
    cursor:        "pointer",
    transition:    "opacity 0.15s, transform 0.1s",
    letterSpacing: "0.01em",
  },
  ghostBtn: {
    display:      "inline-flex",
    alignItems:   "center",
    gap:          6,
    padding:      "11px 16px",
    background:   "transparent",
    color:        "#64748b",
    border:       "1px solid rgba(255,255,255,0.08)",
    borderRadius: 8,
    fontSize:     13,
    fontFamily:   "'DM Mono', monospace",
    cursor:       "pointer",
    transition:   "color 0.15s, border-color 0.15s",
  },
  confirmBanner: {
    display:      "flex",
    alignItems:   "center",
    gap:          8,
    padding:      "10px 16px",
    background:   "rgba(52,211,153,0.08)",
    border:       "1px solid rgba(52,211,153,0.2)",
    borderRadius: 8,
    color:        "#34d399",
    fontSize:     13,
    fontFamily:   "'DM Mono', monospace",
    marginBottom: 24,
  },
};

// ── Inject fonts once ─────────────────────────────────────────
if (typeof document !== "undefined" && !document.getElementById("onboarding-globals")) {
  const s = document.createElement("style");
  s.id = "onboarding-globals";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Mono:wght@400;500&display=swap');
    @media (max-width: 600px) {
      [data-onboarding-grid] { grid-template-columns: 1fr !important; }
    }
  `;
  document.head.appendChild(s);
}

export default OnboardingModal;





// /**
//  * OnboardingModal.tsx — Production-ready, fully typed
//  * npm install framer-motion lucide-react
//  *
//  * USAGE:
//  *   import OnboardingModal from "./OnboardingModal";
//  *
//  *   <OnboardingModal
//  *     isOpen={open}
//  *     onClose={() => setOpen(false)}
//  *     calendlyUrl="https://calendly.com/yourname/30min"
//  *     onSuccess={(data) => console.log("Lead:", data)}
//  *   />
//  */

// import { useState, useEffect, useCallback } from "react";
// import type { CSSProperties } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, ArrowRight, ArrowLeft, Check, AlertCircle } from "lucide-react";

// // ── Types ─────────────────────────────────────────────────────
// interface FormData {
//   businessType: string;
//   revenue:      string;
//   growthGoal:   string;
//   channels:     string[];
//   bottleneck:   string;
//   timeline:     string;
//   budget:       string;
//   name:         string;
//   email:        string;
//   phone:        string;
//   company:      string;
// }

// interface StepErrors {
//   businessType?: string;
//   revenue?:      string;
//   growthGoal?:   string;
//   channels?:     string;
//   bottleneck?:   string;
//   timeline?:     string;
//   budget?:       string;
//   name?:         string;
//   email?:        string;
// }

// interface OnboardingModalProps {
//   isOpen:       boolean;
//   onClose:      () => void;
//   calendlyUrl?: string;
//   onSuccess?:   (data: FormData) => void;
// }

// // ── Config ────────────────────────────────────────────────────
// // const DEFAULT_CALENDLY_URL = "https://calendly.com/yourname/30min";
// const DEFAULT_CALENDLY_URL = "https://calendly.com/jaspreet99100/30min";
// const STEPS: Record<number, { heading: string; sub: string }> = {
//   1: { heading: "Tell us about your business",  sub: "Help us understand where you are right now."       },
//   2: { heading: "Your growth infrastructure",   sub: "What you're working with and where it's breaking." },
//   3: { heading: "Scope & contact",              sub: "Last step — then you'll book a call directly."     },
//   4: { heading: "Book your strategy call",      sub: "Pick a time that works for you. We'll be ready."   },
// };

// const OPTIONS = {
//   businessTypes: ["Agency", "SaaS", "E-commerce", "Creator", "Consultant", "Other"],
//   revenueRanges: ["$0–$10k/mo", "$10k–$50k/mo", "$50k–$100k/mo", "$100k–$500k/mo", "$500k+/mo"],
//   growthGoals:   ["Brand Awareness", "Lead Generation", "Revenue Growth", "Authority Building", "Market Expansion"],
//   channels:      ["Social Media", "Paid Ads", "Content Marketing", "Email", "SEO", "Referrals"],
//   bottlenecks:   ["No Clear Strategy", "Inconsistent Leads", "Low Conversion", "Scaling Issues", "Brand Positioning"],
//   timelines:     ["ASAP", "1–3 Months", "3–6 Months", "6–12 Months"],
//   budgets:       ["$2k–$5k/mo", "$5k–$10k/mo", "$10k–$25k/mo", "$25k+/mo"],
// };

// const EMPTY_FORM: FormData = {
//   businessType: "",
//   revenue:      "",
//   growthGoal:   "",
//   channels:     [],
//   bottleneck:   "",
//   timeline:     "",
//   budget:       "",
//   name:         "",
//   email:        "",
//   phone:        "",
//   company:      "",
// };

// // ── Validation ────────────────────────────────────────────────
// function validateStep(step: number, f: FormData): StepErrors {
//   const e: StepErrors = {};
//   if (step === 1) {
//     if (!f.businessType)     e.businessType = "Pick a business type";
//     if (!f.revenue)          e.revenue      = "Select a revenue range";
//     if (!f.growthGoal)       e.growthGoal   = "Choose a primary goal";
//   }
//   if (step === 2) {
//     if (!f.channels.length)  e.channels   = "Select at least one channel";
//     if (!f.bottleneck)       e.bottleneck = "Pick your biggest bottleneck";
//     if (!f.timeline)         e.timeline   = "Choose a timeline";
//   }
//   if (step === 3) {
//     if (!f.budget)                           e.budget = "Select a budget range";
//     if (!f.name.trim())                      e.name   = "Name is required";
//     if (!f.email.trim())                     e.email  = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(f.email)) e.email  = "Enter a valid email";
//   }
//   return e;
// }

// // ── OptionChip ────────────────────────────────────────────────
// function OptionChip({
//   label, selected, onClick, error,
// }: {
//   label: string; selected: boolean; onClick: () => void; error?: string;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       style={{
//         padding:       "8px 16px",
//         borderRadius:  8,
//         border:        `1px solid ${selected ? "#e8d5b0" : error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
//         background:    selected ? "rgba(232,213,176,0.15)" : "rgba(255,255,255,0.03)",
//         color:         selected ? "#e8d5b0" : "#94a3b8",
//         fontSize:      13,
//         fontFamily:    "'DM Mono', monospace",
//         cursor:        "pointer",
//         transition:    "all 0.15s",
//         letterSpacing: "0.01em",
//         whiteSpace:    "nowrap",
//       } satisfies CSSProperties}
//     >
//       {selected && <span style={{ marginRight: 6, fontSize: 10 }}>✦</span>}
//       {label}
//     </button>
//   );
// }

// // ── FieldError ────────────────────────────────────────────────
// function FieldError({ msg }: { msg?: string }) {
//   if (!msg) return null;
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 8 }}>
//       <AlertCircle size={12} color="#ef4444" />
//       <span style={{ fontSize: 12, color: "#ef4444", fontFamily: "'DM Mono', monospace" }}>
//         {msg}
//       </span>
//     </div>
//   );
// }

// // ── TextInput ─────────────────────────────────────────────────
// function TextInput({
//   label, type = "text", value, onChange, placeholder, error, required,
// }: {
//   label:        string;
//   type?:        string;
//   value:        string;
//   onChange:     (e: React.ChangeEvent<HTMLInputElement>) => void;
//   placeholder?: string;
//   error?:       string;
//   required?:    boolean;
// }) {
//   return (
//     <div>
//       <label style={css.label}>
//         {label}
//         {required && <span style={{ color: "#e8d5b0", marginLeft: 3 }}>*</span>}
//       </label>
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         style={{
//           ...css.input,
//           borderColor: error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)",
//         }}
//       />
//       <FieldError msg={error} />
//     </div>
//   );
// }

// // ── StepSection ───────────────────────────────────────────────
// function StepSection({
//   label, children, error,
// }: {
//   label:    string;
//   children: React.ReactNode;
//   error?:   string;
// }) {
//   return (
//     <div>
//       <label style={css.label}>{label}</label>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
//         {children}
//       </div>
//       <FieldError msg={error} />
//     </div>
//   );
// }

// // ── CalendlyEmbed ─────────────────────────────────────────────
// // Uses a plain <iframe> — no widget script needed, always renders reliably.
// function buildCalendlyUrl(base: string, prefill: Partial<FormData> = {}): string {
//   const url = new URL(base);
//   if (prefill.name)  url.searchParams.set("name",  prefill.name);
//   if (prefill.email) url.searchParams.set("email", prefill.email);
//   // Hide Calendly branding elements for a cleaner embed
//   url.searchParams.set("hide_event_type_details", "1");
//   url.searchParams.set("hide_gdpr_banner", "1");
//   return url.toString();
// }

// function CalendlyEmbed({ url, prefill }: { url: string; prefill: Partial<FormData> }) {
//   const embedUrl = buildCalendlyUrl(url, prefill);

//   return (
//     <iframe
//       src={embedUrl}
//       width="100%"
//       height="560"
//       frameBorder="0"
//       title="Schedule a call"
//       style={{ borderRadius: 12, border: "none", display: "block" }}
//     />
//   );
// }

// // ── Main Modal ────────────────────────────────────────────────
// export function OnboardingModal({
//   isOpen,
//   onClose,
//   calendlyUrl = DEFAULT_CALENDLY_URL,
//   onSuccess,
// }: OnboardingModalProps) {

//   // All hooks at the very top — Rules of Hooks
//   const [step,      setStep]      = useState(1);
//   const [formData,  setFormData]  = useState<FormData>(EMPTY_FORM);
//   const [errors,    setErrors]    = useState<StepErrors>({});
//   const [direction, setDirection] = useState(1);

//   const reset = useCallback(() => {
//     setStep(1);
//     setFormData(EMPTY_FORM);
//     setErrors({});
//     setDirection(1);
//   }, []);

//   const handleClose = useCallback(() => {
//     onClose();
//     setTimeout(reset, 300);
//   }, [onClose, reset]);

//   // Scroll lock
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [isOpen]);

//   // Escape key
//   useEffect(() => {
//     const fn = (e: KeyboardEvent) => {
//       if (e.key === "Escape" && isOpen) handleClose();
//     };
//     window.addEventListener("keydown", fn);
//     return () => window.removeEventListener("keydown", fn);
//   }, [isOpen, handleClose]);

//   // Field handlers
//   const select = (field: keyof FormData, value: string) => {
//     if (field === "channels") {
//       const cur = formData.channels;
//       setFormData(f => ({
//         ...f,
//         channels: cur.includes(value)
//           ? cur.filter(c => c !== value)
//           : [...cur, value],
//       }));
//     } else {
//       setFormData(f => ({ ...f, [field]: value }));
//     }
//     setErrors(e => ({ ...e, [field]: undefined }));
//   };

//   const handleInput =
//     (field: keyof FormData) =>
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       setFormData(f => ({ ...f, [field]: e.target.value }));
//       setErrors(er => ({ ...er, [field]: undefined }));
//     };

//   const handleNext = () => {
//     const errs = validateStep(step, formData);
//     if (Object.keys(errs).length) { setErrors(errs); return; }
//     setErrors({});
//     setStep(s => s + 1);
//   };

//   const handleBack = () => {
//     setErrors({});
//     setStep(s => s - 1);
//   };

//   // No backend — validate then jump straight to Calendly
//   const handleSubmit = () => {
//     const errs = validateStep(3, formData);
//     if (Object.keys(errs).length) { setErrors(errs); return; }
//     onSuccess?.(formData);
//     setStep(4);
//   };

//   const goNext   = () => { setDirection(1);  handleNext();   };
//   const goBack   = () => { setDirection(-1); handleBack();   };
//   const goSubmit = () => { setDirection(1);  handleSubmit(); };

//   const slideVariants = {
//     enter:  (dir: number) => ({ opacity: 0, x: dir > 0 ?  32 : -32 }),
//     center: { opacity: 1, x: 0 },
//     exit:   (dir: number) => ({ opacity: 0, x: dir > 0 ? -32 :  32 }),
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           role="dialog"
//           aria-modal="true"
//           style={css.overlay}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           {/* Backdrop */}
//           <motion.div
//             style={css.backdrop}
//             onClick={handleClose}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           />

//           {/* Modal panel */}
//           <motion.div
//             style={{ ...css.modal, maxWidth: step === 4 ? 780 : 640 }}
//             initial={{ opacity: 0, scale: 0.96, y: 24 }}
//             animate={{ opacity: 1, scale: 1,    y: 0  }}
//             exit={{   opacity: 0, scale: 0.96,  y: 24 }}
//             transition={{ type: "spring", damping: 28, stiffness: 320 }}
//           >
//             {/* Noise texture */}
//             <div style={css.noise} />

//             {/* Close */}
//             <button onClick={handleClose} style={css.closeBtn} aria-label="Close">
//               <X size={16} />
//             </button>

//             {/* Progress bar */}
//             {step < 4 && (
//               <div style={css.progressWrap}>
//                 {[0, 1, 2].map(i => (
//                   <div
//                     key={i}
//                     style={{
//                       ...css.progressSegment,
//                       background: i < step ? "#e8d5b0" : "rgba(255,255,255,0.08)",
//                     }}
//                   />
//                 ))}
//               </div>
//             )}

//             <div style={{ padding: step === 4 ? "32px 36px 36px" : "40px 44px 44px" }}>

//               {/* Animated heading */}
//               <AnimatePresence mode="wait" custom={direction}>
//                 <motion.div
//                   key={`head-${step}`}
//                   custom={direction}
//                   variants={slideVariants}
//                   initial="enter"
//                   animate="center"
//                   exit="exit"
//                   transition={{ duration: 0.22, ease: "easeInOut" }}
//                 >
//                   <div style={css.stepLabel}>
//                     {step < 4 ? `Step ${step} of 3` : "Almost there"}
//                   </div>
//                   <h2 style={css.heading}>{STEPS[step].heading}</h2>
//                   <p style={css.sub}>{STEPS[step].sub}</p>
//                 </motion.div>
//               </AnimatePresence>

//               {/* Animated body */}
//               <AnimatePresence mode="wait" custom={direction}>
//                 <motion.div
//                   key={`body-${step}`}
//                   custom={direction}
//                   variants={slideVariants}
//                   initial="enter"
//                   animate="center"
//                   exit="exit"
//                   transition={{ duration: 0.22, ease: "easeInOut" }}
//                   style={{ marginTop: 32 }}
//                 >

//                   {/* Step 1 */}
//                   {step === 1 && (
//                     <div style={css.stack}>
//                       <StepSection label="Business type" error={errors.businessType}>
//                         {OPTIONS.businessTypes.map(v => (
//                           <OptionChip
//                             key={v} label={v}
//                             selected={formData.businessType === v}
//                             onClick={() => select("businessType", v)}
//                             error={errors.businessType}
//                           />
//                         ))}
//                       </StepSection>
//                       <StepSection label="Monthly revenue" error={errors.revenue}>
//                         {OPTIONS.revenueRanges.map(v => (
//                           <OptionChip
//                             key={v} label={v}
//                             selected={formData.revenue === v}
//                             onClick={() => select("revenue", v)}
//                             error={errors.revenue}
//                           />
//                         ))}
//                       </StepSection>
//                       <StepSection label="Primary growth goal" error={errors.growthGoal}>
//                         {OPTIONS.growthGoals.map(v => (
//                           <OptionChip
//                             key={v} label={v}
//                             selected={formData.growthGoal === v}
//                             onClick={() => select("growthGoal", v)}
//                             error={errors.growthGoal}
//                           />
//                         ))}
//                       </StepSection>
//                     </div>
//                   )}

//                   {/* Step 2 */}
//                   {step === 2 && (
//                     <div style={css.stack}>
//                       <StepSection label="Active marketing channels (select all)" error={errors.channels}>
//                         {OPTIONS.channels.map(v => (
//                           <OptionChip
//                             key={v} label={v}
//                             selected={formData.channels.includes(v)}
//                             onClick={() => select("channels", v)}
//                             error={errors.channels}
//                           />
//                         ))}
//                       </StepSection>
//                       <StepSection label="Biggest growth bottleneck" error={errors.bottleneck}>
//                         {OPTIONS.bottlenecks.map(v => (
//                           <OptionChip
//                             key={v} label={v}
//                             selected={formData.bottleneck === v}
//                             onClick={() => select("bottleneck", v)}
//                             error={errors.bottleneck}
//                           />
//                         ))}
//                       </StepSection>
//                       <StepSection label="Desired timeline to results" error={errors.timeline}>
//                         {OPTIONS.timelines.map(v => (
//                           <OptionChip
//                             key={v} label={v}
//                             selected={formData.timeline === v}
//                             onClick={() => select("timeline", v)}
//                             error={errors.timeline}
//                           />
//                         ))}
//                       </StepSection>
//                     </div>
//                   )}

//                   {/* Step 3 */}
//                   {step === 3 && (
//                     <div style={css.stack}>
//                       <StepSection label="Monthly budget range" error={errors.budget}>
//                         {OPTIONS.budgets.map(v => (
//                           <OptionChip
//                             key={v} label={v}
//                             selected={formData.budget === v}
//                             onClick={() => select("budget", v)}
//                             error={errors.budget}
//                           />
//                         ))}
//                       </StepSection>
//                       <div style={css.grid2}>
//                         <TextInput
//                           label="Full name" required
//                           value={formData.name}
//                           onChange={handleInput("name")}
//                           placeholder="Jane Smith"
//                           error={errors.name}
//                         />
//                         <TextInput
//                           label="Work email" type="email" required
//                           value={formData.email}
//                           onChange={handleInput("email")}
//                           placeholder="you@company.com"
//                           error={errors.email}
//                         />
//                         <TextInput
//                           label="Phone" type="tel"
//                           value={formData.phone}
//                           onChange={handleInput("phone")}
//                           placeholder="+1 555 000 0000"
//                         />
//                         <TextInput
//                           label="Company"
//                           value={formData.company}
//                           onChange={handleInput("company")}
//                           placeholder="Your company name"
//                         />
//                       </div>
//                     </div>
//                   )}

//                   {/* Step 4 — Calendly */}
//                   {step === 4 && (
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.15 }}
//                     >
//                       <div style={css.confirmBanner}>
//                         <Check size={14} style={{ flexShrink: 0 }} />
//                         <span>Application received — now lock in your call time below.</span>
//                       </div>
//                       <CalendlyEmbed
//                         url={calendlyUrl}
//                         prefill={{ name: formData.name, email: formData.email }}
//                       />
//                     </motion.div>
//                   )}

//                 </motion.div>
//               </AnimatePresence>

//               {/* Navigation (hidden on step 4) */}
//               {step < 4 && (
//                 <div style={css.navRow}>
//                   {step > 1
//                     ? (
//                       <button style={css.ghostBtn} onClick={goBack}>
//                         <ArrowLeft size={15} /> Back
//                       </button>
//                     )
//                     : <div />
//                   }
//                   {step < 3
//                     ? (
//                       <button style={css.primaryBtn} onClick={goNext}>
//                         Continue <ArrowRight size={15} />
//                       </button>
//                     )
//                     : (
//                       <button style={css.primaryBtn} onClick={goSubmit}>
//                         <Check size={15} /> Submit Application
//                       </button>
//                     )
//                   }
//                 </div>
//               )}

//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// // ── Styles ────────────────────────────────────────────────────
// // Typed as Record<string, CSSProperties> — fixes all TS2322 errors
// // ("string not assignable to FlexDirection / Position / TextTransform" etc.)
// const css: Record<string, CSSProperties> = {
//   overlay: {
//     position:       "fixed",
//     inset:          0,
//     zIndex:         50,
//     display:        "flex",
//     alignItems:     "center",
//     justifyContent: "center",
//     padding:        16,
//   },
//   backdrop: {
//     position:             "absolute",
//     inset:                0,
//     background:           "rgba(0,0,0,0.75)",
//     backdropFilter:       "blur(8px)",
//     WebkitBackdropFilter: "blur(8px)",
//   },
//   modal: {
//     position:     "relative",
//     width:        "100%",
//     background:   "#0e0e0e",
//     border:       "1px solid rgba(255,255,255,0.08)",
//     borderRadius: 20,
//     overflow:     "hidden",
//     boxShadow:    "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
//     maxHeight:    "92vh",
//     overflowY:    "auto",
//     transition:   "max-width 0.35s ease",
//   },
//   noise: {
//     position:        "absolute",
//     inset:           0,
//     backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
//     pointerEvents:   "none",
//     zIndex:          0,
//     opacity:         0.4,
//   },
//   closeBtn: {
//     position:       "absolute",
//     top:            16,
//     right:          16,
//     zIndex:         10,
//     width:          32,
//     height:         32,
//     borderRadius:   "50%",
//     border:         "1px solid rgba(255,255,255,0.1)",
//     background:     "rgba(255,255,255,0.05)",
//     color:          "#94a3b8",
//     display:        "flex",
//     alignItems:     "center",
//     justifyContent: "center",
//     cursor:         "pointer",
//     transition:     "all 0.15s",
//   },
//   progressWrap: {
//     display:  "flex",
//     gap:      4,
//     padding:  "20px 44px 0",
//     position: "relative",
//     zIndex:   1,
//   },
//   progressSegment: {
//     flex:         1,
//     height:       2,
//     borderRadius: 99,
//     transition:   "background 0.3s ease",
//   },
//   stepLabel: {
//     fontFamily:    "'DM Mono', monospace",
//     fontSize:      11,
//     letterSpacing: "0.1em",
//     textTransform: "uppercase",
//     color:         "#475569",
//     marginBottom:  12,
//   },
//   heading: {
//     fontFamily:    "'Playfair Display', 'Georgia', serif",
//     fontSize:      28,
//     fontWeight:    700,
//     color:         "#f1f5f9",
//     letterSpacing: "-0.02em",
//     lineHeight:    1.25,
//     marginBottom:  6,
//   },
//   sub: {
//     fontFamily: "'DM Mono', monospace",
//     fontSize:   13,
//     color:      "#64748b",
//     lineHeight: 1.6,
//   },
//   stack: {
//     display:       "flex",
//     flexDirection: "column",
//     gap:           28,
//   },
//   label: {
//     display:       "block",
//     fontFamily:    "'DM Mono', monospace",
//     fontSize:      11,
//     letterSpacing: "0.07em",
//     textTransform: "uppercase",
//     color:         "#64748b",
//     marginBottom:  2,
//   },
//   input: {
//     display:      "block",
//     width:        "100%",
//     padding:      "10px 14px",
//     background:   "rgba(255,255,255,0.04)",
//     border:       "1px solid rgba(255,255,255,0.1)",
//     borderRadius: 8,
//     color:        "#e2e8f0",
//     fontSize:     14,
//     fontFamily:   "'DM Mono', monospace",
//     outline:      "none",
//     transition:   "border-color 0.15s",
//     boxSizing:    "border-box",
//   },
//   grid2: {
//     display:             "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap:                 16,
//   },
//   navRow: {
//     display:        "flex",
//     alignItems:     "center",
//     justifyContent: "space-between",
//     marginTop:      40,
//   },
//   primaryBtn: {
//     display:       "inline-flex",
//     alignItems:    "center",
//     gap:           8,
//     padding:       "11px 24px",
//     background:    "#e8d5b0",
//     color:         "#0a0a0a",
//     border:        "none",
//     borderRadius:  8,
//     fontSize:      13,
//     fontFamily:    "'DM Mono', monospace",
//     fontWeight:    600,
//     cursor:        "pointer",
//     transition:    "opacity 0.15s, transform 0.1s",
//     letterSpacing: "0.01em",
//   },
//   ghostBtn: {
//     display:      "inline-flex",
//     alignItems:   "center",
//     gap:          6,
//     padding:      "11px 16px",
//     background:   "transparent",
//     color:        "#64748b",
//     border:       "1px solid rgba(255,255,255,0.08)",
//     borderRadius: 8,
//     fontSize:     13,
//     fontFamily:   "'DM Mono', monospace",
//     cursor:       "pointer",
//     transition:   "color 0.15s, border-color 0.15s",
//   },
//   confirmBanner: {
//     display:      "flex",
//     alignItems:   "center",
//     gap:          8,
//     padding:      "10px 16px",
//     background:   "rgba(52,211,153,0.08)",
//     border:       "1px solid rgba(52,211,153,0.2)",
//     borderRadius: 8,
//     color:        "#34d399",
//     fontSize:     13,
//     fontFamily:   "'DM Mono', monospace",
//     marginBottom: 24,
//   },
// };

// // ── Inject fonts once ─────────────────────────────────────────
// if (typeof document !== "undefined" && !document.getElementById("onboarding-globals")) {
//   const s = document.createElement("style");
//   s.id = "onboarding-globals";
//   s.textContent = `
//     @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Mono:wght@400;500&display=swap');
//     @media (max-width: 600px) {
//       [data-onboarding-grid] { grid-template-columns: 1fr !important; }
//     }
//   `;
//   document.head.appendChild(s);
// }

// export default OnboardingModal;







// // /**
// //  * OnboardingModal.tsx — Production-ready, fully typed
// //  * npm install framer-motion lucide-react
// //  *
// //  * USAGE:
// //  *   import OnboardingModal from "./OnboardingModal";
// //  *
// //  *   <OnboardingModal
// //  *     isOpen={open}
// //  *     onClose={() => setOpen(false)}
// //  *     calendlyUrl="https://calendly.com/yourname/30min"
// //  *     onSuccess={(data) => console.log("Lead:", data)}
// //  *   />
// //  */

// // import { useState, useEffect, useCallback, useRef } from "react";
// // import type { CSSProperties } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { X, ArrowRight, ArrowLeft, Check, AlertCircle } from "lucide-react";

// // // ── Window.Calendly global declaration ───────────────────────
// // declare global {
// //   interface Window {
// //     Calendly?: {
// //       initInlineWidget: (opts: {
// //         url: string;
// //         parentElement: HTMLElement;
// //         prefill?: Record<string, string>;
// //       }) => void;
// //     };
// //   }
// // }

// // // ── Types ─────────────────────────────────────────────────────
// // interface FormData {
// //   businessType: string;
// //   revenue:      string;
// //   growthGoal:   string;
// //   channels:     string[];
// //   bottleneck:   string;
// //   timeline:     string;
// //   budget:       string;
// //   name:         string;
// //   email:        string;
// //   phone:        string;
// //   company:      string;
// // }

// // interface StepErrors {
// //   businessType?: string;
// //   revenue?:      string;
// //   growthGoal?:   string;
// //   channels?:     string;
// //   bottleneck?:   string;
// //   timeline?:     string;
// //   budget?:       string;
// //   name?:         string;
// //   email?:        string;
// // }

// // interface OnboardingModalProps {
// //   isOpen:       boolean;
// //   onClose:      () => void;
// //   calendlyUrl?: string;
// //   onSuccess?:   (data: FormData) => void;
// // }

// // // ── Config ────────────────────────────────────────────────────
// // const DEFAULT_CALENDLY_URL = "https://calendly.com/yourname/30min";

// // const STEPS: Record<number, { heading: string; sub: string }> = {
// //   1: { heading: "Tell us about your business",  sub: "Help us understand where you are right now."       },
// //   2: { heading: "Your growth infrastructure",   sub: "What you're working with and where it's breaking." },
// //   3: { heading: "Scope & contact",              sub: "Last step — then you'll book a call directly."     },
// //   4: { heading: "Book your strategy call",      sub: "Pick a time that works for you. We'll be ready."   },
// // };

// // const OPTIONS = {
// //   businessTypes: ["Agency", "SaaS", "E-commerce", "Creator", "Consultant", "Other"],
// //   revenueRanges: ["$0–$10k/mo", "$10k–$50k/mo", "$50k–$100k/mo", "$100k–$500k/mo", "$500k+/mo"],
// //   growthGoals:   ["Brand Awareness", "Lead Generation", "Revenue Growth", "Authority Building", "Market Expansion"],
// //   channels:      ["Social Media", "Paid Ads", "Content Marketing", "Email", "SEO", "Referrals"],
// //   bottlenecks:   ["No Clear Strategy", "Inconsistent Leads", "Low Conversion", "Scaling Issues", "Brand Positioning"],
// //   timelines:     ["ASAP", "1–3 Months", "3–6 Months", "6–12 Months"],
// //   budgets:       ["$2k–$5k/mo", "$5k–$10k/mo", "$10k–$25k/mo", "$25k+/mo"],
// // };

// // const EMPTY_FORM: FormData = {
// //   businessType: "",
// //   revenue:      "",
// //   growthGoal:   "",
// //   channels:     [],
// //   bottleneck:   "",
// //   timeline:     "",
// //   budget:       "",
// //   name:         "",
// //   email:        "",
// //   phone:        "",
// //   company:      "",
// // };

// // // ── Validation ────────────────────────────────────────────────
// // function validateStep(step: number, f: FormData): StepErrors {
// //   const e: StepErrors = {};
// //   if (step === 1) {
// //     if (!f.businessType)     e.businessType = "Pick a business type";
// //     if (!f.revenue)          e.revenue      = "Select a revenue range";
// //     if (!f.growthGoal)       e.growthGoal   = "Choose a primary goal";
// //   }
// //   if (step === 2) {
// //     if (!f.channels.length)  e.channels   = "Select at least one channel";
// //     if (!f.bottleneck)       e.bottleneck = "Pick your biggest bottleneck";
// //     if (!f.timeline)         e.timeline   = "Choose a timeline";
// //   }
// //   if (step === 3) {
// //     if (!f.budget)                           e.budget = "Select a budget range";
// //     if (!f.name.trim())                      e.name   = "Name is required";
// //     if (!f.email.trim())                     e.email  = "Email is required";
// //     else if (!/\S+@\S+\.\S+/.test(f.email)) e.email  = "Enter a valid email";
// //   }
// //   return e;
// // }

// // // ── OptionChip ────────────────────────────────────────────────
// // function OptionChip({
// //   label, selected, onClick, error,
// // }: {
// //   label: string; selected: boolean; onClick: () => void; error?: string;
// // }) {
// //   return (
// //     <button
// //       type="button"
// //       onClick={onClick}
// //       style={{
// //         padding:       "8px 16px",
// //         borderRadius:  8,
// //         border:        `1px solid ${selected ? "#e8d5b0" : error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
// //         background:    selected ? "rgba(232,213,176,0.15)" : "rgba(255,255,255,0.03)",
// //         color:         selected ? "#e8d5b0" : "#94a3b8",
// //         fontSize:      13,
// //         fontFamily:    "'DM Mono', monospace",
// //         cursor:        "pointer",
// //         transition:    "all 0.15s",
// //         letterSpacing: "0.01em",
// //         whiteSpace:    "nowrap",
// //       } satisfies CSSProperties}
// //     >
// //       {selected && <span style={{ marginRight: 6, fontSize: 10 }}>✦</span>}
// //       {label}
// //     </button>
// //   );
// // }

// // // ── FieldError ────────────────────────────────────────────────
// // function FieldError({ msg }: { msg?: string }) {
// //   if (!msg) return null;
// //   return (
// //     <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 8 }}>
// //       <AlertCircle size={12} color="#ef4444" />
// //       <span style={{ fontSize: 12, color: "#ef4444", fontFamily: "'DM Mono', monospace" }}>
// //         {msg}
// //       </span>
// //     </div>
// //   );
// // }

// // // ── TextInput ─────────────────────────────────────────────────
// // function TextInput({
// //   label, type = "text", value, onChange, placeholder, error, required,
// // }: {
// //   label:        string;
// //   type?:        string;
// //   value:        string;
// //   onChange:     (e: React.ChangeEvent<HTMLInputElement>) => void;
// //   placeholder?: string;
// //   error?:       string;
// //   required?:    boolean;
// // }) {
// //   return (
// //     <div>
// //       <label style={css.label}>
// //         {label}
// //         {required && <span style={{ color: "#e8d5b0", marginLeft: 3 }}>*</span>}
// //       </label>
// //       <input
// //         type={type}
// //         value={value}
// //         onChange={onChange}
// //         placeholder={placeholder}
// //         style={{
// //           ...css.input,
// //           borderColor: error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)",
// //         }}
// //       />
// //       <FieldError msg={error} />
// //     </div>
// //   );
// // }

// // // ── StepSection ───────────────────────────────────────────────
// // function StepSection({
// //   label, children, error,
// // }: {
// //   label:    string;
// //   children: React.ReactNode;
// //   error?:   string;
// // }) {
// //   return (
// //     <div>
// //       <label style={css.label}>{label}</label>
// //       <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
// //         {children}
// //       </div>
// //       <FieldError msg={error} />
// //     </div>
// //   );
// // }

// // // ── CalendlyEmbed ─────────────────────────────────────────────
// // function buildCalendlyUrl(base: string, prefill: Partial<FormData> = {}): string {
// //   const url = new URL(base);
// //   if (prefill.name)  url.searchParams.set("name",  prefill.name);
// //   if (prefill.email) url.searchParams.set("email", prefill.email);
// //   return url.toString();
// // }

// // function CalendlyEmbed({ url, prefill }: { url: string; prefill: Partial<FormData> }) {
// //   const ref = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //     const mountWidget = () => {
// //       if (window.Calendly && ref.current) {
// //         ref.current.innerHTML = "";
// //         window.Calendly.initInlineWidget({
// //           url:           buildCalendlyUrl(url, prefill),
// //           parentElement: ref.current,
// //         });
// //       }
// //     };

// //     if (window.Calendly) {
// //       mountWidget();
// //     } else {
// //       const script    = document.createElement("script");
// //       script.src      = "https://assets.calendly.com/assets/external/widget.js";
// //       script.async    = true;
// //       script.onload   = mountWidget;
// //       document.head.appendChild(script);
// //       return () => {
// //         try { document.head.removeChild(script); } catch { /* already removed */ }
// //       };
// //     }
// //   }, [url]); // eslint-disable-line react-hooks/exhaustive-deps

// //   return (
// //     <div
// //       ref={ref}
// //       style={{ width: "100%", height: 560, borderRadius: 12, overflow: "hidden" }}
// //     />
// //   );
// // }

// // // ── Main Modal ────────────────────────────────────────────────
// // export function OnboardingModal({
// //   isOpen,
// //   onClose,
// //   calendlyUrl = DEFAULT_CALENDLY_URL,
// //   onSuccess,
// // }: OnboardingModalProps) {

// //   // All hooks at the very top — Rules of Hooks
// //   const [step,      setStep]      = useState(1);
// //   const [formData,  setFormData]  = useState<FormData>(EMPTY_FORM);
// //   const [errors,    setErrors]    = useState<StepErrors>({});
// //   const [direction, setDirection] = useState(1);

// //   const reset = useCallback(() => {
// //     setStep(1);
// //     setFormData(EMPTY_FORM);
// //     setErrors({});
// //     setDirection(1);
// //   }, []);

// //   const handleClose = useCallback(() => {
// //     onClose();
// //     setTimeout(reset, 300);
// //   }, [onClose, reset]);

// //   // Scroll lock
// //   useEffect(() => {
// //     document.body.style.overflow = isOpen ? "hidden" : "";
// //     return () => { document.body.style.overflow = ""; };
// //   }, [isOpen]);

// //   // Escape key
// //   useEffect(() => {
// //     const fn = (e: KeyboardEvent) => {
// //       if (e.key === "Escape" && isOpen) handleClose();
// //     };
// //     window.addEventListener("keydown", fn);
// //     return () => window.removeEventListener("keydown", fn);
// //   }, [isOpen, handleClose]);

// //   // Field handlers
// //   const select = (field: keyof FormData, value: string) => {
// //     if (field === "channels") {
// //       const cur = formData.channels;
// //       setFormData(f => ({
// //         ...f,
// //         channels: cur.includes(value)
// //           ? cur.filter(c => c !== value)
// //           : [...cur, value],
// //       }));
// //     } else {
// //       setFormData(f => ({ ...f, [field]: value }));
// //     }
// //     setErrors(e => ({ ...e, [field]: undefined }));
// //   };

// //   const handleInput =
// //     (field: keyof FormData) =>
// //     (e: React.ChangeEvent<HTMLInputElement>) => {
// //       setFormData(f => ({ ...f, [field]: e.target.value }));
// //       setErrors(er => ({ ...er, [field]: undefined }));
// //     };

// //   const handleNext = () => {
// //     const errs = validateStep(step, formData);
// //     if (Object.keys(errs).length) { setErrors(errs); return; }
// //     setErrors({});
// //     setStep(s => s + 1);
// //   };

// //   const handleBack = () => {
// //     setErrors({});
// //     setStep(s => s - 1);
// //   };

// //   // No backend — validate then jump straight to Calendly
// //   const handleSubmit = () => {
// //     const errs = validateStep(3, formData);
// //     if (Object.keys(errs).length) { setErrors(errs); return; }
// //     onSuccess?.(formData);
// //     setStep(4);
// //   };

// //   const goNext   = () => { setDirection(1);  handleNext();   };
// //   const goBack   = () => { setDirection(-1); handleBack();   };
// //   const goSubmit = () => { setDirection(1);  handleSubmit(); };

// //   const slideVariants = {
// //     enter:  (dir: number) => ({ opacity: 0, x: dir > 0 ?  32 : -32 }),
// //     center: { opacity: 1, x: 0 },
// //     exit:   (dir: number) => ({ opacity: 0, x: dir > 0 ? -32 :  32 }),
// //   };

// //   return (
// //     <AnimatePresence>
// //       {isOpen && (
// //         <motion.div
// //           role="dialog"
// //           aria-modal="true"
// //           style={css.overlay}
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           exit={{ opacity: 0 }}
// //         >
// //           {/* Backdrop */}
// //           <motion.div
// //             style={css.backdrop}
// //             onClick={handleClose}
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //           />

// //           {/* Modal panel */}
// //           <motion.div
// //             style={{ ...css.modal, maxWidth: step === 4 ? 780 : 640 }}
// //             initial={{ opacity: 0, scale: 0.96, y: 24 }}
// //             animate={{ opacity: 1, scale: 1,    y: 0  }}
// //             exit={{   opacity: 0, scale: 0.96,  y: 24 }}
// //             transition={{ type: "spring", damping: 28, stiffness: 320 }}
// //           >
// //             {/* Noise texture */}
// //             <div style={css.noise} />

// //             {/* Close */}
// //             <button onClick={handleClose} style={css.closeBtn} aria-label="Close">
// //               <X size={16} />
// //             </button>

// //             {/* Progress bar */}
// //             {step < 4 && (
// //               <div style={css.progressWrap}>
// //                 {[0, 1, 2].map(i => (
// //                   <div
// //                     key={i}
// //                     style={{
// //                       ...css.progressSegment,
// //                       background: i < step ? "#e8d5b0" : "rgba(255,255,255,0.08)",
// //                     }}
// //                   />
// //                 ))}
// //               </div>
// //             )}

// //             <div style={{ padding: step === 4 ? "32px 36px 36px" : "40px 44px 44px" }}>

// //               {/* Animated heading */}
// //               <AnimatePresence mode="wait" custom={direction}>
// //                 <motion.div
// //                   key={`head-${step}`}
// //                   custom={direction}
// //                   variants={slideVariants}
// //                   initial="enter"
// //                   animate="center"
// //                   exit="exit"
// //                   transition={{ duration: 0.22, ease: "easeInOut" }}
// //                 >
// //                   <div style={css.stepLabel}>
// //                     {step < 4 ? `Step ${step} of 3` : "Almost there"}
// //                   </div>
// //                   <h2 style={css.heading}>{STEPS[step].heading}</h2>
// //                   <p style={css.sub}>{STEPS[step].sub}</p>
// //                 </motion.div>
// //               </AnimatePresence>

// //               {/* Animated body */}
// //               <AnimatePresence mode="wait" custom={direction}>
// //                 <motion.div
// //                   key={`body-${step}`}
// //                   custom={direction}
// //                   variants={slideVariants}
// //                   initial="enter"
// //                   animate="center"
// //                   exit="exit"
// //                   transition={{ duration: 0.22, ease: "easeInOut" }}
// //                   style={{ marginTop: 32 }}
// //                 >

// //                   {/* Step 1 */}
// //                   {step === 1 && (
// //                     <div style={css.stack}>
// //                       <StepSection label="Business type" error={errors.businessType}>
// //                         {OPTIONS.businessTypes.map(v => (
// //                           <OptionChip
// //                             key={v} label={v}
// //                             selected={formData.businessType === v}
// //                             onClick={() => select("businessType", v)}
// //                             error={errors.businessType}
// //                           />
// //                         ))}
// //                       </StepSection>
// //                       <StepSection label="Monthly revenue" error={errors.revenue}>
// //                         {OPTIONS.revenueRanges.map(v => (
// //                           <OptionChip
// //                             key={v} label={v}
// //                             selected={formData.revenue === v}
// //                             onClick={() => select("revenue", v)}
// //                             error={errors.revenue}
// //                           />
// //                         ))}
// //                       </StepSection>
// //                       <StepSection label="Primary growth goal" error={errors.growthGoal}>
// //                         {OPTIONS.growthGoals.map(v => (
// //                           <OptionChip
// //                             key={v} label={v}
// //                             selected={formData.growthGoal === v}
// //                             onClick={() => select("growthGoal", v)}
// //                             error={errors.growthGoal}
// //                           />
// //                         ))}
// //                       </StepSection>
// //                     </div>
// //                   )}

// //                   {/* Step 2 */}
// //                   {step === 2 && (
// //                     <div style={css.stack}>
// //                       <StepSection label="Active marketing channels (select all)" error={errors.channels}>
// //                         {OPTIONS.channels.map(v => (
// //                           <OptionChip
// //                             key={v} label={v}
// //                             selected={formData.channels.includes(v)}
// //                             onClick={() => select("channels", v)}
// //                             error={errors.channels}
// //                           />
// //                         ))}
// //                       </StepSection>
// //                       <StepSection label="Biggest growth bottleneck" error={errors.bottleneck}>
// //                         {OPTIONS.bottlenecks.map(v => (
// //                           <OptionChip
// //                             key={v} label={v}
// //                             selected={formData.bottleneck === v}
// //                             onClick={() => select("bottleneck", v)}
// //                             error={errors.bottleneck}
// //                           />
// //                         ))}
// //                       </StepSection>
// //                       <StepSection label="Desired timeline to results" error={errors.timeline}>
// //                         {OPTIONS.timelines.map(v => (
// //                           <OptionChip
// //                             key={v} label={v}
// //                             selected={formData.timeline === v}
// //                             onClick={() => select("timeline", v)}
// //                             error={errors.timeline}
// //                           />
// //                         ))}
// //                       </StepSection>
// //                     </div>
// //                   )}

// //                   {/* Step 3 */}
// //                   {step === 3 && (
// //                     <div style={css.stack}>
// //                       <StepSection label="Monthly budget range" error={errors.budget}>
// //                         {OPTIONS.budgets.map(v => (
// //                           <OptionChip
// //                             key={v} label={v}
// //                             selected={formData.budget === v}
// //                             onClick={() => select("budget", v)}
// //                             error={errors.budget}
// //                           />
// //                         ))}
// //                       </StepSection>
// //                       <div style={css.grid2}>
// //                         <TextInput
// //                           label="Full name" required
// //                           value={formData.name}
// //                           onChange={handleInput("name")}
// //                           placeholder="Jane Smith"
// //                           error={errors.name}
// //                         />
// //                         <TextInput
// //                           label="Work email" type="email" required
// //                           value={formData.email}
// //                           onChange={handleInput("email")}
// //                           placeholder="you@company.com"
// //                           error={errors.email}
// //                         />
// //                         <TextInput
// //                           label="Phone" type="tel"
// //                           value={formData.phone}
// //                           onChange={handleInput("phone")}
// //                           placeholder="+1 555 000 0000"
// //                         />
// //                         <TextInput
// //                           label="Company"
// //                           value={formData.company}
// //                           onChange={handleInput("company")}
// //                           placeholder="Your company name"
// //                         />
// //                       </div>
// //                     </div>
// //                   )}

// //                   {/* Step 4 — Calendly */}
// //                   {step === 4 && (
// //                     <motion.div
// //                       initial={{ opacity: 0 }}
// //                       animate={{ opacity: 1 }}
// //                       transition={{ delay: 0.15 }}
// //                     >
// //                       <div style={css.confirmBanner}>
// //                         <Check size={14} style={{ flexShrink: 0 }} />
// //                         <span>Application received — now lock in your call time below.</span>
// //                       </div>
// //                       <CalendlyEmbed
// //                         url={calendlyUrl}
// //                         prefill={{ name: formData.name, email: formData.email }}
// //                       />
// //                     </motion.div>
// //                   )}

// //                 </motion.div>
// //               </AnimatePresence>

// //               {/* Navigation (hidden on step 4) */}
// //               {step < 4 && (
// //                 <div style={css.navRow}>
// //                   {step > 1
// //                     ? (
// //                       <button style={css.ghostBtn} onClick={goBack}>
// //                         <ArrowLeft size={15} /> Back
// //                       </button>
// //                     )
// //                     : <div />
// //                   }
// //                   {step < 3
// //                     ? (
// //                       <button style={css.primaryBtn} onClick={goNext}>
// //                         Continue <ArrowRight size={15} />
// //                       </button>
// //                     )
// //                     : (
// //                       <button style={css.primaryBtn} onClick={goSubmit}>
// //                         <Check size={15} /> Submit Application
// //                       </button>
// //                     )
// //                   }
// //                 </div>
// //               )}

// //             </div>
// //           </motion.div>
// //         </motion.div>
// //       )}
// //     </AnimatePresence>
// //   );
// // }

// // // ── Styles ────────────────────────────────────────────────────
// // // Typed as Record<string, CSSProperties> — fixes all TS2322 errors
// // // ("string not assignable to FlexDirection / Position / TextTransform" etc.)
// // const css: Record<string, CSSProperties> = {
// //   overlay: {
// //     position:       "fixed",
// //     inset:          0,
// //     zIndex:         50,
// //     display:        "flex",
// //     alignItems:     "center",
// //     justifyContent: "center",
// //     padding:        16,
// //   },
// //   backdrop: {
// //     position:             "absolute",
// //     inset:                0,
// //     background:           "rgba(0,0,0,0.75)",
// //     backdropFilter:       "blur(8px)",
// //     WebkitBackdropFilter: "blur(8px)",
// //   },
// //   modal: {
// //     position:     "relative",
// //     width:        "100%",
// //     background:   "#0e0e0e",
// //     border:       "1px solid rgba(255,255,255,0.08)",
// //     borderRadius: 20,
// //     overflow:     "hidden",
// //     boxShadow:    "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
// //     maxHeight:    "92vh",
// //     overflowY:    "auto",
// //     transition:   "max-width 0.35s ease",
// //   },
// //   noise: {
// //     position:        "absolute",
// //     inset:           0,
// //     backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
// //     pointerEvents:   "none",
// //     zIndex:          0,
// //     opacity:         0.4,
// //   },
// //   closeBtn: {
// //     position:       "absolute",
// //     top:            16,
// //     right:          16,
// //     zIndex:         10,
// //     width:          32,
// //     height:         32,
// //     borderRadius:   "50%",
// //     border:         "1px solid rgba(255,255,255,0.1)",
// //     background:     "rgba(255,255,255,0.05)",
// //     color:          "#94a3b8",
// //     display:        "flex",
// //     alignItems:     "center",
// //     justifyContent: "center",
// //     cursor:         "pointer",
// //     transition:     "all 0.15s",
// //   },
// //   progressWrap: {
// //     display:  "flex",
// //     gap:      4,
// //     padding:  "20px 44px 0",
// //     position: "relative",
// //     zIndex:   1,
// //   },
// //   progressSegment: {
// //     flex:         1,
// //     height:       2,
// //     borderRadius: 99,
// //     transition:   "background 0.3s ease",
// //   },
// //   stepLabel: {
// //     fontFamily:    "'DM Mono', monospace",
// //     fontSize:      11,
// //     letterSpacing: "0.1em",
// //     textTransform: "uppercase",
// //     color:         "#475569",
// //     marginBottom:  12,
// //   },
// //   heading: {
// //     fontFamily:    "'Playfair Display', 'Georgia', serif",
// //     fontSize:      28,
// //     fontWeight:    700,
// //     color:         "#f1f5f9",
// //     letterSpacing: "-0.02em",
// //     lineHeight:    1.25,
// //     marginBottom:  6,
// //   },
// //   sub: {
// //     fontFamily: "'DM Mono', monospace",
// //     fontSize:   13,
// //     color:      "#64748b",
// //     lineHeight: 1.6,
// //   },
// //   stack: {
// //     display:       "flex",
// //     flexDirection: "column",
// //     gap:           28,
// //   },
// //   label: {
// //     display:       "block",
// //     fontFamily:    "'DM Mono', monospace",
// //     fontSize:      11,
// //     letterSpacing: "0.07em",
// //     textTransform: "uppercase",
// //     color:         "#64748b",
// //     marginBottom:  2,
// //   },
// //   input: {
// //     display:      "block",
// //     width:        "100%",
// //     padding:      "10px 14px",
// //     background:   "rgba(255,255,255,0.04)",
// //     border:       "1px solid rgba(255,255,255,0.1)",
// //     borderRadius: 8,
// //     color:        "#e2e8f0",
// //     fontSize:     14,
// //     fontFamily:   "'DM Mono', monospace",
// //     outline:      "none",
// //     transition:   "border-color 0.15s",
// //     boxSizing:    "border-box",
// //   },
// //   grid2: {
// //     display:             "grid",
// //     gridTemplateColumns: "1fr 1fr",
// //     gap:                 16,
// //   },
// //   navRow: {
// //     display:        "flex",
// //     alignItems:     "center",
// //     justifyContent: "space-between",
// //     marginTop:      40,
// //   },
// //   primaryBtn: {
// //     display:       "inline-flex",
// //     alignItems:    "center",
// //     gap:           8,
// //     padding:       "11px 24px",
// //     background:    "#e8d5b0",
// //     color:         "#0a0a0a",
// //     border:        "none",
// //     borderRadius:  8,
// //     fontSize:      13,
// //     fontFamily:    "'DM Mono', monospace",
// //     fontWeight:    600,
// //     cursor:        "pointer",
// //     transition:    "opacity 0.15s, transform 0.1s",
// //     letterSpacing: "0.01em",
// //   },
// //   ghostBtn: {
// //     display:      "inline-flex",
// //     alignItems:   "center",
// //     gap:          6,
// //     padding:      "11px 16px",
// //     background:   "transparent",
// //     color:        "#64748b",
// //     border:       "1px solid rgba(255,255,255,0.08)",
// //     borderRadius: 8,
// //     fontSize:     13,
// //     fontFamily:   "'DM Mono', monospace",
// //     cursor:       "pointer",
// //     transition:   "color 0.15s, border-color 0.15s",
// //   },
// //   confirmBanner: {
// //     display:      "flex",
// //     alignItems:   "center",
// //     gap:          8,
// //     padding:      "10px 16px",
// //     background:   "rgba(52,211,153,0.08)",
// //     border:       "1px solid rgba(52,211,153,0.2)",
// //     borderRadius: 8,
// //     color:        "#34d399",
// //     fontSize:     13,
// //     fontFamily:   "'DM Mono', monospace",
// //     marginBottom: 24,
// //   },
// // };

// // // ── Inject fonts once ─────────────────────────────────────────
// // if (typeof document !== "undefined" && !document.getElementById("onboarding-globals")) {
// //   const s = document.createElement("style");
// //   s.id = "onboarding-globals";
// //   s.textContent = `
// //     @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Mono:wght@400;500&display=swap');
// //     @media (max-width: 600px) {
// //       [data-onboarding-grid] { grid-template-columns: 1fr !important; }
// //     }
// //   `;
// //   document.head.appendChild(s);
// // }

// // export default OnboardingModal;


// // // import { useState } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { X, ArrowRight, ArrowLeft, Check } from "lucide-react";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Label } from "@/components/ui/label";

// // // interface OnboardingModalProps {
// // //   isOpen: boolean;
// // //   onClose: () => void;
// // // }

// // // const businessTypes = ["Agency", "SaaS", "E-commerce", "Creator/Influencer", "Consultant", "Other"];
// // // const revenueRanges = ["$0 - $10k/mo", "$10k - $50k/mo", "$50k - $100k/mo", "$100k - $500k/mo", "$500k+/mo"];
// // // const growthGoals = ["Brand Awareness", "Lead Generation", "Revenue Growth", "Authority Building", "Market Expansion"];
// // // const channels = ["Social Media", "Paid Ads", "Content Marketing", "Email", "SEO", "Referrals"];
// // // const bottlenecks = ["No Clear Strategy", "Inconsistent Leads", "Low Conversion", "Scaling Issues", "Brand Positioning"];
// // // const timelines = ["ASAP", "1-3 Months", "3-6 Months", "6-12 Months"];
// // // const budgets = ["$2k - $5k/mo", "$5k - $10k/mo", "$10k - $25k/mo", "$25k+/mo"];

// // // export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
// // //   const [step, setStep] = useState(1);
// // //   const [submitted, setSubmitted] = useState(false);
// // //   const [formData, setFormData] = useState({
// // //     businessType: "",
// // //     revenue: "",
// // //     growthGoal: "",
// // //     channels: [] as string[],
// // //     bottleneck: "",
// // //     timeline: "",
// // //     budget: "",
// // //     name: "",
// // //     email: "",
// // //     phone: "",
// // //     company: "",
// // //   });

// // //   const handleSelect = (field: string, value: string) => {
// // //     if (field === "channels") {
// // //       const current = formData.channels;
// // //       if (current.includes(value)) {
// // //         setFormData({ ...formData, channels: current.filter((c) => c !== value) });
// // //       } else {
// // //         setFormData({ ...formData, channels: [...current, value] });
// // //       }
// // //     } else {
// // //       setFormData({ ...formData, [field]: value });
// // //     }
// // //   };

// // //   const handleSubmit = () => {
// // //     // In a real app, this would POST to /api/leads
// // //     console.log("Form submitted:", formData);
// // //     setSubmitted(true);
// // //   };

// // //   const handleClose = () => {
// // //     onClose();
// // //     setTimeout(() => {
// // //       setStep(1);
// // //       setSubmitted(false);
// // //       setFormData({
// // //         businessType: "",
// // //         revenue: "",
// // //         growthGoal: "",
// // //         channels: [],
// // //         bottleneck: "",
// // //         timeline: "",
// // //         budget: "",
// // //         name: "",
// // //         email: "",
// // //         phone: "",
// // //         company: "",
// // //       });
// // //     }, 300);
// // //   };

// // //   const nextStep = () => setStep(step + 1);
// // //   const prevStep = () => setStep(step - 1);

// // //   const canProceed = () => {
// // //     if (step === 1) return formData.businessType && formData.revenue && formData.growthGoal;
// // //     if (step === 2) return formData.channels.length > 0 && formData.bottleneck && formData.timeline;
// // //     if (step === 3) return formData.budget && formData.name && formData.email;
// // //     return true;
// // //   };

// // //   return (
// // //     <AnimatePresence>
// // //       {isOpen && (
// // //         <motion.div
// // //           className="fixed inset-0 z-50 flex items-center justify-center p-4"
// // //           initial={{ opacity: 0 }}
// // //           animate={{ opacity: 1 }}
// // //           exit={{ opacity: 0 }}
// // //         >
// // //           {/* Backdrop */}
// // //           <motion.div
// // //             className="absolute inset-0 bg-background/80 backdrop-blur-sm"
// // //             onClick={handleClose}
// // //             initial={{ opacity: 0 }}
// // //             animate={{ opacity: 1 }}
// // //             exit={{ opacity: 0 }}
// // //           />

// // //           {/* Modal */}
// // //           <motion.div
// // //             className="relative w-full max-w-2xl bg-card border border-[hsl(0_0%_100%/0.1)] rounded-2xl overflow-hidden"
// // //             initial={{ opacity: 0, scale: 0.95, y: 20 }}
// // //             animate={{ opacity: 1, scale: 1, y: 0 }}
// // //             exit={{ opacity: 0, scale: 0.95, y: 20 }}
// // //             transition={{ duration: 0.3 }}
// // //           >
// // //             {/* Close button */}
// // //             <button
// // //               onClick={handleClose}
// // //               className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors z-10"
// // //             >
// // //               <X size={20} />
// // //             </button>

// // //             {!submitted ? (
// // //               <div className="p-8 md:p-12">
// // //                 {/* Progress */}
// // //                 <div className="flex items-center gap-2 mb-8">
// // //                   {[1, 2, 3].map((s) => (
// // //                     <div
// // //                       key={s}
// // //                       className={`flex-1 h-1 rounded-full transition-colors ${
// // //                         s <= step ? "bg-primary" : "bg-muted"
// // //                       }`}
// // //                     />
// // //                   ))}
// // //                 </div>

// // //                 <AnimatePresence mode="wait">
// // //                   {step === 1 && (
// // //                     <motion.div
// // //                       key="step1"
// // //                       initial={{ opacity: 0, x: 20 }}
// // //                       animate={{ opacity: 1, x: 0 }}
// // //                       exit={{ opacity: 0, x: -20 }}
// // //                     >
// // //                       <h3 className="text-2xl font-bold mb-2">Tell Us About Your Business</h3>
// // //                       <p className="text-muted-foreground mb-8">Help us understand your current situation.</p>

// // //                       <div className="space-y-6">
// // //                         <div>
// // //                           <Label className="text-sm text-muted-foreground mb-3 block">Business Type</Label>
// // //                           <div className="flex flex-wrap gap-2">
// // //                             {businessTypes.map((type) => (
// // //                               <button
// // //                                 key={type}
// // //                                 onClick={() => handleSelect("businessType", type)}
// // //                                 className={`px-4 py-2 rounded-lg border transition-all ${
// // //                                   formData.businessType === type
// // //                                     ? "bg-primary text-primary-foreground border-primary"
// // //                                     : "bg-secondary/50 border-[hsl(0_0%_100%/0.1)] hover:border-primary/50"
// // //                                 }`}
// // //                               >
// // //                                 {type}
// // //                               </button>
// // //                             ))}
// // //                           </div>
// // //                         </div>

// // //                         <div>
// // //                           <Label className="text-sm text-muted-foreground mb-3 block">Monthly Revenue Range</Label>
// // //                           <div className="flex flex-wrap gap-2">
// // //                             {revenueRanges.map((range) => (
// // //                               <button
// // //                                 key={range}
// // //                                 onClick={() => handleSelect("revenue", range)}
// // //                                 className={`px-4 py-2 rounded-lg border transition-all ${
// // //                                   formData.revenue === range
// // //                                     ? "bg-primary text-primary-foreground border-primary"
// // //                                     : "bg-secondary/50 border-[hsl(0_0%_100%/0.1)] hover:border-primary/50"
// // //                                 }`}
// // //                               >
// // //                                 {range}
// // //                               </button>
// // //                             ))}
// // //                           </div>
// // //                         </div>

// // //                         <div>
// // //                           <Label className="text-sm text-muted-foreground mb-3 block">Primary Growth Goal</Label>
// // //                           <div className="flex flex-wrap gap-2">
// // //                             {growthGoals.map((goal) => (
// // //                               <button
// // //                                 key={goal}
// // //                                 onClick={() => handleSelect("growthGoal", goal)}
// // //                                 className={`px-4 py-2 rounded-lg border transition-all ${
// // //                                   formData.growthGoal === goal
// // //                                     ? "bg-primary text-primary-foreground border-primary"
// // //                                     : "bg-secondary/50 border-[hsl(0_0%_100%/0.1)] hover:border-primary/50"
// // //                                 }`}
// // //                               >
// // //                                 {goal}
// // //                               </button>
// // //                             ))}
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     </motion.div>
// // //                   )}

// // //                   {step === 2 && (
// // //                     <motion.div
// // //                       key="step2"
// // //                       initial={{ opacity: 0, x: 20 }}
// // //                       animate={{ opacity: 1, x: 0 }}
// // //                       exit={{ opacity: 0, x: -20 }}
// // //                     >
// // //                       <h3 className="text-2xl font-bold mb-2">Current Growth Infrastructure</h3>
// // //                       <p className="text-muted-foreground mb-8">Tell us about your marketing efforts.</p>

// // //                       <div className="space-y-6">
// // //                         <div>
// // //                           <Label className="text-sm text-muted-foreground mb-3 block">Marketing Channels (select all)</Label>
// // //                           <div className="flex flex-wrap gap-2">
// // //                             {channels.map((channel) => (
// // //                               <button
// // //                                 key={channel}
// // //                                 onClick={() => handleSelect("channels", channel)}
// // //                                 className={`px-4 py-2 rounded-lg border transition-all ${
// // //                                   formData.channels.includes(channel)
// // //                                     ? "bg-primary text-primary-foreground border-primary"
// // //                                     : "bg-secondary/50 border-[hsl(0_0%_100%/0.1)] hover:border-primary/50"
// // //                                 }`}
// // //                               >
// // //                                 {channel}
// // //                               </button>
// // //                             ))}
// // //                           </div>
// // //                         </div>

// // //                         <div>
// // //                           <Label className="text-sm text-muted-foreground mb-3 block">Growth Bottleneck</Label>
// // //                           <div className="flex flex-wrap gap-2">
// // //                             {bottlenecks.map((bottleneck) => (
// // //                               <button
// // //                                 key={bottleneck}
// // //                                 onClick={() => handleSelect("bottleneck", bottleneck)}
// // //                                 className={`px-4 py-2 rounded-lg border transition-all ${
// // //                                   formData.bottleneck === bottleneck
// // //                                     ? "bg-primary text-primary-foreground border-primary"
// // //                                     : "bg-secondary/50 border-[hsl(0_0%_100%/0.1)] hover:border-primary/50"
// // //                                 }`}
// // //                               >
// // //                                 {bottleneck}
// // //                               </button>
// // //                             ))}
// // //                           </div>
// // //                         </div>

// // //                         <div>
// // //                           <Label className="text-sm text-muted-foreground mb-3 block">Desired Timeline</Label>
// // //                           <div className="flex flex-wrap gap-2">
// // //                             {timelines.map((timeline) => (
// // //                               <button
// // //                                 key={timeline}
// // //                                 onClick={() => handleSelect("timeline", timeline)}
// // //                                 className={`px-4 py-2 rounded-lg border transition-all ${
// // //                                   formData.timeline === timeline
// // //                                     ? "bg-primary text-primary-foreground border-primary"
// // //                                     : "bg-secondary/50 border-[hsl(0_0%_100%/0.1)] hover:border-primary/50"
// // //                                 }`}
// // //                               >
// // //                                 {timeline}
// // //                               </button>
// // //                             ))}
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     </motion.div>
// // //                   )}

// // //                   {step === 3 && (
// // //                     <motion.div
// // //                       key="step3"
// // //                       initial={{ opacity: 0, x: 20 }}
// // //                       animate={{ opacity: 1, x: 0 }}
// // //                       exit={{ opacity: 0, x: -20 }}
// // //                     >
// // //                       <h3 className="text-2xl font-bold mb-2">Project Qualification</h3>
// // //                       <p className="text-muted-foreground mb-8">Final details to get started.</p>

// // //                       <div className="space-y-6">
// // //                         <div>
// // //                           <Label className="text-sm text-muted-foreground mb-3 block">Budget Range</Label>
// // //                           <div className="flex flex-wrap gap-2">
// // //                             {budgets.map((budget) => (
// // //                               <button
// // //                                 key={budget}
// // //                                 onClick={() => handleSelect("budget", budget)}
// // //                                 className={`px-4 py-2 rounded-lg border transition-all ${
// // //                                   formData.budget === budget
// // //                                     ? "bg-primary text-primary-foreground border-primary"
// // //                                     : "bg-secondary/50 border-[hsl(0_0%_100%/0.1)] hover:border-primary/50"
// // //                                 }`}
// // //                               >
// // //                                 {budget}
// // //                               </button>
// // //                             ))}
// // //                           </div>
// // //                         </div>

// // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                           <div>
// // //                             <Label className="text-sm text-muted-foreground mb-2 block">Name *</Label>
// // //                             <Input
// // //                               value={formData.name}
// // //                               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// // //                               placeholder="Your name"
// // //                               className="bg-secondary/50 border-[hsl(0_0%_100%/0.1)] focus:border-primary"
// // //                             />
// // //                           </div>
// // //                           <div>
// // //                             <Label className="text-sm text-muted-foreground mb-2 block">Email *</Label>
// // //                             <Input
// // //                               type="email"
// // //                               value={formData.email}
// // //                               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// // //                               placeholder="you@company.com"
// // //                               className="bg-secondary/50 border-[hsl(0_0%_100%/0.1)] focus:border-primary"
// // //                             />
// // //                           </div>
// // //                           <div>
// // //                             <Label className="text-sm text-muted-foreground mb-2 block">Phone</Label>
// // //                             <Input
// // //                               value={formData.phone}
// // //                               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
// // //                               placeholder="+1 (555) 000-0000"
// // //                               className="bg-secondary/50 border-[hsl(0_0%_100%/0.1)] focus:border-primary"
// // //                             />
// // //                           </div>
// // //                           <div>
// // //                             <Label className="text-sm text-muted-foreground mb-2 block">Company Name</Label>
// // //                             <Input
// // //                               value={formData.company}
// // //                               onChange={(e) => setFormData({ ...formData, company: e.target.value })}
// // //                               placeholder="Your company"
// // //                               className="bg-secondary/50 border-[hsl(0_0%_100%/0.1)] focus:border-primary"
// // //                             />
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     </motion.div>
// // //                   )}
// // //                 </AnimatePresence>

// // //                 {/* Navigation */}
// // //                 <div className="flex items-center justify-between mt-10">
// // //                   {step > 1 ? (
// // //                     <Button variant="ghost" onClick={prevStep}>
// // //                       <ArrowLeft className="w-4 h-4 mr-2" /> Back
// // //                     </Button>
// // //                   ) : (
// // //                     <div />
// // //                   )}

// // //                   {step < 3 ? (
// // //                     <Button variant="glow" onClick={nextStep} disabled={!canProceed()}>
// // //                       Continue <ArrowRight className="w-4 h-4 ml-2" />
// // //                     </Button>
// // //                   ) : (
// // //                     <Button variant="glow" onClick={handleSubmit} disabled={!canProceed()}>
// // //                       Submit Application <Check className="w-4 h-4 ml-2" />
// // //                     </Button>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             ) : (
// // //               <motion.div
// // //                 className="p-12 md:p-20 text-center"
// // //                 initial={{ opacity: 0, scale: 0.95 }}
// // //                 animate={{ opacity: 1, scale: 1 }}
// // //               >
// // //                 <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
// // //                   <Check className="w-10 h-10 text-primary" />
// // //                 </div>
// // //                 <h3 className="text-3xl font-bold mb-4">Application Received.</h3>
// // //                 <p className="text-muted-foreground text-lg max-w-md mx-auto">
// // //                   If your goals align with our execution model, our team will contact you within 48 hours.
// // //                 </p>
// // //                 <Button variant="subtle" className="mt-8" onClick={handleClose}>
// // //                   Close
// // //                 </Button>
// // //               </motion.div>
// // //             )}
// // //           </motion.div>
// // //         </motion.div>
// // //       )}
// // //     </AnimatePresence>
// // //   );
// // // }

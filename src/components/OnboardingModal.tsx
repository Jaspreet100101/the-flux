/**
 * OnboardingModal.tsx — Black × Gold Theme
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
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Check, AlertCircle } from "lucide-react";
import "./OnboardingModal.css";

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
    if (!f.businessType) e.businessType = "Pick a business type";
    if (!f.revenue)      e.revenue      = "Select a revenue range";
    if (!f.growthGoal)   e.growthGoal   = "Choose a primary goal";
  }
  if (step === 2) {
    if (!f.channels.length) e.channels   = "Select at least one channel";
    if (!f.bottleneck)      e.bottleneck = "Pick your biggest bottleneck";
    if (!f.timeline)        e.timeline   = "Choose a timeline";
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
      className={[
        "om-chip",
        selected ? "om-chip--selected" : "",
        error    ? "om-chip--error"    : "",
      ].filter(Boolean).join(" ")}
    >
      {selected && <span className="om-chip-star">✦</span>}
      {label}
    </button>
  );
}

// ── FieldError ────────────────────────────────────────────────
function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <div className="om-field-error">
      <AlertCircle size={12} color="#ef4444" />
      <span className="om-field-error__text">{msg}</span>
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
    <div className="om-input-wrap">
      <label className={`om-label${required ? " om-label--required" : ""}`}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`om-input${error ? " om-input--error" : ""}`}
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
    <div className="om-section">
      <label className="om-label">{label}</label>
      <div className="om-section-chips">
        {children}
      </div>
      <FieldError msg={error} />
    </div>
  );
}

// ── CalendlyEmbed ─────────────────────────────────────────────
function buildCalendlyUrl(base: string, f: Partial<FormData> = {}): string {
  const url = new URL(base);

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
      className="om-calendly-frame"
      title="Schedule a call"
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
          className="om-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="om-backdrop"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal panel */}
          <motion.div
            className={`om-modal${step === 4 ? " om-modal--wide" : ""}`}
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.96,  y: 24 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            {/* Noise texture */}
            <div className="om-noise" />

            {/* Close button */}
            <button onClick={handleClose} className="om-close-btn" aria-label="Close">
              <X size={16} />
            </button>

            {/* Progress bar */}
            {step < 4 && (
              <div className="om-progress-wrap">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className={`om-progress-segment${i < step ? " om-progress-segment--active" : ""}`}
                  />
                ))}
              </div>
            )}

            {/* Inner content */}
            <div className={`om-inner${step === 4 ? " om-inner--step4" : ""}`}>

              {/* Animated heading */}
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
                  <div className="om-step-label">
                    {step < 4 ? `Step ${step} of 3` : "Almost there"}
                  </div>
                  <h2 className="om-heading">{STEPS[step].heading}</h2>
                  {/* <p className="om-sub">{STEPS[step].sub}</p> */}
                </motion.div>
              </AnimatePresence>

              {/* Animated body */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`body-${step}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                >

                  {/* ── Step 1 ─────────────────────────────────── */}
                  {step === 1 && (
                    <div className="om-stack">
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

                  {/* ── Step 2 ─────────────────────────────────── */}
                  {step === 2 && (
                    <div className="om-stack">
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

                  {/* ── Step 3 ─────────────────────────────────── */}
                  {step === 3 && (
                    <div className="om-stack">
                      <StepSection label="Monthly budget range" error={errors.budget}>
                        {OPTIONS.budgets.map(v => (
                          <OptionChip key={v} label={v}
                            selected={formData.budget === v}
                            onClick={() => select("budget", v)}
                            error={errors.budget} />
                        ))}
                      </StepSection>
                      <div className="om-grid-2">
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

                  {/* ── Step 4 — Calendly ──────────────────────── */}
                  {step === 4 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                    >
                      {/* <div className="om-confirm-banner">
                        <Check size={14} />
                        <span>Application received — now lock in your call time below</span>
                      </div> */}
                      <CalendlyEmbed url={calendlyUrl} prefill={formData} />
                    </motion.div>
                  )}

                </motion.div>
              </AnimatePresence>

              {/* Navigation (hidden on step 4) */}
              {step < 4 && (
                <div className="om-nav-row">
                  {step > 1
                    ? <button className="om-btn-ghost" onClick={goBack}><ArrowLeft size={15} /> Back</button>
                    : <div />
                  }
                  {step < 3
                    ? <button className="om-btn-primary" onClick={goNext}>Continue <ArrowRight size={15} /></button>
                    : <button className="om-btn-primary" onClick={goSubmit}><Check size={15} /> Submit Application</button>
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

export default OnboardingModal;
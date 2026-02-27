import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { ServicesSection } from "@/components/ServicesSection";
// import { CaseStudySection } from "@/components/CaseStudySection";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { BrandStatement } from "@/components/BrandStatement";
import { ConversionBlock } from "@/components/ConversionBlock";
import { Footer } from "@/components/Footer";
import { OnboardingModal } from "@/components/OnboardingModal";
import useLenis from '../hooks/useLenis';
import "./Index.css";
import { Problem } from "@/components/problemSection";
import { Solution } from "@/components/SolutionSection";
import { Results } from "@/components/Results";
import { Differentiation } from "@/components/Differentiation";
import { Engagement } from "@/components/Engagement";
import { HowItWorks } from "@/components/Howitworks";
import { Investment } from "@/components/Investment";
import { FAQ } from "@/components/Faq";
import { Reels } from "@/components/ShowreelSection";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  useLenis();

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenModal={() => setModalOpen(true)} />
      <Hero onOpenModal={() => setModalOpen(true)} />
      <TrustStrip />
      <Reels/>
      {/* <BrandStatement /> */}
      <Problem />
      <Solution/>
      <ServicesSection />
      {/* <CaseStudySection /> */}
      <Results/>
      <ProcessTimeline />
      <Differentiation/>
      <Engagement/>
      <HowItWorks/>
      <Investment onOpenModal={() => setModalOpen(true)} />
      <FAQ/>
      <ConversionBlock onOpenModal={() => setModalOpen(true)} />
      <Footer />
      <OnboardingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Index;

import { AIAssistSection } from "@/components/ai-assist-section";
import { CaseStudies } from "@/components/case-studies";
import { Chatbot } from "@/components/chatbot";
import { FinalCta } from "@/components/final-cta";
import { FitSection } from "@/components/fit-section";
import { Hero } from "@/components/hero";
import { ProcessSection } from "@/components/process-section";
import { ProjectRequirementForm } from "@/components/project-requirement-form";
import { Services } from "@/components/services";
import { SiteHeader } from "@/components/site-header";
import { StickyWhatsApp } from "@/components/sticky-whatsapp";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#f7f9fc] pt-24">
      
      {/* Subtle background identity */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#0f3d5e]/10 blur-[140px]" />
        <div className="noise-layer absolute inset-[-5%] opacity-[0.08]" />
      </div>

      <div className="relative z-10">
        <SiteHeader />

        <Hero />
        <Services />
        <AIAssistSection />
        <ProcessSection />
        <FitSection />
        <CaseStudies />
        <ProjectRequirementForm />
        <FinalCta />
      </div>

      <StickyWhatsApp />
      <Chatbot />
    </main>
  );
}
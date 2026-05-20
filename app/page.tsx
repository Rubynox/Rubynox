import { AIAssistSection } from "@/components/ai-assist-section";
import { CaseStudies } from "@/components/case-studies";
import { Chatbot } from "@/components/chatbot";
import { Hero } from "@/components/hero";
import { ProcessSection } from "@/components/process-section";
import { ProjectRequirementForm } from "@/components/project-requirement-form";
import { Services } from "@/components/services";
import { SiteHeader } from "@/components/site-header";
import { StackedCardController } from "@/components/stacked-card-controller";
import { StickyWhatsApp } from "@/components/sticky-whatsapp";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-midnight">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="noise-layer absolute inset-[-5%] opacity-[0.07]" />
      </div>

      <div className="relative z-10">
        <SiteHeader />
        <div className="homepage-stack">
          <StackedCardController />
          <Hero />
          <Services />
          <AIAssistSection />
          <ProcessSection />
          <CaseStudies />
          <ProjectRequirementForm />
        </div>
      </div>

      <StickyWhatsApp />
      <Chatbot />
    </main>
  );
}

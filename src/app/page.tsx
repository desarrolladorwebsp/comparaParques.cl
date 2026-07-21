import {
  ComparisonTable,
  FaqSection,
  HeroSection,
  LeadFormSection,
  MapSection,
  NeutralitySection,
  ParksMarqueeSection,
  WhyPlanAheadSection,
} from "@/components/sections";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ParksMarqueeSection />
      <NeutralitySection />
      <ComparisonTable />
      <WhyPlanAheadSection />
      <MapSection />
      <LeadFormSection />
      <FaqSection />
    </main>
  );
}

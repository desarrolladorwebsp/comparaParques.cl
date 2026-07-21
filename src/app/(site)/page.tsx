import { Suspense } from "react";
import {
  ComparisonTable,
  FaqSection,
  HeroSection,
  LeadFormSection,
  MapSection,
  NeutralitySection,
  PartnerRecruitmentSection,
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
      <Suspense fallback={null}>
        <LeadFormSection />
      </Suspense>
      <FaqSection />
      <PartnerRecruitmentSection />
    </main>
  );
}

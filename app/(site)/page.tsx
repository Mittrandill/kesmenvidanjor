import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyUs } from "@/components/sections/WhyUs";
import { RegionsSection } from "@/components/sections/RegionsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { faqJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <Hero />
      <Stats />
      <ServicesSection />
      <WhyUs />
      <RegionsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}

import { FAQSection } from "@/components/landing/faq-section";
import FeaturesSection from "@/components/landing/feature-section";
import { HeroSection } from "@/components/landing/hero-section";
import NavbarSection from "@/components/landing/navbar-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { ProblemSolutionSection } from "@/components/landing/problem-solution-section";
import { TechStackSection } from "@/components/landing/tech-stack";
import { SiteFooter } from "@/components/landing/site-footer";

export default function Home() {
    return (
        <main className="min-h-screen">
            <NavbarSection />
            <HeroSection />
            <FeaturesSection />
            <ProblemSolutionSection />
            <TechStackSection />
            <PricingSection />
            <FAQSection />
            <SiteFooter />
        </main>
    )
}
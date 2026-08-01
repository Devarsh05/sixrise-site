import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Problem } from "./components/Problem";
import { HowItWorks } from "./components/HowItWorks";
import { MetricBand } from "./components/MetricBand";
import { Engineering } from "./components/Engineering";
import { TechStack } from "./components/TechStack";
import { Footer } from "./components/Footer";
import { Rule } from "./components/Rule";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-sm focus:bg-signal focus:px-4 focus:py-2.5 focus:font-mono focus:text-xs focus:text-canvas"
      >
        Skip to content
      </a>

      <div id="top" />
      <Nav />

      <main id="main">
        <Hero />
        <Rule />
        <Problem />
        <HowItWorks />
        <MetricBand />
        <Engineering />
        <TechStack />
      </main>

      <Footer />
    </>
  );
}

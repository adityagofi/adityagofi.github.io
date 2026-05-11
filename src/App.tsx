import { useState, useEffect } from 'react';
import { ViewType, viewToPath, pathToView, viewToTitle } from '@/router/routes';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Services from '@/pages/Services';
import Contact from '@/pages/Contact';
import MotionProject from '@/pages/projects/MotionProject';
import GraphicDesignProject from '@/pages/projects/GraphicDesignProject';
import ShortFormVideoProject from '@/pages/projects/ShortFormVideoProject';
import LongFormVideoProject from '@/pages/projects/LongFormVideoProject';
import PhotographyProject from '@/pages/projects/PhotographyProject';
import WebDevelopmentProject from '@/pages/projects/WebDevelopmentProject';
import MarketResearchProject from '@/pages/projects/MarketResearchProject';
import DataAnalysisProject from '@/pages/projects/DataAnalysisProject';
import MetaAdsProject from '@/pages/projects/MetaAdsProject';

export default function App() {
  const [view, setView] = useState<ViewType>(() => {
    const path = window.location.pathname;
    return pathToView[path] || 'home';
  });

  const handleNavigate = (newView: ViewType) => {
    if (newView !== view) {
      window.history.pushState({ view: newView }, '', viewToPath[newView]);
      setView(newView);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setView(event.state.view);
      } else {
        const path = window.location.pathname;
        setView(pathToView[path] || 'home');
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Replace initial state with current view
    window.history.replaceState({ view }, '', viewToPath[view]);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.title = viewToTitle[view];
  }, [view]);

  return (
    <main className="bg-[#121212] min-h-screen selection:bg-orange-500 selection:text-white">
      <Navbar onNavigate={handleNavigate} />

      {view === 'home' ? (
        <>
          <Hero />
          <Projects onNavigate={handleNavigate} />
          <About />
        </>
      ) : view === 'services' ? (
        <Services />
      ) : view === 'contact' ? (
        <Contact />
      ) : view === 'motion' ? (
        <MotionProject />
      ) : view === 'graphic' ? (
        <GraphicDesignProject />
      ) : view === 'short-form' ? (
        <ShortFormVideoProject />
      ) : view === 'long-form' ? (
        <LongFormVideoProject />
      ) : view === 'photography' ? (
        <PhotographyProject />
      ) : view === 'market-research' ? (
        <MarketResearchProject />
      ) : view === 'data-analysis' ? (
        <DataAnalysisProject />
      ) : view === 'meta-ads' ? (
        <MetaAdsProject />
      ) : (
        <WebDevelopmentProject />
      )}
      <Footer currentView={view} />
    </main>
  );
}

import { useState, useEffect, lazy, Suspense } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';

const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./pages/TermsOfService').then(m => ({ default: m.TermsOfService })));

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || window.location.hash || '/';
    }
    return '/';
  });

  const normalizePath = (path?: string) => {
    if (!path) return '/';
    if (path.includes('ochrana-osobnich-udaju') || path.includes('privacy')) {
      return '/ochrana-osobnich-udaju';
    }
    if (path.includes('obchodni-podminky') || path.includes('terms')) {
      return '/obchodni-podminky';
    }
    return '/';
  };

  const activeRoute = normalizePath(currentPath);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname || window.location.hash || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    setCurrentPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
        <Header onNavigate={navigate} isSubpage={activeRoute !== '/'} />
        <main className="flex-grow pt-16">
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-muted-foreground">Načítání...</div>}>
            {activeRoute === '/ochrana-osobnich-udaju' ? (
              <PrivacyPolicy onBack={() => navigate('/')} />
            ) : activeRoute === '/obchodni-podminky' ? (
              <TermsOfService onBack={() => navigate('/')} />
            ) : (
              <>
                <Hero />
                <About />
                <Projects />
                <Contact onNavigate={navigate} />
              </>
            )}
          </Suspense>
        </main>
        <Footer onNavigate={navigate} />
        <Toaster richColors position="top-right" />
      </div>
    </ThemeProvider>
  );
}

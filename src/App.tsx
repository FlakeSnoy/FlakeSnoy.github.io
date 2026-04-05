import DShell from './components/layout/dshell';
import Hero from './components/frontend/hero';
import AboutSection from './components/frontend/aboutsection';
import StatSection from './components/frontend/statsection';
import FeaturedGames from './components/frontend/featuredgames';
import Footer from './components/frontend/footer';

export default function App() {
  return (
    <DShell>
      <main>
        <Hero />
        <AboutSection />
        <StatSection />
        <FeaturedGames />
      </main>
      <Footer />
    </DShell>
  );
}
import ParticleBackground from './components/particlebackground';
import Navbar from './components/frontend/sidebar';
import Hero from './components/frontend/hero';
import AboutSection from './components/frontend/aboutsection';
import StatSection from './components/frontend/statsection';
import FeaturedGames from './components/frontend/featuredgames';
import Footer from './components/frontend/footer';

export default function App() {
  return (
    <div
      className="min-h-screen text-white"
      style={{ background: 'linear-gradient(160deg, #060a10 0%, #080c14 50%, #060a10 100%)' }}
    >
      {/* Google Fonts — DM Mono */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap"
      />

      {/* Falling snowflake layer */}
      <ParticleBackground />

      {/* Nav */}
      <Navbar />

      {/* Sections */}
      <main>
        <Hero />
        <AboutSection />
        <StatSection />
        <FeaturedGames />
      </main>

      <Footer />
    </div>
  );
}
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Pour from "./components/Pour";
import Explosion from "./components/Explosion";
import Origins from "./components/Origins";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-cream text-espresso">
      <Nav />
      <main>
        <Hero />
        <Pour />
        <Explosion />
        <Origins />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

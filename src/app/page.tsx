import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Examples from '@/components/Examples';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Contacts from '@/components/Contacts';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Examples />
      <CTA />
      <FAQ />
      <Contacts />
      <Footer />
    </main>
  );
}

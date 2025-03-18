import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import WebDevelopment from '@/components/WebDevelopment';
import CRMSystem from '@/components/CRMSystem';
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
      <WebDevelopment />
      <CRMSystem />
      <Examples />
      <CTA />
      <FAQ />
      <Contacts />
      <Footer />
    </main>
  );
}

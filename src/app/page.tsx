"use client";

import Head from 'next/head';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MainSection from '../components/MainSection/MainSection';
import FeaturesSection from '../components/FeaturesSection/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection/TestimonialsSection';
import ContactSection from '../components/ContactSection/ContactSection';

export default function Home() {
  return (
    <div>
      <Head>
        <title>DoneJob - Aliança de Serviços</title>
        <meta name="description" content="DoneJob - Encontre todos os serviços em um clique." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <FeaturesSection />

      <TestimonialsSection />

      <ContactSection />

      <Footer />
    </div>
  );
}


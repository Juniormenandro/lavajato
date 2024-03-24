"use client";
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import Header from '../components/home/Header/Header';
import Footer from '../components/home/Footer/Footer';
import MainSection from '../components/home/MainSection/MainSection';
import TestimonialsSection from '../components/home/TestimonialsSection/TestimonialsSection';
import ContactSection from '../components/home/ContactSection/ContactSection';

export default function Home() {
  return (
    <div>
      <Head>
        <title>DoneJob - Aliança de Serviços</title>
        <meta name="description" content="DoneJob - Encontre todos os serviços em um clique." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer />
      
      <Header />

      <MainSection />

      <ContactSection />

      <Footer />
    </div>
  );
}


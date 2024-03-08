"use client";
/*
import Head from 'next/head';

export default function Home() {
  return ( 
    
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

      <Head>
        <title>DoneJob - Aliança de Serviços</title>
        <meta name="description" content="DoneJob - Encontre todos os serviços com um clique." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-3xl  font-bold">
          Bem-vindo ao <span className="text-blue-600">DoneJob</span>
        </h1>

        <p className="mt-3 text-2xl">
          Encontre todos os serviços que você precisa com um clique!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <a href="#" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Limpeza</h3>
            <p>Encontre profissionais de limpeza para sua casa ou escritório.</p>
          </a>

          <a href="#" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Consertos</h3>
            <p>Contrate especialistas para resolver problemas em sua casa ou empresa.</p>
          </a>

          <a href="#" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Reparos</h3>
            <p>Obtenha ajuda rápida para consertar qualquer coisa, de eletrodomésticos a encanamento.</p>
          </a>

          <a href="#" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Entregas</h3>
            <p>Receba ou envie itens com segurança e rapidez.</p>
          </a>
        </div>
      </main>

      <footer className="w-full h-24 border-t flex justify-center items-center">
        <p>Feito com ❤️ por DoneJob</p>
      </footer>
    </div>
  );
}
*/



// pages/index.js
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
        <title>Seu Site - Soluções Inovadoras</title>
        <meta name="description" content="Descrição do seu site aqui" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <MainSection />

      <FeaturesSection />

      <TestimonialsSection />

      <ContactSection />

      <Footer />
    </div>
  );
}

// pages/reparos-de-propriedades/index.jsx

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HeaderPag from '../../components/Header/HeaderPag';
import Footer from '../../components/Footer/Footer';
import MainSection from '../../components/MainSection/MainSection';

export default function ReparosDePropriedades() {
  return (
    <div>
      <Head>
        <title>Reparos de Propriedades - DoneJob</title>
        <meta name="description" content="Serviços de reparos de propriedades com profissionais qualificados. Encontre soluções rápidas e eficazes para manter seu imóvel em perfeitas condições." />
      </Head>
      <HeaderPag />
      <MainSection/>
      <main>
        <h1>Reparos de Propriedades</h1>
        <p>Oferecemos um serviço completo de reparos para sua propriedade, garantindo qualidade e eficiência.</p>
        <Link href="/">Voltar para a Home</Link>
      </main>
      <Footer></Footer>
    </div>
    
  );
}

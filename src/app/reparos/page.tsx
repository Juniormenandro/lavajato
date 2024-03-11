
"use client";

import React, { useState } from 'react';import Head from 'next/head';
import Link from 'next/link';
import Footer from '../../components/Footer/Footer';
//import Service from '@/components/Service/Service';
import dynamic from 'next/dynamic';

const Service = dynamic(() => import('@/components/Service/Service'), {
  ssr: false,
});



export default function ReparosDePropriedades() {
  const [isOpen, setIsOpen] = useState(false);
  return (
   
     
      
      
  
    
<div className="relative bg-fixed bg-no-repeat bg-center bg-cover h-screen" style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1679501956116-97589191fafb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <Head>
        <title>Reparos de Propriedades - DoneJob</title>
        <meta name="description" content="Serviços de reparos de propriedades com profissionais qualificados. Encontre soluções rápidas e eficazes para manter seu imóvel em perfeitas condições." />
      </Head>

<nav className="fixed inset-x-0 top-0 flex justify-between items-center text-white px-4 py-2 z-50">
  <Link href="/" className="font-bold text-xl hover:text-teal-500 transition duration-500">
    <img src="/images/header/logo4.webp" alt="DoneJobs Logo" className="h-16 mr-4 rounded-lg" />
  </Link>
  <div className="hidden md:flex gap-4 font-semibold">
    <Link href="/" className="hover:border-b-2 hover:border-teal-300 transition duration-500">Home</Link>
    <Link href="#about" className="hover:border-b-2 hover:border-teal-300 transition duration-500">About</Link>
    <Link href="#contactus" className="hover:border-b-2 hover:border-teal-300 transition duration-500">Contact Us</Link>
    <Link href="#products" className="hover:border-b-2 hover:border-teal-300 transition duration-500">Products</Link>
  </div>
  <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  </div>
</nav>
{isOpen && (
  <div className="fixed top-16 left-0 right-0 bg-white mx-4 rounded-b-lg shadow-lg z-40 p-2 divide-y divide-gray-300">
   
    <Link href="#home" className="block p-2 hover:bg-gray-100">Home</Link>
    <Link href="#about" className="block p-2 hover:bg-gray-100">About</Link>
    <Link href="#contactus" className="block p-2 hover:bg-gray-100">Contact Us</Link>
    <Link href="#products" className="block p-2 hover:bg-gray-100">Products</Link>
  </div>
)}

<div className="app-container" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh', // Minha altura da viewport para centralizar verticalmente
      textAlign: 'center'
    }}>
      <Service />
    </div>




</div>
  );
}


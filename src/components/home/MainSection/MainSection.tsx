"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import './MainSection.css';


const MainSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (



    <header className="relative bg-fixed bg-no-repeat bg-center bg-cover h-screen" style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1679501956116-97589191fafb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <nav className="fixed inset-x-0 top-0 flex justify-between items-center text-white px-4 py-2 z-50">
        <Link href="#" className="font-bold text-xl hover:text-teal-500 transition duration-500">
          <img src="/images/header/logo4.webp" alt="DoneJobs Logo" className="h-16 mr-4 rounded-lg" />
        </Link>
        <div className="hidden md:flex gap-4 font-semibold">
          <Link href="/" className="hover:border-b-2 hover:border-teal-300 transition duration-500">Home</Link>
          <Link href="#about" className="hover:border-b-2 hover:border-teal-300 transition duration-500">About</Link>
          <Link href="/adminFprm" className="hover:border-b-2 hover:border-teal-300 transition duration-500">Administrative panel</Link>
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
         
          <Link href="/" className="block p-2 hover:bg-gray-100">Home</Link>
          <Link href="#about" className="block p-2 hover:bg-gray-100">About</Link>
          <Link href="/adminForm" className="block p-2 hover:bg-gray-100">Administrative panel</Link>
          <Link href="#products" className="block p-2 hover:bg-gray-100">Products</Link>
        </div>
      )}


      <div className="flex flex-col items-center justify-center ">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <a href="#" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Limpeza</h3>
              <p>Encontre profissionais de limpeza para sua casa ou escritório.</p>
              <Link href="#learn-more" className="mt-5 px-4 py-2 bg-teal-700 hover:bg-teal-800 transition duration-500 rounded shadow text-xl font-bold text-white">Learn More</Link>
            </a>

            <a href="#" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-2xl font-semibold mb-4">Consertos</h3>
              <p>Contrate especialistas para resolver problemas em sua casa ou empresa.</p>
              <Link href="#learn-more" className="mt-5 px-4 py-2 bg-teal-700 hover:bg-teal-800 transition duration-500 rounded shadow text-xl font-bold text-white">Learn More</Link>
            </a>

            <a href="#" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Reparos</h3>
              <p>Obtenha ajuda rápida para consertar qualquer coisa, de eletrodomésticos a encanamento.</p>
              <Link href="#learn-more" className="mt-5 px-4 py-2 bg-teal-700 hover:bg-teal-800 transition duration-500 rounded shadow text-xl font-bold text-white">Learn More</Link>
            </a>

            <a href="#" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-semibold mb-4">Entregas</h3>
              <p>Receba ou envie itens com segurança e rapidez.</p>
              <Link href="#learn-more" className="mt-5 px-4 py-2 bg-teal-700 hover:bg-teal-800 transition duration-500 rounded shadow text-xl font-bold text-white">Learn More</Link>
            </a>
          </div>
        </main>
      </div>
    </header>
  );
};

export default MainSection;


/**
 
    <section className="main-section text-white py-40 m-14">
      <div className="video-overlay"></div>
      <video className="background-video" autoPlay loop muted playsInline>
        <source src="/images/service/montanha.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos em MP4.
      </video>
      <div className="container mx-auto text-center z-10 relative">
        <h2 className="text-4xl mb-4">Bem-vindo à Done_Jobs</h2>
        <p className="text-xl">Oferecemos soluções inovadoras para todos os seus problemas</p>
      </div>






    </section>
 */
"use client";

import React, { useState } from 'react';
import Link from 'next/link';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
 
  return (
    <>
      <header 
          className=" hidden md:flex relative bg-fixed bg-no-repeat bg-center bg-cover h-[100vh] justify-center items-center" 
          style={{ backgroundImage: "url('/images/header/logoprincipal.webp')" }}
        >  
        <nav  className="fixed inset-x-0 top-0 flex justify-between items-center text-white px-4 py-2 z-50 ">
          <Link href="/" className="font-bold  hover:text-teal-500 transition duration-500">
            <img src="/images/header/logo4.webp" alt="DoneJobs Logo" className="h-16 w-24  mr-4 rounded-lg" />
          </Link>
          <div className=" gap-4 font-semibold bg-teal-700 px-5 space-x-5">
            <Link href="/" className="text-xl hover:border-b-2 hover:border-teal-300 transition duration-500">Home</Link>
            <Link href="#about" className="text-xl hover:border-b-2 hover:border-teal-300 transition duration-500">About</Link>
            <Link href="/adminForm" className="text-xl hover:border-b-2 hover:border-teal-300 transition duration-500">Administrative panel</Link>
            <Link href="#products" className="text-xl hover:border-b-2 hover:border-teal-300 transition duration-500">Products</Link>
          </div>
        </nav>
        <div className='flex flex-col p-20'>
          <div className=" bg-white/75 p-5 rounded-xl shadow-md  items-center text-center  text-black no-underline">
              <h1 className="text-2xl font-semibold">Bem-vindo ao DoneJobs.ie – Onde cada tarefa é uma missão cumprida! Descubra a conveniência de encontrar todos os serviços de que precisa em um só lugar. De pequenos afazeres, como lavar seu carro, a grandes projetos, como pintar sua casa, conectamos você com profissionais de confiança prontos para transformar suas ideias em realidade. Navegue por uma ampla gama de serviços, escolha o que precisa com facilidade e deixe o trabalho pesado conosco. DoneJobs.ie é sua ponte para um mundo onde cada trabalho é uma oportunidade para perfeição. Junte-se a nós e experimente a eficiência e a qualidade que definem nosso universo de serviços!</h1>
          </div>
        </div>
      </header>




      <header 
          className=" md:hidden relative bg-no-repeat bg-center bg-cover  min-h-[99vh] flex justify-center items-center" 
          style={{ backgroundImage: "url('/images/header/logoprincipal.webp')" }}
        >  
        <nav  className="fixed inset-x-0 top-0 flex justify-between items-center text-white px-4 py-2 z-50 ">
          <Link href="/" className="font-bold  hover:text-teal-500 transition duration-500">
            <img src="/images/header/logo4.webp" alt="DoneJobs Logo" className="h-16 w-24  mr-4 rounded-lg" />
          </Link>
        
          <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 bg-custom-blue p-2 rounded-lg " fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className='flex flex-col service-container items-center'>
          <div className='md:hidden bg-white/75 rounded-xl shadow-md  items-center text-center mx-5 text-black no-underline ' >
              <h1 className="text-xl font-semibold text-black  p-1">Bem-vindo ao DoneJobs.ie, onde suas tarefas se tornam realizações! Encontre uma ampla gama de serviços, de lavagem de carros a pintura de casas, todos em um só lugar. Conectamos você a profissionais qualificados para tornar cada projeto uma realidade. Escolha facilmente, confie em nossa qualidade e transforme suas ideias em ações. Descubra a eficiência com DoneJobs.ie!</h1>
          </div>
        </div>
      </header>
    </>
  );
};


export default Header;





/**
 * codigo para estilizar um video no header da home
 * 
  <video 
  className="absolute z-0 w-full h-full object-cover" 
  autoPlay 
  loop 
  muted 
  playsInline
  >
  <source src="/images/service/uniao.mp4" type="video/mp4" />
  Seu navegador não suporta vídeos em MP4.
  </video>
 */
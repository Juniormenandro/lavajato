"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative h-screen overflow-hidden">
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
      <div className="video-overlay absolute z-10 w-full h-full bg-opacity-50 bg-black"></div>
      <nav className="fixed inset-x-0 top-0 flex justify-between items-center text-white px-4 py-2 z-50">
        <Link href="#" className="font-bold text-xl hover:text-teal-500 transition duration-500">
          <img src="/images/header/logo4.webp" alt="DoneJobs Logo" className="h-16 mr-4 rounded-lg" />
        </Link>
        <div className="hidden md:flex gap-4 font-semibold">
          <Link href="#home" className="hover:border-b-2 hover:border-teal-300 transition duration-500">Home</Link>
          <Link href="#about" className="hover:border-b-2 hover:border-teal-300 transition duration-500">About</Link>
          <Link href="adminForm" className="hover:border-b-2 hover:border-teal-300 transition duration-500">Contact Us</Link>
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
          <Link href="adminForm" className="block p-2 hover:bg-gray-100">Contact Us</Link>
          <Link href="#products" className="block p-2 hover:bg-gray-100">Products</Link>
        </div>
      )}
      <div className="h-screen flex items-center justify-center bg-opacity-50 ">
        <div className="container mx-auto text-center z-10 relative">
          <h2 className="text-4xl text-white mb-4">Bem-vindo à Done-Jobs</h2>
          <p className="text-xl text-white">Oferecemos soluções inovadoras para todos os seus problemas</p>
        </div>
        
      </div>
    </header>
  );
};

export default Header;






/*
   <header className="relative bg-fixed bg-no-repeat bg-center bg-cover h-screen" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80')" }}>
      <nav className="fixed inset-x-0 top-0 flex justify-between items-center text-white px-4 py-2 z-50">
        <Link href="#" className="font-bold text-xl hover:text-teal-500 transition duration-500">
          <img src="/images/header/logo4.webp" alt="DoneJobs Logo" className="h-16 mr-4 rounded-lg" />
        </Link>
        <div className="hidden md:flex gap-4 font-semibold">
          <Link href="#home" className="hover:border-b-2 hover:border-teal-300 transition duration-500">Home</Link>
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
      <div className="h-screen flex items-center justify-center bg-opacity-50 bg-black">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">This is sample Header design</h1>
          <h2 className="text-3xl md:text-5xl font-bold">by JsWizard</h2>
          
          <Link href="#learn-more" className="mt-5 px-4 py-2 bg-teal-700 hover:bg-teal-800 transition duration-500 rounded shadow text-xl font-bold text-white">Learn More</Link>
        </div>
      </div>
    </header>
 */
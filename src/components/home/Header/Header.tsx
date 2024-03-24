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
            <Link href="/login" className="text-xl hover:border-b-2 hover:border-teal-300 transition duration-500">Login</Link>
          </div>
        </nav>
        <div className='flex flex-col p-20'>
          <div className=" bg-black/75 p-5 rounded-xl shadow-md  items-center text-center  text-white no-underline">
              <h1 className="text-2xl font-semibold">Welcome to DoneJobs.ie – Your mission accomplished for every service! Easily find everything from car washes to home painting, all in one place. We connect you to reliable professionals ready to turn your ideas into reality. Explore our wide range of services and leave the heavy lifting to us. Experience the efficiency and quality that define DoneJobs.ie, your bridge to a world of service perfection.</h1>
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
            <Link href="/login" className="block p-2 hover:bg-gray-100">Login</Link>
          </div>
        )}
        <div className='flex flex-col service-container items-center'>
          <div className='md:hidden bg-black/75 rounded-xl shadow-md  items-center text-center mx-5 px-5 py-3 text-black no-underline ' >
              <h1 className="text-xl font-semibold text-white p-1">Welcome to DoneJobs.ie – Your mission accomplished for every service! Easily find everything from car washes to home painting, all in one place. We connect you to reliable professionals ready to turn your ideas into reality. Explore our wide range of services and leave the heavy lifting to us. Experience the efficiency and quality that define DoneJobs.ie, your bridge to a world of service perfection.</h1>
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
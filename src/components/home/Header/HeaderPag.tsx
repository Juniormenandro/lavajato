"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import useLocalStorage from '@/hooks/useLocalStorage/useLocalStorage';
import { bookingDataInitialState } from '@/constants';
import { BookingType } from '@/app/form/page';

const Header = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [bookingData, setBookingData] = useLocalStorage(
    "booking_step",
    bookingDataInitialState as BookingType
);

  const home = () =>{
    setBookingData(bookingDataInitialState);
    localStorage.clear();
  }
 
  return (
    <>
      <header className=" hidden md:flex" >  
        <nav  className="fixed inset-x-0 top-0 flex justify-between items-center text-white px-4 py-2 z-50 ">
          <Link href="/"  onClick={home} className="font-bold  hover:text-teal-500 transition duration-500">
            <img src="/images/header/logo4.webp" alt="DoneJobs Logo" className="h-16 w-24  mr-4 rounded-lg" />
          </Link>
          <div className=" gap-4 font-semibold bg-teal-700 px-5 space-x-5">
            <Link href="/" onClick={home} className="text-xl hover:border-b-2 hover:border-teal-300 transition duration-500">Home</Link>
            <Link href="#about" className="text-xl hover:border-b-2 hover:border-teal-300 transition duration-500">About</Link>
            <Link href="/adminForm" className="text-xl hover:border-b-2 hover:border-teal-300 transition duration-500">Administrative panel</Link>
            <Link href="/login" className="block p-2 hover:bg-gray-100">Login</Link>
          </div>
        </nav>
      </header>




      <header className=" md:hidden flex" >  
        <nav  className="fixed inset-x-0 top-0 flex justify-between items-center text-white px-4 py-2 z-50 ">
          <Link href="/" onClick={home} className="font-bold  hover:text-teal-500 transition duration-500">
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
          
            <Link href="/" onClick={home} className="block p-2 hover:bg-gray-100">Home</Link>
            <Link href="#about" className="block p-2 hover:bg-gray-100">About</Link>
            <Link href="/adminForm" className="block p-2 hover:bg-gray-100">Administrative panel</Link>
            <Link href="/login" className="block p-2 hover:bg-gray-100">Login</Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;


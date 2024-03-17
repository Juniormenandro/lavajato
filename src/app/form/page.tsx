"use client";

import React, { useEffect, useState } from "react";
import SelectionSteps from "@/components/form/SelectionSteps/SelectionSteps";
import Spinner from "@/components/form/Spinner/Spinner";
import StepButton from "@/components/form/StepButton/StepButton";
import { bookingDataInitialState } from "@/constants";
import useLocalStorage from "@/hooks/useLocalStorage/useLocalStorage";
import { fetcher } from "@/utils/fetcher/fetcher";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Toaster, toast } from "react-hot-toast";
import useSWR from "swr";
import Link from "next/link";
import Head from "next/head";




export type ProductType = {
  id: string;
  name: string;
  price: string;
  default_price: string;
  raw_price: 0;
};

export type BookingType = typeof bookingDataInitialState;

const BookingPage: NextPage = () => {
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState(""); 
    const [placa, setPlaca] = useState(""); 
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);

    const [bookingData, setBookingData] = useLocalStorage(
        "booking_step",
        bookingDataInitialState as BookingType
    );

    useEffect(() => {
      const nomeUsuario = localStorage.getItem('categiraId');
      const image = localStorage.getItem('image');
      if (nomeUsuario) {
        setId(nomeUsuario)
      }
      if(image) {
        setImage(image)
      } 
   
    }, [id, image]);
  /*
  useEffect(() => {
    console.log("bookingData atualizado:", bookingData);
  }, [bookingData]);
  */

  const [checkoutIsLoading, setIsCheckoutLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const checkoutError = searchParams?.get("error");
  useEffect(() => {
    if (checkoutError) {
      alert(checkoutError);
      router.push("/");
    }
  }, [checkoutError, router]);



  const handleBuyProduct = async (id: string, updatedData: any): Promise<void> => {
    
    try {
      setIsCheckoutLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clientesServicos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking: {
            ...bookingData,
          },
        }),
      });
      router.push("/producao");

    } catch (error: any) {
      setIsCheckoutLoading(false);
      alert(`An error occured`);
      console.log(error);
    }
  };


return (
  
 <div className="relative bg-fixed  bg-center bg-cover min-h-[100vh] flex justify-center items-center" style={{ backgroundImage: `url('${image}')` }}>
          <Head>
            <title>Reparos de Propriedades - DoneJob</title>
            <meta name="description" content="Serviços de reparos de propriedades com profissionais qualificados. Encontre soluções rápidas e eficazes para manter seu imóvel em perfeitas condições." />
          </Head>

    <nav className="fixed inset-x-0 top-0 flex justify-between items-center text-white px-4 py-2 z-50">
      <Link href="/" className="font-bold text-xl hover:text-teal-500 transition duration-500">
        <img src="/images/header/logo4.webp" alt="DoneJobs Logo" className="h-16 mr-4 rounded-lg" />
      </Link>
      <div className="hidden md:flex  gap-4 font-semibold bg-teal-700 px-5 space-x-5">
        <Link href="/" className="hover:border-b-2 hover:border-teal-300 transition duration-500">Home</Link>
        <Link href="#about" className="hover:border-b-2 hover:border-teal-300 transition duration-500">About</Link>
        <Link href="/adminForm" className="hover:border-b-2 hover:border-teal-300 transition duration-500">Administrative panel</Link>
        <Link href="#products" className="hover:border-b-2 hover:border-teal-300 transition duration-500">Products</Link>
      </div>
      <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 bg-custom-blue p-2 rounded-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </div>
    </nav>
    {isOpen && (
      <div className="fixed  left-0 right-0 bg-white mx-4 rounded-b-lg shadow-lg z-40  divide-y divide-gray-300">
      
        <Link href="/" className="block p-2 hover:bg-gray-100">Home</Link>
        <Link href="#about" className="block p-2 hover:bg-gray-100">About</Link>
        <Link href="/adminForm" className="block p-2 hover:bg-gray-100">Administrative panel</Link>
        <Link href="#products" className="block p-2 hover:bg-gray-100">Products</Link>
      </div>
    )}


    <div className="flex flex-col items-center min-h-[50vh]   ">
            <Toaster position="top-center" />

          <div className=" max-w-lg bg-white/75 rounded-lg px-10 ">
        <h2 className="mb-8 text-3xl text-center">Book Noww!</h2>
        <div className="mb-4 ">
          <label className="block mb-2">
            {!bookingData.step && "Select your payment:"}
            {bookingData.step === 1 && "Select your time:"}
            {bookingData.step === 2 && ""}
          </label>
          <div className="flex flex-col gap-4 ">
            <SelectionSteps
              step={bookingData.step}
              bookingData={bookingData}
              setBookingData={setBookingData}
              nome={nome}
              setNome={setNome}
              telefone={telefone}
              setTelefone={setTelefone}
              placa={placa}
              setPlaca={setPlaca}
            />
          </div>
        </div>
        <div className="fixed inset-x-20 bottom-0 flex-col text-white ">
        <StepButton
            step={bookingData.step}
            checkoutIsLoading={checkoutIsLoading}
            selectedProductId={bookingData.selectedProductId}
            selectedPayment={bookingData.selectedPayment}
            selectedTime={bookingData.selectedTime}
            bookingData={bookingData}
            setBookingData={setBookingData}
            handleBuyProduct={handleBuyProduct}
         />
         </div>
      </div>
    </div>
  </div>

);
};

export default BookingPage;

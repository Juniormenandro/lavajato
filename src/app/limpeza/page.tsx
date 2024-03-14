
"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import useLocalStorage from "@/hooks/useLocalStorage/useLocalStorage";
import dynamic from 'next/dynamic';
import { bookingDataInitialState } from '@/constants';
import Selector from '@/components/form/Selector/Selector';
import Footer from '../../components/home/Footer/Footer';
import { global } from 'styled-jsx/css';
import { fetcher } from '@/utils/fetcher/fetcher';
import useSWR from 'swr';
import "../../components/Service/Service.css";
import { useRouter } from "next/navigation";



export type ProductType = {
  id: string;
  selectedProductName: string;
  selectedProductPrice: string;
  selectedProdutoDescription: string;
};

export type BookingType = typeof bookingDataInitialState;



interface Product {
  id: string;
  name: string;
  selectedProductPrice: string;
  selectedProductName: string;
  selectedProdutoDescription: string;
};


export default function ReparosDePropriedades() {
  
  const router = useRouter();
  const [selecaoConcluida, setSelecaoConcluida] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);


  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      setToken(userToken);
    }
  }, []);

  const { data, error, isLoading } = useSWR<Product[]>([
      `${process.env.NEXT_PUBLIC_API_URL}/api/getProdutoservicos`, token],
      fetcher,
      {
        revalidateOnFocus: false,
      }
    );

  const [bookingData, setBookingData] = useLocalStorage(
    "booking_step",
    bookingDataInitialState as BookingType
  );


  useEffect(() => {
    console.log("bookingData atualizado:", bookingData);
  }, [bookingData]);



  const handleProductSelect = (product:Product) => {
    // Atualiza o estado primeiro
    setBookingData({
      ...bookingData,
        selectedProductId: product.id,
        selectedProductName: product.selectedProductName,
        selectedProductPrice: product.selectedProductPrice,
    });
    console.log("Produto selecionado.");

    // Marca a seleção como concluída com sucesso
    setSelecaoConcluida(true);
  };
  
  useEffect(() => {
    if (selecaoConcluida) {
      // Aqui você colocaria o caminho para o qual deseja redirecionar
      router.push('/form');
    }
  }, [selecaoConcluida, router]);

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

      <div className="app-container">
        <div className="horizontal-scroll">
          {(data || []).map((product:Product) => (
            <div key={product.id} className="service-container" onClick={() => handleProductSelect(product)}>
              <a href="#"
                className={`service-card ${bookingData?.selectedProductId === product.id ? 'selected-service-card' : ''}`}>
                <h3 className="text-2xl font-semibold mb-4">{product.selectedProductName}</h3>
                <p>{product.selectedProductPrice}</p>
         
              </a>
            </div>
            
          ))}
        </div>
      </div>
    </div>
  );
}



"use client";
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage/useLocalStorage";
import { bookingDataInitialState } from '@/constants';
import { fetcher } from '@/utils/fetcher/fetcher';



export type ProductType = {
  id: string;
  selectedProductName: string;
  selectedProductPrice: string;
  selectedProdutoDescription: string;
};

export type BookingType = typeof bookingDataInitialState;



interface Product {
  Description: string;
  nome: string;
  id: string;
  name: string;
  selectedProductPrice: string;
  selectedProductName: string;
  selectedProdutoDescription: string;
};



function Servicos() {
  
  const router = useRouter();
  const [selecaoConcluida, setSelecaoConcluida] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

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

  


  const { data, error, isLoading } = useSWR<Product[]>([
      `${process.env.NEXT_PUBLIC_API_URL}/api/servicos/${id}`,],
      fetcher,
      {
        revalidateOnFocus: false,
      }
    );

  const [bookingData, setBookingData] = useLocalStorage(
    "booking_step",
    bookingDataInitialState as BookingType
  );




  const handleProductSelect = (product:Product) => {
    // Atualiza o estado primeiro
    setBookingData({
      ...bookingData,
        selectedProductId: product.id,
        selectedProductName: product.nome,
        Description: product.Description
    });
 
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
    <div className="relative bg-fixed bg-no-repeat bg-center bg-cover h-screen" style={{ backgroundImage: `url('${image}')` }}>
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
        <Link href="/adminForm" className="hover:border-b-2 hover:border-teal-300 transition duration-500">Administrative panel</Link>
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

      <div className="app-container">
        <div className="horizontal-scroll">
          {(data || []).map((product:Product) => (
            <div key={product.id} className="service-container" onClick={() => handleProductSelect(product)}>
              <a className={`service-card ${bookingData?.selectedProductId === product.id ? 'selected-service-card' : ''}`}>
                <h3 className="text-2xl font-semibold mb-4">{product.nome}</h3>
                <p>{product.Description}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



export default Servicos;
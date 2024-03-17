
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
  const [id, setId] = useState ('');
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




  const handleProductSelect = (product:Product,) => {
    // Atualiza o estado primeiro
   
    setBookingData({
      ...bookingData,
        selectedProductId: product.id,
        selectedProductName: product.nome,
        categoriaId: id,
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
    <div className="relative bg-fixed  bg-center bg-cover min-h-[100vh]" style={{ backgroundImage: `url('${image}')` }}>
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
      <div className="fixed inset-x-0 top-0 flex justify-between items-center text-white px-4 py-2 z-50">
      
        <Link href="/" className="block p-2 hover:bg-gray-100">Home</Link>
        <Link href="#about" className="block p-2 hover:bg-gray-100">About</Link>
        <Link href="/adminForm" className="block p-2 hover:bg-gray-100">Administrative panel</Link>
        <Link href="#products" className="block p-2 hover:bg-gray-100">Products</Link>
      </div>
    )}

        <div className='pt-10'>
          {(data || []).map((product:Product) => (
            <>
            <div  className="hidden md:flex min-h-[85vh] justify-center items-center" >
              <div key={product.id} className="flex flex-col items-center p-20 "  onClick={() => handleProductSelect(product)}>
                <a className={` bg-white/75 p-12 rounded-xl shadow-md  items-center text-center  text-black no-underline ${bookingData?.selectedProductId === product.id ? 'selected-service-card' : ''}`}>
                  <h3 className="text-4xl font-semibold mb-4">{product.nome}</h3>
                  <h1 className="text-2xl font-semibold">{product.Description}</h1>
                </a>
              </div>
            </div>
            <div className="md:hidden flex justify-center items-center min-h-[35vh] ">
              <div key={product.id} className="flex flex-col items-center py-10 px-5" onClick={() => handleProductSelect(product)}>
                <a className={`bg-white/75 p-1 rounded-xl shadow-md text-center text-black no-underline ${bookingData?.selectedProductId === product.id ? 'selected-service-card' : ''}`}>
                  <h3 className="text-2xl font-semibold mb-4">{product.nome}</h3>
                  <p className="text-lg font-semibold mb-2">{product.Description}</p>
                </a>
              </div>
            </div>
            </>
          ))}
        </div>
    </div>
  );
}



export default Servicos;
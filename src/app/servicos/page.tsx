
"use client";
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage/useLocalStorage";
import { bookingDataInitialState } from '@/constants';
import { fetcher } from '@/utils/fetcher/fetcher';
import Header from '@/components/home/Header/HeaderPag';
import Spinner from '@/components/form/Spinner/Spinner';

export type ProductType = {
  id: string;
  selectedProductName: string;
  selectedProductPrice: string;
  selectedProdutoDescription: string;
  rawPrice: 0
};

export type BookingType = typeof bookingDataInitialState;



interface Product {
  Description: string;
  nome: string;
  id: string;
  name: string;
  rawPrice: 0;
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
        rawPrice: product.rawPrice,
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

  if (isLoading)
  return (
    <div className="relative bg-fixed  bg-center bg-cover min-h-[100vh] flex justify-center items-center" style={{ backgroundImage: `url('${image}')` }}>
      <div className="flex flex-col items-center bg-black/20 rounded-xl  p-10">
        <Spinner></Spinner>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      {(data || []).map((product:Product) => (
        <>
        <div  className="hidden md:flex relative bg-fixed bg-no-repeat bg-center bg-cover h-[100vh] justify-center items-center"  style={{ backgroundImage: `url('${image}')` }} >
          <div key={product.id} className="flex flex-col items-center px-16 "  onClick={() => handleProductSelect(product)}>
            <a className={` bg-white/75 p-12 rounded-xl shadow-md  items-center text-center  text-black no-underline ${bookingData?.selectedProductId === product.id ? 'selected-service-card' : ''}`}>
              <h3 className="text-4xl font-semibold mb-4">{product.nome}</h3>
              <h1 className="text-2xl font-semibold">{product.Description}</h1>
            </a>
          </div>
        </div>
        <div className="md:hidden relative bg-no-repeat bg-center bg-cover min-h-[85vh] flex justify-center items-center" style={{ backgroundImage: `url('${image}')` }} >
          <div key={product.id} className="flex flex-col items-center py-20 px-10" onClick={() => handleProductSelect(product)}>
            <a className={`bg-white/75 p-5 rounded-xl shadow-md text-center text-black no-underline ${bookingData?.selectedProductId === product.id ? 'selected-service-card' : ''}`}>
              <h3 className="text-2xl font-semibold mb-4">{product.nome}</h3>
              <p className="text-lg font-semibold mb-2">{product.Description}</p>
            </a>
          </div>
        </div>
        </>
      ))}
    </>
  );
}



export default Servicos;
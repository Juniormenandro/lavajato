
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
  areaId: string;
  name: string;
  categoriaId:string;
  imageUrl: string;
};



function Categoria() {
  const [areaId, setAreaId] = useState("")
  const router = useRouter();
  const [selecaoConcluida, setSelecaoConcluida] = useState(false);
  const [selecao, setSelecao] = useState('');

  
  useEffect(() => {
    const areaId = localStorage.getItem('areaId');
    if (areaId) {
      setAreaId(areaId)
    }

  }, [areaId]);


  const { data, error, isLoading } = useSWR<Product[]>([
      `${process.env.NEXT_PUBLIC_API_URL}/api/categoria/${areaId}`,],
      fetcher,
      {
        revalidateOnFocus: false,
      }
    );



    const handleProductSelect = (product: Product) => {
   
        localStorage.setItem('categiraId', product.id);
        localStorage.setItem('image', product.imageUrl);
    
          setSelecao(product.id)
        // Marca a seleção como concluída com sucesso
        setSelecaoConcluida(true);
      };
      
      useEffect(() => {
        if (selecaoConcluida) {
          // Aqui você colocaria o caminho para o qual deseja redirecionar
          router.push('/servicos');
        }
      }, [selecaoConcluida, selecao, router]);
    
    
      if (isLoading)
      return (
        <div className="relative  bg-center bg-cover min-h-[100vh] flex justify-center items-center" style={{ backgroundImage: "url('/images/header/logo1.webp')" }}>
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
              <div  className="hidden md:flex relative bg-fixed bg-no-repeat bg-center bg-cover h-[100vh] justify-center items-center" 
              style={{ backgroundImage: `url(${product.imageUrl})`}}>
                <div key={product.id} className="flex flex-col items-center px-20 "  onClick={() => handleProductSelect(product)}>
                  <a className={` bg-white/75 p-10 rounded-xl shadow-md  items-center text-center  text-black no-underline ${selecao === product.id ? 'selected-service-card' : ''}`}>
                    <h3 className="text-4xl font-semibold mb-4">{product.nome}</h3>
                    <h1 className="text-2xl font-semibold">{product.Description}</h1>
                  </a>
                </div>
              </div>
    
              <div className="md:hidden relative bg-no-repeat bg-center bg-cover min-h-[85vh] flex justify-center items-center" style={{ backgroundImage: `url(${product.imageUrl})` }}>
                <div key={product.id} className="flex flex-col items-center py-20 px-10"  onClick={() => handleProductSelect(product)}>
                  <a className={`bg-white/75 p-5 rounded-xl shadow-md text-center text-black no-underline ${selecao === product.id ? 'selected-service-card' : ''}`}>
                    <h3 className="text-2xl font-semibold mb-4">{product.nome}</h3>
                    <h1 className="text-xl font-semibold mb-2">{product.Description}</h1>
                  </a>
                </div>
              </div>
    
            </>
          ))}
        </>
      ); 
    };
    


export default Categoria;
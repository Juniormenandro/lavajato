"use client";
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from "next/navigation";
import { fetcher } from '@/utils/fetcher/fetcher';


interface Product {
  id: string;
  categoriaId:string;
  nome: string;
  imageUrl: string;
  Description:string;
};


const FeaturesSection = () => {
  
  const router = useRouter();
  const [selecaoConcluida, setSelecaoConcluida] = useState(false);
  const [selecao, setSelecao] = useState('');


  const { data, error, isLoading } = useSWR<Product[]>([
    `${process.env.NEXT_PUBLIC_API_URL}/api/categorias`,],
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


  return (
    <>
      {(data || []).map((product:Product) => (
        <>
          <div  className="hidden md:flex relative bg-fixed bg-no-repeat bg-center bg-cover h-[100vh] justify-center items-center" 
          style={{ backgroundImage: `url(${product.imageUrl})`}}>
            <div key={product.id} className="flex flex-col items-center p-20 "  onClick={() => handleProductSelect(product)}>
              <a className={` bg-white/75 p-12 rounded-xl shadow-md  items-center text-center  text-black no-underline ${selecao === product.id ? 'selected-service-card' : ''}`}>
                <h3 className="text-4xl font-semibold mb-4">{product.nome}</h3>
                <h1 className="text-2xl font-semibold">{product.Description}</h1>
              </a>
            </div>
          </div>

          <div className="md:hidden relative bg-no-repeat bg-center bg-cover min-h-[85vh] flex justify-center items-center" style={{ backgroundImage: `url(${product.imageUrl})` }}>
            <div key={product.id} className="flex flex-col items-center p-12"  onClick={() => handleProductSelect(product)}>
              <a className={`bg-white/75 p-4 rounded-xl shadow-md text-center text-black no-underline ${selecao === product.id ? 'selected-service-card' : ''}`}>
                <h3 className="text-2xl font-semibold mb-4">{product.nome}</h3>
                <h1 className="text-xl font-semibold">{product.Description}</h1>
              </a>
            </div>
          </div>

        </>
      ))}
    </>
  ); 
};

export default FeaturesSection;

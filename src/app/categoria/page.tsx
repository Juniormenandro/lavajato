"use client";

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from "next/navigation";
import { bookingDataInitialState } from '@/constants';
import { fetcher } from '@/utils/fetcher/fetcher';
import Header from '@/components/home/Header/HeaderPag';
import Spinner from '@/components/form/Spinner/Spinner';

export type ProductType = {
  id: string;
  selectedProductName: string;
  selectedProductPrice: string;
  selectedProdutoDescription: string;
  rawPrice: 0;
};

export type BookingType = typeof bookingDataInitialState;

interface Product {
  Description: string;
  nome: string;
  id: string;
  areaId: string;
  name: string;
  categoriaId: string;
  imageUrl: string;
};

function Categoria() {
  const [areaId, setAreaId] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const [selecaoConcluida, setSelecaoConcluida] = useState(false);
  const [selecao, setSelecao] = useState('');

  // Estado para controlar se o texto está expandido ou não para cada produto
  const [expandedText, setExpandedText] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const areaId = localStorage.getItem('areaId');
    const image = localStorage.getItem('image');
    if (areaId) {
      setAreaId(areaId);
    }
    if (image) {
      setImage(image);
    }
  }, [areaId, image]);

  const { data, error, isLoading } = useSWR<Product[]>(
    [
      `${process.env.NEXT_PUBLIC_API_URL}/api/categoria/${areaId}`
    ],
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const handleProductSelect = (product: Product) => {
    localStorage.setItem('categiraId', product.id);
    localStorage.setItem('image', product.imageUrl);

    setSelecao(product.id);
    setSelecaoConcluida(true);
  };

  useEffect(() => {
    if (selecaoConcluida) {
      router.push('/servicos');
    }
  }, [selecaoConcluida, selecao, router]);

  // Função para alternar o estado de expandido/colapsado para cada produto
  const toggleExpandText = (productId: string) => {
    setExpandedText((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  if (isLoading)
    return (
      <div
        className="relative bg-center bg-cover min-h-[100vh] flex justify-center items-center"
        style={{ backgroundImage: `url('${image}')` }}
      >
        <div className="flex flex-col items-center bg-black/20 rounded-xl p-10">
          <Spinner />
        </div>
      </div>
    );

  return (
    <>
      <Header />
      {(data || []).map((product: Product) => (
        <React.Fragment key={product.id}>
          {/* Layout para dispositivos grandes (desktop) */}
          <div
            className="hidden md:flex relative bg-fixed bg-no-repeat bg-center bg-cover h-[100vh] justify-center items-center"
            style={{ backgroundImage: `url(${product.imageUrl})` }}
          >
            <div
              key={product.id}
              className="flex flex-col items-center px-20"
              onClick={() => handleProductSelect(product)}
            >
              <a
                className={`bg-white/75 p-10 rounded-xl shadow-md items-center text-center text-black no-underline ${
                  selecao === product.id ? 'selected-service-card' : ''
                }`}
              >
                <h3 className="text-4xl font-semibold mb-4">{product.nome}</h3>
                <h1 className="text-2xl font-semibold">{product.Description}</h1>
              </a>
            </div>
          </div>

          {/* Layout para dispositivos menores (mobile) */}
          <div
            className="md:hidden relative bg-no-repeat bg-center bg-cover min-h-[85vh] flex justify-center items-center"
            style={{ backgroundImage: `url(${product.imageUrl})` }}
          >
            <div
              key={product.id}
              className="flex flex-col items-center py-20 px-10"
              onClick={() => handleProductSelect(product)}
            >
              <a
                className={`bg-white/75 p-5 rounded-xl shadow-md text-center text-black no-underline ${
                  selecao === product.id ? 'selected-service-card' : ''
                }`}
              >
                <h3 className="text-2xl font-semibold mb-4">{product.nome}</h3>
                {/* 
                  Aplicamos classes condicionalmente para expandir ou
                  colapsar o texto. 
                */}
                <h1
                  className={`text-xl font-semibold mb-2 ${
                    expandedText[product.id] ? 'expanded-text' : 'collapsed-text'
                  }`}
                >
                  {product.Description}
                </h1>

                {/* 
                  Botão "Ler Mais/Ler Menos" só aparece em mobile (md:hidden).
                  Usamos e.stopPropagation() para evitar que o clique no
                  botão também selecione o card e redirecione.
                */}
                <button
                  className="text-blue-500 underline md:hidden"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpandText(product.id);
                  }}
                >
                  {expandedText[product.id] ? 'Ler Menos' : 'Ler Mais'}
                </button>
              </a>
            </div>
          </div>
        </React.Fragment>
      ))}
    </>
  );
}

export default Categoria;

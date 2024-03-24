"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import './MainSection.css';

import { useRouter } from "next/navigation";
import Spinner from '@/components/form/Spinner/Spinner'; // Ajuste o caminho conforme necessário

interface Product {
  areaId: string;
  categoriaId: string;
  nome: string;
  imageUrl: string;
  Description: string;
}

const staticProducts = [
  {
    areaId: "casa",
    categoriaId: "cat1",
    nome: "Produto 1",
    imageUrl: "https://plus.unsplash.com/premium_photo-1661883964999-c1bcb57a7357?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FzYXN8ZW58MHx8MHx8fDA%3D",
    Description: "Descrição do Produto 1",
  },
  {
    areaId: "carro",
    categoriaId: "cat2",
    nome: "Produto 2",
    imageUrl: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGNhcnJvc3xlbnwwfHwwfHx8MA%3D%3D",
    Description: "Descrição do Produto 2",
  },
  {
    areaId: "humano",
    categoriaId: "cat3",
    nome: "Produto 3",
    imageUrl: "https://images.unsplash.com/photo-1506003094589-53954a26283f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGN1aWRhZG9zJTIwaG9tYW5vaXN8ZW58MHx8MHx8fDA%3D",
    Description: "Descrição do Produto 2",
  },
  {
    areaId: "pet",
    categoriaId: "cat4",
    nome: "Produto 4",
    imageUrl: "https://images.unsplash.com/photo-1530041539828-114de669390e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGV0fGVufDB8fDB8fHww",
    Description: "Descrição do Produto 2",
  },
];



const MainSection = () => {
  const router = useRouter();
  const [selecaoConcluida, setSelecaoConcluida] = useState(false);
  const [selecao, setSelecao] = useState('');

  const handleProductSelect = (staticProducts: Product) => {
    localStorage.setItem('areaId', staticProducts.areaId);
    setSelecao(staticProducts.areaId);
    setSelecaoConcluida(true);
  };
  
  useEffect(() => {
    if (selecaoConcluida) {
      router.push('/categoria');
    }
  }, [selecaoConcluida, router]);

  return (
    <>
      {staticProducts.map((product) => (
        <div key={product.areaId} className="relative bg-no-repeat bg-center bg-cover min-h-[85vh] flex justify-center items-center" style={{ backgroundImage: `url(${product.imageUrl})` }}>
          <div className="flex flex-col items-center py-10 px-5" onClick={() => handleProductSelect(product)}>
            <a className={`bg-white/75 p-1 rounded-xl shadow-md text-center text-black no-underline ${selecao === product.areaId ? 'selected-service-card' : ''}`}>
              <h3 className="text-2xl font-semibold mb-4">{product.nome}</h3>
              <h1 className="text-xl font-semibold mb-2">{product.Description}</h1>
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default MainSection;








/*
 
    <section className="main-section text-white py-40 m-14">
      <div className="video-overlay"></div>
      <video className="background-video" autoPlay loop muted playsInline>
        <source src="/images/service/montanha.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos em MP4.
      </video>
      <div className="container mx-auto text-center z-10 relative">
        <h2 className="text-4xl mb-4">Bem-vindo à Done_Jobs</h2>
        <p className="text-xl">Oferecemos soluções inovadoras para todos os seus problemas</p>
      </div>
    </section>
 */
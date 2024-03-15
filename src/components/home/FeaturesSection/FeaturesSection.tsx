"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { useRouter } from "next/navigation";
import { fetcher } from '@/utils/fetcher/fetcher';
import './FeaturesSection.css';
import { id } from 'date-fns/locale';



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
    <div className="features-section">
      {(data || []).map((product:Product) => (
        <div key={product.id} className="service-container" style={{ backgroundImage: `url(${product.imageUrl})`}} onClick={() => handleProductSelect(product)}>
              <a className={`service-card ${selecao === product.id ? 'selected-service-card' : ''}`}>
            <h3 className="text-2xl font-semibold mb-4">{product.nome}</h3>
            <p>{product.Description}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default FeaturesSection;
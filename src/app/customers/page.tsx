"use client";

import React, { useState } from 'react';
import Header from '../header';
import Spinner from "@/components/Spinner/Spinner";
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/utils/fetcher/fetcher';

interface Servico {
  selectedColor: React.ReactNode;
  selectedTime: Date | string;
  selectedModel: React.ReactNode;
  selectedPayment: React.ReactNode;
  selectedProdutPrice: React.ReactNode;
  selectedProductNane: React.ReactNode;
  id: string;
  carro: string; 
  concluido: boolean;
  aguardandoPagamento: boolean;
};

interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  servicos: Servico[];
};

const useFetch = (url: string) => {
  const { data, error } = useSWR<Cliente[]>(url, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
};

export default function Page() {
  const { data: clientes, isLoading, isError } = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`);

  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});

  const deleteService = async (id: string) => {
    setLoadingState(prev => ({ ...prev, [id]: true }));

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to delete service');
      }

      mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`);
    } catch (error) {
      console.error('Erro ao deletar o serviço:', error);
    } finally {
      setLoadingState(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }
  };

  if (isLoading) {
    return  <div className="flex flex-col items-center mt-10">
    <Spinner />
  </div>;
  }

  if (isError) {
    return <p>An error occurred while fetching data</p>;
  }

  return (
     <>
      <Header />
      <h1 style={{ textAlign: "center", padding: "2%", fontSize:"20px" }}>CUSTOMERS</h1>
    
      <ul>
        {clientes && clientes.map(client => (
          <li key={client.id} style={{ width: "100%" }}>
            <div>
              <h1 className="text-xl font-semibold text-blue-600" style={{ textAlign: "center", padding: "8%" }}>
                {client.nome}
              </h1>
              <h1 className="text-xl font-semibold" style={{ textAlign: "right", padding: "2%" }}>
                {client.telefone}
              </h1>
             
            </div>
            {client.servicos && client.servicos.map(servico => (
             <>
              <div key={servico.id} className="flex">
                <div style={{ minWidth: "50%", textAlign: "center", padding: "5px",  borderBottom: "1px solid #c2c2c2" }}>
                  <p className="text-sm font-semibold leading-6">{servico.selectedProductNane}</p>
                  <p className="text-sm font-semibold leading-6">{servico.selectedProdutPrice}</p>
                  <p className="text-sm font-semibold leading-6">{servico.selectedPayment}</p>
                </div>
                <div style={{ minWidth: "50%", textAlign: "center", borderBottom: "1px solid #c2c2c2" }}>
                  <p className="text-sm font-semibold leading-6 text-bg-teal-blue">{new Date(servico.selectedTime).toLocaleDateString('pt-BR')}</p>
                  <p className="text-sm font-semibold leading-6">{servico.selectedModel}</p>
                  <p className="text-sm font-semibold leading-6">{servico.selectedColor}</p>
                </div>
              </div>
              <button
                style={{marginLeft:"43%", padding:"10px",background:"red", borderRadius:"20px", color:"white", fontSize:"10px" }}
                disabled={!!loadingState[servico.id]}  
                onClick={() => deleteService(servico.id)}
              >
                {loadingState[servico.id] ? 'Carregando...' : 'DELETE'}
              </button>
             </>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
}

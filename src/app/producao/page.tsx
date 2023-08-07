
"use client";

import React, { ReactNode, useState } from 'react';
import Header from '../header';
import Spinner from "@/components/Spinner/Spinner";
import { fetcher } from '@/utils/fetcher/fetcher';
import useSWR, { mutate } from 'swr';

interface Servico {
  clienteId: string;
  selectedColor: ReactNode;
  selectedTime: ReactNode;
  selectedModel: ReactNode;
  selectedPayment: ReactNode;
  selectedProdutPrice: ReactNode;
  selectedProductNane: ReactNode;
  id: string;
  carro: string;
  concluido: boolean;
  aguardandoPagamento: boolean;
}

interface Cliente {
  selectedColor: ReactNode;
  selectedTime: ReactNode;
  selectedPayment: ReactNode;
  selectedProdutPrice: ReactNode;
  selectedProductNane: ReactNode;
  carro: ReactNode;
  concluido: any;
  data: string | number | Date;
  aguardandoPagamento: any;
  id: string;
  nome: string;
  telefone: string;
  servicos: Servico[];
}

const useFetch = (url: string) => {
  const { data, error } = useSWR<Cliente[]>(url, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
};

export default function Page() {

  const { data: clientes, isLoading, isError } = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/producao`);
  
  
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});

const markAsDone = async (id: string) => {
  // Define o serviço como carregando antes de iniciar a solicitação
  setLoadingState(prev => ({ ...prev, [id]: true }));

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clientesServicos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ concluido: true }),
    });

    if (!response.ok) {
      throw new Error('Failed to update service');
    }

    mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/producao`);
  } catch (e) {
    console.error(e);
  } finally {
    // Remove o serviço do estado de carregamento após a conclusão da solicitação
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
    <h1 style={{ textAlign: "center", padding: "2%", fontSize:"20px" }}>PRODUCTION</h1>
    <ul>
      {clientes && clientes.map((client: Cliente) => {
    
      return (
        <li key={client.id} style={{ width: "100%" }}>
          <div>
            <h1 className="text-xl font-semibold text-blue-600" style={{ textAlign: "center", padding: "5%" }}>
              {client.nome}
            </h1>
            <h1 className="text-xl font-semibold" style={{ textAlign: "right", padding: "2%" }}>
              {client.telefone}
            </h1>
          </div>
          {client.servicos?.map((servico, index) => (
           <>
            <div key={index} className="flex">
              <div style={{ minWidth: "50%", textAlign: "center", padding: "5px", borderBottom: "1px solid #c2c2c2" }}>
                <p className="text-sm font-semibold leading-6">{servico.selectedProductNane}</p>
                <p className="text-sm font-semibold leading-6">{servico.selectedProdutPrice}</p>
                <p className="text-sm font-semibold leading-6">{servico.selectedPayment}</p>
              </div>
              <div style={{ minWidth: "50%", textAlign: "center", borderBottom: "1px solid #c2c2c2" }}>
                <p className="text-sm font-semibold leading-6">{servico.selectedTime}</p>
                <h3>{servico.carro}</h3>
                <p className="text-sm font-semibold leading-6">{servico.selectedColor}</p>
              </div>
            </div>
            <button
              style={{marginLeft:"43%", padding:"8px",background:"red", borderRadius:"20px", color:"white", fontSize:"11px" }}
              disabled={!!loadingState[servico.id]}  
              onClick={() => markAsDone(servico.id)}
            >
              {loadingState[servico.id] ? 'Carregando...' : 'FINISH'}
            </button>
           </>   
          ))}

        </li>
      )})}
    </ul>
  </>
);








}
"use client";
import React, { ReactNode, useEffect, useState } from 'react';
import Header from '../header';
import Spinner from "@/components/Spinner/Spinner";
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/utils/fetcher/fetcher';
import { useRouter } from "next/navigation";


 

interface servicos {
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
  id: string;
  nome: string;
  telefone: string;
  servicos: servicos[];
};





export default function Page() {

  const [token, setToken] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});
  const router = useRouter();

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      alert('O usuário não está logado!');
      router.push("/login");
      return;
    }
    setToken(userToken);
    
}, [router]);


  

  const fetchURL = token ? `${process.env.NEXT_PUBLIC_API_URL}/api/producao` : null;

  const { data: clientes, error: isError, isLoading } = useSWR<Cliente[]>(fetchURL ? [fetchURL, token] : null, fetcher, {
    revalidateOnFocus: false,
  });
  

  


  const markAsDone = async (id: string) => {
    setLoadingState(prev => ({ ...prev, [id]: true }));

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/producao/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concluido: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to update service');
      }

      if (!clientes) return; 

      const updatedClientes = clientes.map(client => {
        if(client.id === id) {
          return {
            ...client,
            servicos: client.servicos.filter(servico => servico.id !== id)
          }
        }
        return client;
      });
     
      // Mutate local data
      mutate([`${process.env.NEXT_PUBLIC_API_URL}/api/producao`, token]);
      
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingState(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }
};



useEffect(() => {
  if (isError) {
      console.log('Error detected:', isError);
      router.push("/login");
  }
}, [router]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center mt-10">
        <Spinner />
      </div>
    );
  }
  
 
  return (
    <>
      <Header />
      <h1 className=' text-center p-2 text-3xl border bg-white m-3 rounded-2xl '>  PRODUTION</h1>
      <ul>
        {clientes && clientes?.map(client => (
          <li key={client.id} >
            <div className="flex bg-blue-500 mt-5 ml-3 mr-3 p-2 rounded-t-xl" >
              <div className='flex-1 justify-center text-center'>
                <h1 className="text-white text-2xl">
                  {client.nome}
                </h1>
              </div>
              <div className=' flex-1 justify-center text-center'>
                <h1 className="text-xl font-semibold text-white">
                  {client.telefone}
                </h1>
              </div>
            </div>
            {client.servicos && client.servicos.map(servico => (
            <>
              <div key={servico.id} className="flex bg-white ml-3 mr-3 p-2 text-center ">
                <div className='flex-1 justify-center w-1/2 '>
                  <div className=' w-full'>
                    <h2 className=' text-1xl border '>{servico.selectedProductNane}</h2>
                    <h2 className=' text-1xl border '>{servico.selectedProdutPrice}</h2>
                    <h2 className=' text-1xl border '>{servico.selectedPayment}</h2>
                  </div>
                </div>
                <div className='flex-1 justify-center'>
                  <div className=' w-full'>
                    <h2 className=' text-1xl border '>{servico.selectedTime}</h2>
                    <h2 className=' text-1xl border '>{servico.carro}</h2>
                    <h2 className=' text-1xl border '>{servico.selectedColor}</h2>
                  </div>
                </div>
              </div>
              <div className=' bg-white text-white text-center ml-3 mr-3 p-1 rounded-b-2xl '>
                <button
                className=' bg-blue-500 p-1 rounded-xl'
                  disabled={!!loadingState[servico.id]}  
                  onClick={() => markAsDone(servico.id)}
                >
                  {loadingState[servico.id] ? 'Carregando...' : 'FINISH'}
                </button>
              </div>
            </>   
            ))}
          </li>
        ))}
      </ul>
      <br/><br/><br/><br/>
    </>
  );
}



"use client";
import React, { ReactNode, useEffect, useState } from 'react';
import Header from '../header';
import Spinner from "@/components/Spinner/Spinner";
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/utils/fetcher/fetcher';


 

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


  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      alert('O usuário não está logado!');
      return;
    }
    setToken(userToken);
    console.log('Token from localStorage:', localStorage.getItem('token'));
}, []);


  

  const fetchURL = token ? `${process.env.NEXT_PUBLIC_API_URL}/api/producao` : null;

  const { data: clientes, error: isError, isLoading } = useSWR<Cliente[]>(fetchURL ? [fetchURL, token] : null, fetcher, {
    revalidateOnFocus: false,
  });
  

  console.log('Error:', isError);
  console.log('fetchURL:', fetchURL);
  console.log('Token:', token);


  


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
      
  }
});


if (isError) {
  return <div>Erro detectado: {JSON.stringify(isError)}</div>;
}



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
      <h1 style={{ textAlign: "center", padding: "2%", fontSize:"24px" }}>  PRODUTION</h1>
      <ul>
        {clientes && clientes?.map(client => (
          <li key={client.id} style={{ width: "100%" }}>
            <div className="flex" style={{marginTop:"15px",  marginLeft:"2%", marginRight:"2%", padding:"8px", borderRadius:"  20px 20px 0 0 ",  borderTop: "1px solid #c2c2c2", borderLeft: "1px solid #c2c2c2", borderRight: "1px solid #c2c2c2"}} >
              <div style={{ minWidth: "50%", textAlign: "center"  }}>
                <h1 className="text-blue-500" style={{fontSize:"21px"}}>
                  {client.nome}
                </h1>
              </div>
              <div style={{  minWidth: "50%", textAlign: "center" }}>
                <h1 className="text-xl font-semibold text-blue-500  ">
                  {client.telefone}
                </h1>
              </div>
            </div>
            {client.servicos && client.servicos.map(servico => (
            <>
              <div key={servico.id} className="flex" style={{fontSize:"19px", marginRight:"2%",  marginLeft:"2%", borderRight: "1px solid #c2c2c2",  borderLeft: "1px solid #c2c2c2", }}>
                <div style={{ minWidth: "50%", textAlign: "center" }}>
                  <h2 style={{fontSize:"19px"}}>{servico.selectedProductNane}</h2>
                  <h2 style={{fontSize:"19px"}}>price: {servico.selectedProdutPrice}</h2>
                  <h2 style={{fontSize:"19px"}}>pay: {servico.selectedPayment}</h2>
                </div>
                <div style={{  minWidth: "50%", textAlign: "center"   }}>
                  <h2 style={{fontSize:"19px"}}>end: {servico.selectedTime}</h2>
                  <h2 style={{fontSize:"19px"}}>brand: {servico.carro}</h2>
                  <h2 style={{fontSize:"19px"}}>color: {servico.selectedColor}</h2>
                </div>
              </div>
              <div  style={{ textAlign:"center", marginLeft:"2%", marginRight:"2%", padding:"8px", borderRadius:" 0 0 20px 20px ", color:"white", fontSize:"11px", borderBottom: "1px solid #c2c2c2", borderLeft: "1px solid #c2c2c2", borderRight: "1px solid #c2c2c2"  }}>
              <button
              style={{background:"blue", padding:"8px", borderRadius:"20px", }}
                disabled={!!loadingState[servico.id]}  
                onClick={() => markAsDone(servico.id)}
              >
                {loadingState[servico.id] ? 'Carregando...' : 'FINISH'}
              </button>
              </div>
            </>   
            ))}
          </li>
         ))
        }
      </ul>
      <br/><br/><br/><br/>
    </>
  );
}



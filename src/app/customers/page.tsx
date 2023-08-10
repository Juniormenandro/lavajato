"use client";

import React, { Key, useState } from 'react';
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

interface Booking {
  id: string;
  selectedDayOfWeek: React.ReactNode;
  selectedDate: number | string;
  selectedMonth: React.ReactNode;
  selectedYear: React.ReactNode;
  selectedTime: React.ReactNode;
  selectedProductDefaultPrice: React.ReactNode;

};


interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  servicos: Servico[];
  Booking: Booking[];
};

const useFetch = (url: string, token: string | null = null) => {
  const { data, error } = useSWR<Cliente[]>(url, (url) => fetcher(url, undefined, token));

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
};


export default function Page() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const { data: clientes, isLoading, isError } = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`, token);
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
      console.error('Erro ao deletar o serviço:', error, token);
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
            <div className="flex" style={{marginTop:"2%", marginBottom:"2%", marginLeft:"2%", marginRight:"2%", padding:"8px", borderRadius:"  20px 20px 0 0 ",  borderTop: "1px solid #c2c2c2", borderLeft: "1px solid #c2c2c2", borderRight: "1px solid #c2c2c2"}} >
          <div style={{ minWidth: "50%", textAlign: "center"  }}>
            <h1 className="text-xl font-semibold  text-blue-600">
              {client.nome}
            </h1>
          </div>
          <div style={{  minWidth: "50%", textAlign: "center",   }}>
            <h1 className="text-xl font-semibold  ">
              {client.telefone}
            </h1>
            </div>
          </div>
          
            {client.servicos && client.servicos.map(servico => (
             <>
              <div key={servico.id} className="flex" style={{marginRight:"2%",  marginLeft:"2%", borderRight: "1px solid #c2c2c2",  borderLeft: "1px solid #c2c2c2", }}>
                <div style={{ minWidth: "50%", textAlign: "center", padding: "5px",   }}>
                  <p className="text-sm font-semibold leading-6">{servico.selectedProductNane}</p>
                  <p className="text-sm font-semibold leading-6">{servico.selectedProdutPrice}</p>
                  <p className="text-sm font-semibold leading-6">{servico.selectedPayment}</p>
                </div>
                <div style={{ minWidth: "50%", textAlign: "center",  }}>
                  <p className="text-sm font-semibold leading-6 text-bg-teal-blue">{new Date(servico.selectedTime).toLocaleDateString('pt-BR')}</p>
                  <p className="text-sm font-semibold leading-6">{servico.selectedModel}</p>
                  <p className="text-sm font-semibold leading-6">{servico.selectedColor}</p>
                </div>
              </div>


            <div  style={{  textAlign:"center",  marginLeft:"2%", marginRight:"2%", padding:"8px", borderRadius:" 0 0 20px 20px ", color:"white", fontSize:"11px", borderBottom: "1px solid #c2c2c2", borderLeft: "1px solid #c2c2c2", borderRight: "1px solid #c2c2c2"  }}>
            <button
             style={{background:"red", padding:"8px", borderRadius:"20px", }}
              disabled={!!loadingState[servico.id]}  
              onClick={() => deleteService(servico.id)}
            >
              {loadingState[servico.id] ? 'Carregando...' : 'DELETE'} 
            </button>
            </div>
             </>
            ))}
                       
            {client.Booking && client.Booking.map(book => (
                
              <div key={book.id} className="flex" style={{marginRight:"2%",  marginLeft:"2%", borderLeft: "1px solid #c2c2c2",   borderRight: "1px solid #c2c2c2", borderBottom: "1px solid #c2c2c2", borderRadius:" 0 0 20px 20px ", }}>
                
                <div style={{ minWidth: "50%", textAlign: "center", padding: "5px",   }}>
                <p className="text-sm font-semibold leading-6">{book.selectedDate}</p>
                <p className="text-sm font-semibold leading-6">{book.selectedDayOfWeek}</p>
                <p className="text-sm font-semibold leading-6">{book.selectedMonth}</p>
                </div>

                <div style={{ minWidth: "50%", textAlign: "center",  }}>
                <p className="text-sm font-semibold leading-6">{book.selectedYear}</p>
                <p className="text-sm font-semibold leading-6">{book.selectedTime}</p>
                <p className="text-sm font-semibold leading-6">{book.selectedProductDefaultPrice}</p>
                </div>

            </div>
            ))}

          </li>
        ))}
      </ul>
    </>
  );
}
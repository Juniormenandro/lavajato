
"use client";

import React, { ReactNode, useEffect, useState } from 'react';
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


interface Booking {
  clienteId: string;
  id: string;
  selectedDayOfWeek: React.ReactNode;
  selectedDate: number | string;
  selectedMonth: React.ReactNode;
  selectedYear: React.ReactNode;
  selectedTime: React.ReactNode;
  selectedProductDefaultPrice: React.ReactNode;

};

interface Cliente {
  Booking: any;
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

const useFetch = (url: string, token: string | null = null) => {
  const { data, error } = useSWR<Cliente[]>(url, (url) => fetcher(url, undefined, token));

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
};


export default function Page() {
  
const [token, setToken] = useState<string | null>(null);

useEffect(() => {
  const userToken = localStorage.getItem('token');
  if (userToken) {
    setToken(userToken);
  }
}, []);

  const { data: clientes, isLoading, isError } = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/producao`, token);
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
  
  
const [showError, setShowError] = useState(false);

useEffect(() => {
  const userToken = localStorage.getItem('token');
  if (userToken) {
    setToken(userToken);
  }
}, []);

useEffect(() => {
  if (isError) {
    const timer = setTimeout(() => {
      setShowError(true);
    }, 7000); // espera 5 segundos antes de mostrar a mensagem de erro

    return () => clearTimeout(timer); // Limpar o timer ao desmontar
  }
}, [isError]);

if (isError && showError) {
  return <p>An error occurred while fetching data</p>;
}

if (isLoading || isError) {
  return (
    <div className="flex flex-col items-center mt-10">
      <Spinner />
    </div>
  );
}

return (
  <>
    <Header />
    <h1 style={{ textAlign: "center", padding: "2%", fontSize:"20px" }}>PRODUCTION</h1>
    <ul>
      {clientes && clientes.map((client: Cliente) => {
    
      return (
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

          {client.servicos?.map((servico, index) => (
           <>
            <div key={index} className="flex" style={{marginRight:"2%",  marginLeft:"2%", borderRight: "1px solid #c2c2c2",  borderLeft: "1px solid #c2c2c2", }}>
              <div style={{ minWidth: "50%", textAlign: "center"  }}>
                <p className="text-sm font-semibold leading-6">{servico.selectedProductNane}</p>
                <p className="text-sm font-semibold leading-6">{servico.selectedProdutPrice}</p>
                <p className="text-sm font-semibold leading-6">{servico.selectedPayment}</p>
              </div>
              <div style={{  minWidth: "50%", textAlign: "center",   }}>
                <p className="text-sm font-semibold leading-6">{servico.selectedTime}</p>
                <h3>{servico.carro}</h3>
                <p className="text-sm font-semibold leading-6">{servico.selectedColor}</p>
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
      )})}
    </ul>
    <br/><br/><br/><br/>
  </>
);








}

function setLoadingState(arg0: (prev: any) => any) {
  throw new Error('Function not implemented.');
}

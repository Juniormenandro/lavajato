
"use client";

import React, { ReactNode, useState } from 'react';
import Header from '../header';
import Spinner from "@/components/Spinner/Spinner";
import { fetcher } from '@/utils/fetcher/fetcher';
import useSWR, { mutate } from 'swr';



interface Booking {
    lienteId: string;
    id: string;
    selectedDayOfWeek: React.ReactNode;
    selectedDate: number | string;
    selectedMonth: React.ReactNode;
    selectedYear: React.ReactNode;
    selectedTime: React.ReactNode;
    selectedProductDefaultPrice: React.ReactNode;
  
  };
  

interface Cliente {
  selectedMonth: ReactNode;
  selectedDayOfWeek: ReactNode;

  Booking: Booking[];
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
  
  console.log(clientes);
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
              <p className="text-sm font-semibold leading-6">{client.selectedTime}</p>
                  <p className="text-sm font-semibold leading-6">{client.selectedDayOfWeek}</p>
                  <p className="text-sm font-semibold leading-6">{client.selectedMonth}</p>
            </div> 

          </div>


          {client.Booking && client.Booking.map(book => (
                <>
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
              <div  style={{ textAlign:"center", marginLeft:"2%", marginRight:"2%", padding:"8px", borderRadius:" 0 0 20px 20px ", color:"white", fontSize:"11px", borderBottom: "1px solid #c2c2c2", borderLeft: "1px solid #c2c2c2", borderRight: "1px solid #c2c2c2"  }}>
              <button
               style={{background:"blue", padding:"8px", borderRadius:"20px", }}
                disabled={!!loadingState[book.id]}  
                onClick={() => markAsDone(book.id)}
              >
                {loadingState[book.id] ? 'Carregando...' : 'FINISH'}
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
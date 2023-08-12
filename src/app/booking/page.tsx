"use client";
import React, { useEffect, useState } from 'react';
import Header from '../header';
import Spinner from "@/components/Spinner/Spinner";
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/utils/fetcher/fetcher';


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
  Booking: Booking[];
};





export default function Page() {

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      setToken(userToken);
    }
  }, []);

  const { data:clientes, error:isError, isLoading } =  useSWR<Cliente[]>([`${process.env.NEXT_PUBLIC_API_URL}/api/book`, token], fetcher, {
    revalidateOnFocus: false,
  });

  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});

  const markAsDone = async (id: string) => {
    setLoadingState(prev => ({ ...prev, [id]: true }));

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/book/${id}`, {
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
            Booking: client.Booking.filter(book => book.id !== id)
          }
        }
        return client;
      });
     
      // Mutate local data
      mutate([`${process.env.NEXT_PUBLIC_API_URL}/api/book`, token]);
      
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



  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        setShowError(true);
      }, 7000); 

      return () => clearTimeout(timer); 
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
      <h1 style={{ textAlign: "center", padding: "2%", fontSize:"20px" }}>  BOOKING</h1>
      <ul>
        {clientes && clientes?.map(client => (
          <li key={client.id} style={{ width: "100%" }}>
            <div className="flex" style={{marginTop:"2%", marginBottom:"2%", marginLeft:"2%", marginRight:"2%", padding:"8px", borderRadius:"  20px 20px 0 0 ",  borderTop: "1px solid #c2c2c2", borderLeft: "1px solid #c2c2c2", borderRight: "1px solid #c2c2c2"}} >
              <div style={{ minWidth: "50%", textAlign: "center"  }}>
                <h1 className="text-xl font-semibold  text-blue-900">
                  {client.nome}
                </h1>
              </div>
              <div style={{  minWidth: "50%", textAlign: "center",   }}>
                <h1 className="text-xl font-semibold text-blue-900  ">
                  {client.telefone}
                </h1>
              </div>
            </div>
              {client.Booking && client.Booking.map(book => (
                <>
                <div key={book.id} className="flex" style={{marginRight:"2%",  marginLeft:"2%", borderLeft: "1px solid #c2c2c2",   borderRight: "1px solid #c2c2c2", }}>  
                  <div style={{ minWidth: "50%", textAlign: "center", padding: "5px",   }}>
                    <p className="text-sm font-semibold leading-6">DAY: {book.selectedDate}</p>
                    <p className="text-sm font-semibold leading-6">DAY WEEK: {book.selectedDayOfWeek}</p>
                    <p className="text-sm font-semibold leading-6">MONTH: {book.selectedMonth}</p>
                  </div>
                  <div style={{ minWidth: "50%", textAlign: "center",  }}>
                    <p className="text-sm font-semibold leading-6">YEAR: {book.selectedYear}</p>
                    <p className="text-sm font-semibold leading-6">TIME: {book.selectedTime}</p>
                    <p className="text-sm font-semibold leading-6">PRICE: {book.selectedProductDefaultPrice} €</p>
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
         ))
        }
      </ul>
    </>
  );
}



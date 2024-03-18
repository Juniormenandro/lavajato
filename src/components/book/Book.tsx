"use client";
import React, { useEffect, useState } from 'react';

import Spinner from "@/components/form/Spinner/Spinner";
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/utils/fetcher/fetcher';
import { Toaster, toast } from "react-hot-toast";



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


const Book = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});


  useEffect(() => {
    const userToken = localStorage.getItem('token');
      if (!userToken) {
        alert('O usuário não está logado!');
        return;
      }
      setToken(userToken);
      //console.log('Token from localStorage:', localStorage.getItem('token'));
  }, []);


  const fetchURL = token ? `${process.env.NEXT_PUBLIC_API_URL}/api/book` : null;
  const { data: clientes, error: isError, isLoading } = useSWR<Cliente[]>(fetchURL ? [fetchURL, token] : null, fetcher, {
    revalidateOnFocus: false,
  });
  
  if (!fetchURL) {
    return null;
  }


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
    <div className='bg-white my-10 mx-5 rounded-lg'>
      <h1 style={{ textAlign: "center", padding: "2%", fontSize:"24px" }}>  BOOKING</h1>
      <ul>
        {clientes && clientes?.map(client => (
          <li key={client.id} style={{ width: "100%" }}>
            <div className="flex" style={{marginTop:"15px",  marginLeft:"2%", marginRight:"2%", padding:"8px", borderRadius:"  20px 20px 0 0 ",  borderTop: "1px solid #c2c2c2", borderLeft: "1px solid #c2c2c2", borderRight: "1px solid #c2c2c2"}} >
              <div style={{ minWidth: "50%", textAlign: "center" }}>
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
              {client.Booking && client.Booking.map(book => (
                <>
                <div key={book.id} className="flex" style={{ marginRight:"2%",  marginLeft:"2%", borderLeft: "1px solid #c2c2c2",   borderRight: "1px solid #c2c2c2",  }}>  
                  
                  <div  style={{ minWidth: "50%", textAlign:"center" }}>
                    <h2 style={{fontSize:"19px"}}>DAY: {book.selectedDate}</h2>
                    <h2 style={{fontSize:"19px"}}>WEEK: {book.selectedDayOfWeek}</h2>
                    <h2 style={{fontSize:"19px"}}>MONTH: {book.selectedMonth}</h2>
                  </div>
                  <div style={{ minWidth: "50%", textAlign: "center"   }}>
                    <h2 style={{fontSize:"19px"}}>TIME: {book.selectedTime}</h2>
                    <h2 style={{fontSize:"19px"}}>PRICE: {book.selectedProductDefaultPrice} €</h2>
                    <h2 style={{fontSize:"19px"}}>YEAR: {book.selectedYear}</h2>
                  </div>
                </div>

                <div  style={{ textAlign:"center", marginLeft:"2%", marginRight:"2%", padding:"15px", borderRadius:" 0 0 20px 20px ", color:"white", fontSize:"11px", borderBottom: "1px solid #c2c2c2", borderLeft: "1px solid #c2c2c2", borderRight: "1px solid #c2c2c2"  }}>
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
    </div>
  );
}


export default Book;
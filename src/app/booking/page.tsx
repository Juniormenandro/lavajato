"use client";

import React, { Key, useEffect, useState } from 'react';
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

  const { data: clientes, isLoading, isError } = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/book`,token);
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});

  
  
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
      <h1 style={{ textAlign: "center", padding: "2%", fontSize:"20px" }}>  BOOKING</h1>
    
      <ul>

      
   { clientes && clientes.map(client => (
    
    
    
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
    
  ))
}




       
      </ul>
    </>
  );
}

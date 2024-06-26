"use client";
import React, { useEffect, useState } from 'react';
import Spinner from "@/components/form/Spinner/Spinner";
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/utils/fetcher/fetcher';

interface Booking {
  id:                         string;
  selectedDayOfWeek: React.ReactNode;
  selectedDate:      number | string;
  selectedMonth:     React.ReactNode;
  selectedYear:      React.ReactNode;
  selectedTime:      React.ReactNode;
  rawPrice:                        0;
  formattedDate:              String;
  categoriaId:                String;
  selectedProductId:          String;
  selectedProductName:        String;
  selectedPayment:            String;
  bookConcluido:             boolean;

};
interface Cliente {
  iercode:                    string;
  endereco:                   string;
  id:                         string;
  name:                       string;
  telefone:                   string;
  Booking:                 Booking[];
};


const Book = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});


  useEffect(() => {
    const userToken = localStorage.getItem('token');
      if (!userToken) {
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

      const updatedClientes = clientes.map((client:Cliente) => {
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
    <div className="bg-gray-50 mx-8 px-2 rounded-lg shadow-md">
      <h1 className="text-center text-2xl font-semibold py-4">Serviços Agendados</h1>
      <ul>
        {clientes && clientes?.map((client:Cliente) => (
          <li key={client.id}>
            <div className='flex-row justify-center text-center py-4'>
              <h1 className="text-[22px] font-semibold">{client.name}</h1>
            </div>

            <div className='flex-row justify-center text-center bg-gray-100 rounded-lg border-b-4 ml-3 mr-3 p-2 '>
              <h1 className="text-[20px] font-semibold ">{client.telefone}</h1>
                <h2 className=' text-[18px]'>Eircode: {client.iercode}</h2>
                <h2 className=' text-[18px]'>Endereco: {client.endereco}</h2>
            </div>
            {client.Booking && client.Booking.map((book:Booking) => (
              <div key={book.id} className='flex-row justify-center text-center bg-gray-100 rounded-lg border-b-4 ml-3 mr-3 p-2 '>
                <h2 className=' text-[18px]'>{book.selectedProductName}</h2>
                <h2 className=' text-[18px]'>Preço: {book.rawPrice}</h2>
                <h2 className=' text-[18px]'>Pagamneto: {book.selectedPayment}</h2>
                <h2 className=' text-[18px]'>TIME: {book.selectedTime}</h2>
                <h2 className=' text-[18px]'>DAY: {book.selectedDate}</h2>
                <div className="text-center mt-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full w-full"
                    disabled={!!loadingState[book.id]}  
                    onClick={() => markAsDone(book.id)}
                  >
                    {loadingState[book.id] ? 'Carregando...' : 'Concluir'}
                  </button>
                </div>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  
  );
}


export default Book;
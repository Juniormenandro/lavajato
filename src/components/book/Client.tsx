
"use client";
import { useState, useEffect, useMemo } from 'react';
import Spinner from "@/components/form/Spinner/Spinner";
import { fetcher } from '@/utils/fetcher/fetcher';
import 'react-datepicker/dist/react-datepicker.css';
import useSWR, { mutate } from 'swr';
import React from 'react';



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


  
const Client = ()  => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const userToken = localStorage.getItem('token');
      if (!userToken) {
        return;
      }
      setToken(userToken);
      //console.log('Token from localStorage:', localStorage.getItem('token'));
  }, []);


  const fetchURL = token ? `${process.env.NEXT_PUBLIC_API_URL}/api/customers` : null;
  const { data: clientes, error: isError, isLoading } = useSWR<Cliente[]>(fetchURL ? [fetchURL, token] : null, fetcher, {
    revalidateOnFocus: false,
  });
  
  if (!fetchURL) {
    return null;
  }
  if (isError) {
    console.error("Erro ao buscar clientes:", isError);
  }
  if (isLoading) {
    return (
      <div className="flex flex-col items-center mt-10">
        <Spinner />
      </div>
    ); 
  }



  return (
    <div className="bg-gray-50 mx-8 px-2 rounded-lg shadow-lg">
      <ul>
        {clientes && clientes?.map((client:Cliente) => (
          <li key={client.id}>
            <div className='flex-row justify-center text-center py-4'>
              <h1 className="text-[22px] font-semibold">{client.name}</h1>
            </div>
            <div className='flex-row justify-center text-center bg-gray-100 rounded-lg border-b-4 ml-3 mr-3 p-2 '>
              <h1 className=" text-[20px]">Telefone: {client.telefone}</h1>
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
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Client;



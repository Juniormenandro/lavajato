
"use client";
import { useState, useEffect, useMemo } from 'react';
import Spinner from "@/components/form/Spinner/Spinner";
import { fetcher } from '@/utils/fetcher/fetcher';
import 'react-datepicker/dist/react-datepicker.css';
import useSWR, { mutate } from 'swr';
import React from 'react';


interface Servico {
  selectedColor:             string;
  selectedModel:             string;
  selectedPayment:           string;
  rawPrice:                  Number;
  selectedProductNane:       string; 
  id:                        string;
  carro:                     string;  
  concluido:                boolean;
  aguardandoPagamento:      boolean;
  data:                         any; 
};


interface Booking {
  id:                         string;
  selectedDayOfWeek: React.ReactNode;
  selectedDate:      number | string;
  selectedMonth:     React.ReactNode;
  selectedYear:      React.ReactNode;
  selectedTime:      React.ReactNode;
  rawPrice:                   Number;
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
  servico:                 Servico[];
  Booking:                 Booking[];
};
  
const Client = ()  => {
  const [token, setToken] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});
  const [newPrice, setNewPrice] = useState<string>('');
  const [periodoFiltragem, setPeriodoFiltragem] = useState('all');
  const [selectedField, setSelectedField] =  useState('rawPrice');

  

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

  
  async function updateServicePrice(id: string, field: string, value: any) {
    if (!value) return;
    try {
      const response = await fetch(`/api/customers/updatePrice?id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: value }), // Atualizando o campo específico
      });
  
      if (!response.ok) {
        throw new Error("Failed to update the record.");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  const handleUpdate = async (serviceId: string) => {
    setLoadingState(prev => ({ ...prev, [serviceId]: true }));
  
    try {
      await updateServicePrice(serviceId, selectedField, newPrice); // Passando o campo selecionado e o novo valor
  
      // A parte do código que atualiza o valor localmente precisa ser ajustada para atualizar o campo correto
      if (clientes) {
        const updatedClientes = clientes.map(client => ({
          ...client,
          servicos: client.servico.map((servico: { id: string; }) =>
            servico.id === serviceId
            ? { ...servico, [selectedField]: newPrice }
            : servico
          )
        }));
  
        mutate(updatedClientes);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(prev => ({ ...prev, [serviceId]: false }));
      window.location.reload();
    }
  };
  


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
    <ul className='bg-white mb-10 mx-8 rounded-lg'>
      {clientes?.map(client => (
        <li key={client.id} >
          {client.Booking && client.Booking.map(book => (
            <div key={book.id} className='flex-row justify-center text-center bg-white border-b-4 ml-3 mr-3 p-2 '>
              <h1 className="text-[22px] font-semibold">{client.name}</h1>
              <h1 className="text-[20px] font-semibold border ">{client.telefone}</h1>
              <h2 className=' text-[18px] border  '>{book.selectedProductName}</h2>
              
              <h2 className=' text-[18px] border  '>pagamneto: {book.selectedPayment}</h2>
              <h2 className=' text-[18px] border  '>iercode: {client.iercode}</h2>
              <h2 className=' text-[18px] border  '>endereco: {client.endereco}</h2>
              <h2 className=' text-[18px] border  '>TIME: {book.selectedTime}</h2>
              <h2 className=' text-[18px] border '>DAY: {book.selectedDate}</h2>
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}


export default Client;



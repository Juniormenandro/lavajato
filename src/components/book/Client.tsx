
"use client";
import { useState, useEffect, useMemo } from 'react';
import Spinner from "@/components/form/Spinner/Spinner";
import { fetcher } from '@/utils/fetcher/fetcher';
import 'react-datepicker/dist/react-datepicker.css';
import useSWR, { mutate } from 'swr';
import { useRouter } from "next/navigation";
import React from 'react';


interface Servico {
  selectedColor: string;
  selectedModel: string;
  selectedPayment: string;
  rawPrice:Number;
  selectedProductNane: string; 
  id: string;
  carro: string;  
  concluido: boolean;
  aguardandoPagamento: boolean;
  data:any; 
};


interface Booking {
  id: string;
  selectedDayOfWeek: React.ReactNode;
  selectedDate: number | string;
  selectedMonth: React.ReactNode;
  selectedYear: React.ReactNode;
  selectedTime: React.ReactNode;
 
  formattedDate:        String;
  categoriaId:          String;
  selectedProductId:    String;
  selectedProductName:  String;
  selectedPayment:      String;
  bookConcluido:        boolean;

};
interface Cliente {
  placa: string;
  id: string;
  name: string;
  telefone: string;
  servicos: Servico[];
  Booking: Booking[];
};
  
const Client = ()  => {
  const [token, setToken] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});
  const [newPrice, setNewPrice] = useState<string>('');
  const [periodoFiltragem, setPeriodoFiltragem] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showReturned, setShowReturned] = useState(false);
  const router = useRouter();
  const [selectedField, setSelectedField] = useState('rawPrice');

  



  /*
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userToken = localStorage.getItem('token');
    
      if (!userToken) {
          alert('O usuário não está logado!');
          router.push("/login");
          return;
      }
    
      setToken(userToken);
    }
  }, [router]);
  const fetchURL = token ? `${process.env.NEXT_PUBLIC_API_URL}/api/customers` : null;
  // Lógica do SWR
  const { data: clientes, error: isError, isLoading } = useSWR<Cliente[]>(fetchURL ? [fetchURL, token] : null, fetcher, {
    revalidateOnFocus: false,
  });
*/


  const { data: clientes, error: isError, isLoading } = useSWR<Cliente[]>([
    `${process.env.NEXT_PUBLIC_API_URL}/api/customers`,],
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

 
  
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
          servicos: client.servicos.map(servico =>
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
    <>
      <div className='text-2xl ml-3 mr-3 text-center bg-white p-2 font-semibold rounded-2xl'>
        <h1>CUSTOMERS</h1>
      </div>
      <div className="flex justify-center text-center">
        <div className="mt-10 ml-2 ">
        <button className=' p-2 bg-white border-4 text-blue-500  border-blue-500 font-semibold rounded-lg'
          onClick={() => setShowReturned(!showReturned)} type={'button'} >
          {showReturned ? 'back. ' : 'Servicos'}
        </button>
        </div>
      </div>
      <ul>
        {clientes?.map(client => (
          <li key={client.id} >
            <div className="flex justify-center text-center bg-white mt-5 ml-3 mr-3 rounded-t-2xl"  >
              <div className=' flex-1 justify-center'>
                <h1 className="text-[22px] font-semibold">
                  {client.name}
                </h1>
              </div>
              <div className=' flex-1 justify-center'>
                <h1 className="text-[23px] font-semibold ">
                  {client.telefone}
                </h1>
              </div>
            </div>
            
               
            {client.Booking && client.Booking.map(book => (
              <div key={book.id} className='flex justify-center text-center bg-white border-t-8 border-blue-500 ml-3 mr-3 p-2 '>
                <div className='flex-1 flex justify-center w-1/2 '>
                  <div className=' w-full'>
                    <h2 className=' text-[18px] border  '>TIME: {book.selectedTime}</h2>
                    <h2 className=' text-[18px] border '>DAY: {book.selectedDate}</h2>
                    <h2 className=' text-[18px] border '>WEEK: {book.selectedDayOfWeek}</h2>
                    <h2 className=' text-[18px] border '>MONTH: {book.selectedMonth}</h2>
                    <h2 className=' text-[18px] border  '>YEAR: {book.selectedYear}</h2>
                  </div> 
                </div>
                <div className='flex-1 flex justify-center'>
                  <div className=' w-full'>
                    <h2 className=' text-[18px] border  '>TIME: {book.selectedTime}</h2>
                    <h2 className=' text-[18px] border  '>produto: {book.selectedProductName}</h2>
                    <h2 className=' text-[18px] border  '>pagamneto: {book.selectedPayment}</h2>
                    <h2 className=' text-[18px] border  '>placa: {client.placa}</h2>

                  </div>
                </div>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
}


export default Client;



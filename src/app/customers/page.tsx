
"use client";
import React, { useEffect, useState } from 'react';
import Header from '../header';
import Spinner from "@/components/Spinner/Spinner";
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/utils/fetcher/fetcher';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from "react-hot-toast";


interface Servico {
  selectedColor: string;
 
  selectedModel: string;
  selectedPayment: string;
  selectedProdutPrice: string;
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
  selectedProductDefaultPrice: React.ReactNode;

};


interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  servicos: Servico[];
  Booking: Booking[];
};

export default function Page() {
  
  
  const [token, setToken] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});
  const [newPrice, setNewPrice] = useState<string>('');
  const router = useRouter();


  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      alert('O usuário não está logado!');
      router.push("/login");
      return;
    }
    setToken(userToken);
    console.log('Token from localStorage:', localStorage.getItem('token'));
}, []);



  const fetchURL = token ? `${process.env.NEXT_PUBLIC_API_URL}/api/customers` : null;

  const { data: clientes, error: isError, isLoading } = useSWR<Cliente[]>(fetchURL ? [fetchURL, token] : null, fetcher, {
    
    revalidateOnFocus: false,
  
  });
  
  if (!fetchURL) {
    return null;
  }
 

  
  

  async function updateServicePrice(id: string, price: string) {
    try {
      const response = await fetch(`/api/customers/updatePrice?id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedProdutPrice: price }),
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
      await updateServicePrice(serviceId, newPrice);
      window.location.reload(); 

      
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingState(prev => ({ ...prev, [serviceId]: false }));
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
    <>
      <Header />
      <h1 style={{ textAlign: "center", padding: "2%", fontSize: "24px" }}>CUSTOMERS</h1>
      <ul>
      {clientes && clientes.map(client => (
      <li key={client.id} style={{ width: "100%" }}>
        <div className="flex" style={{marginTop:"15px",  marginLeft:"2%", marginRight:"2%", padding:"8px", borderRadius:"  20px 20px 0 0 ",  borderTop: "1px solid #c2c2c2", borderLeft: "1px solid #c2c2c2", borderRight: "1px solid #c2c2c2"}} >
          <div style={{ minWidth: "50%", textAlign: "left", marginLeft:"3px"  }}>
            <h1 className="text-blue-500" style={{fontSize:"21px"}}>
              {client.nome}
            </h1>
          </div>
          <div style={{  minWidth: "50%", textAlign: "left" }}>
            <h1 className="text-xl font-semibold text-blue-500  ">
              {client.telefone}
            </h1>
          </div>
        </div>
          
            {client.servicos && client.servicos.map(servico => (
             <>
              <div key={servico.id} className="flex" style={{marginRight:"2%", marginLeft:"2%", borderRight: "1px solid #c2c2c2", borderLeft: "1px solid #c2c2c2"}}>
                <div style={{ minWidth: "50%", textAlign: "left", marginLeft:"10px" }}>
                  <h2 style={{fontSize:"19px"}}>serv: {servico.selectedProductNane}</h2>
                  <h2 style={{fontSize:"19px"}}>price: {servico.selectedProdutPrice}</h2>
                  <h2 style={{fontSize:"19px"}}>pay: {servico.selectedPayment}</h2>
                </div>
                <div style={{ minWidth: "50%", textAlign: "left" }}>
                <h2 style={{fontSize:"19px"}}>
                  {servico.data && typeof servico.data === 'string' 
                    ? new Date(servico.data).toLocaleDateString('pt-BR') 
                    : 'Data não definida'}
                </h2>
                  <h2 style={{fontSize:"19px"}}>brand: {servico.carro}</h2>
                  <h2 style={{fontSize:"19px"}}>color: {servico.selectedColor}</h2>
                </div>
              </div>


              <div style={{ textAlign: "center", marginLeft: "2%", marginRight: "2%", padding: "8px", borderRadius: "0 0 20px 20px", color: "white", fontSize: "11px", borderBottom: "1px solid #c2c2c2", borderLeft: "1px solid #c2c2c2", borderRight: "1px solid #c2c2c2" }}>
                <input 
                  style={{border:"1px solid #c2c2c2", color:"black", padding:"8px", borderRadius:"20px", maxWidth:"25%"}}
                  type="text" 
                  value={newPrice} 
                  onChange={(e) => setNewPrice(e.target.value)} 
                  placeholder="New Price" 
                />
                
                <button 
                  style={{background:"blue", padding:"8px", borderRadius:"20px", marginLeft:"5px" }}
                  disabled={!!loadingState[servico.id]} 
                  onClick={() => handleUpdate(servico.id)}>
                    {loadingState[servico.id] ? 'Carregando...' : 'Update Price'}
                    
                </button>
              </div>
             </> 
            ))}
                       
            {client.Booking && client.Booking.map(book => (
                
              <div key={book.id} className="flex" style={{paddingBottom: "20px" ,marginRight:"2%",  marginLeft:"2%", borderLeft: "1px solid #c2c2c2",   borderRight: "1px solid #c2c2c2", borderBottom: "1px solid #c2c2c2", borderRadius:" 0 0 20px 20px ", }}>
                
                <div  style={{ minWidth: "50%", textAlign: "left", marginLeft:"13px"  }}>
                    <h2 style={{fontSize:"19px"}}>DAY: {book.selectedDate}</h2>
                    <h2 style={{fontSize:"19px"}}>WEEK: {book.selectedDayOfWeek}</h2>
                    <h2 style={{fontSize:"19px"}}>MONTH: {book.selectedMonth}</h2>
                  </div>
                  <div style={{ minWidth: "50%", textAlign: "left",   }}>
                    <h2 style={{fontSize:"19px"}}>TIME: {book.selectedTime}</h2>
                    <h2 style={{fontSize:"19px"}}>PRICE: {book.selectedProductDefaultPrice} €</h2>
                    <h2 style={{fontSize:"19px"}}>YEAR: {book.selectedYear}</h2>
                  </div>

            </div>
            ))}

          </li>
        ))}
      </ul>
    </>
  );
}

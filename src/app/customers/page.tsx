
"use client";
import React, { useEffect, useState } from 'react';
import Header from '../header';
import Spinner from "@/components/Spinner/Spinner";
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/utils/fetcher/fetcher';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from "react-hot-toast";


interface Servico {
  selectedColor: React.ReactNode;
  selectedTime: Date | string;
  selectedModel: React.ReactNode;
  selectedPayment: React.ReactNode;
  selectedProdutPrice: React.ReactNode;
  selectedProductNane: React.ReactNode; 
  id: string;
  carro: string;  
  concluido: boolean;
  aguardandoPagamento: boolean;
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
      <h1 style={{ textAlign: "center", padding: "2%", fontSize: "20px" }}>CUSTOMERS</h1>
      <ul>
      {clientes && clientes.map(client => (
      <li key={client.id} style={{ width: "100%" }}>
        <div className="flex" style={{ background: "white", marginTop:"2%", marginBottom:"2%", marginLeft:"2%", marginRight:"2%", padding:"8px", borderRadius:"  20px 20px 0 0 ",  borderTop: "1px solid #c2c2c2", borderLeft: "1px solid #c2c2c2", borderRight: "1px solid #c2c2c2"}} >
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
          
            {client.servicos && client.servicos.map(servico => (
             <>
              <div key={servico.id} className="flex" style={{marginRight:"2%",  marginLeft:"2%", borderRight: "1px solid #c2c2c2",  borderLeft: "1px solid #c2c2c2", }}>
                <div style={{ minWidth: "50%", textAlign: "center", padding: "5px",   }}>
                  <p className="text-sm font-semibold leading-6">{servico.selectedProductNane}</p>
                  <p className="text-sm font-semibold leading-6">{servico.selectedProdutPrice}</p>
                  <p className="text-sm font-semibold leading-6">{servico.selectedPayment}</p>
                </div>
                <div style={{ minWidth: "50%", textAlign: "center",  }}>
                  <p className="text-sm font-semibold leading-6 text-bg-teal-blue">{new Date(servico.selectedTime).toLocaleDateString('pt-BR')}</p>
                  <p className="text-sm font-semibold leading-6">{servico.selectedModel}</p>
                  <p className="text-sm font-semibold leading-6">{servico.selectedColor}</p>
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
        ))}
      </ul>
    </>
  );
}

"use client";
import { useState, useEffect, useMemo } from 'react';
import Header from '../header';
import Spinner from "@/components/Spinner/Spinner";
import { fetcher } from '@/utils/fetcher/fetcher';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useSWR, { mutate } from 'swr';
import { useRouter } from "next/navigation";



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
interface DateSelectorProps {
  onDateChange: (date: Date, type: string) => void;
}

function DateSelector({ onDateChange }: DateSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [dateType, setDateType] = useState('');
 
  //flex-col
  return (
    <div className=' flex  '>
   
     <select
     className=' w-28 pl-7 pt-1 pb-1  rounded-lg  bg-blue-500 text-white'
       value={dateType} onChange={(e) => setDateType(e.target.value)}
      
       >
        <option value="day">Day</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
        <option value="all">all</option>
      </select>


      <DatePicker
      className= ' p-2 w-28 ml-1    rounded-lg bottom-content   bg-blue-500 text-white '
        selected={selectedDate}
        onChange={(date) => {
          if (date instanceof Date && dateType) {  // Ensure date is a Date object and dateType is not empty
            setSelectedDate(date);
            onDateChange(date, dateType);
          }
        }}
      />
    </div>
  );
}




export default function Page() {
  
  
  const [token, setToken] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});
  const [newPrice, setNewPrice] = useState<string>('');

  const [periodoFiltragem, setPeriodoFiltragem] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showReturned, setShowReturned] = useState(false);
  const router = useRouter();
  
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







// Esta lógica agora depende do selectedDate
const fetchURL = useMemo(() => {
  if (!token) return null;

  const currentDate = selectedDate.toISOString();

  let param = "";
  switch (periodoFiltragem) {
    case 'day':
      param = `date=${currentDate}`;
      break;
    case 'week':
      param = `weekDate=${currentDate}`;
      break;
    case 'month':
      param = `monthDate=${currentDate}`;
      break;
      case 'all':
      param = '/';
      break;
    default:
      return null;
  }
  if (showReturned) {
    param += '&returned=true';
  }

  return `${process.env.NEXT_PUBLIC_API_URL}/api/customers?${param}`;
}, [token, periodoFiltragem, selectedDate, showReturned]);  // Add 'showReturned' as a dependency



const handleDateChange = (date: Date, type: string) => {
  console.log("Selected Date:", date);
  setSelectedDate(date); // Atualiza a data selecionada
  setPeriodoFiltragem(type); // Atualiza o periodoFiltragem

};


//const fetchURL = token ? `${process.env.NEXT_PUBLIC_API_URL}/api/customers` : null;
// Lógica do SWR
const { data: clientes, error: isError, isLoading } = useSWR<Cliente[]>(fetchURL ? [fetchURL, token] : null, fetcher, {
  revalidateOnFocus: false,
});


if (!fetchURL) {
  return null;  // Isso pode ser substituído por um fallback ou conteúdo padrão.
}



  async function updateServicePrice(id: string, price: string) {
    if (!newPrice) return
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

        // If the mutation was successful, update the local data without re-fetching
        if (clientes) {
            // Map over the clients and find the service you're updating
            const updatedClientes = clientes.map(client => ({
                ...client,
                  
                servicos: client.servicos.map(servico => 
                    servico.id === serviceId
                    ? { ...servico, selectedProdutPrice: newPrice }
                    : servico
                )
            }));

            // Mutate without re-fetching
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
    <Header />
       <div className='flex  ml-20 mb-5  ' >
        <button className=' w-28  bg-blue-500 text-white rounded-lg'
         onClick={() => setShowReturned(!showReturned)} type={'button'} >
           {showReturned ? 'back. ' : 'Servicos'}
        </button>
        <div className='ml-1'>
          <DateSelector onDateChange={handleDateChange} />  
        </div>
      </div>
      
      <h1 style={{ textAlign: "center", padding: "2%", fontSize: "24px" }}>CUSTOMERS</h1>
    
      <ul>
      {clientes?.map(client => (
      <li key={client.id} style={{ width: "100%" }}>
        <div className="flex bg-blue-500 mt-5 ml-3 mr-3 rounded-t-2xl"  >
          <div style={{ minWidth: "50%", textAlign:"center", paddingTop:"5px" }}>
            <h1 className="text-white" style={{fontSize:"21px"}}>
              {client.nome}
            </h1>
          </div>
          <div style={{  minWidth: "50%", textAlign: "center", paddingTop:"5px"}}>
            <h1 className="text-xl font-semibold text-white ">
              {client.telefone}
            </h1>
          </div>
        </div>
          
            {client.servicos && client.servicos.map(servico => (
             <>
              <div key={servico.id} className="flex bg-white border-t-8 border-blue-500 ml-3 mr-3 p-2 ">
                <div style={{ minWidth: "50%", textAlign: "center" }}>
                  <h2 style={{fontSize:"19px"}}>{servico.selectedProductNane}</h2>
                  <h2 style={{fontSize:"19px"}}>price: {servico.selectedProdutPrice}</h2>
                  <h2 style={{fontSize:"19px"}}>pay: {servico.selectedPayment}</h2>
                </div>
                <div style={{ minWidth: "50%", textAlign: "center" }}>
                <h2 style={{fontSize:"19px"}}>
                  {servico.data && typeof servico.data === 'string' 
                    ? new Date(servico.data).toLocaleDateString('pt-BR') 
                    : 'Data não definida'}
                </h2>
                  <h2 style={{fontSize:"19px"}}>brand: {servico.carro}</h2>
                  <h2 style={{fontSize:"19px"}}>color: {servico.selectedColor}</h2>
                </div>
              </div>


              <div className=' bg-white text-white text-center ml-3 mr-3 p-1 rounded-b-3xl' >
                <input 
                  className=" w-20 text-black p-1 rounded-2xl border border-gray-400" 
                  
                  type="text" 
                  value={newPrice} 
                  onChange={(e) => setNewPrice(e.target.value)} 
                  placeholder="Price" 
                />
                
                <button 
                  className=' bg-blue-500 p-1 rounded-2xl m-2'
                  disabled={!!loadingState[servico.id]} 
                  onClick={() => handleUpdate(servico.id) }>
                    {loadingState[servico.id] ? 'Carregando...' : 'Update'}
                    
                </button>
              </div>
             </> 
            ))}
                       
            {client.Booking && client.Booking.map(book => (
                
              <div key={book.id} className="flex" style={{paddingBottom: "20px" ,marginRight:"2%",  marginLeft:"2%", borderLeft: "1px solid #c2c2c2",   borderRight: "1px solid #c2c2c2", borderBottom: "1px solid #c2c2c2", borderRadius:" 0 0 20px 20px ", }}>
                
                <div  style={{ minWidth: "50%", textAlign: "center" }}>
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
            ))}

          </li>
        ))}
      </ul>

      
  
    </>
  );
}






"use client";
import React, { Key, useEffect, useState } from 'react';

import useSWR, { mutate } from 'swr';
import { useRouter } from "next/navigation";
import Header from '../header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import Spinner from "@/components/Spinner/Spinner";
import { fetcher } from '@/utils/fetcher/fetcher';
import { despesas } from '@prisma/client';


  
  
export default function App() {

  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  

  const [startDate, setStartDate] = useState(() => {
    const start = new Date('2021-07-01T00:00:00');
    return start;
  });
  
  const [endDate, setEndDate] = useState(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return end;
  });
  
  
    useEffect(() => {
      const userToken = localStorage.getItem('token');
      console.log("User Token:", userToken);  // Adicione esta linha para verificar o token

      if (!userToken) {
        alert('O usuário não está logado!');
        router.push("/login");
        return;
      }
      setToken(userToken);
    }, [router]);


  const fetchURL = token ? `${process.env.NEXT_PUBLIC_API_URL}/api/expenses?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}` : null;  
  const { data: monthlyRevenue, error: isError } = useSWR<despesas[]>(fetchURL ? [fetchURL, token] : null, fetcher, {
    revalidateOnFocus: false,
});

  
  const isLoading = !monthlyRevenue && !isError;
  

  console.log('monthlyRevenue:', monthlyRevenue);

  useEffect(() => {
    if (isError) {
        console.log('Error detected:', isError);
        router.push("/login");
    }
  }, [isError, router]);

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
    <div className=' text-center ' >
      <div className='m-5 '>
        <h3 className='bg-blue-500 text-white text-2xl rounded-t-xl pb-1'>Expenses</h3>
        <table className=' w-full' border={1}>
            <tbody>
                {monthlyRevenue?.map(item => (
                    <div className=' flex' key={item.id} >
                        <div className='w-full border  bg-white'
                        style={{ minWidth: "70%", textAlign: "center" }}>
                            <div className=''>
                                <tr>
                                    <td className=' flex flex-col p-4 w-60'>
                                        <div className='bg-white '>{item.nome}</div>
                                        <div>{item.preco !== null ? item.preco.toString() : 'N/A'}</div>
                                        <div>{new Date(item.data).toDateString()}</div>
                                    </td>
                                </tr>
                            </div>
                        </div>   
                        
                        <div className='bg-white border'
                        style={{ minWidth: "30%", textAlign: "center" }}>
                            <tr>
                                <td>
                                    {item.recibo ? (
                                    <a href={item.recibo} target="_blank" rel="noopener noreferrer">
                                        <Image src={item.recibo || '/path/to/fallback/image.jpg'} alt="Recibo" width={150} height={100} />
                                    </a>
                                    ) : (
                                    <span>Sem imagem disponível</span>
                                    )}
                                </td>
                            </tr>
                        </div>
                    </div>
                ))
                }
            </tbody>
        </table>
        <p className=' bg-white pb-3 rounded-b-xl'></p>
    </div>
    <div className='bg-white m-5 rounded-xl ' >
        <h1 className= ' bg-blue-500 text-white text-2xl rounded-t-xl pb-1'>Selecionar Datas</h1>
        <div className='flex justify-center'>
          <label className='m-3 flex-1 flex justify-center' >
            <div>
              <h2 className='text-white'>Início:</h2>
              <DatePicker className=' border-2 w-28 rounded-xl pl-2' selected={startDate} onChange={(date) => setStartDate(date || new Date())} dateFormat="yyyy-MM-dd" />
            </div>
          </label>
          <label className='m-3 flex-1 flex justify-center'>
            <div>
              <h2 className='text-white'>Término:</h2>
              <DatePicker className='border-2 w-28 rounded-xl pl-2' selected={endDate} onChange={(date) => setEndDate(date || new Date())} dateFormat="yyyy-MM-dd" />
            </div>
          </label>
        </div>
        <div className='p-5'>

        </div>
      </div>
    </div>
    <div className='h-96'></div>
    <div className='h-96'></div>
  </>
  
  );
}



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


interface RevenueData {
  totalRevenue: {
    _sum: {
      preco: number;
    };
  };
  detailedData: {
    id: Key | null | undefined;
    nome: string;
    preco: number | null;
    recibo: string;
    data: string;
  }[];
}


  
export default function App() {

  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  
  const [startDate, setStartDate] = useState(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return start;
  });
  const [endDate, setEndDate] = useState(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return end;
  });
  
  
    useEffect(() => {
      const userToken = localStorage.getItem('token');
      if (!userToken) {
        alert('O usuário não está logado!');
        router.push("/login");
        return;
      }
      setToken(userToken);
    }, [router]);


  const fetchURL = token ? `${process.env.NEXT_PUBLIC_API_URL}/api/expenses?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}` : null;  
  const { data: RevenueData, error: isError } = useSWR<RevenueData>(fetchURL ? [fetchURL, token] : null, fetcher, {
    revalidateOnFocus: false,
  });
  
  const isLoading = !RevenueData && !isError;
  
  const [isStartDatePickerFocused, setIsStartDatePickerFocused] = React.useState(false);
  const [isEndDatePickerFocused, setIsEndDatePickerFocused] = React.useState(false);
  

  useEffect(() => {
    if (isError) {
        console.log('Error detected:', isError);
        router.push("/login");
    }
  }, [isError, router]);

  function formatEuro(value: number | null | undefined): string {
    if (value === null || value === undefined) return 'N/A';
    return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(value);
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
    <div className=' text-center  ' >
    <div className=' m-5 rounded-xl border-black border-spacing-2 ' >
      
      <div className='flex justify-center'>
        <label className='flex-1 flex justify-center' >
          <div 
            className={` rounded-xl bg-white  -z-10 ${isStartDatePickerFocused ? 'z-500' : ''}`} 
            >
            <h1 className='bg-blue-500 text-white rounded-xl mt-4 m-2'> Start-Date</h1> 
          <DatePicker 
            className='border-2 w-28 rounded-xl pl-2 m-2'
            selected={startDate} 
            onChange={(date) => setStartDate(date || new Date())} 
            dateFormat="yyyy-MM-dd" 
            onFocus={() => setIsStartDatePickerFocused(true)}
            onBlur={() => setIsStartDatePickerFocused(false)}
          />
          </div>
        </label>
        <label className=' flex-1 flex justify-center'>
          <div 
           className={` rounded-xl bg-white  -z-10 ${isEndDatePickerFocused ? 'z-500' : ''}`} 

          >
          <h1 className='bg-blue-500 text-white rounded-xl mt-4 m-2'> End-Date</h1>
            <DatePicker 
              className='border-2 w-28 rounded-xl pl-2 m-2'
              selected={endDate} 
              onChange={(date) => setEndDate(date || new Date())} 
              dateFormat="yyyy-MM-dd" 
              onFocus={() => setIsEndDatePickerFocused(true)}
              onBlur={() => setIsEndDatePickerFocused(false)}
            />
          </div>
        </label>
      </div>
    </div>
      <div className='m-5'>
        <div>
          <h4 className='bg-blue-500 text-white text-2xl rounded-t-xl pb-1'>Total Expenses</h4>
            <p className='bg-white pb-3 rounded-b-xl'>
              {formatEuro(RevenueData?.totalRevenue?._sum?.preco ?? null)}
            </p>
        </div>
      </div>    
      <div className='m-5 '>
        <h3 className='bg-blue-500 text-white text-2xl rounded-t-xl pb-1'>EXPENSES</h3>
        <table className=' w-full' border={1}>
          <tbody>
            {RevenueData?.detailedData && RevenueData.detailedData.map((item) => (
              <tr key={item.id} className='flex bg-white'>
                <td className='w-full border  text-[20px]' style={{ minWidth: "70%", textAlign: "center" }}>
                  <div>
                    <div className='pt-2 '>{item.preco !== null ? formatEuro(item.preco) : 'N/A'}</div>
                    <div className='pt-3 '>{item.nome}</div>
                    <div className='pt-2 '>{new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(item.data))}</div>
                  </div>
                </td>
                <td className='bg-white border' style={{ minWidth: "30%", textAlign: "center" }}>
                  {item.recibo ? (
                    <a href={item.recibo} target="_blank" rel="noopener noreferrer">
                      <Image src={item.recibo || '/path/to/fallback/image.jpg'} alt="Recibo" width={100} height={100} />
                    </a>
                  ) : (
                    <span>No image available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className=' bg-white pb-3 rounded-b-xl'></p>
      </div>
    </div>
    <div className='h-96'></div>
    <div className='h-96'></div>
  </>
  
  );
}


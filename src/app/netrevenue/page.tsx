"use client";

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from "next/navigation";
import Header from '../header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Spinner from "@/components/Spinner/Spinner"; 
import { fetcher } from '@/utils/fetcher/fetcher';  


interface NetProfit {
    revenue: number;
    expense: number;
    netProfit: number;
  }
  
  interface netProfitData {
    netProfit: NetProfit;
  }
  

export default function NetRevenue() {
    
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

  const fetchURL = token ? `${process.env.NEXT_PUBLIC_API_URL}/api/netrevenue?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}` : null;  
  const { data: netProfitData, error: isError } = useSWR<netProfitData>(fetchURL ? [fetchURL, token] : null, fetcher, { revalidateOnFocus: false });
  const isLoading = !netProfitData && !isError;
  const [isStartDatePickerFocused, setIsStartDatePickerFocused] = React.useState(false);
  const [isEndDatePickerFocused, setIsEndDatePickerFocused] = React.useState(false);
  
  //console.log(typeof netProfitData);
  //console.log(JSON.stringify(netProfitData, null, 2));


  useEffect(() => {
    if (isError) {
        console.log('Error detected:', isError);
    }
  }, [isError, router]);


  if (isLoading) {
    return (
      <div className="flex flex-col items-center mt-10">
        <Spinner />
      </div>
    );
  }

  function formatEuro(value: number | null): string {
    if (value === null) return 'N/A';
    return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(value);
  }
  

  return (
    <>
    <Header />
    <div className='text-center'>
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
        <div className='bg-white m-5 rounded-xl ' >
            <h1 className= ' bg-blue-500 text-white text-2xl rounded-t-xl pb-1'>total balance</h1>
            <div className='flex justify-center'>
                { netProfitData && netProfitData.netProfit && (
                    <div>
                        <p>Revenue: {formatEuro(netProfitData.netProfit.revenue)}</p>
                        <p>Expense: {formatEuro(netProfitData.netProfit.expense)}</p>
                        <p>Net Profit: {formatEuro(netProfitData.netProfit.netProfit)}</p>
                    </div>
                )}
            </div>
        </div>
    </div>
    <div className='h-96'></div>
    <div className='h-96'></div>
    </>
  );
}

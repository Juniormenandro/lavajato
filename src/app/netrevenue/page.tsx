"use client";

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from "next/navigation";
import Header from '../header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Spinner from "@/components/Spinner/Spinner"; 
import { fetcher } from '@/utils/fetcher/fetcher';  
import Link from 'next/link';
import Button from '@/components/Button/Button';



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
      router.push("/");
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
        router.push("/");
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
      <div className='text-2xl text-center mb-5 mr-5 ml-5 font-semibold bg-white p-2 rounded-2xl'>
        <h1>NET REVENUE</h1>
      </div>
      <Link className="mt-10 mr-2 -z-1" href="/revenue" >
        <button type={"button"}  >
         <h1 className=" p-2 bg-white border-4 border-blue-500 font-semibold text-blue-500 rounded-xl">
            REVENUE
          </h1>
        </button>
      </Link>
      <Link className="mt-10 -z-1" href="/expenses" >
        <button type={"button"} >
          <h1 className=" p-2 bg-white border-4 border-blue-500 font-semibold text-blue-500 rounded-xl">
            EXPENSES
          </h1>
        </button>
      </Link>
      
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
            <h1 className= ' bg-white text-2xl border-b-2 rounded-t-xl pb-1'>total balance</h1>
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

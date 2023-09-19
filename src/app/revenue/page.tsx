
"use client";
import React, { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { useRouter } from "next/navigation";
import Header from '../header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Spinner from "@/components/Spinner/Spinner";
import { fetcher } from '@/utils/fetcher/fetcher';
import Link from 'next/link';


interface RevenueData {
  
      monthlyRevenue: {
        selectedProductNane: string; 
        selectedPayment: string;
        _sum: {
          rawPrice: number;
        };
      }[];


    totalMonthlyRevenue: {
      selectedPayment: string;
      _sum: {
        rawPrice: number;
      };
    }[];

    paymentSummaries?: {
      paymentMethod: string;
      total: number;
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
      router.push("/");
      return;
    }
    setToken(userToken);
  }, [router]);

    const [isStartDatePickerFocused, setIsStartDatePickerFocused] = React.useState(false);
    const [isEndDatePickerFocused, setIsEndDatePickerFocused] = React.useState(false);
    
  const fetchURL = token ? `${process.env.NEXT_PUBLIC_API_URL}/api/revenue?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}` : null;  
  
  const { data: RevenueData, error: isError, isLoading } = useSWR<RevenueData>(fetchURL ? [fetchURL, token] : null, fetcher, {
    revalidateOnFocus: false,
   });


  useEffect(() => {
    if (isError) {
        console.log('Error detected:', isError);
        router.push("/");
    }
  }, [router]);

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
      <div className='text-2xl text-center mr-5 ml-5 mb-5 font-semibold bg-white p-2 rounded-2xl'>
        <h1>REVENUE</h1>
      </div>
      <Link className="mt-10 mr-2 -z-1" href="/netrevenue" >
          <button type={"button"}  >
            <h1 className=" p-2 bg-white border-4 border-blue-500 font-semibold text-blue-500 rounded-xl">
              NET-REVENUE
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
      <div className='m-5 '>
          <h3 className='bg-white border-b-2 text-2xl rounded-t-xl pb-1'>Receita</h3>
          <table className=' w-full' border={1}>
            <tbody className=''>
              {RevenueData?.monthlyRevenue.map((item: { selectedProductNane: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; selectedPayment: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; _sum: { rawPrice: number; }; }, index: React.Key | null | undefined) => (
              <>
              <tr className='' key={index}>
                <td className='bg-white m-1 pt-3'>{item.selectedProductNane}</td>
                <td className='bg-white m-1 '>{item.selectedPayment}</td>
              </tr>
              <tr>
              <td className='bg-white m-1 border-b-2  '></td>
              <td className='bg-white m-1 border-b-2 '>{(item._sum.rawPrice / 100).toFixed(2)}€</td>
              </tr>
              </>
              ))}
            </tbody>
          </table>
          <p className=' bg-white  pb-3 rounded-b-xl'></p>
        </div>
        <div className='m-5'>
          <div>
            <h4 className='bg-white border-b-2 text-2xl rounded-t-xl pb-1'>Receita Total</h4>
            {RevenueData?.totalMonthlyRevenue.map((item: { selectedPayment: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; _sum: { rawPrice: number; }; }, index: React.Key | null | undefined) => (
            <p className='bg-white pb-2 border-b-2' key={index}>{item.selectedPayment}: {(item._sum.rawPrice / 100).toFixed(2)}€
            </p>
            ))}
            <p className=' bg-white pb-3 rounded-b-xl'></p>
          </div>
        </div>
    </div>
    <div className='h-96'></div>
    <div className='h-96'></div>
  </>
  
  );
}


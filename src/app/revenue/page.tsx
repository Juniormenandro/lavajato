"use client";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Button from '@/components/Button/Button';
import Header from '../header';

interface RevenueData {
    weeklyRevenue: {
        selectedProductNane: string; // Corrigido aqui
        selectedPayment: string;
        _sum: {
          rawPrice: number;
        };
      }[];

      monthlyRevenue: {
        selectedProductNane: string; // E aqui
        selectedPayment: string;
        _sum: {
          rawPrice: number;
        };
      }[];

    totalWeeklyRevenue: {
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
  
  

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null);

  const [loading, setLoading] = useState(false);

  const getRevenueData = async () => {
    try {
        setLoading(true);
        const response = await axios.get('/api/revenue', {
        params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        },
        });
        
        setRevenueData(response.data);
    } catch (error) {
        console.error('Erro ao buscar dados de receita:', error);
    } finally {
        setLoading(false);
    }
    };



  const renderRevenueData = () => {

    if (loading) {
        return <div>Carregando...</div>;
      }

      
    if (!revenueData) {
      return <div>Nenhum dado disponível</div>;
    }



    return (
        <div>
          <h2>Dados de Receita</h2>
          <pre>{JSON.stringify(revenueData, null, 2)}</pre>
          <div>
            <h3>Resumo de Pagamentos</h3>
            <table border={1}>
              <thead>
                <tr>
                  <th>Forma de Pagamento</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {revenueData.paymentSummaries?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.paymentMethod}</td>
                    <td>{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    };


  return (
  <>
  <Header />
    <div className=' text-center ' >
      <div className='m-5'>
          <h3 className='bg-gray-900 text-2xl rounded-t-xl pb-1'>Receita</h3>
          <table border={1}>
            <tbody>
              {revenueData?.monthlyRevenue.map((item, index) => (
              <tr key={index}>
                <td className='bg-gray-800 m-1 text-white w-60 pb-2'>{item.selectedProductNane}</td>
                <td className='bg-gray-800 m-1 text-white w-40'>{item.selectedPayment}</td>
                <td className='bg-gray-800 m-1 text-white w-40'>{item._sum.rawPrice}</td>
              </tr>
              ))}
            </tbody>
          </table>
          <p className=' bg-gray-800 pb-3 rounded-b-xl'></p>
        </div>
        <div className='m-5'>
          <div>
            <h4 className='bg-gray-900 text-2xl rounded-t-xl pb-1'>Receita Total</h4>
            {revenueData?.totalMonthlyRevenue.map((item, index) => (
            <p className='bg-gray-800 pb-2  text-white' key={index}>{item.selectedPayment}: {item._sum.rawPrice}</p>
            ))}
            <p className=' bg-gray-800 pb-3 rounded-b-xl'></p>
          </div>
        </div>
      <div className='bg-gray-800 m-5 rounded-xl ' >
        <h1 className= ' bg-gray-900 text-2xl rounded-t-xl pb-1'>Selecione o Intervalo de Datas</h1>
        <div className='flex justify-center'>
          <label className='mt-2 ml-10 mr-5 flex-1 flex justify-center' >
            <div>
              <h2 className='text-white'>Data de início:</h2>
              <DatePicker className=' w-36 rounded-xl p-1' selected={startDate} onChange={(date) => setStartDate(date || new Date())} dateFormat="yyyy-MM-dd" />
            </div>
          </label>
          <label className='mt-2 ml-5 mr-5 flex-1 flex justify-center'>
            <div>
              <h2 className='text-white'>Data de término:</h2>
              <DatePicker className=' w-36 rounded-xl p-1' selected={endDate} onChange={(date) => setEndDate(date || new Date())} dateFormat="yyyy-MM-dd" />
            </div>
          </label>
        </div>
        <div className='p-5'>
          <Button onClick={getRevenueData} type={'button'} isLoading={false}>Obter Dados de Receita</Button>
        </div>
      </div>
    </div>
    <div className='h-96'></div>
    <div className='h-96'></div>
  </>
  
  );
}

export default App;

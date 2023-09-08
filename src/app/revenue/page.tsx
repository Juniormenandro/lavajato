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
      <div className='m-5 '>
          <h3 className='bg-blue-500 text-white text-2xl rounded-t-xl pb-1'>Receita</h3>
          <table className=' w-full' border={1}>
            <tbody className=''>
              {revenueData?.monthlyRevenue.map((item, index) => (
              <>
              <tr className='' key={index}>
                <td className='bg-white m-1 pt-2'>{item.selectedProductNane}</td>
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
          <p className=' bg-white pb-3 rounded-b-xl'></p>
        </div>
        <div className='m-5'>
          <div>
            <h4 className='bg-blue-500 text-white text-2xl rounded-t-xl pb-1'>Receita Total</h4>
            {revenueData?.totalMonthlyRevenue.map((item, index) => (
            <p className='bg-white pb-2 border-b-2' key={index}>{item.selectedPayment}: {(item._sum.rawPrice / 100).toFixed(2)}€
            </p>
            ))}
            <p className=' bg-white pb-3 rounded-b-xl'></p>
          </div>
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

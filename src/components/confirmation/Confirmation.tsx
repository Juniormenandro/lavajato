"use client";
// pages/confirmationPage.js
import Head from 'next/head';
import useLocalStorage from '@/hooks/useLocalStorage/useLocalStorage';
import { bookingDataInitialState } from '@/constants';
import { BookingType } from '@/app/form/page';
import { useEffect, useState } from 'react';


  const Confirmation = () => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [booking, setBooking] = useState('');
    const [id, setId] = useState('');
    const [formattedDate, setFormattedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [bookingData, setBookingData] = useLocalStorage(
      "booking_step",
      bookingDataInitialState as BookingType
    );
  
    useEffect(() => {
        // Recuperar os dados armazenados no localStorage
        const storedData = localStorage.getItem('bookingDetails');
        if (storedData) {
          // Converter a string JSON recuperada para um objeto JavaScript
          const responseData = JSON.parse(storedData);
          
          // Verificar se responseData contém a propriedade 'service' e se 'service' contém a propriedade 'id'
          if (
            responseData && responseData.service
            && responseData.service.id
            && responseData.service.formattedDate
            && responseData.service.selectedTime
            ) {
            // Atualizar o estado com o 'id' recuperado
            setId(responseData.service.id);
            setFormattedDate(responseData.service.formattedDate);
            setSelectedTime(responseData.service.selectedTime)
          }
        }
      }, []); 
      
      
      console.log(id, formattedDate,  selectedTime, 'dados do booking')

    const home = () =>{
      setBookingData(bookingDataInitialState);
      localStorage.clear();
    }
    // Verifica se id não é nulo antes de renderizar o conteúdo
    if (id === null) {
      return <div>Carregando detalhes do agendamento...</div>;
    }
  
  return (
    <div className="bg-gray-50/90 mx-3 flex flex-col items-center justify-center">
      <Head>
        <title>Confirmação de Agendamento</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      </Head>

      <div className="max-w-xl mx-auto px-4 py-8">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Obrigado pelo seu agendamento!</h1>
        </header>
        <main className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Detalhes do Agendamento</h2>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Seu agendamento foi confirmado com sucesso. Aqui estão os detalhes:</p>
            </div>
            <ul className="mt-3 list-disc list-inside text-sm text-gray-700">
              <li>Hora: [{selectedTime}]</li>
              <li>Data: [{formattedDate}]</li>
              <li>Número de Confirmação: [{id}]</li>
            </ul>
            <div className="mt-5">
              <p>Para qualquer dúvida ou alteração, entre em contato pelo e-mail junior@donejobs.com ou telefone (087) 476-2708.</p>
            </div>
          </div>
          <div className="px-4 py-4 sm:px-6 flex justify-center gap-4">
            <a href="/" onClick={home} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Voltar à Página Inicial
            </a>
            <a href="/minha-conta" className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Minha Conta
            </a>
          </div>
        </main>
        <footer className="text-center mt-6 text-sm text-gray-600">
          <p>Para mais informações, visite nossa <a href="/faq" className="text-blue-600 hover:text-blue-700">FAQ</a> ou nossa <a href="/contato" className="text-blue-600 hover:text-blue-700">página de contato</a>.</p>
        </footer>
      </div>
    </div>
  );
}




export default Confirmation;
"use client";

import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Header from "@/components/home/Header/HeaderPag";
import useLocalStorage from "@/hooks/useLocalStorage/useLocalStorage";
import { bookingDataInitialState } from "@/constants";
import SelectionSteps from "@/components/form/SelectionSteps/SelectionSteps";
import StepButton from "@/components/form/StepButton/StepButton";
import useGetTime from "@/hooks/useGetTime/useGetTime";
import Spinner from "@/components/form/Spinner/Spinner";
import Confirmation from "@/components/confirmation/Confirmation";

export type ProductType = {
  id: string;
  name: string;
  price: string;
  default_price: string;
  raw_price: 0;
};

interface Cliente {
  iercode: string;
  endereco: string;
  id: string;
  name: string;
  telefone: string;
  Booking: Booking[];
};
interface Booking {
  selectedPayment: string;
  selectedProductName: string;
  rawPrice:0;
  id: string;
  selectedDayOfWeek: React.ReactNode;
  selectedDate: number | string;
  selectedMonth: React.ReactNode;
  selectedYear: React.ReactNode;
  selectedTime: React.ReactNode;
  selectedProductDefaultPrice: React.ReactNode;

};

export type BookingType = typeof bookingDataInitialState;

const BookingPage: NextPage = () => {
  const [name, setName] = useState("");
  const [telefone, setTelefone] = useState(""); 
  const [iercode, setIercode] = useState(""); 
  const [endereco, setEndereco] = useState(""); 
  const [id, setId] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [checkoutIsLoading, setIsCheckoutLoading] = useState<boolean>(false);
  const dates = useGetTime();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const checkoutError = searchParams?.get("error");

  const [bookingData, setBookingData] = useLocalStorage(
    "booking_step",
    bookingDataInitialState as BookingType
  );


  useEffect(() => {
    const nameUsuario = localStorage.getItem('categiraId');
    const image = localStorage.getItem('image');
      if (nameUsuario) { setId(nameUsuario) }
      if(image) { setImage(image)} 
    }, [id, image]);
  
  useEffect(() => {
    setBookingData(prevData => ({ ...prevData,
      iercode:iercode, name:name, telefone:telefone, endereco:endereco,
    }));
  }, [iercode,name,telefone,endereco]);

  useEffect(() => {
    if (checkoutError) {
      alert(checkoutError);
    }
  }, [checkoutError, router]);
  


  const handleBuyProduct = async () => {
    setIsCheckoutLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clientesServicos`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({booking: {...bookingData}})
      });

      if (!response.ok) throw new Error('Falha no agendamento');
      
      const responseData = await response.json(); // Dados completos da resposta
      console.log(responseData, 'Dados completos do cliente');
  
      // Armazenar os dados completos no localStorage
      // Nota: localStorage só armazena strings, então precisamos converter o objeto para string
      localStorage.setItem('bookingDetails', JSON.stringify(responseData));
      localStorage.setItem('book', confirmation.toString());

      setConfirmation(true);
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Ocorreu um erro desconhecido.");
    } finally {
      setIsCheckoutLoading(false);
    }
  };
  

  if (checkoutIsLoading)
  return (
    <div className="relative bg-fixed  bg-center bg-cover min-h-[100vh] flex justify-center items-center" style={{ backgroundImage: `url('${image}')` }}>
      <div className="flex flex-col items-center bg-black/20 rounded-xl  p-10">
        <Spinner></Spinner>
      </div>
    </div>
  );
  if (confirmation)
  return (
    <div className="relative bg-center bg-cover min-h-[100vh] flex justify-center items-center" style={{ backgroundImage: `url('${image}')` }}>
      <Confirmation />
    </div>
  );




  return (
    <div className="relative bg-fixed  bg-center bg-cover min-h-[100vh] flex flex-col justify-center items-center" style={{ backgroundImage: `url('${image}')` }}>
      <Header />
      <Toaster position="top-center" />
        <div className=" w-2/3 rounded-lg items-center mt-24" >
          <div className="flex justify-center bg-white/90 rounded-lg py-1 text-xl mb-10 mx-12">
            <label>
              {!bookingData.step && "select the date!"}
              {bookingData.step === 1 && "Select your time!"}
              {bookingData.step === 2 && "Select your payment!"}
              {bookingData.step === 3 && "Your contact details!"}
            </label>
          </div>
          <div className="flex flex-col justify-center min-h-[55vh] gap-4 mb-10 mx-12">
            <SelectionSteps
              step={bookingData.step}
              bookingData={bookingData}
              setBookingData={setBookingData}
              dates={dates}
              name={name}
              setName={setName}
              telefone={telefone}
              setTelefone={setTelefone}
              iercode={iercode}
              setIercode={setIercode}
              endereco={endereco}
              setEndereco={setEndereco}
            />
          </div>
          <div className="mx-12">
            <StepButton
              step={bookingData.step}
              checkoutIsLoading={checkoutIsLoading}
              selectedProductId={bookingData.selectedProductId}
              formattedDate={bookingData.formattedDate}
              selectedTime={bookingData.selectedTime}
              selectedPayment={bookingData.selectedPayment}
              name={bookingData.name}
              telefone={bookingData.telefone}
              iercode={bookingData.iercode}
              endereco={bookingData.endereco}
              bookingData={bookingData}
              setBookingData={setBookingData}
              handleBuyProduct={handleBuyProduct}
            />
          </div>

        </div>
      </div>
  );
};

export default BookingPage;

"use client";

import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
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

export type BookingType = typeof bookingDataInitialState;

const BookingPage: NextPage = () => {
  const [name, setName] = useState("");
  const [telefone, setTelefone] = useState(""); 
  const [iercode, setIercode] = useState(""); 
  const [endereco, setEndereco] = useState(""); 
  const [id, setId] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState("");
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
    if (nameUsuario) {
      setId(nameUsuario)
    }
    if(image) {
      setImage(image)
    } 
  }, [id, image]);
  

  useEffect(() => {
    setBookingData(prevData => ({
      ...prevData,
      iercode:iercode, name:name, telefone:telefone, endereco:endereco,
    }));
  }, [iercode,name,telefone,endereco]);



  useEffect(() => {
    if (checkoutError) {
      alert(checkoutError);
      //setBookingData(bookingDataInitialState);
      //localStorage.clear();
     // router.push("/");
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
  
      // Atualizar o estado com os dados completos para uso posterior
      // Supondo que você tenha um estado chamado bookingDetails
      setBookingDetails(responseData); // Este estado deve ser definido com useState no seu componente
      setConfirmation(true);
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Ocorreu um erro desconhecido.");
    } finally {
      setIsCheckoutLoading(false);
    }
  };
  



  useEffect(() => {
    console.log("bookingData atualizado:", bookingData);
    console.log("bookingDetails:", bookingDetails);
  }, [bookingData]);
  
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
    <div className="relative bg-fixed  bg-center bg-cover min-h-[100vh] flex justify-center items-center" style={{ backgroundImage: `url('${image}')` }}>
      <Header />
      <div className=" flex flex-col items-center mt-16 mb-36">
        <Toaster position="top-center" />
          <div className=" w-80  rounded-lg  ">
          <h2 className="mb-8 text-3xl text-center">Book Now!</h2>
          <div className="mb-4 ">
            <label className="block mb-2">
              {!bookingData.step && "Select your Date:"}
              {bookingData.step === 1 && "Select your time:"}
              {bookingData.step === 2 && "Select your payment:"}
              {bookingData.step === 3 && ""}
            </label>
            <div className="flex flex-col gap-4 ">
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
          </div>
          <div className="fixed-bottom px-4 pt-4 bg-white/95 z-30 text-center">
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
              handleBuyProduct={handleBuyProduct}         />
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingPage;

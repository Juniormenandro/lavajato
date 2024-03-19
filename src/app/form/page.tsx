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
    const [placa, setPlaca] = useState(""); 
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);

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
    console.log("bookingData atualizado:", bookingData);
  }, [bookingData]);
  

  useEffect(() => {
    setBookingData(prevData => ({
      ...prevData,
      placa:placa, name:name, telefone:telefone,
    }));
  }, [placa,name,telefone]);

  const [checkoutIsLoading, setIsCheckoutLoading] = useState<boolean>(false);
  const dates = useGetTime();
  const searchParams = useSearchParams();
  const router = useRouter();

  const checkoutError = searchParams?.get("error");
  useEffect(() => {
    if (checkoutError) {
      alert(checkoutError);
      router.push("/");
    }
  }, [checkoutError, router]);



  const handleBuyProduct = async (id: string, updatedData: any): Promise<void> => {
    
    try {
      setIsCheckoutLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clientesServicos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking: {
            ...bookingData,
          },
        }),
      });
      router.push("/");

    } catch (error: any) {
      setIsCheckoutLoading(false);
      alert(`An error occured`);
      console.log(error);
    }
  };

  


  return (
    <div className="relative bg-fixed  bg-center bg-cover min-h-[100vh] flex justify-center items-center" style={{ backgroundImage: `url('${image}')` }}>
      <Header />
      <div className=" flex flex-col items-center mt-16 mb-36">
        <Toaster position="top-center" />
          <div className=" w-80  rounded-lg  ">
          <h2 className="mb-8 text-3xl text-center">Book Now!</h2>
          <div className="mb-4 ">
            <label className="block mb-2">
              {!bookingData.step && "Select your payment:"}
              {bookingData.step === 1 && "Select your time:"}
              {bookingData.step === 2 && ""}
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
                placa={placa}
                setPlaca={setPlaca}
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
              placa={bookingData.placa}
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

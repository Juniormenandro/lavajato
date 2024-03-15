"use client";

import SelectionSteps from "@/components/form/SelectionSteps/SelectionSteps";
import Spinner from "@/components/form/Spinner/Spinner";
import StepButton from "@/components/form/StepButton/StepButton";
import { bookingDataInitialState } from "@/constants";
import useLocalStorage from "@/hooks/useLocalStorage/useLocalStorage";
import { fetcher } from "@/utils/fetcher/fetcher";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import useSWR from "swr";


 

export type ProductType = {
  id: string;
  name: string;
  price: string;
  default_price: string;
  raw_price: 0;
};

export type BookingType = typeof bookingDataInitialState;

const BookingPage: NextPage = () => {
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState(""); 
    const [placa, setPlaca] = useState(""); 
    const [bookingData, setBookingData] = useLocalStorage(
        "booking_step",
        bookingDataInitialState as BookingType
    );

  /*
  useEffect(() => {
    console.log("bookingData atualizado:", bookingData);
  }, [bookingData]);
  */

  const [checkoutIsLoading, setIsCheckoutLoading] = useState<boolean>(false);
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
      router.push("/producao");

    } catch (error: any) {
      setIsCheckoutLoading(false);
      alert(`An error occured`);
      console.log(error);
    }
  };


return (
  <>
 
    <div className="flex flex-col items-center min-h-screen p-10 bg-white ">
            <Toaster position="top-center" />

          <div className="w-full max-w-lg">
        <h2 className="mb-8 text-3xl text-center">Book Now!</h2>
        <div className="mb-4">
          <label className="block mb-2">
            {!bookingData.step && "Select your payment:"}
            {bookingData.step === 1 && "Select your time:"}
            {bookingData.step === 2 && ""}
          </label>
          <div className="flex flex-col gap-4">
            <SelectionSteps
              step={bookingData.step}
              bookingData={bookingData}
              setBookingData={setBookingData}
              nome={nome}
              setNome={setNome}
              telefone={telefone}
              setTelefone={setTelefone}
              placa={placa}
              setPlaca={setPlaca}
            />
          </div>
        </div>
        <StepButton
            step={bookingData.step}
            checkoutIsLoading={checkoutIsLoading}
            selectedProductId={bookingData.selectedProductId}
            selectedPayment={bookingData.selectedPayment}
            selectedTime={bookingData.selectedTime}
            bookingData={bookingData}
            setBookingData={setBookingData}
            handleBuyProduct={handleBuyProduct}
         />
      </div>
    </div>
  </>
);
};

export default BookingPage;

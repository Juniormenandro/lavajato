"use client";

import SelectionSteps from "@/components/SelectionSteps/SelectionSteps";
import Spinner from "@/components/Spinner/Spinner";
import StepButton from "@/components/StepButton/StepButton";
import { bookingDataInitialState } from "@/constants";
import useLocalStorage from "@/hooks/useLocalStorage/useLocalStorage";
import { fetcher } from "@/utils/fetcher/fetcher";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import useSWR from "swr";
import Header from "./header";



export type ProductType = {
  id: string;
  name: string;
  price: string;
  default_price: string;
  raw_price: string;
};

export type BookingType = typeof bookingDataInitialState;

const BookingPage: NextPage = () => {
  
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState(""); 
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      setToken(userToken);
    }
  }, []);
  
  const { data, error, isLoading } = useSWR<ProductType[]>([
    `${process.env.NEXT_PUBLIC_API_URL}/api/getprices`, token],
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const [bookingData, setBookingData] = useLocalStorage(
    "booking_step",
    bookingDataInitialState as BookingType
  );

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
      //console.log(error);
    }
  };

  if (error)
    return (
      <div className="flex flex-col items-center mt-10">
        <h1>Error loading page...</h1>
      </div>
    );

  if (isLoading || checkoutIsLoading)
    return (
      <div className="flex flex-col items-center mt-10">
        <Spinner />
      </div>
    );

return (
  <>
  <Header></Header>
    <div className="flex flex-col items-center min-h-screen p-10  ">
            <Toaster position="top-center" />

          <div className="w-full max-w-lg">
        <h2 className="mb-8 text-3xl text-center">Book Now!</h2>
        <div className="mb-4">
          <label className="block mb-2">
            {!bookingData.step && "Select your service:"}
            {bookingData.step === 1 && "Enter your name and phone number:"}
            {bookingData.step === 2 && "Select your payment:"}
            {bookingData.step === 3 && "Select your time:"}
            {bookingData.step === 4 && "Enter your car Model:"}
            {bookingData.step === 5 && "Enter your car Color:"}
          
            
          </label>
          <div className="flex flex-col gap-4">
            <SelectionSteps
              step={bookingData.step}
              data={data}
              bookingData={bookingData}
              setBookingData={setBookingData}
              nome={nome}
              setNome={setNome}
              telefone={telefone}
              setTelefone={setTelefone}
            />
          </div>
        </div>
        <StepButton
          step={bookingData.step}
          checkoutIsLoading={checkoutIsLoading}
          selectedProductId={bookingData.selectedProductId}
          selectedTime={bookingData.selectedTime}
          selectedModel={bookingData.selectedModel}
          selectedColor={bookingData.selectedColor} 
          selectedPayment={bookingData.selectedPayment}
          setBookingData={setBookingData}
          handleBuyProduct={handleBuyProduct}
          nome={nome}
          telefone={telefone}
          bookingData={bookingData}
        />
      </div>
    </div>
  </>
);


};

export default BookingPage;

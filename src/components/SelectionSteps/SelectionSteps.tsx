import { BookingType, ProductType } from "@/app/page";
import Selector from "@/components/Selector/Selector";
import useGetTime from "@/hooks/useGetTime/useGetTime";

import { useState } from 'react';
import React, { Dispatch, SetStateAction } from 'react';


const availableTimeSlots = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
];

const availablePaymentSlots = [
  "CASH",
  "REVOLUT",
  "ONLINE",
  
];

const availableModelSlots = [
  "BMW",
  "AUDI",
  "FORD",
  "VW",
  "TOYOTA",
  "VOLVO",
  "KIA",
  "DARCIA",
  "PEUGEOT",
  "OTHERS"

];

const availableColorSlots = [
  "black",
  "white",
  "gray",
  "silver",
  "blue",
  "red",
  "outros",
];


type SelectionStepsProps = {
  step: number;
  data?: ProductType[];
  
  bookingData: BookingType;
  setBookingData: (newState: BookingType) => void;
  nome: string;
  setNome: React.Dispatch<React.SetStateAction<string>>;
  telefone: string;
  setTelefone: React.Dispatch<React.SetStateAction<string>>;
};

type ServiceType = {
  id: string;
  name: string;
  price: string;
};


const availableServices: ServiceType[] = [
  // Substitua isso pelos seus serviços reais
  { id: "1", name: "Service 1", price: "100" },
  { id: "2", name: "Service 2", price: "200" },
  { id: "3", name: "Service 3", price: "300" },
];


const SelectionSteps: React.FC<SelectionStepsProps> = ({
  
  step,
  data,
  bookingData,
  setBookingData,
  nome,
  setNome,
  telefone,
  setTelefone,
  
}) => {

  switch (step) {
    case 0:
      return data?.map((product) => (
        <Selector
          key={product.id}
          item={product.id}
          selectedItem={bookingData.selectedProductId}
          onClick={() =>
            setBookingData({
              ...bookingData,
              selectedProductId: product.id,
              selectedProductNane: product.name,
              selectedProdutPrice: product.price,
              selectedProductDefaultPrice: product.default_price,
              rawPrice: product.raw_price,
            })
          }
        >
          <strong>{product.name}</strong>
          <p>{product.price}</p>
        </Selector>
      ));
      case 1:
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          
          setBookingData({
            ...bookingData,
            nome,
            telefone,
          });
        };
        return (

        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            <input 
              style={{width:"100%", padding:"5px",  border: "1px solid #2F6B90", borderRadius:"10px", fontSize:"18px" }}
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="NAME"
            />
          </label>
          <input
            style={{width:"100%", padding:"5px",  border: "1px solid #2F6B90", borderRadius:"10px", fontSize:"18px" }}
            className="block mb-2"
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="PHONE"
          />
        </form>


        );
        case 2:
      return availableTimeSlots.map((timeSlot) => (
        <Selector
          key={timeSlot}
          item={timeSlot}
          selectedItem={bookingData.selectedTime}
          onClick={() =>
            setBookingData({
              ...bookingData,
              selectedTime: timeSlot,
            })
          }
        />
      ));
      case 3:
      return availablePaymentSlots.map((PaymentSlot) => (
        <Selector
          key={PaymentSlot}
          item={PaymentSlot}
          selectedItem={bookingData.selectedPayment}
          onClick={() =>
            setBookingData({
              ...bookingData,
              selectedPayment: PaymentSlot,
            })
          }
        />
      ));
      case 4:
      return availableModelSlots.map((ModelSlots) => (
        <Selector
          key={ModelSlots}
          item={ModelSlots}
          selectedItem={bookingData.selectedModel}
          onClick={() =>
            setBookingData({
              ...bookingData,
              selectedModel:ModelSlots,
            })
          }
        />
      ));
  
      case 5:
      return availableColorSlots.map((ColorSlots) => (
        <Selector
          key={ColorSlots}
          item={ColorSlots}
          selectedItem={bookingData.selectedColor}
          onClick={() =>
            setBookingData({
              ...bookingData,
              selectedColor:ColorSlots,
            })
          }
        />
      ));
   
  
  default:
    return null;
}
}
export default SelectionSteps;
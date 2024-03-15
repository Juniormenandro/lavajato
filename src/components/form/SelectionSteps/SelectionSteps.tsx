import { BookingType ,ProductType } from '@/app/form/page';
import React from 'react';
import Selector from '../Selector/Selector';
import TextInputSelector from '../TextInputSelector/TextInputSelector';


const availableTimeSlots = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM", 
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
];
const availablePaymentSlots = [
  "CASH",
  "REVOLUT",
  "ONLINE",
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
  placa: string;
  setPlaca: React.Dispatch<React.SetStateAction<string>>;
};

const SelectionSteps: React.FC<SelectionStepsProps> = ({
  step,
  bookingData,
  setBookingData,
  nome,
  setNome,
  telefone,
  setTelefone,
  placa,
  setPlaca,
  
}) => {

  let content: JSX.Element | JSX.Element[] | null = null;

  switch (step) {
   
    case 0:
      content = availablePaymentSlots.map((PaymentSlot) => (
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
      break;
    case 1:
      content = availableTimeSlots.map((timeSlot) => (
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
      break;
      case 2:
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
  
          setBookingData({
            ...bookingData,
            nome,
            telefone,
            placa
          });
        };
        content = (
          <form onSubmit={handleSubmit}>
            <TextInputSelector
              key="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Type here..." 
              label={'Type Your Name"'}           
            />
            <TextInputSelector
              key="telefone"
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Type here..." 
              label={'Type Your Telefone"'}           
            />
            <TextInputSelector
              key="placa"
              type="text"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
              placeholder="Type here..." 
              label={'Type Your Placa"'}           
            />
          </form>
        );
      break;
   
    default:
      break;
  }

  return (
    <>
      {content}
    </>
  );
};

export default SelectionSteps;



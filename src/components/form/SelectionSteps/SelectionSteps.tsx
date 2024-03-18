import { BookingType ,ProductType } from '@/app/form/page';
import useGetTime from '@/hooks/useGetTime/useGetTime';
import React from 'react';
import Selector from '../Selector/Selector';
import TextInputSelector from '../TextInputSelector/TextInputSelector';



const availableTimeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
];

const availablePaymentSlots = [
  "CASH",
  "CARD"
];



type SelectionStepsProps = {
  step: number;
  
  dates: ReturnType<typeof useGetTime>;
  bookingData: BookingType;
  setBookingData: (newState: BookingType) => void;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  telefone: string;
  setTelefone: React.Dispatch<React.SetStateAction<string>>;
  placa: string;
  setPlaca: React.Dispatch<React.SetStateAction<string>>;
};

const SelectionSteps: React.FC<SelectionStepsProps> = ({
  step,
  
  dates,
  bookingData,
  setBookingData,
  name,
  setName,
  telefone,
  setTelefone,
  placa,
  setPlaca,
  
}) => {

  let content: JSX.Element | JSX.Element[] | null = null;

  switch (step) {
    case 0:
      return dates.map((date) => (
        <Selector
          key={date.formattedDate}
          item={date.formattedDate}
          selectedItem={bookingData.formattedDate}
          onClick={() =>
            setBookingData({
              ...bookingData,
              ...date,
            })
          }
        />
      ));

    case 1:
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
   
      case 2:
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
  
          setBookingData({
            ...bookingData,
            name,
            telefone,
            placa
          });
        };
        content = (
          <form onSubmit={handleSubmit}>
            <TextInputSelector
              key="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
      case 3:
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



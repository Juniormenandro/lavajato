import { BookingType ,ProductType } from '@/app/form/page';
import React from 'react';
import Selector from '../Selector/Selector';
import TextInputSelector from '../TextInputSelector/TextInputSelector';
import Service from '@/components/Service/Service';

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
};

const SelectionSteps: React.FC<SelectionStepsProps> = ({
  step,
  bookingData,
  setBookingData,
  
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
  content = (
    <form>
      <TextInputSelector
        label="Type Your Name"
        value={bookingData.nome}
        onClick={() => setBookingData}
          
        placeholder="Type here..."
      />
      <TextInputSelector
        label="Enter Your Phone Number"
        type="number"
        value={bookingData.telefone}
        onClick={() => setBookingData}
        placeholder="Type here..."
      />
      <TextInputSelector
        label="Car Plate Number"
        value={bookingData.placa}
        onClick={() => setBookingData}
        placeholder="Type here..."
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

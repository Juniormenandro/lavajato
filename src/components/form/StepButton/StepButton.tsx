import { BookingType } from "@/app/form/page";
import Button from "../Button/Button";
import { bookingDataInitialState } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



type StepButtonProps = {
  step: number;
  checkoutIsLoading: boolean;
  selectedProductId: string;
  selectedTime: string;
  selectedPayment: string;
  formattedDate: string;


  setBookingData: (data: BookingType) => void;
  handleBuyProduct: (id: string, updatedData: any) => Promise<void>;
  name: string; 
  telefone: string; 
  iercode: string;
  endereco: string;
  bookingData: BookingType;
  
};


const StepButton: React.FC<StepButtonProps> = ({
  step,
  checkoutIsLoading,
  selectedProductId,
  formattedDate,
  selectedPayment,
  selectedTime,
  bookingData,
  setBookingData,
  handleBuyProduct,
  name,
  telefone, 
  iercode,
  endereco,
 
 
  
}) => {


  const router = useRouter();


  const handleContinue = () => {
    if (step === 1) {
      setBookingData({
        ...bookingData,
        name,
        telefone,
        iercode,
        endereco,
        step: bookingData.step + 1,
      });
    } else {
      setBookingData({
        ...bookingData,
        step: bookingData.step + 1
      });
    }
  };


  const finishBooking = () => {
    
    setBookingData(bookingDataInitialState);
    handleBuyProduct(selectedProductId, bookingData);
  };
  return (
    <>
      {step === 0 && (
        <Button
          type="button"
          isLoading={false}
          disabled={!formattedDate}
          onClick={handleContinue}
        >
          Continue
        </Button>
      )}

      {step === 1 && (
        <Button
          type="button"
          isLoading={false}
          disabled={!selectedTime}
          onClick={handleContinue}
        >
          Continue
        </Button>
      )}
      {step === 2 && (
        <Button
        type="button"
        isLoading={false}
        disabled={!selectedPayment || checkoutIsLoading}
        onClick={handleContinue}
        >
          Continue
        </Button>
      )}
      {step === 3 && (
        <Button
          type="button"
          isLoading={false}
          disabled={!selectedPayment || checkoutIsLoading}
          onClick={finishBooking}
        >
         Book
        </Button>
      )}
    

<br/><br/>
{step >= 0 && (
        <Button
          type="button"
          variant="danger"
          isLoading={false}
          onClick={() =>{
            setBookingData(bookingDataInitialState)
            localStorage.clear();
            router.push('/');
          }}
        >
          Cancel
        </Button>
      )}
      <br/><br/><br/><br/>
    </>
  );
};


export default StepButton;





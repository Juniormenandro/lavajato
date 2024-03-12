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

  setBookingData: (data: BookingType) => void;
  handleBuyProduct: (id: string, updatedData: any) => Promise<void>;

  bookingData: BookingType;
  
};


const StepButton: React.FC<StepButtonProps> = ({
  step,
  checkoutIsLoading,
  selectedProductId,
  selectedPayment,
  selectedTime,
  bookingData,
  setBookingData,
  handleBuyProduct,
 
 
  
}) => {
  const handleContinue = () => {
    if (step === 1) {
      setBookingData({
        ...bookingData,
        step: bookingData.step + 1,
      });
    } else {
      setBookingData({
        ...bookingData,
        step: bookingData.step + 1
      });
    }
  };


  const router = useRouter();
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
          disabled={!selectedPayment}
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
          disabled={false}
          onClick={finishBooking}
        >
         Book
        </Button>
      )}
    

<br/><br/>
{step > 0 && (
        <Button
          type="button"
          variant="danger"
          className="mb-3"
          isLoading={false}
          onClick={() =>{
            setBookingData(bookingDataInitialState)
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





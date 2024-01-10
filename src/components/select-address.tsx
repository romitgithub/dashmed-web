import { Button } from "@/atoms/button";
import { useState } from "react";

interface SelectAddressProps {
  isLoading?: boolean;
  onSubmitAddress: (otpValue: string) => void;
  onContinue?: () => void;
  addresses: string[] | null;
  label?: string;
};

const SelectAddress: React.FC<SelectAddressProps> = ({
  isLoading,
  onSubmitAddress,
  onContinue,
  addresses = [],
  label,
}) => {

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleItemClick = (item: string) => setSelectedAddress(item);

  const handleSubmitAddress = async (e: any) => {
    e.preventDefault();
    if (!selectedAddress) {
      setError('Please select a ABHA address');
      return;
    } else setError(null);
    if (onSubmitAddress && selectedAddress) onSubmitAddress(selectedAddress);
  };

  const handleContinue = () => {
    if (onContinue) onContinue();
  };


  return (
    <form onSubmit={handleSubmitAddress} className="w-full">
      <div className="flex flex-row items-center justify-center mt-5">
        <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-xl xl:text-2xl mb-4 text-center">
          Select the ABHA Address through which you wish to login
        </span>
      </div>
      {error && <div className='text-red-500'>{error}</div>}
      <div className="w-full">
        {addresses?.map((item, index) => (
          <div
            key={index}
            className="border border-solid border-gray-700 w-full flex p-2 pl-3 rounded-md mt-2">
            <input
              type="radio"
              id={`item_${index}`}
              checked={selectedAddress === item}
              onChange={() => handleItemClick(item)}
            />
            <label className="ml-3" htmlFor={`item_${index}`}>
              {item}
            </label>
          </div>
        ))}
      </div>
      <div className="mt-5 mb-5 w-full">
        <Button isLoading={isLoading} disabled={isLoading} spinnerColor="fill-yellow-600" className="disabled:text-gray-400 p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300">
          LOGIN
        </Button>
      </div>
      {label && (
        <div className="flex flex-col justify-center align-middle text-center mt-3">
          <span className="font-semibold">Or</span>
          <span
            className="cursor-pointer text-teal-600 font-semibold mt-3 mb-5 text-base sm:text-lg md:text-xl lg:text-2xl"
            onClick={handleContinue}>
            {label}
          </span>
        </div>
      )}
    </form>
  );
};
export { SelectAddress };

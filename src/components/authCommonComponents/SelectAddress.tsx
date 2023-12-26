import { Button } from "@/atoms/button";
import { useState } from "react";


interface SelectAddressProps {
     onSelectAddress: (otpValue: string) => void;
     addresses: string[] | null;
};

const SelectAddress: React.FC<SelectAddressProps> = ({ onSelectAddress, addresses }) => {

     const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

     const handleItemClick = (item: string) => {
          setSelectedAddress(item);
     };

     const handleSelectAddress = async () => {
          if (onSelectAddress && selectedAddress) {
               onSelectAddress(selectedAddress);
          }
     };

     return (
          <>
               <div className="flex flex-row items-center justify-center mt-5">
                    <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-xl xl:text-2xl mb-4 text-center">Select the ABHA Address through which you wish to login</span>
               </div>
               <div className='w-full'>
                    {addresses?.map((item, index) => (
                         <div key={index} className="border border-solid border-gray-700 w-full flex p-2 pl-3 rounded-md mt-2">
                              <input
                                   type="radio"
                                   id={`item_${index}`}
                                   name="items"
                                   checked={selectedAddress === item}
                                   onChange={() => handleItemClick(item)}
                              />
                              <label className='ml-3' htmlFor={`item_${index}`}>{item}</label>
                         </div>
                    ))}
               </div>
               <div className='mt-5 mb-5 w-full'>
                    <Button />
                    <button
                         onClick={handleSelectAddress}
                         className="p-2 w-full text-sm sm:text-md md:text-md lg:text-lg xl:text-xl bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300"
                    >
                         LOGIN
                    </button>
               </div>
          </>
     );
};
export { SelectAddress };   
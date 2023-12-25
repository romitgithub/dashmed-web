import { FormControlChecks } from "@/app/login/page";
import { useState } from "react";


interface SelectAddressProps {
     onSelectAddress: (otpValue: string) => void;
     formControl: FormControlChecks | null | undefined;
};

const SelectAddress: React.FC<SelectAddressProps> = ({ onSelectAddress, formControl }) => {

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
               <div className='w-full'>
                    {formControl?.addresses?.map((item, index) => (
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
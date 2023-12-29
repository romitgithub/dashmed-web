"use client";

import { useContext, useState } from "react";
import { REGISTER_TYPES, RegisterFormDataContext } from "./register-data-provider";
import { Button } from "@/atoms/button";

interface Option {
     name: string;
     value: string;
};

const options: Option[] = [
     { name: 'ABHA Number', value: REGISTER_TYPES?.ABHA_NUMBER },
     { name: 'Mobile Number', value: REGISTER_TYPES?.MOBILE_NUMBER },
     { name: 'Email Id', value: REGISTER_TYPES?.EMAIL_ID },
];

export const OptionForRegisterView = () => {

     const { setRegisterType } = useContext(RegisterFormDataContext);
     const [selectedOption, setSelectedOption] = useState<string>('');

     const handleContinue = () => {
          if (selectedOption) {
               setRegisterType(selectedOption);
          }
          console.log('Selected Option:', selectedOption);
     };

     return (
          <div className="w-full px-3">
               {options?.map((option, index) => (
                    <div key={index} className="p-2 cursor-pointer">
                         <input
                              type="radio"
                              id={`option-${index}`}
                              name="options"
                              value={option.value}
                              checked={selectedOption === option?.value}
                              onChange={() => setSelectedOption(option?.value)}
                         />
                         <label className="ml-1 font-semibold text-teal-600" htmlFor={`option-${index}`}>{option.name}</label>
                    </div>
               ))}
               <div className='mt-5 mb-5'>
                    <Button
                         className="p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300"
                         onClick={handleContinue}
                    >CONTINUE</Button>
               </div>
          </div>
     );
};
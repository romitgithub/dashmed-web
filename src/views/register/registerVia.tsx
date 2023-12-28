import React, { useContext, useState } from 'react';
import { REGISTER_TYPES, RegisterFormDataContext } from './registerDataProvider';
import { Button } from '@/atoms/button';

interface RegisterViaProps {
     onSubmit: (formData: Record<string, any>) => void;
};

interface InputConfig {
     inputLabel: string;
     inputType: 'text' | 'tel' | 'email';
     maxLength: number;
     minLength: number;
     placeholder: string;
};

const inputConfigs: Record<string, InputConfig> = {
     [REGISTER_TYPES?.MOBILE_NUMBER]: {
          inputLabel: 'Enter Mobile Number',
          inputType: 'tel',
          maxLength: 10,
          minLength: 10,
          placeholder: 'Enter mobile number',
     },
     [REGISTER_TYPES?.ABHA_NUMBER]: {
          inputLabel: 'Enter ABHA Number',
          inputType: 'tel',
          maxLength: 14,
          minLength: 14,
          placeholder: 'Enter ABHA number',
     },
     [REGISTER_TYPES?.EMAIL_ID]: {
          inputLabel: 'Enter Email',
          inputType: 'email',
          maxLength: 50,
          minLength: 5,
          placeholder: 'Enter email',
     },
};

export const RegisterVia: React.FC<RegisterViaProps> = ({ onSubmit }) => {

     const { registerType } = useContext(RegisterFormDataContext);
     const [inputValue, setInputValue] = useState<string>('');
     const { inputLabel, inputType, maxLength, minLength, placeholder } = inputConfigs[registerType] || {};

     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (inputValue && onSubmit) onSubmit({ value: inputValue });
     };

     return (
          <form onSubmit={handleSubmit} className='w-full'>
               {inputLabel && (
                    <div className='w-full flex flex-col'>
                         <label className='mb-2'>{inputLabel}</label>
                         <input
                              type={inputType}
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              maxLength={maxLength}
                              minLength={minLength}
                              required
                              placeholder={placeholder}
                              className="p-2 rounded border border-gray-300 flex-1 w-full"
                         />
                    </div>
               )}

               <div className='mt-5'>
                    <Button className="p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300" >CONTINUE</Button>
               </div>
          </form>
     );
};

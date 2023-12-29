import React, { useState, useEffect } from 'react';
import { Button } from '@/atoms/button';
import { LOGIN_TYPES } from '@/views/login';

interface InputConfig {
     inputLabel: string;
     inputType: 'text' | 'tel' | 'email';
     maxLength: number;
     minLength: number;
     placeholder: string;
};

interface InputFormProps {
     onSubmit: (formData: Record<string, any>) => void;
     inputType: string;
     inputConfigs: Record<string, InputConfig>;
};

export const AuthInputForm: React.FC<InputFormProps> = ({
     onSubmit,
     inputType,
     inputConfigs,
}) => {

     const [inputValue, setInputValue] = useState<string>('');
     const [error, setError] = useState<string | null>(null);
     const { inputLabel, inputType: fieldType, maxLength, minLength, placeholder } = inputConfigs[inputType] || {};

     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (inputValue && onSubmit && !error) onSubmit({ value: inputValue });
          else setError('Invalid input');
     };

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          setInputValue(value);
          validateInput(value);
     };

     const validateInput = (value: string) => {
          switch (inputType) {
               case "MOBILE":
                    // Validate mobile number
                    const mobileRegex = /^\d{10}$/; // Adjust as per your validation rules
                    if (!mobileRegex.test(value)) setError('Please enter a valid mobile number');
                    else setError(null);
                    break;
               case "EMAIL":
                    // Validate email address
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
                    if (!emailRegex.test(value)) setError('Please enter a valid email address');
                    else setError(null);
                    break;
               case "ABHA_NO":
                    // Validate abha number
                    const abhaNoRegex = /^\d{14}$/;
                    if (!abhaNoRegex.test(value)) setError('Please enter a valid ABHA number');
                    else setError(null);
                    break;
               default:
                    setError(null);
                    break;
          }
     };

     useEffect(() => {
          setError(null);
          setInputValue('')
     }, [inputType]);

     return (
          <form onSubmit={handleSubmit} className='w-full'>
               {inputLabel && (
                    <div className='w-full flex flex-col'>
                         <label className='mb-2'>{inputLabel}</label>
                         <input
                              type={fieldType}
                              value={inputValue}
                              onChange={handleInputChange}
                              maxLength={maxLength}
                              minLength={minLength}
                              required
                              placeholder={placeholder}
                              className='p-2 rounded border border-gray-300 flex-1 w-full'
                         />
                    </div>
               )}
               {error && <div className='text-red-500'>{error}</div>}
               <div className='mt-5'>
                    <Button className='p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300'>
                         CONTINUE
                    </Button>
               </div>
          </form>
     );
};

import React, { useState, useEffect } from 'react';
import { Button } from '@/atoms/button';

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
     const { inputLabel, inputType: fieldType, maxLength, minLength, placeholder } = inputConfigs[inputType] || {};

     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (inputValue && onSubmit) onSubmit({ value: inputValue });
     };

     useEffect(() => setInputValue(''), [inputType]);

     return (
          <form onSubmit={handleSubmit} className='w-full'>
               {inputLabel && (
                    <div className='w-full flex flex-col'>
                         <label className='mb-2'>{inputLabel}</label>
                         <input
                              type={fieldType}
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              maxLength={maxLength}
                              minLength={minLength}
                              required
                              placeholder={placeholder}
                              className='p-2 rounded border border-gray-300 flex-1 w-full'
                         />
                    </div>
               )}
               <div className='mt-5'>
                    <Button className='p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300'>
                         CONTINUE
                    </Button>
               </div>
          </form>
     );
};

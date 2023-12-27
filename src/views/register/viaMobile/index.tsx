import { useState } from "react";

interface ViaMobileNoProps {
     onSubmit: (formData: Record<string, any>) => void;
};


export const ViaMobileNo: React.FC<ViaMobileNoProps> = ({ onSubmit }) => {

     const [inputValue, setInputValue] = useState('');

     const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
          event.preventDefault();
          if (onSubmit && inputValue) onSubmit({ value: inputValue });
     };

     return (
          <form onSubmit={handleSubmit} className="w-full">
               <label>Enter mobile number</label>
               <div className="flex items-center space-x-2 mt-3">
                    <input
                         type="tel"
                         className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
                         placeholder="Enter mobile number"
                         value={inputValue}
                         name='value'
                         required
                         onChange={(e) => setInputValue(e.target.value)}
                         maxLength={10}
                    />
               </div>
               <button
                    type="submit"
                    className="p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300 mt-10 mb-5"
               >
                    {"CONTINUE"}
               </button>
          </form>
     );
};
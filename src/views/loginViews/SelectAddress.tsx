import { FormControlProps } from "@/components/mobileLogin/mobileLogin/mobileLoginForm";
import { useState } from "react";

const SelectAddress: React.FC<FormControlProps> = ({ setLoginChecks, loginChecks }) => {

     const [selectedItem, setSelectedItem] = useState<string | null>(null);

     const handleItemClick = (item: string) => {
          setSelectedItem(item);
     };

     const handleSelectAddress = async () => {
          try {
               const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/phr/api/login/abhaAddConfirm', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                         "abhaAdd": selectedItem,
                         "transactionId": "",
                    }),
               });

               if (!response.ok) {
                    throw new Error('Network response was not ok');
               }
               const data = await response.json();
               console.log({ data });
          } catch (error) {
               console.error('Error:', error);
          }
     };


     return (
          <>
               <div className='w-full'>
                    {loginChecks?.addresses?.map((item, index) => (
                         <div key={index} className="border border-solid border-gray-700 w-full flex p-2 pl-3 rounded-md mt-2">
                              <input
                                   type="radio"
                                   id={`item_${index}`}
                                   name="items"
                                   checked={selectedItem === item}
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
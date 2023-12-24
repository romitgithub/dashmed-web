import { FormControlProps } from "@/components/mobileLogin/mobileLogin/mobileLoginForm";
import { useState } from "react";


const FormControlForMobileNo: React.FC<FormControlProps> = ({ setLoginChecks, loginChecks }) => {

     const [mobileNumber, setMobileNumber] = useState<string>('');
     console.log({ loginChecks });

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
          e.preventDefault();
          try {
               const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/phr/api/login/sendOtp', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ value: mobileNumber, type: 'MOBILE' }), // Send the necessary data in the body
               });

               if (!response.ok) {
                    throw new Error('Network response was not ok');
               }

               const data = await response.json();
               console.log({ data });
               if (data?.transactionId) {
                    setLoginChecks({
                         ...loginChecks,
                         isOtpSent: true,
                         transactionId: data?.transactionId,
                         type: 'MOBILE',
                         mobileNum: mobileNumber,
                    });
               }
          } catch (error) {
               console.error('Error:', error);
          }
     };


     return (
          <form onSubmit={handleSubmit} className='pt-5 pb5'>
               <label>Enter mobile number</label>
               <div className="flex items-center space-x-2">
                    {/* <select
                         className="p-2 rounded border border-gray-300"
                         value={selectedCountry}
                         onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                         {countries.map((country) => (
                              <option key={country.code} value={country.code}>
                                   {country.flag}
                              </option>
                         ))}
                    </select> */}
                    <input
                         type="tel"
                         className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
                         placeholder="Enter mobile number"
                         value={mobileNumber}
                         onChange={(e) => setMobileNumber(e.target.value)}
                    />
               </div>
               <div className='mt-5 mb-5'>
                    <button
                         type="submit"
                         className="p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300"
                    >
                         Sign in / Sign up
                    </button>
               </div>
          </form>
     );
};

export { FormControlForMobileNo };
import { FormControlProps } from "@/components/mobileLogin/mobileLogin/mobileLoginForm";
import { useState } from "react";


const FormControlForAbhaNo: React.FC<FormControlProps> = ({ setLoginChecks, loginChecks }) => {

     const [abhaNumber, setAbhaNumber] = useState<string>('');
     console.log({ loginChecks });

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
          e.preventDefault();
          console.log({ abhaNumber });
          // try {
          //      const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/phr/api/login/sendOtp', {
          //           method: 'POST',
          //           headers: {
          //                'Content-Type': 'application/json',
          //           },
          //           body: JSON.stringify({ value: abhaNumber, type: "ABHA_NO" }), // Send the necessary data in the body
          //      });

          //      if (!response.ok) {
          //           throw new Error('Network response was not ok');
          //      }

          //      const data = await response.json();
          //      console.log({ data });
          //      if (data?.transactionId) {
          //           setLoginChecks({
          //                ...loginChecks,
          //                isOtpSent: true,
          //                transactionId: data?.transactionId,
          //                type: "ABHA_NO",
          //                mobileNum: abhaNumber,
          //           });
          //      }
          // } catch (error) {
          //      console.error('Error:', error);
          // }

          setLoginChecks({
               ...loginChecks,
               isOtpSent: true,
               type: "ABHA_NO",
               mobileNum: abhaNumber,
          });
     };


     return (
          <form onSubmit={handleSubmit} className='pt-5 pb5'>
               <label>Enter your ABHA Number</label>
               <div className="flex items-center space-x-2">
                    <input
                         type="tel"
                         className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
                         placeholder="Enter ABHA Number"
                         value={abhaNumber}
                         onChange={(e) => setAbhaNumber(e.target.value)}
                         maxLength={14}
                         minLength={14}
                    />
               </div>
               <label className="w-full mt-5 flex justify-end text-teal-500 ">Forget ABHA Number?</label>
               <div className='mt-5 mb-5'>
                    <button
                         type="submit"
                         className="p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300"
                    >
                         Continue
                    </button>
               </div>
          </form>
     );
};

export { FormControlForAbhaNo };
import CountdownTimer from "@/components/countDown/expiresIn";
import { FormControlProps } from "@/components/mobileLogin/mobileLogin/mobileLoginForm";
import { ChangeEvent, useRef, useState } from "react";
import React, { KeyboardEvent } from 'react';


export const OtpInput: React.FC<FormControlProps> = ({ setLoginChecks, loginChecks }) => {

     const [otp, setOtp] = useState(['', '', '', '', '', '']);
     const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
     console.log({ loginChecks });
     
     const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
          const value = event.target.value;
          setOtp([...otp?.slice(0, index), value, ...otp?.slice(index + 1)]);

          // Auto focus to the next input
          if (value !== '' && index < 5 && refs[index + 1]?.current) {
               refs[index + 1]?.current?.focus();
          }
     };

     const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
          // Handle backspace to move focus to the previous input
          if (event?.key === 'Backspace' && index > 0 && otp && otp[index] === '' && refs[index - 1]?.current) {
               refs[index - 1]?.current?.focus();
          }
     };


     const handleOtpSubmit = async () => {

          try {
               const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/phr/api/login/verifyOtp', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                         "otp": otp.join(''),
                         "type": loginChecks?.type,
                         "transactionId": loginChecks?.transactionId
                    }),
               });

               if (!response.ok) {
                    throw new Error('Network response was not ok');
               }

               const data = await response.json();
               console.log({ data });
               setLoginChecks({
                    ...loginChecks,
                    isOtpVerify: true,
                    addresses: data?.mappedPhrAddress,
               })
          } catch (error) {
               console.error('Error:', error);
          }
     }

     const resendOtpFunc = async () => {
          if (loginChecks?.mobileNum && loginChecks?.type) {
               try {
                    const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/phr/api/login/sendOtp', {
                         method: 'POST',
                         headers: {
                              'Content-Type': 'application/json',
                         },
                         body: JSON.stringify({ value: loginChecks?.mobileNum, type: loginChecks?.type }), // Send the necessary data in the body
                    });

                    if (!response.ok) {
                         throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    setLoginChecks({
                         ...loginChecks,
                         isOtpSent: true,
                         transactionId: data?.transactionId,
                    });

               } catch (error) {
                    console.error('Error:', error);
               }
          } else {
               console.log("missing data");
          }
     }

     return (
          <div className='flex flex-col w-full mt-5'>
               <label className=''>Enter 6 digit OTP</label>
               <div className="flex justify-between items-center mt-3">
                    {otp?.map((value, index) => (
                         <input
                              key={index}
                              ref={refs[index]}
                              type="text"
                              maxLength={1}
                              value={value}
                              onChange={(e) => handleInputChange(index, e)}
                              onKeyDown={(e) => handleKeyDown(index, e)}
                              className="w-12 h-12 mx-1 text-4xl text-center border border-gray-300 rounded focus:outline-none focus:border-blue-500 sm:text-3xl extra-small:text-sm small:text-md extra-small:w-8 extra-small:h-8 small:w-10 small:h-10 grid-cols-6 extra-small:grid-cols-1"
                         />
                    ))}
               </div>
               <div className="flex flex-row w-full justify-between mt-5">
                    <CountdownTimer />
                    <span className="text-sm sm:text-sm md:text-md lg:text-lg xl:text-xl text-teal-400" onClick={resendOtpFunc}>RESEND OTP</span>
               </div>
               <div className='mt-5 mb-5'>
                    <button
                         onClick={handleOtpSubmit}
                         className="p-2 w-full text-sm sm:text-md md:text-md lg:text-lg xl:text-xl bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300"
                    >
                         CONTINUE
                    </button>
               </div>
          </div>
     );
};

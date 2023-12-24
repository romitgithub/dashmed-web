import { FormControlProps } from "@/components/mobileLogin/mobileLogin/mobileLoginForm";
import React, { useState } from 'react';
import { OtpInput } from "./OtpInput";


export const ForgetPassword: React.FC<FormControlProps> = ({ setLoginChecks, loginChecks }) => {

     const [step, setStep] = useState(1);
     const [data, setData] = useState({
          abhaAddress: '',
          abhaPassword: '',
          selectedTypeForOtp: '',
     });

     console.log({ step });

     const handleOtpSubmit = async () => {

          // try {
          //      const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/phr/api/login/verifyOtp', {
          //           method: 'POST',
          //           headers: {
          //                'Content-Type': 'application/json',
          //           },
          //           body: JSON.stringify({
          //                "otp": otp.join(''),
          //                "type": loginChecks?.type,
          //                "transactionId": loginChecks?.transactionId
          //           }),
          //      });

          //      if (!response.ok) {
          //           throw new Error('Network response was not ok');
          //      }

          //      const data = await response.json();
          //      console.log({ data });
          //      setLoginChecks({
          //           ...loginChecks,
          //           isOtpVerify: true,
          //           addresses: data?.mappedPhrAddress,
          //      })
          // } catch (error) {
          //      console.error('Error:', error);
          // }
     }

     const handleBack = () => {
          if (step === 1) {
               setLoginChecks({
                    ...loginChecks,
                    forgetPassword: false,
               })
          }
          setStep((step) => {
               return step > 1 ? step - 1 : step;
          });
     };

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
          const { value, name, type } = e.target;
          if (type === 'radio') {
               setData({
                    ...data,
                    selectedTypeForOtp: value,
               });
          } else {
               setData({
                    ...data,
                    [name]: value,
               });
          }
     };


     return (
          <div className='flex flex-col w-full mt-5'>
               <div className="flex flex-row items-center justify-center relative" >
                    <span className="absolute cursor-pointer top-0 left-0 mt-0 ml-0 p-1" onClick={handleBack}>
                         <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                         >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                         </svg>
                    </span>
                    <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">Forgot Password</span>
               </div>
               {
                    step === 1 &&
                    <div className="flex flex-col justify-left mt-3">
                         <label>Enter your ABHA address</label>
                         <div className="rounded border border-gray-300 flex mt-2 items-center space-x-2 pr-5">
                              <input
                                   type="tel"
                                   className="p-2   flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
                                   placeholder="Enter ABHA Number"
                                   value={data?.abhaAddress}
                                   name='abhaAddress'
                                   onChange={handleInputChange}
                                   maxLength={14}
                                   minLength={14}
                              />
                              <span className="pr-5">@abdm</span>
                         </div>
                    </div>
               }

               {
                    step === 2 &&
                    <div className="flex flex-col justify-left mt-3">
                         <label>Enter your ABHA address</label>
                         <div className="rounded border border-gray-300 flex mt-2 items-center space-x-2 pr-5">
                              <select
                                   className="p-2 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
                                   value={data?.abhaAddress}
                                   name='abhaAddress'
                                   onChange={handleInputChange}
                              >
                                   <option value="">Select ABHA Address</option>
                                   <option value="address1">Address 1</option>
                                   <option value="address2">Address 2</option>
                                   <option value="address3">Address 3</option>
                              </select>
                         </div>
                    </div>
               }
               {
                    step === 3 &&
                    <OtpInput setLoginChecks={setLoginChecks} loginChecks={loginChecks} />
               }
               <div className='mt-5 mb-5'>
                    {
                         step !== 3 && <button
                              onClick={() => setStep(step => step + 1)}
                              className="p-2 w-full text-sm sm:text-md md:text-md lg:text-lg xl:text-xl bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300"
                         >
                              CONTINUE
                         </button>
                    }
               </div>
          </div>
     );
};
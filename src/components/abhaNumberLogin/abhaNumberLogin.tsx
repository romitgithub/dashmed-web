import React, { useState, FormEvent, Dispatch, SetStateAction, useRef, ChangeEvent } from 'react';
import CountdownTimer from '../countDown/expiresIn';

interface LoginChecks {
     isOtpSent: boolean;
     isOtpVerify: boolean;
     isAbhaAddressSelected: boolean;
     transactionId: string;
     type: string;
}

type SetLoginChecks = Dispatch<SetStateAction<LoginChecks>>;

interface FormControlForAbhaNoProps {
     setLoginChecks: SetLoginChecks;
     loginChecks: LoginChecks;
}


interface FormControlForOTPProps {
     setLoginChecks: SetLoginChecks;
     loginChecks: LoginChecks;
}


export const LoginWithAbhaNumber: React.FC = () => {

     const [loginChecks, setLoginChecks] = useState<LoginChecks>({
          isOtpSent: false,
          isOtpVerify: false,
          isAbhaAddressSelected: false,
          transactionId: '',
          type: '',
     });

     return (
          <>
               {
                    !loginChecks.isOtpSent &&
                    !loginChecks.isOtpVerify &&
                    !loginChecks.isAbhaAddressSelected && (
                         <>
                              <div className="w-full m-2 p-2 flex flex-col mt-2 sm:mt-2 md:mt-2 lg:mt-4 xl:mt-6">
                                   <div className="flex flex-row items-center justify-center">
                                        <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">
                                             Login with ABHA Number
                                        </span>
                                   </div>
                                   <div>
                                        <FormControlForAbhaNo setLoginChecks={setLoginChecks} loginChecks={loginChecks} />
                                   </div>
                              </div>
                              <div>
                                   <div>
                                        <span className="font-medium block text-center text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg">
                                             {"Don't have an ABHA Address?"}
                                        </span>
                                        <span className="flex justify-center align-middle font-medium text-teal-700">Register</span>
                                   </div>
                                   <div className="mt-4 mb-4">
                                        <span className="font-medium block text-center text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg">
                                             {"Don't have an ABHA number?"}
                                        </span>
                                        <span className="flex justify-center align-middle font-medium text-teal-700">Create Now</span>
                                   </div>
                                   <div className="mb-3">
                                        <span className="flex justify-center align-middle mt-2 font-medium text-teal-700 text-sm underline">
                                             Privacy Policy
                                        </span>
                                   </div>
                              </div>
                         </>
                    )
               }
               {
                    loginChecks.isOtpSent &&
                    !loginChecks.isOtpVerify &&
                    !loginChecks.isAbhaAddressSelected && (
                         <div className="w-full m-2 p-2 flex flex-col mt-2 sm:mt-2 md:mt-2 lg:mt-4 xl:mt-6">
                              <div className="flex flex-row items-center justify-center">
                                   <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">Login with Mobile Number</span>
                              </div>
                              <div>
                                   <OtpInput setLoginChecks={setLoginChecks} loginChecks={loginChecks} />
                              </div>
                         </div>
                    )
               }
               {
                    loginChecks.isOtpSent &&
                    loginChecks.isOtpVerify &&
                    !loginChecks.isAbhaAddressSelected && (
                         <></>
                    )
               }
          </>
     );
};






const FormControlForAbhaNo: React.FC<FormControlForAbhaNoProps> = ({ setLoginChecks, loginChecks }) => {
     const [abhaNo, setAbhaNo] = useState<string>('');

     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          console.log({ abhaNo });

          try {
               const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL  + '/phr/api/login/sendOtp', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ value: abhaNo, type: 'ABHA_NO' }), // Send the necessary data in the body
               });

               if (!response.ok) {
                    throw new Error('Network response was not ok');
               }

               const data = await response.json();
               console.log({ data });
               setLoginChecks((prevLoginChecks) => ({
                    ...prevLoginChecks,
                    isOtpSent: true,
               }));
          } catch (error) {
               console.error('Error:', error);
          }
     };

     return (
          <form onSubmit={handleSubmit} className="pt-5 pb-5">
               <label>Enter your ABHA Number</label>
               <div className="flex items-center space-x-2">
                    <input
                         type="text"
                         className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
                         placeholder="Enter ABHA Number"
                         value={abhaNo}
                         onChange={(e) => setAbhaNo(e.target.value)}
                    />
               </div>
               <div className="mt-5 mb-5">
                    <button
                         type="submit"
                         className="p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300"
                    >
                         CONTINUE
                    </button>
               </div>
          </form>
     );
};





const OtpInput: React.FC<FormControlForOTPProps> = ({ setLoginChecks, loginChecks }) => {

     const [otp, setOtp] = useState(['', '', '', '', '', '']);
     const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

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
          if (event?.key === 'Backspace' && index > 0 && otp[index] === '' && refs[index - 1].current) {
               refs[index - 1]?.current?.focus();
          }
     };

     const handleOtpSubmit = async () => {

          console.log({
               "otp": otp.join(''),
               "type": "MOBILE",
               "transactionId": loginChecks?.transactionId
          });

          try {
               const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'phr/api/login/verifyOtp', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                         "otp": otp.join(''),
                         "type": "'ABHA_NO'",
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
               })
          } catch (error) {
               console.error('Error:', error);
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
                    <span className="text-sm sm:text-sm md:text-md lg:text-lg xl:text-xl text-teal-400">RESEND OTP</span>
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

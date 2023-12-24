import { FormControlForAbhaNo } from '@/views/loginViews/FormControlForAbhaNumber';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { FormControlProps } from '../mobileLogin/mobileLogin/mobileLoginForm';
import { SelectAddress } from '@/views/loginViews/SelectAddress';
import { OtpInput } from '@/views/loginViews/OtpInput';

interface LoginChecks {
     isOtpSent: boolean;
     isOtpVerify: boolean;
     isAbhaAddressSelected: boolean;
     transactionId: string;
     type: string;
}

type SetLoginChecks = Dispatch<SetStateAction<LoginChecks>>;


export const LoginWithAbhaNumber: React.FC<FormControlProps> = ({ setLoginChecks, loginChecks }) => {

     const handleBackFromSelectAddressPage = () => {
          setLoginChecks({
               ...loginChecks,
               isOtpSent: true,
               isOtpVerify: false,
          });
     }

     const handleBackFromOtpPage = () => {
          setLoginChecks({
               ...loginChecks,
               isOtpSent: false,
          });
     };

     const handleBackFromAbhaNumPage = () => {
          setLoginChecks({
               ...loginChecks,
               tabType: 'mobileNumber',
          });
     };

     return (
          <>
               {
                    !loginChecks.isOtpSent &&
                    !loginChecks.isOtpVerify &&
                    !loginChecks.isAbhaAddressSelected && (
                         <>
                              <div className="w-full m-2 p-2 flex flex-col mt-2 sm:mt-2 md:mt-2 lg:mt-4 xl:mt-6">
                                   <div className="flex flex-row items-center justify-center relative" >
                                        <span className="absolute cursor-pointer top-0 left-0 mt-0 ml-0 p-1" onClick={handleBackFromAbhaNumPage}>
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
                                        <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">Login with ABHA Number</span>
                                   </div>

                                   <div>
                                        <FormControlForAbhaNo setLoginChecks={setLoginChecks} loginChecks={loginChecks} />
                                   </div>
                              </div>
                              <>

                              </>
                         </>
                    )
               }
               {
                    loginChecks?.isOtpSent &&
                    !loginChecks?.isOtpVerify &&
                    !loginChecks?.isAbhaAddressSelected &&
                    (
                         <div className="w-full m-2 p-2 flex flex-col mt-2 sm:mt-2 md:mt-2 lg:mt-4 xl:mt-6">
                              <div className="flex flex-row items-center justify-center relative" >
                                   <span className="absolute cursor-pointer top-0 left-0 mt-0 ml-0 p-1" onClick={handleBackFromOtpPage}>
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
                                   <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">Login with ABHA Number</span>
                              </div>
                              <div>
                                   <OtpInput setLoginChecks={setLoginChecks} loginChecks={loginChecks} />
                              </div>
                         </div>
                    )
               }

               {
                    loginChecks?.isOtpSent &&
                    loginChecks?.isOtpVerify &&
                    !loginChecks?.isAbhaAddressSelected &&
                    (
                         <div className="flex flex-col items-center w-full">
                              <div className="flex flex-row items-center justify-center relative p-2 w-full" >
                                   <span className="absolute cursor-pointer top-2 left-0 mt-0 ml-0 p-1" onClick={handleBackFromSelectAddressPage}>
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
                                   <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">Login with Mobile Number</span>
                              </div>
                              <div className="flex flex-row items-center justify-center mt-5">
                                   <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-xl xl:text-2xl mb-4 text-center">Select the ABHA Address through which you wish to login</span>
                              </div>
                              <div className="flex flex-col items-center w-full m-auto p-1">
                                   <SelectAddress setLoginChecks={setLoginChecks} loginChecks={loginChecks} />
                              </div>
                         </div>
                    )
               }
          </>
     );
};


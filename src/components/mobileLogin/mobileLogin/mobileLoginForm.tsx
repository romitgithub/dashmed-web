"use client"

import { LoginWithAbhaAddress } from '@/components/abhaAddressLogin/abhaAddressLogin';
import { LoginWithAbhaNumber } from '@/components/abhaNumberLogin/abhaNumberLogin';
import { LoginWithEmailId } from '@/components/loginWithEmail/emailLogin';
import { FormControlForMobileNo } from '@/views/loginViews/FormControlForMobileNo';
import { OtpInput } from '@/views/loginViews/OtpInput';
import { SelectAddress } from '@/views/loginViews/SelectAddress';
import Link from 'next/link';
import React, { useState } from 'react';

interface LoginChecks {
  isOtpSent: boolean;
  isOtpVerify: boolean;
  isAbhaAddressSelected: boolean;
  transactionId: string;
  type: string;
  tabType: string;
  addresses: string[];
  mobileNum: string;
  forgetPassword: boolean;
  isAbhaLoginShow: boolean;
  emailId: string;
};

type SetLoginChecks = React.Dispatch<React.SetStateAction<LoginChecks>>;

export interface FormControlProps {
  setLoginChecks: SetLoginChecks;
  loginChecks: LoginChecks;
}


export const LoginWithMobileNumber: React.FC = () => {

  const [loginChecks, setLoginChecks] = useState<LoginChecks>({
    isOtpSent: false,
    isOtpVerify: false,
    isAbhaAddressSelected: false,
    transactionId: '',
    type: 'MOBILE',
    tabType: 'mobileNumber',
    addresses: [],
    mobileNum: '',
    forgetPassword: false,
    isAbhaLoginShow: false,
    emailId: '',
  });

  const handleToggleType = (value: string): void => {
    localStorage.setItem('typeVal', value);
    setLoginChecks({
      ...loginChecks,
      tabType: value,
    });
  };


  const handleBackFromOtpPage = () => {
    setLoginChecks({
      ...loginChecks,
      isOtpSent: false,
    });
  };

  const handleBackFromSelectAddressPage = () => {
    setLoginChecks({
      ...loginChecks,
      isOtpSent: true,
      isOtpVerify: false,
    });
  }

  return (
    <>
      {
        loginChecks?.tabType === 'mobileNumber' &&
        <>
          {
            !loginChecks?.isOtpSent &&
            !loginChecks?.isOtpVerify &&
            !loginChecks?.isAbhaAddressSelected &&
            (
              <>
                <div className="w-full m-2 p-2 flex flex-col mt-2 sm:mt-2 md:mt-2 lg:mt-4 xl:mt-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-center lg:justify-center xl:justify-center">
                    <span className="font-semibold sm:text-lg md:text-2xl lg:text-3xl xl:text-3xl">Hello!</span>
                    {" "}
                    <span className="ml-0 sm:ml-3 font-semibold sm:text-lg md:text-2xl lg:text-3xl xl:text-3xl">Romit Choudhary</span>
                  </div>
                  <div>
                    <FormControlForMobileNo setLoginChecks={setLoginChecks} loginChecks={loginChecks} />
                  </div>
                  <div className="flex flex-col w-full justify-center align-middle">
                    <span className="m-auto text-xl">Or</span>
                    <Link href={"/auth/login"}><span className="block text-center mt-5 font-medium text-teal-700">Other Login Options</span></Link>
                    <div className="flex flex-col w-full justify-center align-middle mt-5">
                      <button onClick={() => handleToggleType('abhaAddress')} className="border border-#1b5887 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg w-full py-1 px-1 mt-2 rounded-md text-#1b5887 font-medium transition duration-300">ABHA Address</button>
                      <button onClick={() => handleToggleType('emailId')} className="border border-#1b5887 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg w-full py-1 px-1 mt-2 rounded-md text-#1b5887 font-medium transition duration-300">Email ID</button>
                      <button onClick={() => handleToggleType('abhaNumber')} className="border border-#1b5887 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg w-full py-1 px-1 mt-2 rounded-md text-#1b5887 font-medium transition duration-300">ABHA Number</button>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <span className="font-medium block text-center text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg">{"Don't have an ABHA Address?"}</span>
                    <span className="flex justify-center align-middle font-medium text-teal-700">Register</span>
                  </div>
                  <div className="mt-4 mb-4">
                    <span className="font-medium block text-center text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg">{"Don't have an ABHA number?"}</span>
                    <span className="flex justify-center align-middle font-medium text-teal-700">Create Now</span>
                  </div>
                  <div className="mb-3">
                    <span className="flex justify-center align-middle mt-2 font-medium text-teal-700 text-sm underline">Privacy Policy</span>
                  </div>
                </div>
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
                  <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">Login with Mobile Number</span>
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
      }
      {
        loginChecks?.tabType === 'abhaAddress' &&
        <LoginWithAbhaAddress setLoginChecks={setLoginChecks} loginChecks={loginChecks} />
      }
      {
        loginChecks?.tabType === 'emailId' &&
        <LoginWithEmailId setLoginChecks={setLoginChecks} loginChecks={loginChecks} />
      }
      {
        loginChecks?.tabType === 'abhaNumber' &&
        <LoginWithAbhaNumber setLoginChecks={setLoginChecks} loginChecks={loginChecks} />
      }
    </>
  );
};
"use client"

import CountdownTimer from '@/components/countDown/expiresIn';
import Link from 'next/link';
import React, { useState, useRef, ChangeEvent, KeyboardEvent, SetStateAction } from 'react';


interface Country {
  code: string;
  name: string;
  flag: string;
}

interface LoginChecks {
  isOtpSent: boolean;
  isOtpVerify: boolean;
  isAbhaAddressSelected: boolean;
};

type SetLoginChecks = React.Dispatch<React.SetStateAction<LoginChecks>>;

interface FormControlForMobileNoProps {
  setLoginChecks: SetLoginChecks;
  loginChecks: LoginChecks;
}

interface FormControlForOTPProps {
  setLoginChecks: SetLoginChecks;
  loginChecks: LoginChecks;
}

const countries: Country[] = [
  { code: 'us', name: 'United States', flag: '🇺🇸' },
  { code: 'in', name: 'India', flag: '🇮🇳' },
  // Add more countries as needed
];



export const LoginWithMobileNumber = () => {

  const [loginChecks, setLoginChecks] = useState({
    isOtpSent: false,
    isOtpVerify: false,
    isAbhaAddressSelected: false,
  });

  const addresses = [
    {
      'address': '7897417171@abdm',
      'username': 'Vibhor Agnihotri'
    },
    {
      'address': 'vibhor.agnihotri@abdm',
      'username': 'Vibhor Agnihotri'
    },
  ];


  return (
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
                  <Link href={'#'} className="mt-5">
                    <button className="border border-#1b5887 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg w-full py-1 px-1 rounded-md text-#1b5887 font-medium transition duration-300">ABHA Address</button>
                  </Link>
                  <Link href={'#'} className="mt-5">
                    <button className="border border-#1b5887 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg w-full py-1 px-1 rounded-md text-#1b5887 font-medium transition duration-300">Email ID</button>
                  </Link>
                  <Link href={'#'} className="mt-5">
                    <button className="border border-#1b5887 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg w-full py-1 px-1 rounded-md text-#1b5887 font-medium transition duration-300">ABHA Number</button>
                  </Link>
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
        loginChecks?.isOtpSent &&
        loginChecks?.isOtpVerify &&
        !loginChecks?.isAbhaAddressSelected &&
        (
          <div className="flex flex-col items-center w-full">
            <div className="flex w-full flex-row items-center justify-center">
              <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">Login with Mobile Number</span>
            </div>
            <div className="flex flex-row items-center justify-center mt-5">
              <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-xl xl:text-2xl mb-4 text-center">Select the ABHA Address through which you wish to login</span>
            </div>
            <div className="flex flex-col items-center w-full m-auto p-1">
              {
                addresses?.map((address) => {
                  return <div className="border border-solid border-gray-700 w-full flex flex-col p-2 pl-7 rounded-md m-2">
                    <span className="text-gray-500">{address?.address}</span>
                    <span className="font-medium">{address?.username}</span>
                  </div>
                })
              }
              <div className='mt-5 mb-5 w-full'>
                <button
                  type="submit"
                  className="p-2 w-full text-sm sm:text-md md:text-md lg:text-lg xl:text-xl bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300"
                >
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};



const FormControlForMobileNo: React.FC<FormControlForMobileNoProps> = ({ setLoginChecks, loginChecks }) => {

  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>(countries[0].code);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Country: ${selectedCountry}, Mobile Number: ${mobileNumber}`);
    setLoginChecks({
      ...loginChecks,
      isOtpSent: true,
    });
    console.log({ loginChecks });
    // Here you can perform further actions, like making API calls, etc.
  };

  return (
    <form onSubmit={handleSubmit} className='pt-5 pb5'>
      <label>Enter mobile number</label>
      <div className="flex items-center space-x-2">
        <select
          className="p-2 rounded border border-gray-300"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.flag}
            </option>
          ))}
        </select>
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

  const handleOtpSubmit = () => {
    setLoginChecks({
      ...loginChecks,
      isOtpVerify: true,
    })
  }

  return (
    <form onSubmit={handleOtpSubmit} className='flex flex-col w-full mt-5'>
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
        {/* <span className="text-sm sm:text-sm md:text-md lg:text-lg xl:text-xl text-red-500">Expires in 58s</span> */}
        <CountdownTimer />
        <span className="text-sm sm:text-sm md:text-md lg:text-lg xl:text-xl text-teal-400">RESEND OTP</span>
      </div>
      <div className='mt-5 mb-5'>
        <button
          type="submit"
          className="p-2 w-full text-sm sm:text-md md:text-md lg:text-lg xl:text-xl bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300"
        >
          CONTINUE
        </button>
      </div>
    </form>
  );
};

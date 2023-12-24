"use client";

import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import CountdownTimer from '../../countDown/expiresIn';


const OtpInput = () => {

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
          </div>
     );
};

export default OtpInput;

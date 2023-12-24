"use client";

import OtpInput from "@/components/mobileLogin/mobileLogin/otpInput";


export default function LoginWithMobile() {
     return (
          <div className="flex min-h-screen flex-col items-center justify-between w-full small:w-4/5 sm:w-3/5 md:w-2/5 lg:w-2/6 xl:w-2/6 m-auto p-1">
               <div className="w-full m-2 p-2 flex flex-col mt-2 sm:mt-2 md:mt-2 lg:mt-4 xl:mt-6">
                    <div className="flex flex-row items-center justify-center">
                         <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">Login with Mobile Number</span>
                    </div>
                    <div>
                         <OtpInput />
                    </div>
               </div>
               <></>
          </div>
     );
};

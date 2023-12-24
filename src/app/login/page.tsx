"use client";

import { LoginWithMobileNumber } from "@/components/mobileLogin/mobileLogin/mobileLoginForm";


const Login: React.FC = () => {

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 m-auto p-1">
        <LoginWithMobileNumber />
      </div>
    </>
  );
};

export default Login;

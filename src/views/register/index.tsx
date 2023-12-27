"use client";

import { useContext } from "react";
import { REGISTER_TYPES, RegisterFormDataContext } from "./registerDataProvider";
import { RegisterHeaderSection } from "./header";
import { OptionForRegisterView } from "./registrationOptions";
import { RegisterVia } from "./register";


export const RegisterView = () => {

     const { registerType } = useContext(RegisterFormDataContext);

     return (
          <div className="flex min-h-screen flex-col items-center w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 m-auto p-1">
               <RegisterHeaderSection />
               {registerType === REGISTER_TYPES.DEFAULT_TYPE ? <OptionForRegisterView /> : <RegisterVia />}
          </div>
     );
};
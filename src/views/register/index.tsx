"use client";

import { useContext } from "react";
import { REGISTER_TYPES, RegisterFormDataContext } from "./registerDataProvider";
import { RegisterHeaderSection } from "./header";
import { OptionForRegisterView } from "./registrationOptions";
import { RegisterViaMobileNumber } from "./viaMobile";
import { RegisterViaEmailId } from "./viaEmail";
import { RegisterViaAbhaNumber } from "./viaAbhaNumber";


export const RegisterView = () => {

     const {
          registerType,
          setRegisterType,
          registerState,
          setRegisterState,
          handleChangeRegisterType,
     } = useContext(RegisterFormDataContext);


     return (
          <div className="flex min-h-screen flex-col items-center w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 m-auto p-1">
               <RegisterHeaderSection />

               {/* Options for register*/}
               {registerType === REGISTER_TYPES.DEFAULT_TYPE && (
                    <OptionForRegisterView />
               )}

               {/* Conditional rendering based on Mobile number registration type */}
               {registerType === REGISTER_TYPES.MOBILE_NUMBER && (
                    <RegisterViaMobileNumber />
               )}

               {/* Conditional rendering based on Email number registration type */}
               {registerType === REGISTER_TYPES.EMAIL_ID && (
                    <RegisterViaEmailId />
               )}

               {/* Conditional rendering based on ABHA number registration type */}
               {registerType === REGISTER_TYPES.ABHA_NUMBER && (
                    <RegisterViaAbhaNumber />
               )}
          </div>
     );
};
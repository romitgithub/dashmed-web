"use client";

import { useState } from "react";
import { FooterSection } from "./footer";
import { HeaderSection } from "./header";
import { FormControlSection } from "./formControl";
import { handleCommonSubmitFunc, handleResendOTPFunc, handleSelectAddressFunc, handleSetOtpFunc } from "@/utils/apiHelpers";
import { OtpInput } from "@/components/login/otp";
import { SelectAddress } from "@/components/login/SelectAddress";


export const LOGIN_TYPES = {
     ABHA_ADD: 'ABHA_ADD',
     ABHA_NO: 'ABHA_NO',
     MOBILE: 'MOBILE',
     EMAIL: 'EMAIL',
};


export const LOGIN_STATES = {
     DEFAULT_VIEW: 'DEFAULT_VIEW',
     OTP_VIEW: 'OTP_VIEW',
     ADDRESS_VIEW: 'ADDRESS_VIEW',
};



export interface FormControlChecks {
     transactionId: string;
     value: string;
     abhaPassword: string;
     type: string;
     selectedAddress: string;
     otp: string;
     addresses: string[] | null;
};

type SetFormControlChecksChecks = React.Dispatch<React.SetStateAction<FormControlChecks>>;

export interface FormControlProps {
     setFormControl: SetFormControlChecksChecks;
     formControl: FormControlChecks;
}

const initialFormControl: FormControlChecks = {
     transactionId: '',
     value: '',
     abhaPassword: '',
     selectedAddress: '',
     type: LOGIN_TYPES.MOBILE,
     otp: '',
     addresses: null,
};


export const LoginView = () => {

     const [loginType, setLoginType] = useState<string>(LOGIN_TYPES.MOBILE);
     const [loginState, setLoginState] = useState<string>(LOGIN_STATES.DEFAULT_VIEW);
     const [formControl, setFormControl] = useState<FormControlChecks>(initialFormControl);

     // Function to reset the formControl state to initial values
     const resetFormControl = () => {
          setFormControl(initialFormControl);
     };

     // on saving anything among ABHA num, Abha Address, Mobile num, Email-id and making a network request.
     const handleSubmit = async () => {
          await handleCommonSubmitFunc(formControl, setFormControl, setLoginState, loginType);
     };

     // save the otp value and make network request
     const handleSetOtp = async (otpValue: string) => {
          await handleSetOtpFunc(otpValue, formControl, setFormControl, setLoginState,);
     };

     const handleResendOTP = async () => {
          await handleResendOTPFunc(formControl, setFormControl);
     };

     // save the selected address value and make network request
     const handleSelectAddress = async (selectedAddressValue: string) => {
          await handleSelectAddressFunc(selectedAddressValue, formControl, setFormControl);
     };

     const handleChangeLoginType = (value: string) => {
          setLoginType(value);
     };


     return (
          <div className="flex min-h-screen flex-col items-center justify-between w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 m-auto p-1">
               <div className="w-full">
                    <div className="w-full">
                         <HeaderSection loginType={loginType} loginState={loginState} setLoginType={setLoginType} setLoginState={setLoginState} resetFormControl={resetFormControl} />
                    </div>
                    <div className="w-full">
                         {loginState === LOGIN_STATES.DEFAULT_VIEW && <FormControlSection handleSubmit={handleSubmit} loginType={loginType} formControl={formControl} setFormControl={setFormControl} setLoginState={setLoginState} />}
                         {loginState === LOGIN_STATES.OTP_VIEW && <OtpInput onSetOtp={handleSetOtp} onResendOTP={handleResendOTP} />}
                         {
                              loginState === LOGIN_STATES.ADDRESS_VIEW &&
                              <>
                                   <div className="flex flex-row items-center justify-center mt-5">
                                        <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-xl xl:text-2xl mb-4 text-center">Select the ABHA Address through which you wish to login</span>
                                   </div>
                                   <div className="flex flex-col items-center w-full m-auto p-1">
                                        <SelectAddress onSelectAddress={handleSelectAddress} formControl={formControl} />
                                   </div>
                              </>
                         }
                    </div>
               </div>
               {
                    LOGIN_TYPES.MOBILE === loginType &&
                    LOGIN_STATES.DEFAULT_VIEW === loginState &&
                    <FooterSection handleChangeLoginType={handleChangeLoginType} />
               }
          </div>
     );
};
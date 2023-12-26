"use client";

import { useState } from "react";
import { FooterSection } from "./footer";
import { LoginHeader } from "./header";
import { FormControlSection } from "./formControl";
import { fetchPostJSONExternal } from "@/utils/apiHelpers";
import { OtpInput } from "@/components/authCommonComponents/otp";
import { SelectAddress } from "@/components/authCommonComponents/SelectAddress";

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


export const LoginView = () => {

     const [loginType, setLoginType] = useState<string>(LOGIN_TYPES.MOBILE);
     const [loginState, setLoginState] = useState<string>(LOGIN_STATES.DEFAULT_VIEW);
     const [transactionId, setTransactionId] = useState(null);
     const [addresses, setAddresses] = useState([]);



     // on saving anything among ABHA num, Abha Address, Mobile num, Email-id and making a network request.
     const handleSubmit = async (data: any) => {
          if (loginType && data?.value) {
               fetchPostJSONExternal('/phr/api/login/sendOtp', { ...data, type: loginType })
                    .then((res) => {
                         console.log({ res });
                         if (res?.transactionId) {
                              setTransactionId(res?.transactionId);
                              setLoginState(LOGIN_STATES.OTP_VIEW);
                         };
                    })
                    .catch((err) => console.log({ err }));
          }
          else console.log({ "missing": { ...data, loginType } });
     };

     const handleResendOTP = async () => {
          console.log('NO-ACTION-YET');
     };

     // save the otp value and make network request
     const handleSetOtp = async (otpValue: string) => {
          if (otpValue && transactionId && loginType) {
               const data = {
                    otp: otpValue,
                    transactionId,
                    type: loginType
               };
               fetchPostJSONExternal('/phr/api/login/verifyOtp', data)
                    .then((res) => {
                         console.log({ res });
                         if (res?.mappedPhrAddress && res?.transactionId) {
                              setTransactionId(res?.transactionId);
                              setAddresses(res?.mappedPhrAddress);
                              setLoginState(LOGIN_STATES.ADDRESS_VIEW);
                         };
                    })
                    .catch((err) => console.log({ err }));
          }
          else console.log({ "missing": { otp: otpValue, type: loginType, transactionId } });
     };


     // save the selected address value and make network request
     const handleSelectAddress = async (selectedAddressValue: string) => {
          if (selectedAddressValue && transactionId && loginType) {
               const data = {
                    abhaAdd: selectedAddressValue,
                    transactionId,
               };
               fetchPostJSONExternal('/phr/api/login/abhaAddConfirm', data)
                    .then((res) => {
                         console.log({ res });
                         if (res?.token) {
                              console.log({ token: res?.token });
                         };
                    })
                    .catch((err) => console.log({ err }));
          }
          else console.log({ "missing": { abhaAdd: selectedAddressValue, transactionId } });
     };

     const handleChangeLoginType = (value: string) => {
          setLoginType(value);
     };

     const handleChangeLoginState = (value: string) => {
          setLoginState(value);
     };


     return (
          <div className="flex min-h-screen flex-col items-center w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 m-auto p-1">
               <LoginHeader loginType={loginType} loginState={loginState} onChangeLoginState={handleChangeLoginState} onChangeLoginType={handleChangeLoginType} />
               {loginState === LOGIN_STATES.DEFAULT_VIEW && <FormControlSection onSubmit={handleSubmit} loginType={loginType} />}
               {loginState === LOGIN_STATES.OTP_VIEW && <OtpInput onSetOtp={handleSetOtp} onResendOTP={handleResendOTP} />}
               {loginState === LOGIN_STATES.ADDRESS_VIEW && <SelectAddress onSelectAddress={handleSelectAddress} addresses={addresses} />}
               {LOGIN_TYPES.MOBILE === loginType && LOGIN_STATES.DEFAULT_VIEW === loginState && <FooterSection handleChangeLoginType={handleChangeLoginType} />}
               {LOGIN_TYPES.MOBILE === loginType && LOGIN_STATES.DEFAULT_VIEW === loginState && <FooterSection handleChangeLoginType={handleChangeLoginType} />}
          </div>
     );
};
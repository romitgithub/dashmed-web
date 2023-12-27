"use client";

import { useContext, useState } from "react";
import { REGISTER_STATES, REGISTER_TYPES, RegisterFormDataContext } from "./registerDataProvider";
import { Header } from "./header";
import { OptionForRegisterView } from "./registrationOptions";
import { OtpInput } from "@/components/authCommonComponents/otp";
import { SelectAddress } from "@/components/authCommonComponents/SelectAddress";
import { RegisterVia } from "./registerVia";
import { UserDetailsForm } from "./useDetails";


// Constants for register type text
const registerTypeTextMap: Record<string, string> = {
     [REGISTER_TYPES?.DEFAULT_TYPE]: "I want to create ABHA via",
     [REGISTER_TYPES?.MOBILE_NUMBER]: "Register with Mobile Number",
     [REGISTER_TYPES?.ABHA_NUMBER]: "Register with ABHA Number",
     [REGISTER_TYPES?.EMAIL_ID]: "Register with Email-Id",
};

export const RegisterView = () => {

     const {
          registerType,
          registerState,
          setRegisterState,
          setRegisterType,
     } = useContext(RegisterFormDataContext);

     const [transactionId, setTransactionId] = useState<string | null>(null);
     const [addresses, setAddresses] = useState<string[]>([]);

     const handleSubmit = (data: any) => {
          console.log({ "data": { ...data, type: registerType } });
          if (data) {
               // fetchPostJSONExternal('/phr/api/login/sendOtp', { ...data, type: loginType })
               //      .then((res) => {
               //           console.log({ res });
               //           if (res?.transactionId) {
               //                setTransactionId(res?.transactionId);
               //                setRegisterState(REGISTER_STATES.OTP_VIEW);
               //           };
               //      })
               //      .catch((err) => console.log({ err }));
          }
          else console.log({ "missing": { ...data } });
          setRegisterState(REGISTER_STATES.OTP_VIEW);
     };

     // save the otp value and make network request
     const handleSetOtp = async (otpValue: string) => {
          if (otpValue && transactionId && registerType) {
               const data = {
                    otp: otpValue,
                    transactionId,
                    type: registerType,
               };

               // fetchPostJSONExternal('/phr/api/login/verifyOtp', data)
               //      .then((res) => {
               //           console.log({ res });
               //           if (res?.mappedPhrAddress && res?.transactionId) {
               //                setTransactionId(res?.transactionId);
               //                setAddresses(res?.mappedPhrAddress);
               //                setRegisterState(REGISTER_STATES.ADDRESS_VIEW);
               //           };
               //      })
               //      .catch((err) => console.log({ err }));
          }
          else console.log({ "missing": { otp: otpValue, type: registerType, transactionId } });
          setRegisterState(REGISTER_STATES.ADDRESS_VIEW);
          setAddresses(['ram', 'ram']);
     };

     const handleResendOTP = async () => {
          console.log('NO-ACTION-YET');
     };

     // save the selected address value and make network request
     const handleSelectAddress = async (selectedAddressValue: string) => {
          setRegisterState(REGISTER_STATES.USER_DETAILS_FORM_VIEW);
          if (selectedAddressValue && transactionId && registerType) {
               const data = {
                    abhaAdd: selectedAddressValue,
                    transactionId,
               };
               console.log({ data });
               setRegisterState(REGISTER_STATES.USER_DETAILS_FORM_VIEW);
               // fetchPostJSONExternal('/phr/api/login/abhaAddConfirm', data)
               //      .then((res) => {
               //           console.log({ res });
               //           if (res?.token) {
               //                console.log({ token: res?.token });
               //           };
               //      })
               //      .catch((err) => console.log({ err }));
          }
          else console.log({ "missing": { abhaAdd: selectedAddressValue, transactionId } });
     };

     const handleBackButtonClick = () => {
          if (registerState === REGISTER_STATES.CREATE_ABHA_ADDRESS_VIEW) setRegisterState(REGISTER_STATES.CREATE_ABHA_ADDRESS_VIEW);
          else if (registerState === REGISTER_STATES.USER_DETAILS_FORM_VIEW) setRegisterState(REGISTER_STATES.ADDRESS_VIEW);
          else if (registerState === REGISTER_STATES.ADDRESS_VIEW) setRegisterState(REGISTER_STATES.OTP_VIEW);
          else if (registerState === REGISTER_STATES.OTP_VIEW) setRegisterState(REGISTER_STATES.DEFAULT_VIEW);
          else if (registerState === REGISTER_STATES.DEFAULT_VIEW) setRegisterType(REGISTER_TYPES.DEFAULT_TYPE);
     };

     return (
          <div className="flex min-h-screen flex-col items-center w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 m-auto p-1">
               <Header onBackClick={handleBackButtonClick} title={`Login with ${registerTypeTextMap[registerType]}` || "Unknown"} />
               {registerType === REGISTER_TYPES.DEFAULT_TYPE ? (
                    <OptionForRegisterView />
               ) : (<>
                    {registerState === REGISTER_STATES.DEFAULT_VIEW && <RegisterVia onSubmit={handleSubmit} />}
                    {registerState === REGISTER_STATES.OTP_VIEW && <OtpInput onSetOtp={handleSetOtp} onResendOTP={handleResendOTP} label={`We have sent you an OTP`} />}
                    {registerState === REGISTER_STATES.ADDRESS_VIEW && <SelectAddress onSelectAddress={handleSelectAddress} addresses={addresses} label={"Still want to create new ABHA address"} />}
                    {registerState === REGISTER_STATES.USER_DETAILS_FORM_VIEW && <UserDetailsForm onSubmit={handleSubmit} />}
                    {registerState === REGISTER_STATES.CREATE_ABHA_ADDRESS_VIEW && <>create abha address view</>}
               </>)}
          </div>
     );
};
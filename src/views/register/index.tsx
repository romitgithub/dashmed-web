"use client";

import { useContext, useState } from "react";
import { REGISTER_STATES, REGISTER_TYPES, RegisterFormDataContext } from "./registerDataProvider";
import { OptionForRegisterView } from "./registrationOptions";
import { SelectAddress } from "@/components/SelectAddress";
import { RegisterDetails } from "./registerDetails";
import { CreateAbhaAddress } from "./createAbhaAddress";
import { fetchPostJSONExternal } from "@/utils/apiHelpers";
import { ACCESS_TOKEN } from "@/constants";
import { toast } from "react-toastify";
import { AuthInputForm } from "@/components/authInputForm";
import Header from "@/components/header";
import { OtpInput } from "@/components/OtpInput";
import { useRouter } from "next/navigation";


// Constants for register type text
const registerTypeTextMap: Record<string, string> = {
     [REGISTER_TYPES?.DEFAULT_TYPE]: "I want to create ABHA via",
     [REGISTER_TYPES?.MOBILE_NUMBER]: "Register with Mobile Number",
     [REGISTER_TYPES?.ABHA_NUMBER]: "Register with ABHA Number",
     [REGISTER_TYPES?.EMAIL_ID]: "Register with Email-Id",
};

interface InputConfig {
     inputLabel: string;
     inputType: 'text' | 'tel' | 'email';
     maxLength: number;
     minLength: number;
     placeholder: string;
};

const registerInputConfigs: Record<string, InputConfig> = {
     [REGISTER_TYPES?.MOBILE_NUMBER]: {
          inputLabel: 'Enter Mobile Number',
          inputType: 'tel',
          maxLength: 10,
          minLength: 10,
          placeholder: 'Enter mobile number',
     },
     [REGISTER_TYPES?.ABHA_NUMBER]: {
          inputLabel: 'Enter ABHA Number',
          inputType: 'tel',
          maxLength: 14,
          minLength: 14,
          placeholder: 'Enter ABHA number',
     },
     [REGISTER_TYPES?.EMAIL_ID]: {
          inputLabel: 'Enter Email',
          inputType: 'email',
          maxLength: 50,
          minLength: 5,
          placeholder: 'Enter email',
     },
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
     const router = useRouter();

     const handleSubmit = (data: any) => {
          fetchPostJSONExternal('/phr/api/register/sendOtp', { ...data, type: registerType })
               .then((res) => {
                    console.log({ res });
                    if (res?.transaction_id) {
                         setTransactionId(res?.transaction_id);
                         setRegisterState(REGISTER_STATES?.OTP_VIEW);
                    };
               })
               .catch((err) => {
                    toast.error("Registration failed. Please try again.");
                    console.log({ err });
               });
     };


     const handleSubmitRegisterDetails = (data: any) => {
          fetchPostJSONExternal('/phr/api/register/registerDetails', {
               ...data,
               transactionId,
               type: registerType
          })
               .then((res) => {
                    console.log({ res });
                    if (res?.transaction_id) {
                         setTransactionId(res?.transactionId);
                         setRegisterState(REGISTER_STATES?.CREATE_ABHA_ADDRESS_VIEW);
                    };
               })
               .catch((err) => {
                    toast.error("Registration details invalid. Please try again.");
                    console.log({ err });
               });
     };

     const handleCreateAbhaAddress = (data: any) => {
          fetchPostJSONExternal('/phr/api/register/attachAddress', {
               ...data,
               transactionId,
               type: registerType
          })
               .then((res) => {
                    console.log({ res });
                    if (res?.transaction_id) {
                         setTransactionId(res?.transactionId);
                         setRegisterState(REGISTER_STATES?.OTP_VIEW);
                    };
               })
               .catch((err) => console.log({ err }));
     };


     // save the otp value and make network request
     const handleSubmitOtp = async (otpValue: string) => {
          fetchPostJSONExternal('/phr/api/register/verifyOtp', {
               otp: otpValue,
               transactionId,
               type: registerType,
          })
               .then((res) => {
                    console.log({ res });
                    if (res?.mappedPhrAddress && res?.transactionId) {
                         setTransactionId(res?.transactionId);
                         setAddresses(res?.mappedPhrAddress);
                         setRegisterState(REGISTER_STATES?.ADDRESS_VIEW);
                    };
               })
               .catch((err) => console.log({ err }));
     };

     const handleResendOTP = async () => {
          fetchPostJSONExternal('/phr/api/register/resendOtp', { transactionId, type: registerType })
               .then((res) => {
                    console.log({ res });
                    if (res?.transaction_id) {
                         setTransactionId(res?.transaction_id);
                         setRegisterState(REGISTER_STATES?.OTP_VIEW);
                    };
               })
               .catch((err) => {
                    toast.error("Please try again.");
                    console.log({ err });
               });
     };

     // save the selected address value and make network request
     const handleSelectAddress = async (selectedAddressValue: string) => {
          fetchPostJSONExternal('/phr/api/login/abhaAddConfirm', {
               abhaAdd: selectedAddressValue,
               transactionId,
          })
               .then((res) => {
                    console.log({ res });
                    if (res?.token) {
                         localStorage.setItem(ACCESS_TOKEN, res?.token);
                         console.log({ token: res?.token });
                         router.push('/login');
                    };
               })
               .catch((err) => console.log({ err }));
     };

     const handleContinue = () => setRegisterState(REGISTER_STATES?.USER_DETAILS_FORM_VIEW);

     const handleBackButtonClick = () => {
          if (registerState === REGISTER_STATES?.CREATE_ABHA_ADDRESS_VIEW) setRegisterState(REGISTER_STATES?.USER_DETAILS_FORM_VIEW);
          else if (registerState === REGISTER_STATES?.USER_DETAILS_FORM_VIEW) setRegisterState(REGISTER_STATES?.ADDRESS_VIEW);
          else if (registerState === REGISTER_STATES?.ADDRESS_VIEW) setRegisterState(REGISTER_STATES?.OTP_VIEW);
          else if (registerState === REGISTER_STATES?.OTP_VIEW) setRegisterState(REGISTER_STATES?.DEFAULT_VIEW);
          else if (registerState === REGISTER_STATES?.DEFAULT_VIEW) setRegisterType(REGISTER_TYPES?.DEFAULT_TYPE);
     };

     return (
          <div className="flex min-h-screen flex-col items-center w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 m-auto p-1">
               {/* <Header onBackClick={handleBackButtonClick} title={`${registerTypeTextMap[registerType]}` || "Unknown"} /> */}
               <Header title={`${registerTypeTextMap[registerType]}` || "Unknown"} onBackClick={handleBackButtonClick} showBackButton={registerType !== REGISTER_TYPES.DEFAULT_TYPE} />
               {registerType === REGISTER_TYPES?.DEFAULT_TYPE ? (
                    <OptionForRegisterView />
               ) : (<>
                    {registerState === REGISTER_STATES?.DEFAULT_VIEW && <AuthInputForm onSubmit={handleSubmit} inputType={registerType} inputConfigs={registerInputConfigs} />}
                    {registerState === REGISTER_STATES?.OTP_VIEW && <OtpInput onSubmitOtp={handleSubmitOtp} onResendOTP={handleResendOTP} label={`We have sent you an OTP`} />}
                    {registerState === REGISTER_STATES?.ADDRESS_VIEW && <SelectAddress onSelectAddress={handleSelectAddress} onContinue={handleContinue} addresses={addresses} label={"Still want to create new ABHA address"} />}
                    {registerState === REGISTER_STATES?.USER_DETAILS_FORM_VIEW && <RegisterDetails onSubmit={handleSubmitRegisterDetails} />}
                    {registerState === REGISTER_STATES?.CREATE_ABHA_ADDRESS_VIEW && <CreateAbhaAddress onSubmit={handleCreateAbhaAddress} />}
               </>)}
          </div>
     );
};
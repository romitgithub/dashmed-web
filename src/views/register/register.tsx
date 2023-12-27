"use client";

import { useContext } from "react";
import { OtpInput } from "@/components/authCommonComponents/otp";
import { SelectAddress } from "@/components/authCommonComponents/SelectAddress";
import { REGISTER_STATES, REGISTER_TYPES, RegisterFormDataContext } from "./registerDataProvider";
import { ViaMobileNo } from "./viaMobile";
import { ViaAbhaNo } from "./viaAbhaNumber";
import { ViaEmailId } from "./viaEmail";

export const RegisterVia = () => {

     const {
          registerType,
          setRegisterType,
          registerState,
          setRegisterState,
          transactionId,
          setTransactionId,
          addresses,
          setAddresses,
          handleChangeRegisterType,
     } = useContext(RegisterFormDataContext);


     const handleSubmit = (data: any) => {
          console.log({ "data": { ...data, type: registerType } });
          if (data) {
               // fetchPostJSONExternal('/phr/api/login/sendOtp', { ...data, type: loginType })
               //      .then((res) => {
               //           console.log({ res });
               //           if (res?.transactionId) {
               //                setTransactionId(res?.transactionId);
               //                setLoginState(LOGIN_STATES.OTP_VIEW);
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
               //                setLoginState(LOGIN_STATES.ADDRESS_VIEW);
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
          if (selectedAddressValue && transactionId && registerType) {
               const data = {
                    abhaAdd: selectedAddressValue,
                    transactionId,
               };
               console.log({ data });
               setRegisterState(REGISTER_STATES.FORM_CONTROL_VIEW);
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


     const renderRegisterMobileTypeStates = () => {
          switch (registerState) {
               case REGISTER_STATES.DEFAULT_VIEW:
                    return (<>
                         {registerType === REGISTER_TYPES.MOBILE_NUMBER && <ViaMobileNo onSubmit={handleSubmit} />}
                         {registerType === REGISTER_TYPES.ABHA_NUMBER && <ViaAbhaNo onSubmit={handleSubmit} />}
                         {registerType === REGISTER_TYPES.EMAIL_ID && <ViaEmailId onSubmit={handleSubmit} />}
                    </>);
               case REGISTER_STATES.OTP_VIEW:
                    return <OtpInput onSetOtp={handleSetOtp} onResendOTP={handleResendOTP} label={`We have sent you an OTP`} />
               case REGISTER_STATES.ADDRESS_VIEW:
                    return <SelectAddress onSelectAddress={handleSelectAddress} addresses={addresses} label={"Still want to create new ABHA address"} />
               case REGISTER_STATES.FORM_CONTROL_VIEW:
                    return <>form control view</>
               case REGISTER_STATES.CREATE_ABHA_ADDRESS_VIEW:
                    return <>create abha address view</>
               default: return <>No-State-found</>;
          }
     };

     return <>{renderRegisterMobileTypeStates()}</>;
};
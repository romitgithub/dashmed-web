import { FormControlChecks, LOGIN_STATES } from "@/views/login";
import { Dispatch, SetStateAction } from "react";


export async function loginFunc<T = any, Args = any>(
     url: string,
     data?: Args
): Promise<T> {
     console.log({ url, data });
     try {
          const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + url, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify(data),
          });
          if (!response.ok) {
               throw new Error('Network response was not ok');
          }
          return await response.json();
     }
     catch (err: any) {
          console.log({ err })
          throw new Error(err?.message);
     }
};



export const handleResendOTPFunc = async (formControl: FormControlChecks, setFormControl: { (value: SetStateAction<FormControlChecks>): void; (arg0: any): void; }) => {
     if (formControl?.value && formControl?.type) {
          const newData = {
               value: formControl?.value,
               type: formControl?.type,
          };
          console.log({ 'resend-otp': newData });
          const data = await loginFunc('/phr/api/login/sendOtp', newData);
          console.log({ 'data after resending otp:': data });

          if (data?.transactionId) {
               setFormControl({
                    ...formControl,
                    transactionId: data.transactionId,
               });
          }
     }
};


export const handleCommonSubmitFunc = async (formControl: FormControlChecks, setFormControl: { (value: SetStateAction<FormControlChecks>): void; (arg0: any): void; }, setLoginState: Dispatch<SetStateAction<string>>, loginType: string) => {
     if (formControl?.value && formControl?.type && loginType) {
          const newData = {
               value: formControl?.value,
               type: loginType || formControl?.type,
          };
          console.log({ newData });
          const data = await loginFunc('/phr/api/login/sendOtp', newData);
          console.log(`data sent for ${loginType} otp:`, data);

          if (data?.transactionId) {
               setLoginState(LOGIN_STATES.OTP_VIEW);
               setFormControl({
                    ...formControl,
                    transactionId: data?.transactionId,
                    type: loginType,
               });
          }
     }
};


export const handleSetOtpFunc = async (otpValue: string, formControl: FormControlChecks, setFormControl: { (value: SetStateAction<FormControlChecks>): void; (arg0: any): void; }, setLoginState: Dispatch<SetStateAction<string>>,) => {
     if (otpValue && formControl?.type && formControl?.transactionId) {
          console.log({ otpValue, formControl });

          const newData = {
               otp: otpValue,
               type: formControl?.type,
               transactionId: formControl?.transactionId,
          };
          console.log({ newData });
          const data = await loginFunc('/phr/api/login/verifyOtp', newData);
          console.log({ 'data when otp submitted:': data });

          if (data?.mappedPhrAddress) {
               setLoginState(LOGIN_STATES.ADDRESS_VIEW);
               setFormControl({
                    ...formControl,
                    transactionId: data?.transactionId || '12345',
                    otp: otpValue,
                    addresses: data?.mappedPhrAddress?.length > 0 ? data?.mappedPhrAddress : ['ram', 'rahim'],
               });
          }
     }
};

export const handleSelectAddressFunc = async (
     selectedAddressValue: string,
     formControl: FormControlChecks,
     setFormControl: { (value: SetStateAction<FormControlChecks>): void; (arg0: any): void; }
) => {
     setFormControl({
          ...formControl,
          selectedAddress: selectedAddressValue,
     });
     console.log({ selectedAddressValue, formControl });

     if (selectedAddressValue && formControl?.transactionId) {
          const newData = {
               abhaAdd: selectedAddressValue || formControl?.selectedAddress,
               transactionId: formControl?.transactionId,
          };
          console.log({ newData });
          const data = await loginFunc('/phr/api/login/abhaAddConfirm', newData);
          console.log({ 'data when address submitted:': data });
     }
};

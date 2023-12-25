import { FormControlChecks } from "@/app/login/page";
import { SetStateAction } from "react";


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



export const handleSubmitMobileNumberFunc = async (formControl: FormControlChecks, setFormControl: { (value: SetStateAction<FormControlChecks>): void; (arg0: any): void; }, MOBILE: string, OTP_SECTION: string) => {

     if (formControl?.value && formControl?.type) {
          const newData = {
               value: formControl?.value,
               type: MOBILE || formControl?.type,
          };
          console.log({ newData });
          const data = await loginFunc('/phr/api/login/sendOtp', newData);
          console.log({ 'data when mobile no sent:': data });

          if (data?.transactionId) {
               setFormControl({
                    ...formControl,
                    transactionId: data.transactionId,
                    type: MOBILE,
                    viewSection: OTP_SECTION,
               });
          }
     }
};


export const handleSubmitEmailIdFunc = async (formControl: FormControlChecks, setFormControl: { (value: SetStateAction<FormControlChecks>): void; (arg0: any): void; }, EMAIL: string, OTP_SECTION: string) => {
     if (formControl?.value && formControl?.type) {
          const newData = {
               value: formControl?.value,
               type: EMAIL || formControl?.type,
          };
          console.log({ newData });
          const data = await loginFunc('/phr/api/login/sendOtp', newData);
          console.log({ 'data when email id sent:': data });

          if (data?.transactionId) {
               setFormControl({
                    ...formControl,
                    transactionId: data?.transactionId,
                    type: EMAIL,
                    viewSection: OTP_SECTION,
               });
          }
     }
};


export const handleSubmitAbhaNumberFunc = async (formControl: FormControlChecks, setFormControl: { (value: SetStateAction<FormControlChecks>): void; (arg0: any): void; }, ABHA_NO: string, OTP_SECTION: string) => {
     if (formControl?.value && formControl?.type) {
          const newData = {
               value: formControl?.value,
               type: ABHA_NO || formControl?.type,
          };
          console.log({ newData });
          const data = await loginFunc('/phr/api/login/sendOtp', newData);
          console.log({ 'data when abha no sent:': data });

          if (data?.transactionId) {
               setFormControl({
                    ...formControl,
                    transactionId: data.transactionId,
                    type: ABHA_NO,
                    viewSection: OTP_SECTION,
               });
          }
     }
};


export const handleSetOtpFunc = async (otpValue: string, formControl: FormControlChecks, setFormControl: { (value: SetStateAction<FormControlChecks>): void; (arg0: any): void; }, ADDRESS_SECTION: string) => {
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
               setFormControl({
                    ...formControl,
                    transactionId: data?.transactionId || '12345',
                    otp: otpValue,
                    viewSection: ADDRESS_SECTION,
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

          // if (data?.mappedPhrAddress) {
          //      setFormControl({
          //           ...formControl,
          //           addresses: data?.mappedPhrAddress || [],
          //      });
          // }
     }
};

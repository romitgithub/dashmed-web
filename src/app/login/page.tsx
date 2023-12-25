"use client";

import { SelectAddress } from "@/components/login/SelectAddress";
import { OtpInput } from "@/components/login/otp";
import { ABHA_ADD, ABHA_NO, ADDRESS_SECTION, EMAIL, MOBILE, OTP_SECTION } from "@/constants";
import { handleSelectAddressFunc, handleSetOtpFunc, handleSubmitAbhaNumberFunc, handleSubmitEmailIdFunc, handleSubmitMobileNumberFunc, loginFunc } from "@/utils/apiHelpers";
import { useState } from "react";

export interface FormControlChecks {
  transactionId: string;
  value: string;
  abhaPassword: string;
  type: string;
  selectedAddress: string;
  otp: string;
  otpOption: string;
  viewSection: string;
  addresses: string[] | null;
  forgetAbhaPassword: boolean;
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
  type: 'MOBILE',
  otp: '',
  viewSection: '',
  otpOption: '',
  addresses: null,
  forgetAbhaPassword: false,
};


const Login: React.FC = () => {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formControl, setFormControl] = useState<FormControlChecks>(initialFormControl);

  // Function to reset the formControl state to initial values
  const resetFormControl = () => {
    setFormControl(initialFormControl);
  };

  // change the login options with the toggle function
  const handleToggleType = (value: string): void => {
    resetFormControl();
    setFormControl({
      ...formControl,
      value: '',
      type: value,
    });
  };

  // manage input fields in forms
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, type } = e.target;
    if (type === 'radio') {
      setFormControl({
        ...formControl,
        otpOption: value,
      });
    } else {
      setFormControl({
        ...formControl,
        [name]: value,
      });
    }
  };

  // save the mobile number as the value and make network request

  const handleSubmitMobileNumber = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await handleSubmitMobileNumberFunc(formControl, setFormControl, MOBILE, OTP_SECTION);
  };


  // save the mail-id as the value and make network request
  const handleSubmitEmailId = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await handleSubmitEmailIdFunc(formControl, setFormControl, EMAIL, OTP_SECTION);
  };


  // save the ABHA number as the value and make network request
  const handleSubmitAbhaNumber = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await handleSubmitAbhaNumberFunc(formControl, setFormControl, ABHA_NO, OTP_SECTION);
  };


  // const handleSetOtp = async (otpValue: string) => {
  //   if (otpValue && formControl?.type && formControl?.transactionId) {
  //     console.log({ otpValue, formControl });

  //     const newData = {
  //       "otp": otpValue,
  //       "type": formControl?.type,
  //       "transactionId": formControl?.transactionId,
  //     };
  //     console.log({ newData });
  //     const data = await loginFunc('/phr/api/login/verifyOtp', newData);
  //     console.log({ 'data when otp submitted:': data });

  //     if (data?.mappedPhrAddress) {
  //       setFormControl({
  //         ...formControl,
  //         transactionId: data?.transactionId,
  //         otp: otpValue,
  //         viewSection: ADDRESS_SECTION,
  //         addresses: data?.mappedPhrAddress?.length > 0 ? data?.mappedPhrAddress : [],
  //       });
  //     }
  //   }
  // };


  // const handleSelectAddress = async (selectedAddressValue: string) => {
  //   setFormControl({
  //     ...formControl,
  //     selectedAddress: selectedAddressValue,
  //   });
  //   console.log({ selectedAddressValue, formControl });

  //   if (selectedAddressValue && formControl?.transactionId) {
  //     const newData = {
  //       "abhaAdd": selectedAddressValue || formControl?.selectedAddress,
  //       "transactionId": formControl?.transactionId,
  //     };
  //     console.log({ newData });
  //     const data = await loginFunc('/phr/api/login/abhaAddConfirm', newData);
  //     console.log({ 'data when address submitted:': data });

  //     if (data?.mappedPhrAddress) {
  //       setFormControl({
  //         ...formControl,
  //         addresses: data?.mappedPhrAddress || [],
  //       });
  //     }
  //   }
  // }

  // save the otp value and make network request
  const handleSetOtp = async (otpValue: string) => {
    await handleSetOtpFunc(otpValue, formControl, setFormControl, ADDRESS_SECTION);
  };

  // save the selected address value and make network request
  const handleSelectAddress = async (selectedAddressValue: string) => {
    await handleSelectAddressFunc(selectedAddressValue, formControl, setFormControl);
  };

  // save the ABHA address as the value and make network request
  const handleSubmitAbhaAddress = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (formControl?.value && formControl?.type && formControl?.abhaPassword && formControl?.otpOption) {
      const newData = {
        value: formControl?.value,
        type: formControl?.type,
        otpOption: formControl?.otpOption,
        abhaPassword: formControl?.abhaPassword,
      };
      console.log({ newData });
    }
  };

  // while doing login with abha credential and forget password
  const handleForgetAbhaPassword = () => {
    setFormControl({
      ...formControl,
      forgetAbhaPassword: true,
    });
  };

  // one step back from otp-section-view
  const handleBackFromOtpPage = () => {
    console.log("back from otp page");
    resetFormControl();
  };

  // one step back from select address-section-view
  const handleBackFromSelectAddressPage = () => {
    console.log("back from address page");
    setFormControl({
      ...formControl,
      otp: '',
      viewSection: OTP_SECTION,
    });
  };


  if (formControl?.forgetAbhaPassword) {
    return (
      <>forget abha password</>
    );
  };

  console.log({ formControl })
    ;
  return (
    <>
      {/* lOGIN WITH MOBILE  */}
      {formControl?.type === MOBILE && !formControl?.viewSection && (
        <div className="flex min-h-screen flex-col items-center justify-between w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 m-auto p-1">
          <>
            <div className="w-full m-2 p-2 flex flex-col mt-2 sm:mt-2 md:mt-2 lg:mt-4 xl:mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-center lg:justify-center xl:justify-center">
                <span className="font-semibold sm:text-lg md:text-2xl lg:text-3xl xl:text-3xl">Hello!</span>
                {" "}
                <span className="ml-0 sm:ml-3 font-semibold sm:text-lg md:text-2xl lg:text-3xl xl:text-3xl">Romit Choudhary</span>
              </div>
              <div>
                <form onSubmit={handleSubmitMobileNumber} className='pt-5 pb5'>
                  <label>Enter mobile number</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="tel"
                      className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
                      placeholder="Enter mobile number"
                      value={formControl?.value}
                      name='value'
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='mt-5 mb-5'>
                    <button
                      type="submit"
                      className="p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300"
                    >
                      Sign in / Sign up
                    </button>
                  </div>
                </form>
              </div>
              <div className="flex flex-col w-full justify-center align-middle">
                <span className="m-auto text-xl">Or</span>
                <span className="block text-center mt-5 font-medium text-teal-700">Login via</span>
                <div className="flex flex-col w-full justify-center align-middle mt-5">
                  <button onClick={() => handleToggleType(ABHA_ADD)} className="border border-#1b5887 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg w-full py-1 px-1 mt-2 rounded-md text-#1b5887 font-medium transition duration-300 cursor-pointer">ABHA Address</button>
                  <button onClick={() => handleToggleType(EMAIL)} className="border border-#1b5887 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg w-full py-1 px-1 mt-2 rounded-md text-#1b5887 font-medium transition duration-300 cursor-pointer">Email ID</button>
                  <button onClick={() => handleToggleType(ABHA_NO)} className="border border-#1b5887 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg w-full py-1 px-1 mt-2 rounded-md text-#1b5887 font-medium transition duration-300 cursor-pointer">ABHA Number</button>
                </div>
              </div>
            </div>
            <div>
              <div>
                <span className="font-medium block text-center text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg">{"Don't have an ABHA Address?"}</span>
                <span className="flex justify-center align-middle font-medium text-teal-700">Register</span>
              </div>
              <div className="mt-4 mb-4">
                <span className="font-medium block text-center text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg">{"Don't have an ABHA number?"}</span>
                <span className="flex justify-center align-middle font-medium text-teal-700">Create Now</span>
              </div>
              <div className="mb-3">
                <span className="flex justify-center align-middle mt-2 font-medium text-teal-700 text-sm underline">Privacy Policy</span>
              </div>
            </div>
          </>
        </div>)}


      {/* lOGIN WITH ABHA ADDRESS  */}
      {formControl?.type === ABHA_ADD && !formControl?.viewSection && (
        <div className="flex min-h-screen flex-col items-center justify-between w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 m-auto p-1">
          <div className="w-full m-2 p-2 flex flex-col mt-2 sm:mt-2 md:mt-2 lg:mt-4 xl:mt-6">
            <div className="flex flex-row items-center justify-center relative" >
              <span className="absolute cursor-pointer top-0 left-0 mt-0 ml-0 p-1" onClick={() => handleToggleType(MOBILE)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </span>
              <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">Login with ABHA Address</span>
            </div>

            <div>
              <form onSubmit={handleSubmitAbhaAddress} className='pt-5 pb-5'>
                <div className="flex flex-col border-red-500 pb-5">
                  <label>Enter your ABHA address</label>
                  <div className="rounded border border-gray-300 flex mt-2 items-center space-x-2">
                    <input
                      type="email"
                      className="p-2 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
                      placeholder="Example@abdm"
                      value={formControl?.value}
                      name='value'
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col border-red-500 pt-5">
                  <label className="mt-7">Enter your password</label>
                  <div className="rounded border border-gray-300 flex items-center space-x-2 mt-2 mb-5">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="p-2   flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
                      placeholder="Enter ABHA password"
                      value={formControl?.abhaPassword}
                      name='abhaPassword'
                      onChange={handleInputChange}
                      maxLength={14}
                      minLength={14}
                    />
                    <span onClick={() => setShowPassword((prev) => !prev)} className="pr-4">
                      {
                        !showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>

                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>
                        )
                      }
                    </span>
                  </div>
                </div>

                <div className="flex w-full justify-between">
                  <label className="flex items-center space-x-2 text-teal-500">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-teal-500 rounded border-gray-300 focus:ring-teal-500"
                    />
                    <span className="text-xs sm:text-sm lg:text-md">Remember me</span>
                  </label>
                  <label className="text-teal-500 text-xs sm:text-sm lg:text-md" onClick={handleForgetAbhaPassword}>Forget ABHA Number?</label>
                </div>
                <span className="flex justify-center align-middle p-2">Or</span>
                <div>
                  <label className="font-semibold">Validate Using</label>
                  <div className="flex flex-col">
                    <label className="mt-3">
                      <input
                        type="radio"
                        value="Email OTP"
                        checked={formControl.otpOption === "Email OTP"}
                        onChange={handleInputChange}
                      />
                      <span className="pl-3">Email OTP</span>
                    </label>
                    <label className="mt-3">
                      <input
                        type="radio"
                        value="Mobile OTP"
                        checked={formControl?.otpOption === "Mobile OTP"}
                        onChange={handleInputChange}
                      />
                      <span className="pl-2"> Mobile OTP</span>
                    </label>
                  </div>
                </div>
                <div className='mt-5 mb-5'>
                  <button
                    type="submit"
                    className="p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>)}


      {/* lOGIN WITH ABHA NUMBER  */}
      {formControl?.type === ABHA_NO && !formControl?.viewSection && (
        <div className="flex min-h-screen flex-col items-center justify-between w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 m-auto p-1">
          <div className="w-full m-2 p-2 flex flex-col mt-2 sm:mt-2 md:mt-2 lg:mt-4 xl:mt-6">
            <div className="flex flex-row items-center justify-center relative" >
              <span className="absolute cursor-pointer top-0 left-0 mt-0 ml-0 p-1" onClick={() => handleToggleType(MOBILE)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </span>
              <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">Login with ABHA Number</span>
            </div>
            <div>
              <form onSubmit={handleSubmitAbhaNumber} className='pt-5 pb5'>
                <label>Enter your ABHA Number</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="tel"
                    className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
                    placeholder="Enter ABHA Number"
                    value={formControl?.value}
                    name='value'
                    onChange={handleInputChange}
                    maxLength={14}
                    minLength={14}
                  />
                </div>
                <label className="w-full mt-5 flex justify-end text-teal-500 ">Forget ABHA Number?</label>
                <div className='mt-5 mb-5'>
                  <button
                    type="submit"
                    className="p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>)}


      {/* lOGIN WITH EMAIL ID  */}
      {formControl?.type === EMAIL && !formControl?.viewSection && (
        <div className="flex min-h-screen flex-col items-center justify-between w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 m-auto p-1">
          <div className="w-full m-2 p-2 flex flex-col mt-2 sm:mt-2 md:mt-2 lg:mt-4 xl:mt-6">
            <div className="flex flex-row items-center justify-center relative" >
              <span className="absolute cursor-pointer top-0 left-0 mt-0 ml-0 p-1" onClick={() => handleToggleType(MOBILE)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </span>
              <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">Login with Email ID</span>
            </div>
            <div>
              <form onSubmit={handleSubmitEmailId} className='pt-5 pb5'>
                <label>Enter your email address</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="email"
                    className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
                    placeholder="Example@gmail.com"
                    value={formControl?.value}
                    name="value"
                    onChange={handleInputChange}
                  />
                </div>
                <div className='mt-5 mb-5'>
                  <button
                    type="submit"
                    className="p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300"
                  >
                    CONTINUE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>)}

      <>
        {formControl?.viewSection === OTP_SECTION &&
          <div className="flex min-h-screen flex-col items-center justify-between w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 m-auto p-1">
            <div className="w-full m-2 p-2 flex flex-col mt-2 sm:mt-2 md:mt-2 lg:mt-4 xl:mt-6">
              <div className="flex flex-row items-center justify-center relative" >
                <span className="absolute cursor-pointer top-0 left-0 mt-0 ml-0 p-1" onClick={handleBackFromOtpPage}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </span>
                <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">
                  {formControl?.type === MOBILE && "Login with Mobile Number"}
                  {formControl?.type === ABHA_ADD && "Login with Mobile Number"}
                  {formControl?.type === ABHA_NO && "Login with Mobile Number"}
                  {formControl?.type === EMAIL && "Login with Email Id"}
                </span>
              </div>
              <div>
                <OtpInput onSetOtp={handleSetOtp} />
              </div>
            </div>
          </div>}
      </>
      <>
        {formControl?.viewSection === ADDRESS_SECTION &&
          <div className="flex min-h-screen flex-col items-center justify-between w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 m-auto p-1">
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-row items-center justify-center relative p-2 w-full" >
                <span className="absolute cursor-pointer top-2 left-0 mt-0 ml-0 p-1" onClick={handleBackFromSelectAddressPage}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </span>
                <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">Login with Mobile Number</span>
              </div>
              <div className="flex flex-row items-center justify-center mt-5">
                <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-xl xl:text-2xl mb-4 text-center">Select the ABHA Address through which you wish to login</span>
              </div>
              <div className="flex flex-col items-center w-full m-auto p-1">
                <SelectAddress onSelectAddress={handleSelectAddress} formControl={formControl} />
              </div>
            </div>
          </div>}
      </>
    </>
  );
};

export default Login;

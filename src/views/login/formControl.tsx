import { useEffect, useState } from "react";
import { LOGIN_TYPES } from ".";
import AbhaAddressInputField from "./abhaAddressInputFields";

interface FormControlSectionProps {
     loginType?: string;
     onSubmit: (formData: Record<string, any>) => void;
};


export const FormControlSection: React.FC<FormControlSectionProps> = ({ onSubmit, loginType }) => {

     const [loginFormData, setLoginFormData] = useState<Record<string, any> | null>(null);

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { value, name } = e.target;
          setLoginFormData({
               ...loginFormData,
               [name]: value,
          });
     };

     const handleSubmitFunc = (event: React.FormEvent<HTMLFormElement>): void => {
          event.preventDefault();
          if (onSubmit && loginFormData) onSubmit(loginFormData);
     };

     useEffect(() => {
          setLoginFormData(null); // Reset loginFormData to null or initial empty state when loginType changes
     }, [loginType]);


     return (
          <form onSubmit={handleSubmitFunc} className="pt-5 pb5 w-full">
               {
                    loginType === LOGIN_TYPES.MOBILE && <>
                         <label>Enter mobile number</label>
                         <div className="flex items-center space-x-2">
                              <input
                                   type="tel"
                                   className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
                                   placeholder="Enter mobile number"
                                   value={loginFormData?.value}
                                   name='value'
                                   maxLength={10}
                                   minLength={10}
                                   required
                                   onChange={handleInputChange}
                              />
                         </div>
                    </>
               }

               {
                    loginType === LOGIN_TYPES.ABHA_NO && <>
                         <label className="flex w-full">Enter your ABHA Number</label>
                         <div className="flex w-full items-center space-x-2">
                              <input
                                   type="tel"
                                   className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
                                   placeholder="Enter ABHA Number"
                                   value={loginFormData?.value}
                                   name='value'
                                   onChange={handleInputChange}
                                   maxLength={14}
                                   minLength={14}
                                   required
                              />
                         </div>
                         <label className="w-full mt-5 flex justify-end text-teal-500 ">Forget ABHA Number?</label>
                    </>
               }

               {
                    loginType === LOGIN_TYPES.EMAIL && <>
                         <label>Enter your email address</label>
                         <div className="flex items-center space-x-2">
                              <input
                                   type="email"
                                   className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
                                   placeholder="Example@gmail.com"
                                   value={loginFormData?.value}
                                   name='value'
                                   maxLength={50}
                                   minLength={5}
                                   required
                                   onChange={handleInputChange}
                              />
                         </div>
                    </>
               }

               {loginType === LOGIN_TYPES.ABHA_ADD && <AbhaAddressInputField onAbhaInputChange={handleInputChange} loginFormData={loginFormData} />}

               <div className='mt-5 mb-5'>
                    <button
                         type="submit"
                         className="p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300"
                    >
                         {loginType === LOGIN_TYPES.MOBILE ? "Sign in / Sign up" : "CONTINUE"}
                    </button>
               </div>
          </form>
     );
};


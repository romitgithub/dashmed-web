import { useState } from "react";
import { FormControlChecks, LOGIN_TYPES } from ".";
import { ViewPasswordIcon } from "@/atoms/showPasswordIcon";
import { HidePasswordIcon } from "@/atoms/hidePasswordIcon";
import { Checkbox } from "@/atoms/checkbox";

interface FormControlSectionProps {
     formControl?: FormControlChecks;
     loginType?: string;
     setFormControl?: React.Dispatch<React.SetStateAction<FormControlChecks>>;
     setLoginState: React.Dispatch<React.SetStateAction<string>>;
     handleSubmit: () => void;
};

export const FormControlSection: React.FC<FormControlSectionProps> = ({ handleSubmit, loginType, formControl, setFormControl }) => {

     const [showPassword, setShowPassword] = useState<boolean>(false);

     // manage input fields in forms
     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { value, name, type } = e.target;
          if (setFormControl) {
               setFormControl({
                    ...formControl!,
                    [name]: value,
               });
          }
     };

     const handleSubmitFunc = (event: { preventDefault: () => void; }): void => {
          event.preventDefault();
          if (handleSubmit) {
               handleSubmit();
          }
     };


     const renderLoginSection = () => {
          switch (loginType) {
               case LOGIN_TYPES.MOBILE:
                    return (
                         <>
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
                         </>
                    );
               case LOGIN_TYPES.ABHA_NO:
                    return (
                         <>
                              <label className="flex w-full">Enter your ABHA Number</label>
                              <div className="flex w-full items-center space-x-2">
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
                         </>
                    );
               case LOGIN_TYPES.EMAIL:
                    return (
                         <>
                              <label>Enter your email address</label>
                              <div className="flex items-center space-x-2">
                                   <input
                                        type="email"
                                        className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
                                        placeholder="Example@gmail.com"
                                        value={formControl?.value}
                                        name='value'
                                        onChange={handleInputChange}
                                   />
                              </div>
                         </>
                    );
               case LOGIN_TYPES.ABHA_ADD:
                    return (
                         <>
                              <label>Enter your ABHA address</label>
                              <div className="rounded border border-gray-300 flex mt-2 items-center space-x-2 mb-5">
                                   <input
                                        type="email"
                                        className="p-2 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
                                        placeholder="Example@abdm"
                                        value={formControl?.value}
                                        name='value'
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <label className="mt-5">Enter your password</label>
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
                                        {!showPassword ? (<ViewPasswordIcon />) : (<HidePasswordIcon />)}
                                   </span>
                              </div>
                              <div className="flex w-full justify-between">
                                   <label className="flex items-center space-x-2 text-teal-500">
                                        <Checkbox label={"Remember me"} id={""} />
                                   </label>
                                   <label className="text-teal-500 text-xs sm:text-sm lg:text-md">Forget ABHA Number?</label>
                              </div>
                              <span className="flex justify-center align-middle p-2">Or</span>
                              <div>
                                   <label className="font-semibold">Validate Using</label>
                                   <div className="flex flex-col">
                                        <label className="mt-3">
                                             <input
                                                  type="radio"
                                                  value="Email OTP"
                                             />
                                             <span className="pl-3">Email OTP</span>
                                        </label>
                                        <label className="mt-3">
                                             <input
                                                  type="radio"
                                                  value="Mobile OTP"
                                             />
                                             <span className="pl-2"> Mobile OTP</span>
                                        </label>
                                   </div>
                              </div>
                         </>
                    );
               default:
                    return <></>;
          }
     };


     return (
          <form onSubmit={handleSubmitFunc} className="pt-5 pb5">
               {renderLoginSection()}
               {/* Submit button */}
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


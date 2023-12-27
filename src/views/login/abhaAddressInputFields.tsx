import { useState } from 'react';
import { Checkbox } from '@/atoms/checkbox';
import { ViewPasswordIcon } from '@/atoms/showPasswordIcon';
import { HidePasswordIcon } from '@/atoms/hidePasswordIcon';


interface AbhaAddressInputFieldProps {
     onAbhaInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
     loginFormData: any;
};


const AbhaAddressInputField: React.FC<AbhaAddressInputFieldProps> = ({ onAbhaInputChange, loginFormData }) => {

     const [showPassword, setShowPassword] = useState<boolean>(false);

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (onAbhaInputChange) onAbhaInputChange(e)
     };

     return (
          <>
               <label>Enter your ABHA address</label>
               <div className="rounded border border-gray-300 flex mt-2 items-center space-x-2 mb-5">
                    <input
                         type="email"
                         className="p-2 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
                         placeholder="Example@abdm"
                         value={loginFormData?.value}
                         name="value"
                         onChange={handleInputChange}
                    />
               </div>
               <label className="mt-5">Enter your password</label>
               <div className="rounded border border-gray-300 flex items-center space-x-2 mt-2 mb-5">
                    <input
                         type={showPassword ? 'text' : 'password'}
                         className="p-2   flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
                         placeholder="Enter ABHA password"
                         value={loginFormData?.password}
                         name="abhaPassword"
                         onChange={handleInputChange}
                         maxLength={14}
                         minLength={14}
                    />
                    <span onClick={() => setShowPassword((prev) => !prev)} className="pr-4">
                         {!showPassword ? <ViewPasswordIcon /> : <HidePasswordIcon />}
                    </span>
               </div>
               <div className="flex w-full justify-between">
                    <label className="flex items-center space-x-2 text-teal-500">
                         <Checkbox label={'Remember me'} id={''} />
                    </label>
                    <label className="text-teal-500 text-xs sm:text-sm lg:text-md">Forget ABHA Number?</label>
               </div>
               <span className="flex justify-center align-middle p-2">Or</span>
               <div>
                    <label className="font-semibold">Validate Using</label>
                    <div className="flex flex-col">
                         <label className="mt-3">
                              <input type="radio" value="Email OTP" />
                              <span className="pl-3">Email OTP</span>
                         </label>
                         <label className="mt-3">
                              <input type="radio" value="Mobile OTP" />
                              <span className="pl-2"> Mobile OTP</span>
                         </label>
                    </div>
               </div>
          </>
     );
};

export default AbhaAddressInputField;

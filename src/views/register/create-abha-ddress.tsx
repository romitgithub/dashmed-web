import { Button } from '@/atoms/button';
import { HidePasswordIcon } from '@/atoms/hide-password-icon';
import AppInput from '@/atoms/input';
import { ViewPasswordIcon } from '@/atoms/show-password-icon';
import React, { useState } from 'react';

interface Props {
     onSubmit: (formData: { phrAddress: string | null; password: string | null }) => void;
};


export const CreateAbhaAddress: React.FC<Props> = ({ onSubmit }) => {

     const [phrAddress, setPhrAddress] = useState<string | null>(null);
     const [password, setPassword] = useState<string | null>(null);
     const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

     const [showPassword, setShowPassword] = useState<boolean>(false);
     const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

     const [abhaError, setAbhaError] = useState<string | null>(null);
     const [passwordError, setPasswordError] = useState<string | null>(null);


     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          // Validation check for ABHA address format
          const abhaAddressRegex = /^[^\s@]+@abdm$/;
          if (!abhaAddressRegex.test(phrAddress || '')) return setAbhaError('ABHA address should end with "@abdm"');
          else setAbhaError(null);

          // Password strength validation (customize this as needed)
          const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
          if (!passwordRegex.test(password || '')) return setPasswordError('Password must contain at least 6 characters, including one uppercase letter, one lowercase letter, and one number.');
          if (password !== confirmPassword) return setPasswordError('Passwords do not match');
          setPasswordError(null);

          onSubmit({ phrAddress, password });
     };

     return (
          <form onSubmit={handleSubmit} className='w-full'>
               <div className='w-full flex flex-col'>
                    <label>Create New ABHA Address</label>
                    <AppInput
                         className="p-2 rounded border border-gray-300 flex-1 w-full mt-2"
                         type="text"
                         name={"phrAddress"}
                         value={phrAddress || ''}
                         onChange={(e: any) => setPhrAddress(e.target.value)}
                         placeholder="Example@abdm"
                    />
                    {abhaError && <span className="text-red-500">{abhaError}</span>}
               </div>

               <div className='w-full flex flex-col mt-10'>
                    <label>Create Your Password</label>
                    <div className="rounded border border-gray-300 flex items-center space-x-2 mt-2 mb-5">
                         <AppInput
                              className="pl-2 flex-1 w-full"
                              type={showPassword ? "text" : "password"}
                              name={"password"}
                              value={password || ''}
                              onChange={(e: any) => setPassword(e.target.value)}
                              placeholder="Password"
                         />
                         <span onClick={() => setShowPassword((prev) => !prev)} className="pr-4">
                              {!showPassword ? <ViewPasswordIcon /> : <HidePasswordIcon />}
                         </span>
                    </div>

                    {passwordError && <span className="text-red-500">{passwordError}</span>}

                    <div className="rounded border border-gray-300 flex items-center space-x-2 mt-2 mb-5">
                         <AppInput
                              className="pl-2 flex-1 w-full"
                              type={showConfirmPassword ? "text" : "password"}
                              name={"confirmPassword"}
                              value={confirmPassword || ''}
                              onChange={(e: any) => setConfirmPassword(e.target.value)}
                              placeholder="Confirm password"
                         />
                         <span onClick={() => setShowConfirmPassword((prev) => !prev)} className="pr-4">
                              {!showConfirmPassword ? <ViewPasswordIcon /> : <HidePasswordIcon />}
                         </span>
                    </div>
               </div>

               <Button className="p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300 mt-5" >SUBMIT</Button>
          </form>
     );
};

import { Button, ButtonProps } from '@/atoms/button';
import React, { useState } from 'react';

interface Props {
     onSubmit: (formData: { phrAddress: string | null; password: string | null }) => void;
};


export const CreateAbhaAddress: React.FC<Props> = ({ onSubmit }) => {

     const [phrAddress, setPhrAddress] = useState<string | null>(null);
     const [password, setPassword] = useState<string | null>(null);
     const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          onSubmit({ phrAddress, password });
     };

     const buttonProps: ButtonProps = {
          label: 'SUBMIT',
          type: "submit",
     };

     return (
          <form onSubmit={handleSubmit} className='w-full'>
               <div className='w-full flex flex-col'>
                    <label>Create New ABHA Address</label>
                    <input
                         className="p-2 rounded border border-gray-300 flex-1 w-full mt-2"
                         type="text"
                         name={"phrAddress"}
                         value={phrAddress || ''}
                         onChange={(e) => setPhrAddress(e.target.value)}
                         placeholder="Example@abdm"
                    />
               </div>

               <div className='w-full flex flex-col mt-10'>
                    <label>Create Your Password</label>
                    <input
                         className="p-2 rounded border border-gray-300 flex-1 w-full mt-2"
                         type="password"
                         name={"password"}
                         value={password || ''}
                         onChange={(e) => setPassword(e.target.value)}
                         placeholder="Password"
                    />
                    <input
                         className="p-2 rounded border border-gray-300 flex-1 w-full mt-3"
                         type="password"
                         name={"confirmPassword"}
                         value={confirmPassword || ''}
                         onChange={(e) => setConfirmPassword(e.target.value)}
                         placeholder="Confirm password"
                    />
               </div>

               <div className='mt-5'>
                    <Button
                         {...buttonProps}
                         className="p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300" />
               </div>
          </form>
     );
};

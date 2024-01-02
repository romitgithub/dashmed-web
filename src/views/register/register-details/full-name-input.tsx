import React from 'react';
import AppInput from '@/atoms/input';

interface FullNameProps {
     registerDetails: any; // Update with the proper UserDetails type
     onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

const FullNameInput: React.FC<FullNameProps> = ({ registerDetails, onInputChange }) => {
     return (
          <div className="w-full flex flex-col ">
               <label>Full Name</label>
               <div className="flex w-full flex-col md:flex-row lg:flex-row">
                    <div className="flex w-full flex-col md:flex-row lg:flex-row">
                         <AppInput
                              className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2 m-1"
                              type="text"
                              name={"firstName"}
                              value={registerDetails?.firstName}
                              onChange={onInputChange}
                              required
                              placeholder="First Name"
                         />
                         <AppInput
                              className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2 m-1"
                              type="text"
                              name={"middleName"}
                              value={registerDetails?.middleName}
                              onChange={onInputChange}
                              placeholder="Middle Name"
                         />
                         <AppInput
                              className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2 m-1"
                              type="text"
                              required
                              name={"lastName"}
                              value={registerDetails?.lastName}
                              onChange={onInputChange}
                              placeholder="Last Name"
                         />
                    </div>
               </div>
          </div>
     );
};

export default FullNameInput;

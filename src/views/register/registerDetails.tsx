import { Button, ButtonProps } from '@/atoms/button';
import { districts, states } from '@/constants';
import React, { ChangeEvent, useState } from 'react';

interface UserDetails {
     countryCode?: string;
     dayOfBirth?: string;
     districtName?: string;
     email?: string;
     firstName?: string;
     gender?: string;
     lastName?: string;
     middleName?: string;
     mobile?: string;
     monthOfBirth?: string;
     pinCode?: string;
     stateName?: string;
     yearOfBirth?: string;
     address?: string;
};

interface Props {
     onSubmit: (registerDetails: UserDetails) => void;
};

export const RegisterDetails: React.FC<Props> = ({ onSubmit }) => {

     const [registerDetails, setRegisterDetails] = useState<UserDetails>({});

     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
          const { name, value } = e.target;
          setRegisterDetails({
               ...registerDetails,
               [name]: value,
          });
     };

     const onDateChange = (field: any, value: any) => setRegisterDetails((prevDate) => ({ ...prevDate, [field]: value }));

     const generateOptions = (start: number, end: number) =>
          Array.from({ length: end - start + 1 }, (_, index) => start + index).map((value) => (
               <option key={value} value={value}>
                    {value}
               </option>
          ));

     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          onSubmit(registerDetails);
     };

     const buttonProps: ButtonProps = {
          label: 'CONTINUE',
          type: "submit",
     };

     return (
          <form onSubmit={handleSubmit}>
               <div className='w-full flex flex-col'>
                    <label>Full Name</label>
                    <div className='flex w-full'>
                         <input
                              className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2 m-1"
                              type="text"
                              name={registerDetails?.firstName}
                              value={registerDetails?.firstName}
                              onChange={handleChange}
                              required
                              placeholder="First Name"
                         />
                         <input
                              className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2 m-1"
                              type="text"
                              name={registerDetails?.middleName}
                              value={registerDetails?.middleName}
                              onChange={handleChange}
                              placeholder="Middle Name"
                         />
                         <input
                              className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2 m-1"
                              type="text"
                              required
                              name={registerDetails?.lastName}
                              value={registerDetails?.lastName}
                              onChange={handleChange}
                              placeholder="Last Name"
                         />
                    </div>
               </div>
               <div className='w-full flex mt-5'>
                    <div className='flex flex-col m-1 w-1/3'>
                         <label>Day:</label>
                         <select
                              className="p-2 rounded border border-gray-300 flex-1 w-full m-1"
                              value={registerDetails?.dayOfBirth}
                              required
                              onChange={(e) => onDateChange(registerDetails?.dayOfBirth, parseInt(e.target.value))}>
                              {generateOptions(1, 31)}
                         </select>
                    </div>
                    <div className='flex flex-col m-1 w-1/3'>
                         <label>Month:</label>
                         <select
                              className="p-2 rounded border border-gray-300 flex-1 w-full m-1"
                              value={registerDetails?.monthOfBirth}
                              required
                              onChange={(e) => onDateChange(registerDetails?.monthOfBirth, parseInt(e.target.value))}>
                              {generateOptions(1, 12)}
                         </select>
                    </div>
                    <div className='flex flex-col m-1 w-1/3'>
                         <label>Year:</label>
                         <select
                              className="p-2 rounded border border-gray-300 flex-1 w-full m-1"
                              value={registerDetails?.yearOfBirth}
                              required
                              onChange={(e) => onDateChange(registerDetails?.yearOfBirth, parseInt(e.target.value))}>
                              {generateOptions(1900, new Date().getFullYear())}
                         </select>
                    </div>
               </div>


               <div className='w-full flex flex-col mt-5'>
                    <label>State</label>
                    <select
                         className="p-2 rounded border border-gray-300 flex-1 w-full m-1"
                         value={registerDetails?.stateName}
                         required
                         onChange={(e) => onDateChange(registerDetails?.yearOfBirth, parseInt(e.target.value))}>
                         {states?.map(el => <option key={el.value} value={el.value}>{el.name}</option>)}
                    </select>
               </div>

               <div className='w-full flex flex-col mt-5'>
                    <label>Gender</label>
                    <select
                         className="p-2 rounded border border-gray-300 flex-1 w-full"
                         value={registerDetails?.gender}
                         required
                         onChange={handleChange}>
                         <option value="M">Male</option>
                         <option value="F">Female</option>
                    </select>
               </div>

               <div className='w-full flex flex-col mt-5'>
                    <label>District Name</label>
                    <select
                         className="p-2 rounded border border-gray-300 flex-1 w-full m-1"
                         value={registerDetails?.districtName}
                         required
                         onChange={(e) => onDateChange(registerDetails?.yearOfBirth, parseInt(e.target.value))}>
                         {districts?.map(el => <option key={el?.value} value={el?.value}>{el?.name}</option>)}
                    </select>
               </div>
               <div className='w-full flex flex-col mt-5'>
                    <label>Email Id</label>
                    <input
                         className="p-2 rounded border border-gray-300 flex-1 w-full"
                         type="email"
                         placeholder="Enter email"
                         required
                         name={registerDetails?.email}
                         value={registerDetails?.email}
                         onChange={handleChange}
                    />
               </div>
               <div className='w-full flex flex-col mt-5'>
                    <label>Mobile</label>
                    <input
                         placeholder="Enter mobile no."
                         className="p-2 rounded border border-gray-300 flex-1 w-full"
                         type="tel"
                         required
                         name={registerDetails?.mobile}
                         value={registerDetails?.mobile}
                         onChange={handleChange}
                    />
               </div>
               <div className='w-full flex flex-col mt-5'>
                    <label>Pin Code</label>
                    <input
                         placeholder="Enter pin-code"
                         className="p-2 rounded border border-gray-300 flex-1 w-full"
                         type="number"
                         required
                         name={registerDetails?.pinCode}
                         value={registerDetails?.pinCode}
                         onChange={handleChange}
                    />
               </div>
               <div className='w-full flex flex-col mt-5'>
                    <label>Address</label>
                    <input
                         placeholder="Enter address"
                         className="p-2 rounded border border-gray-300 flex-1 w-full"
                         type="text"
                         required
                         name={registerDetails?.address}
                         value={registerDetails?.address}
                         onChange={handleChange}
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

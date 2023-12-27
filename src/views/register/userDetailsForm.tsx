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
     onSubmit: (formData: UserDetails) => void;
};

export const UserDetailsForm: React.FC<Props> = ({ onSubmit }) => {

     const [formData, setFormData] = useState<UserDetails>({});

     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
          const { name, value } = e.target;
          setFormData({
               ...formData,
               [name]: value,
          });
     };

     const onDateChange = (field: any, value: any) => {
          setFormData((prevDate) => ({ ...prevDate, [field]: value }));
     };

     const generateOptions = (start: number, end: number) =>
          Array.from({ length: end - start + 1 }, (_, index) => start + index).map((value) => (
               <option key={value} value={value}>
                    {value}
               </option>
          ));

     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          onSubmit(formData);
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
                              name={formData?.firstName}
                              value={formData?.firstName || ''}
                              onChange={handleChange}
                              placeholder="First Name"
                         />
                         <input
                              className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2 m-1"
                              type="text"
                              name={formData?.middleName}
                              value={formData?.middleName || ''}
                              onChange={handleChange}
                              placeholder="Middle Name"
                         />
                         <input
                              className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2 m-1"
                              type="text"
                              name={formData?.lastName}
                              value={formData?.lastName || ''}
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
                              value={formData?.dayOfBirth || ''}
                              onChange={(e) => onDateChange(formData?.dayOfBirth || '', parseInt(e.target.value))}>
                              {generateOptions(1, 31)}
                         </select>
                    </div>
                    <div className='flex flex-col m-1 w-1/3'>
                         <label>Month:</label>
                         <select
                              className="p-2 rounded border border-gray-300 flex-1 w-full m-1"
                              value={formData?.monthOfBirth || ''}
                              onChange={(e) => onDateChange(formData?.monthOfBirth || '', parseInt(e.target.value))}>
                              {generateOptions(1, 12)}
                         </select>
                    </div>
                    <div className='flex flex-col m-1 w-1/3'>
                         <label>Year:</label>
                         <select
                              className="p-2 rounded border border-gray-300 flex-1 w-full m-1"
                              value={formData?.yearOfBirth || ''}
                              onChange={(e) => onDateChange(formData?.yearOfBirth || '', parseInt(e.target.value))}>
                              {generateOptions(1900, new Date().getFullYear())}
                         </select>
                    </div>
               </div>


               <div className='w-full flex flex-col mt-5'>
                    <label>State</label>
                    <select
                         className="p-2 rounded border border-gray-300 flex-1 w-full m-1"
                         value={formData?.stateName || ''}
                         onChange={(e) => onDateChange(formData?.yearOfBirth, parseInt(e.target.value))}>
                         {states?.map(el => <option key={el.value} value={el.value}>{el.name}</option>)}
                    </select>
               </div>

               <div className='w-full flex flex-col mt-5'>
                    <label>Gender</label>
                    <select
                         className="p-2 rounded border border-gray-300 flex-1 w-full"
                         value={formData?.gender}
                         onChange={handleChange}>
                         <option value="M">Male</option>
                         <option value="F">Female</option>
                    </select>
               </div>

               <div className='w-full flex flex-col mt-5'>
                    <label>District Name</label>
                    <select
                         className="p-2 rounded border border-gray-300 flex-1 w-full m-1"
                         value={formData?.districtName || ''}
                         onChange={(e) => onDateChange(formData?.yearOfBirth, parseInt(e.target.value))}>
                         {districts?.map(el => <option key={el.value} value={el.value}>{el.name}</option>)}
                    </select>
               </div>
               <div className='w-full flex flex-col mt-5'>
                    <label>Email Id</label>
                    <input
                         className="p-2 rounded border border-gray-300 flex-1 w-full"
                         type="email"
                         placeholder="Enter email"
                         name={formData?.email}
                         value={formData?.email || ''}
                         onChange={handleChange}
                    />
               </div>
               <div className='w-full flex flex-col mt-5'>
                    <label>Mobile</label>
                    <input
                         placeholder="Enter mobile no."
                         className="p-2 rounded border border-gray-300 flex-1 w-full"
                         type="tel"
                         name={formData?.mobile}
                         value={formData?.mobile || ''}
                         onChange={handleChange}
                    />
               </div>
               <div className='w-full flex flex-col mt-5'>
                    <label>Pin Code</label>
                    <input
                         placeholder="Enter pin-code"
                         className="p-2 rounded border border-gray-300 flex-1 w-full"
                         type="number"
                         name={formData?.pinCode}
                         value={formData?.pinCode || ''}
                         onChange={handleChange}
                    />
               </div>
               <div className='w-full flex flex-col mt-5'>
                    <label>Address</label>
                    <input
                         placeholder="Enter address"
                         className="p-2 rounded border border-gray-300 flex-1 w-full"
                         type="text"
                         name={formData?.address}
                         value={formData?.address || ''}
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

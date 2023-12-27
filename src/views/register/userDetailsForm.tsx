import { Button, ButtonProps } from '@/atoms/button';
import { districts, states } from '@/constants';
import React, { useState } from 'react';

const USER_DETAILS = {
     countryCode: "countryCode",
     dayOfBirth: "dayOfBirth",
     districtName: "districtName",
     email: "email",
     firstName: "firstName",
     gender: "gender",
     lastName: "lastName",
     middleName: "middleName",
     mobile: "mobile",
     monthOfBirth: "monthOfBirth",
     pinCode: "pinCode",
     stateName: "stateName",
     yearOfBirth: "yearOfBirth",
     address: "address"
};


interface Props {
     onSubmit: (formData: Record<string, any>) => void;
};


export const UserDetailsForm: React.FC<Props> = ({ onSubmit }) => {

     const [formData, setFormData] = useState({});

     const handleChange = (e: { target: { name: any; value: any; }; }) => {
          const { name, value } = e.target;
          setFormData({
               ...formData,
               [name]: value,
          });
     };

     const onDateChange = (field: string, value: number) => setFormData((prevDate) => ({ ...prevDate, [field]: value.toString() }));

     const generateOptions = (start: number, end: number) =>
          Array.from({ length: end - start + 1 }, (_, index) => start + index).map((value) => (
               <option key={value} value={value}>
                    {value}
               </option>
          ));

     const handleSubmit = (e: { preventDefault: () => void; }) => {
          e.preventDefault();
          console.log('Form Data:', formData);
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
                              name={USER_DETAILS?.firstName}
                              value={formData?.firstName || ''}
                              onChange={handleChange}
                              placeholder="First Name"
                         />
                         <input
                              className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2 m-1"
                              type="text"
                              name={USER_DETAILS?.middleName}
                              value={formData?.middleName || ''}
                              onChange={handleChange}
                              placeholder="Middle Name"
                         />
                         <input
                              className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2 m-1"
                              type="text"
                              name={USER_DETAILS?.lastName}
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
                              placeholder="Day"
                              className="p-2 rounded border border-gray-300 flex-1 w-full m-1"
                              value={formData?.dayOfBirth || ''}
                              onChange={(e) => onDateChange(USER_DETAILS?.dayOfBirth, parseInt(e.target.value))}>
                              {generateOptions(1, 31)}
                         </select>
                    </div>
                    <div className='flex flex-col m-1 w-1/3'>
                         <label>Month:</label>
                         <select
                              placeholder="Month"
                              className="p-2 rounded border border-gray-300 flex-1 w-full m-1"
                              value={formData?.monthOfBirth || ''}
                              onChange={(e) => onDateChange(USER_DETAILS?.monthOfBirth, parseInt(e.target.value))}>
                              {generateOptions(1, 12)}
                         </select>
                    </div>
                    <div className='flex flex-col m-1 w-1/3'>
                         <label>Year:</label>
                         <select
                              placeholder="Year"
                              className="p-2 rounded border border-gray-300 flex-1 w-full m-1"
                              value={formData?.yearOfBirth || ''}
                              onChange={(e) => onDateChange(USER_DETAILS?.yearOfBirth, parseInt(e.target.value))}>
                              {generateOptions(1900, new Date().getFullYear())}
                         </select>
                    </div>
               </div>


               <div className='w-full flex flex-col mt-5'>
                    <label>State</label>
                    <select
                         placeholder="Select State"
                         className="p-2 rounded border border-gray-300 flex-1 w-full m-1"
                         value={formData?.stateName || ''}
                         onChange={(e) => onDateChange(USER_DETAILS?.yearOfBirth, parseInt(e.target.value))}>
                         {states?.map(el => <option key={el.value} value={el.value}>{el.name}</option>)}
                    </select>
               </div>

               <div className='w-full flex flex-col mt-5'>
                    <label>Gender</label>
                    <select
                         className="p-2 rounded border border-gray-300 flex-1 w-full"
                         value={formData?.gender}
                         placeholder="Gender"
                         onChange={handleChange}>
                         <option value="M">Male</option>
                         <option value="F">Female</option>
                    </select>
               </div>

               <div className='w-full flex flex-col mt-5'>
                    <label>District Name</label>
                    <select
                         placeholder="Select district"
                         className="p-2 rounded border border-gray-300 flex-1 w-full m-1"
                         value={formData?.districtName || ''}
                         onChange={(e) => onDateChange(USER_DETAILS?.yearOfBirth, parseInt(e.target.value))}>
                         {districts?.map(el => <option key={el.value} value={el.value}>{el.name}</option>)}
                    </select>
               </div>
               <div className='w-full flex flex-col mt-5'>
                    <label>Email Id</label>
                    <input
                         className="p-2 rounded border border-gray-300 flex-1 w-full"
                         type="email"
                         placeholder="Enter email"
                         name={USER_DETAILS?.email}
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
                         name={USER_DETAILS?.mobile}
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
                         name={USER_DETAILS?.pinCode}
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
                         name={USER_DETAILS?.address}
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

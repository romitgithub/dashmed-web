import { Button, ButtonProps } from '@/atoms/button';
import React, { useState } from 'react';

const USER_DETAILS = {
     dayOfBirth: 'dayOfBirth',
     monthOfBirth: 'monthOfBirth',
     yearOfBirth: 'yearOfBirth',
     stateName: 'stateName',
     gender: 'gender',
     lastName: 'lastName',
     districtName: 'districtName',
};

const months = [];

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

     const handleSubmit = (e: { preventDefault: () => void; }) => {
          e.preventDefault();
          console.log('Form Data:', formData);
     };

     const buttonProps: ButtonProps = {
          label: 'CONTINUE',
          type: "submit",
     };


     return (
          // <form onSubmit={handleSubmit}>
          //      <div>
          //           <label htmlFor="lastName">Name</label>
          //           <input
          //                className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
          //                type="text"
          //                id="lastName"
          //                name={USER_DETAILS.lastName}
          //                value={formData[USER_DETAILS.lastName] || ''}
          //                onChange={handleChange}
          //                placeholder="Last Name"
          //           />
          //           <input
          //                className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
          //                type="text"
          //                id="firstName"
          //                name={USER_DETAILS.firstName}
          //                value={formData[USER_DETAILS.firstName] || ''}
          //                onChange={handleChange}
          //                placeholder="First Name"
          //           />
          //           <input
          //                className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
          //                type="text"
          //                id="middleName"
          //                name={USER_DETAILS.middleName}
          //                value={formData[USER_DETAILS.middleName] || ''}
          //                onChange={handleChange}
          //                placeholder="Middle Name"
          //           />
          //      </div>

          //      <div>
          //           <label htmlFor={USER_DETAILS.dayOfBirth}>Date of Birth</label>
          //           <select
          //                id={USER_DETAILS.dayOfBirth}
          //                name={USER_DETAILS.dayOfBirth}
          //                value={formData[USER_DETAILS.dayOfBirth] || ''}
          //                onChange={handleChange}
          //           >
          //                <option value="">Day</option>
          //                {/* Populate days (1 to 31) */}
          //                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
          //                     <option key={day} value={day}>
          //                          {day}
          //                     </option>
          //                ))}
          //           </select>
          //           <select
          //                id={USER_DETAILS.monthOfBirth}
          //                name={USER_DETAILS.monthOfBirth}
          //                value={formData[USER_DETAILS.monthOfBirth] || ''}
          //                onChange={handleChange}
          //           >
          //                <option value="">Month</option>
          //                {months?.map((month, index) => (
          //                     <option key={index + 1} value={(index + 1).toString().padStart(2, '0')}>
          //                          {month}
          //                     </option>
          //                ))}
          //           </select>
          //           <select
          //                id={USER_DETAILS.yearOfBirth}
          //                name={USER_DETAILS.yearOfBirth}
          //                value={formData[USER_DETAILS.yearOfBirth] || ''}
          //                onChange={handleChange}
          //           >
          //                <option value="">Year</option>
          //                {/* Populate years (e.g., from 1900 to current year) */}
          //                {Array.from({ length: 122 }, (_, i) => new Date().getFullYear() - i).map((year) => (
          //                     <option key={year} value={year}>
          //                          {year}
          //                     </option>
          //                ))}
          //           </select>
          //      </div>

          //      <div>
          //           <label htmlFor={USER_DETAILS.stateName}>State</label>
          //           <input
          //                className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
          //                type="text"
          //                id={USER_DETAILS.stateName}
          //                name={USER_DETAILS.stateName}
          //                value={formData[USER_DETAILS.stateName] || ''}
          //                onChange={handleChange}
          //           />
          //      </div>

          //      <div>
          //           <label htmlFor={USER_DETAILS.gender}>Gender</label>
          //           <input
          //                className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
          //                type="text"
          //                id={USER_DETAILS.gender}
          //                name={USER_DETAILS.gender}
          //                value={formData[USER_DETAILS.gender] || ''}
          //                onChange={handleChange}
          //           />
          //      </div>

          //      <div>
          //           <label htmlFor={USER_DETAILS.districtName}>District Name</label>
          //           <input
          //                className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
          //                type="text"
          //                id={USER_DETAILS.districtName}
          //                name={USER_DETAILS.districtName}
          //                value={formData[USER_DETAILS.districtName] || ''}
          //                onChange={handleChange}
          //           />
          //      </div>

          //      <div className='mt-5'>
          //           <Button
          //                {...buttonProps}
          //                className="p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300" />
          //      </div>
          // </form>
          <> form </>
     );
};

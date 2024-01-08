import { Button } from "@/atoms/button";
import AppInput from "@/atoms/input";
import AppSelect from "@/atoms/select";
import { gender, statesDistrict } from "@/constants";
import React, { ChangeEvent, useCallback, useState } from "react";
import DateOfBirthInput from "./date-of-birth";
import FullNameInput from "./full-name-input";

interface UserDetails {
     countryCode?: string;
     dayOfBirth?: { value: any; label: any };
     monthOfBirth?: { value: any; label: any };
     yearOfBirth?: { value: any; label: any };
     districtName?: { value: any; label: any };
     email?: string;
     firstName?: string;
     gender?: { value: any; label: any };
     lastName?: string;
     middleName?: string;
     mobile?: string;
     pinCode?: string;
     stateName?: { value: any; label: any };
     address?: string;
};


const initialRegisterDetails = {
     firstName: "",
     middleName: "",
     lastName: "",
     countryCode: "",
     gender: { value: "", label: "Select gender" },
     dayOfBirth: { value: 0, label: "day" },
     monthOfBirth: { value: 0, label: "month" },
     yearOfBirth: { value: 1900, label: "year" },
     stateName: { value: "", label: "Select state" },
     districtName: { value: "", label: "Select dist." },
     email: "",
     mobile: "",
     pinCode: "",
     address: "",
};

interface Props {
     onSubmit: (registerDetails: UserDetails) => void;
};

export const RegisterDetails: React.FC<Props> = ({ onSubmit }) => {

     const [registerDetails, setRegisterDetails] = useState<UserDetails>(initialRegisterDetails);
     const [dobError, setDobError] = useState<string>('');
     const [genderError, setGenderError] = useState<string>('');
     const [stateError, setStateError] = useState<string>('');
     const [districtError, setDistrictError] = useState<string>('');

     const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
          const { name, value } = e.target;
          setRegisterDetails((prevDetails) => ({
               ...prevDetails,
               [name]: value,
          }));
     };
     

     function getDistrictsByStateName(stateName: string) {
          const state = statesDistrict.find(state => state.label === stateName);
          if (state) return state.districts;
          else return [{ value: '', label: "Please select state" }];
     };


     const handleSelectDay = useCallback((selectedOption: any) => setRegisterDetails({ ...registerDetails, dayOfBirth: selectedOption }), [registerDetails]);
     const handleSelectMonth = useCallback((selectedOption: any) => setRegisterDetails({ ...registerDetails, monthOfBirth: selectedOption }), [registerDetails]);
     const handleSelectYear = useCallback((selectedOption: any) => setRegisterDetails({ ...registerDetails, yearOfBirth: selectedOption }), [registerDetails]);
     const handleSelectGender = useCallback((selectedOption: any) => setRegisterDetails({ ...registerDetails, gender: selectedOption }), [registerDetails]);
     const handleSelectState = useCallback((selectedOption: any) => setRegisterDetails({ ...registerDetails, stateName: selectedOption }), [registerDetails]);
     const handleSelectDistrict = useCallback((selectedOption: any) => setRegisterDetails({ ...registerDetails, districtName: selectedOption }), [registerDetails]);

     
     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (registerDetails?.dayOfBirth?.value === 0 || registerDetails?.monthOfBirth?.value === 0 || registerDetails?.yearOfBirth?.value === 1900) return setDobError('Please select a valid date of birth.');
          else setDobError('');
          if (!registerDetails?.gender?.value) return setGenderError('Please select gender.');
          else setGenderError('');
          if (!registerDetails?.stateName?.value) return setStateError('Please select a state.');
          else setStateError('');
          if (!registerDetails?.districtName) return setDistrictError('Please select a district.');
          else setDistrictError('');
          const data = {
               ...registerDetails,
               gender: registerDetails?.gender?.value || null,
               dayOfBirth: registerDetails?.dayOfBirth?.value || null,
               monthOfBirth: registerDetails?.monthOfBirth?.value || null,
               yearOfBirth: registerDetails?.yearOfBirth?.value || null,
               stateName: registerDetails?.stateName?.value || null,
               districtName: registerDetails?.districtName?.value || null,
          };
          onSubmit({ ...data, countryCode: "+91" });
     };

     console.log({ registerDetails });

     return (
          <form onSubmit={handleSubmit} className="w-full">
               <FullNameInput registerDetails={registerDetails} onInputChange={handleInputChange} />
               <DateOfBirthInput
                    onDaySelect={handleSelectDay}
                    onMonthSelect={handleSelectMonth}
                    onYearSelect={handleSelectYear}
                    registerDetails={registerDetails}
               />
               {dobError && <span className="text-red-500">{dobError}</span>}

               <div className="w-full flex flex-col mt-5">
                    <label>Gender</label>
                    <AppSelect
                         options={gender}
                         onChange={handleSelectGender}
                         placeholder={"Gender"}
                         defaultSelected={registerDetails?.gender}
                    />
                    {genderError && <span className="text-red-500">{genderError}</span>}
               </div>

               <div className="w-full flex flex-col mt-5">
                    <label>State</label>
                    <AppSelect
                         options={statesDistrict?.map(({ value, label }) => ({ value, label })) || []}
                         onChange={handleSelectState}
                         defaultSelected={registerDetails?.stateName}
                    />
                    {stateError && <span className="text-red-500">{stateError}</span>}
               </div>

               <div className="w-full flex flex-col mt-5">
                    <label>District Name</label>
                    <AppSelect
                         options={getDistrictsByStateName(registerDetails?.stateName?.label)}
                         onChange={handleSelectDistrict}
                         defaultSelected={registerDetails?.districtName}
                         className="p-2 rounded border border-gray-300 flex-1 w-full"
                    />
                    {districtError && <span className="text-red-500">{districtError}</span>}
               </div>

               <div className="w-full flex flex-col mt-5">
                    <label>Email Id</label>
                    <AppInput
                         className="p-2 rounded border border-gray-300 flex-1 w-full"
                         type="email"
                         placeholder="Enter email"
                         required
                         name={"email"}
                         value={registerDetails?.email}
                         onChange={handleInputChange}
                    />
               </div>

               <div className="w-full flex flex-col mt-5">
                    <label>Mobile</label>
                    <AppInput
                         placeholder="Enter mobile no."
                         className="p-2 rounded border border-gray-300 flex-1 w-full"
                         type="tel"
                         required
                         name={"mobile"}
                         value={registerDetails?.mobile}
                         onChange={handleInputChange}
                    />
               </div>

               <div className="w-full flex flex-col mt-5">
                    <label>Pin Code</label>
                    <AppInput
                         placeholder="Enter pin-code"
                         className="p-2 rounded border border-gray-300 flex-1 w-full"
                         type="number"
                         required
                         name={"pinCode"}
                         value={registerDetails?.pinCode}
                         onChange={handleInputChange}
                    />
               </div>

               <div className="w-full flex flex-col mt-5">
                    <label>Address</label>
                    <AppInput
                         placeholder="Enter address"
                         className="p-2 rounded border border-gray-300 flex-1 w-full"
                         type="text"
                         required
                         name={"address"}
                         value={registerDetails?.address}
                         onChange={handleInputChange}
                    />
               </div>

               <Button className="p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300 mt-5">{"CONTINUE"}</Button>
          </form>
     );
};

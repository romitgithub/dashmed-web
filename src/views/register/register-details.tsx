import { Button } from "@/atoms/button";
import AppInput from "@/atoms/input";
import AppSelect from "@/atoms/select";
import { days, districts, gender, months, states, years } from "@/constants";
import React, { ChangeEvent, useState } from "react";

interface UserDetails {
  countryCode?: string;
  dayOfBirth?: { value: any; label: any };
  monthOfBirth?: { value: any; label: any };
  yearOfBirth?: { value: any; label: any };
  districtName?: string;
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
  gender: { value: "", label: "Select gender" },
  countryCode: "",
  dayOfBirth: { value: 0, label: "day" },
  districtName: "",
  email: "",
  firstName: "",
  lastName: "",
  middleName: "",
  mobile: "",
  monthOfBirth: { value: 0, label: "month" },
  pinCode: "",
  stateName: { value: "", label: "Select state" },
  yearOfBirth: { value: 1900, label: "year" },
  address: ""
}

interface Props {
  onSubmit: (registerDetails: UserDetails) => void;
}

export const RegisterDetails: React.FC<Props> = ({ onSubmit }) => {

  const [registerDetails, setRegisterDetails] = useState<UserDetails>(initialRegisterDetails);
  const [dobError, setDobError] = useState<string>('');
  const [genderError, setGenderError] = useState<string>('');
  const [stateError, setStateError] = useState<string>('');
  const [districtError, setDistrictError] = useState<string>('');


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegisterDetails({
      ...registerDetails,
      [name]: value,
    });
  };

  const handleSelect = (field: any, value: any) => setRegisterDetails((prevDate) => ({ ...prevDate, [field]: value }));

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
    };

    onSubmit({ ...data, countryCode: "+91" });
  };

  const handleSelectDay = (selectedOption: any) => setRegisterDetails({ ...registerDetails, dayOfBirth: selectedOption });
  const handleSelectMonth = (selectedOption: any) => setRegisterDetails({ ...registerDetails, monthOfBirth: selectedOption });
  const handleSelectYear = (selectedOption: any) => setRegisterDetails({ ...registerDetails, yearOfBirth: selectedOption });
  const handleSelectGender = (selectedOption: any) => setRegisterDetails({ ...registerDetails, gender: selectedOption });
  const handleSelectState = (selectedOption: any) => setRegisterDetails({ ...registerDetails, stateName: selectedOption });

  console.log({ registerDetails });

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="w-full flex flex-col ">
        <label>Full Name</label>
        <div className="flex w-full flex-col md:flex-row lg:flex-row">
          <AppInput
            className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2 m-1"
            type="text"
            name={"firstName"}
            value={registerDetails?.firstName}
            onChange={handleChange}
            required
            placeholder="First Name"
          />
          <AppInput
            className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2 m-1"
            type="text"
            name={"middleName"}
            value={registerDetails?.middleName}
            onChange={handleChange}
            placeholder="Middle Name"
          />
          <AppInput
            className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2 m-1"
            type="text"
            required
            name={"lastName"}
            value={registerDetails?.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>
      </div>
      <div className="w-full flex mt-5">
        <div className="flex flex-col m-1 w-2/6">
          <AppSelect
            options={days}
            onChange={handleSelectDay}
            defaultSelected={registerDetails.dayOfBirth}
          />
        </div>
        <div className="flex flex-col m-1 w-2/6">
          <AppSelect
            options={months}
            onChange={handleSelectMonth}
            defaultSelected={registerDetails.monthOfBirth}
          />
        </div>
        <div className="flex flex-col m-1 w-3/6">
          <AppSelect
            options={years}
            onChange={handleSelectYear}
            defaultSelected={registerDetails.yearOfBirth}
          />
        </div>
      </div>
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
          options={states}
          onChange={handleSelectState}
          defaultSelected={registerDetails?.stateName}
        />
        {stateError && <span className="text-red-500">{stateError}</span>}
      </div>

      <div className="w-full flex flex-col mt-5">
        <label>District Name</label>
        <select
          className="p-2 rounded border border-gray-300 flex-1 w-full m-1"
          value={registerDetails?.districtName}
          required
          onChange={(e: any) => handleSelect("districtName", e.target.value)}
        >
          {districts?.map((el) => (
            <option key={el?.code} value={el?.name}>
              {el?.name}
            </option>
          ))}
        </select>
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
        />
      </div>
      <div className="mt-5">
        <Button className="p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300">{"CONTINUE"}</Button>
      </div>
    </form>
  );
};

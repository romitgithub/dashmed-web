"use client"

import React, { useState } from 'react';

interface Country {
  code: string;
  name: string;
  flag: string;
}

const countries: Country[] = [
  { code: 'us', name: 'United States', flag: '🇺🇸' },
  { code: 'in', name: 'India', flag: '🇮🇳' },
  // Add more countries as needed
];

const FormControlForMobileNo: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>(countries[0].code);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Country: ${selectedCountry}, Mobile Number: ${mobileNumber}`);
    // Here you can perform further actions, like making API calls, etc.
  };

  return (
    <form onSubmit={handleSubmit} className='pt-5 pb5'>
      <label>Enter mobile number</label>
      <div className="flex items-center space-x-2">
        <select
          className="p-2 rounded border border-gray-300"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.flag}
            </option>
          ))}
        </select>
        <input
          type="tel"
          className="p-2 rounded border border-gray-300 flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
          placeholder="Enter mobile number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
      </div>
      <div className='mt-5 mb-5'>
        <button
          type="submit"
          className="p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300"
        >
          Sign in / Sign up
        </button>
      </div>
    </form>
  );
};

export default FormControlForMobileNo;

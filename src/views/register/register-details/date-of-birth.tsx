// DateOfBirthComponent.tsx
import React from 'react';
import AppSelect from '@/atoms/select';
import { days, months, years } from '@/constants';

interface DateOfBirthProps {
     onDaySelect: (selectedOption: any) => void;
     onMonthSelect: (selectedOption: any) => void;
     onYearSelect: (selectedOption: any) => void;
     registerDetails: any;
};

const DateOfBirthInput: React.FC<DateOfBirthProps> = ({
     onDaySelect,
     onMonthSelect,
     onYearSelect,
     registerDetails,
}) => {
     return (
          <div className="w-full flex mt-5">
               <div className="flex flex-col m-1 w-2/6">
                    <AppSelect
                         options={days}
                         onChange={onDaySelect}
                         required
                         defaultSelected={registerDetails.dayOfBirth}
                    />
               </div>
               <div className="flex flex-col m-1 w-2/6">
                    <AppSelect
                         options={months}
                         onChange={onMonthSelect}
                         required
                         defaultSelected={registerDetails.monthOfBirth}
                    />
               </div>
               <div className="flex flex-col m-1 w-3/6">
                    <AppSelect
                         options={years}
                         onChange={onYearSelect}
                         required
                         defaultSelected={registerDetails.yearOfBirth}
                    />
               </div>
          </div>
     );
};

export default DateOfBirthInput;

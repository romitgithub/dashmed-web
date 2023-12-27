// components/DateSelect.js
import React, { useState, useEffect } from 'react';

const DateSelect = () => {
     const [days, setDays] = useState([]);
     const [years, setYears] = useState([]);
     const months = [
          { value: '', name: 'Month' },
          { value: '01', name: 'January' },
          { value: '02', name: 'February' },
          { value: '03', name: 'March' },
          { value: '04', name: 'April' },
          { value: '05', name: 'May' },
          { value: '06', name: 'June' },
          { value: '07', name: 'July' },
          { value: '08', name: 'August' },
          { value: '09', name: 'September' },
          { value: '10', name: 'October' },
          { value: '11', name: 'November' },
          { value: '12', name: 'December' },
     ];

     useEffect(() => {
          // Populate days (1 to 31)
          const daysArray = Array.from({ length: 31 }, (_, i) => ({
               value: `${(i + 1).toString().padStart(2, '0')}`,
               name: `${(i + 1).toString().padStart(2, '0')}`,
          }));
          setDays(daysArray);

          // Get current year
          const currentYear = new Date().getFullYear();
          const yearsArray = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => ({
               value: `${currentYear - i}`,
               name: `${currentYear - i}`,
          }));
          setYears(yearsArray);
     }, []);

     return (
          <div>
               <select>
                    <option value="">Day</option>
                    {days.map((day) => (
                         <option key={day.value} value={day.value}>
                              {day.name}
                         </option>
                    ))}
               </select>
               <select>
                    {months.map((month) => (
                         <option key={month.value} value={month.value}>
                              {month.name}
                         </option>
                    ))}
               </select>
               <select>
                    <option value="">Year</option>
                    {years.map((year) => (
                         <option key={year.value} value={year.value}>
                              {year.name}
                         </option>
                    ))}
               </select>
          </div>
     );
};

export default DateSelect;

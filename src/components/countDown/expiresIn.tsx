import { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
     const [timer, setTimer] = useState(60);

     useEffect(() => {
          const countdown = setInterval(() => {
               setTimer((prevTimer) => {
                    if (prevTimer === 0) {
                         clearInterval(countdown); // Stop the countdown when it reaches 0
                         return 0;
                    }
                    return prevTimer - 1; // Decrement the timer by 1 second
               });
          }, 1000);

          return () => {
               clearInterval(countdown); // Clean up the interval on unmounting
          };
     }, []); // Empty dependency array ensures this effect runs only once

     return <span className="text-sm sm:text-sm md:text-md lg:text-lg xl:text-xl text-red-500">
          {`Expires in ${timer}s`}
     </span>;
};

export default CountdownTimer;

import { useState, useEffect } from 'react';

const OtpTimer: React.FC = () => {

     const [timer, setTimer] = useState(60);

     useEffect(() => {
          const countdown = setInterval(() => {
               setTimer((prevTimer) => {
                    if (prevTimer === 0) {
                         clearInterval(countdown); // Stop the countdown when it reaches 0
                         return 0;
                    }
                    return prevTimer - 1;
               });
          }, 1000);
          return () => clearInterval(countdown);
     }, []);

     return (
          <span className="text-sm sm:text-sm md:text-md lg:text-lg xl:text-xl text-red-500">
               {`Expires in ${timer}s`}
          </span>
     );
};

export default OtpTimer;

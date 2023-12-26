import { LOGIN_TYPES } from ".";

type ChangeLoginType = (value: string) => void;

interface FooterSectionProps {
     handleChangeLoginType: ChangeLoginType;
};


export const FooterSection: React.FC<FooterSectionProps> = ({ handleChangeLoginType }) => {

     const handleToggleType = (value: string) => {
          handleChangeLoginType(value);
     };

     return (
          <div className="w-full flex flex-col justify-between">
               <div className="flex flex-col w-full justify-center align-middle">
                    <span className="m-auto text-xl">Or</span>
                    <span className="block text-center mt-3 font-medium text-teal-700">Login via</span>
                    <div className="flex flex-col w-full justify-center align-middle mt-3">
                         <button onClick={() => handleToggleType(LOGIN_TYPES.ABHA_ADD)} className="border border-#1b5887 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg w-full py-1 px-1 mt-2 rounded-md text-#1b5887 font-medium transition duration-300 cursor-pointer">ABHA Address</button>
                         <button onClick={() => handleToggleType(LOGIN_TYPES.EMAIL)} className="border border-#1b5887 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg w-full py-1 px-1 mt-2 rounded-md text-#1b5887 font-medium transition duration-300 cursor-pointer">Email ID</button>
                         <button onClick={() => handleToggleType(LOGIN_TYPES.ABHA_NO)} className="border border-#1b5887 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg w-full py-1 px-1 mt-2 rounded-md text-#1b5887 font-medium transition duration-300 cursor-pointer">ABHA Number</button>
                    </div>
               </div>
               <div className="mt-5">
                    <div className="mt-5">
                         <span className="font-medium block text-center text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg">{"Don't have an ABHA Address?"}</span>
                         <span className="flex justify-center align-middle font-medium text-teal-700">Register</span>
                    </div>
                    <div className="mt-4 mb-4">
                         <span className="font-medium block text-center text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg">{"Don't have an ABHA number?"}</span>
                         <span className="flex justify-center align-middle font-medium text-teal-700">Create Now</span>
                    </div>
                    <div className="mb-3">
                         <span className="flex justify-center align-middle mt-2 font-medium text-teal-700 text-sm underline">Privacy Policy</span>
                    </div>
               </div>
          </div>
     );
};
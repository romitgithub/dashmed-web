import { LeftArrowIcon } from "@/atoms/leftIArrowIcon";
import { LOGIN_STATES, LOGIN_TYPES } from ".";

interface HeaderSectionProps {
     loginType: string;
     loginState: string;
     setLoginType: React.Dispatch<React.SetStateAction<string>>; // Define the type for setLoginType
     setLoginState: React.Dispatch<React.SetStateAction<string>>;
     resetFormControl: () => void;
};


export const HeaderSection: React.FC<HeaderSectionProps> = ({ loginType, loginState, setLoginType, setLoginState, resetFormControl }) => {

     const handleBackFromSelectAddressPage = () => {
          console.log({ 'back': LOGIN_TYPES.MOBILE });
          if (loginState === LOGIN_STATES.ADDRESS_VIEW) {
               setLoginState(LOGIN_STATES.OTP_VIEW);
          }
          if (loginState === LOGIN_STATES.OTP_VIEW) {
               setLoginState(LOGIN_STATES.DEFAULT_VIEW);
          }
          if (loginState === LOGIN_STATES.DEFAULT_VIEW) {
               setLoginType(LOGIN_TYPES.MOBILE);
               resetFormControl();
          }
     };

     return (
          <>
               <div className="flex flex-row items-center justify-center relative p-2 w-full">
                    {
                         <span className="text-red-500 flex absolute cursor-pointer top-2 left-2 mt-0 ml-0 p-1" onClick={handleBackFromSelectAddressPage}>
                              <LeftArrowIcon />
                         </span>
                    }
                    <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">
                         {`Login with ${(loginType === LOGIN_TYPES.MOBILE && "Mobile Number") ||
                              (loginType === LOGIN_TYPES.ABHA_ADD && "ABHA address") ||
                              (loginType === LOGIN_TYPES.ABHA_NO && "ABHA Number") ||
                              (loginType === LOGIN_TYPES.EMAIL && "Email Id")
                              }`}
                    </span>
               </div>
          </>
     );
};

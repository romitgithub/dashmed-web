import { LOGIN_STATES } from ".";
import { LeftArrowIcon } from "@/atoms/leftIArrowIcon";

const LOGIN_TYPES = {
     ABHA_ADD: 'ABHA_ADD',
     ABHA_NO: 'ABHA_NO',
     MOBILE: 'MOBILE',
     EMAIL: 'EMAIL',
};

interface LoginHeaderProps {
     loginType: string;
     loginState: string;
     onChangeLoginState: (newState: string) => void;
     onChangeLoginType: (newType: string) => void;
}


// Constants for login type text
const loginTypeTextMap: Record<string, string> = {
     [LOGIN_TYPES?.MOBILE]: "Mobile Number",
     [LOGIN_TYPES?.ABHA_ADD]: "ABHA address",
     [LOGIN_TYPES?.ABHA_NO]: "ABHA Number",
     [LOGIN_TYPES?.EMAIL]: "Email Id",
};


export const LoginHeader: React.FC<LoginHeaderProps> = ({
     loginType,
     loginState,
     onChangeLoginState,
     onChangeLoginType,
}) => {

     const handleBackButtonClick = () => {
          if (loginState === LOGIN_STATES.ADDRESS_VIEW) {
               onChangeLoginState(LOGIN_STATES.OTP_VIEW);
          } else if (loginState === LOGIN_STATES.OTP_VIEW) {
               onChangeLoginState(LOGIN_STATES.DEFAULT_VIEW);
          } else if (loginState === LOGIN_STATES.DEFAULT_VIEW) {
               onChangeLoginType(LOGIN_TYPES.MOBILE);
          }
     };

     const renderLoginType = loginTypeTextMap[loginType] || "Unknown";

     return (
          <div className="flex flex-row items-center justify-center relative p-2 w-full">
               <span className="flex absolute cursor-pointer top-2 left-0 mt-0 ml-0 p-1" onClick={handleBackButtonClick}>
                    <LeftArrowIcon />
               </span>
               <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">
                    {`Login with ${renderLoginType}`}
               </span>
          </div>
     );
};

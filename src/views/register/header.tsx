import { LeftArrowIcon } from "@/atoms/leftIArrowIcon";
import { REGISTER_STATES, REGISTER_TYPES } from "@/utils/registerHelper";
import { useContext } from "react";
import { RegisterFormDataContext } from "./registerDataProvider";


// Constants for register type text
const registerTypeTextMap: Record<string, string> = {
     [REGISTER_TYPES?.DEFAULT_TYPE]: "I want to create ABHA via",
     [REGISTER_TYPES?.MOBILE_NUMBER]: "Register with Mobile Number",
     [REGISTER_TYPES?.ABHA_NUMBER]: "Register with ABHA Number",
     [REGISTER_TYPES?.EMAIL_ID]: "Register with Email-Id",
};


export const RegisterHeaderSection: React.FC = () => {

     const {
          registerFormData,
          setRegisterFormData,
          registerType,
          setRegisterType,
          registerState,
          setRegisterState,
          resetRegisterFormControl,
          handleChangeRegisterType,
     } = useContext(RegisterFormDataContext);


     const handleBackButtonClick = () => {
          console.log("back from", registerType);
          if (registerState === REGISTER_STATES.CREATE_ABHA_ADDRESS_VIEW) {
               setRegisterState(REGISTER_STATES.ADDRESS_VIEW);
          } else if (registerState === REGISTER_STATES.ADDRESS_VIEW) {
               setRegisterState(REGISTER_STATES.OTP_VIEW);
          } else if (registerState === REGISTER_STATES.OTP_VIEW) {
               setRegisterState(REGISTER_STATES.DEFAULT_VIEW);
          } else if (registerState === REGISTER_STATES.DEFAULT_VIEW) {
               // change register type at this time we are changing type for to select the default options type
               setRegisterType(REGISTER_TYPES.DEFAULT_TYPE);
               resetRegisterFormControl();
          }
     };

     const renderRegisterType = registerTypeTextMap[registerType] || "Unknown";

     return (
          <div className="flex flex-row items-center justify-center relative p-2 w-full">
               <span className="flex absolute cursor-pointer top-2 left-0 mt-0 ml-0 p-1" onClick={handleBackButtonClick}>
                    {registerType !== REGISTER_TYPES.DEFAULT_TYPE && <LeftArrowIcon />}
               </span>
               <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4 pl-3">
                    {`${renderRegisterType}`}
               </span>
          </div>
     );
};

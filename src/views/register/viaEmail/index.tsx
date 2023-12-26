import { useContext } from "react";
import { REGISTER_STATES } from "@/utils/registerHelper";
import { RegisterFormDataContext } from "../registerDataProvider";

export const RegisterViaEmailId = () => {

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

     return (
          <>
               via email
          </>
     );
};
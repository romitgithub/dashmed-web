import { useContext } from "react";
import { RegisterFormDataContext } from "../registerDataProvider";

export const RegisterViaEmailId = () => {

     const {
          registerType,
          setRegisterType,
          registerState,
          setRegisterState,
          handleChangeRegisterType,
     } = useContext(RegisterFormDataContext);

     return (
          <>
               via email
          </>
     );
};
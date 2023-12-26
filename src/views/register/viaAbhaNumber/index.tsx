import { useContext } from "react";
import { RegisterFormDataContext } from "../registerDataProvider";

export const RegisterViaAbhaNumber = () => {

     const {
          registerType,
          setRegisterType,
          registerState,
          setRegisterState,
          handleChangeRegisterType,
     } = useContext(RegisterFormDataContext);

     return (
          <>
               via abha number
          </>
     );
};
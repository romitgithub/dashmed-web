import { useContext } from "react";
import { RegisterFormDataContext } from "./registerDataProvider";
import { REGISTER_STATES } from "@/utils/registerHelper";

export const RegisterViaMobileNumber = () => {

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


     const moveToNextState = () => {
          switch (registerState) {
               case REGISTER_STATES.DEFAULT_VIEW:
                    // Logic to proceed to OTP_VIEW
                    setRegisterState(REGISTER_STATES.OTP_VIEW);
                    break;
               case REGISTER_STATES.OTP_VIEW:
                    // Logic to proceed to ADDRESS_VIEW
                    setRegisterState(REGISTER_STATES.ADDRESS_VIEW);
                    break;
               case REGISTER_STATES.ADDRESS_VIEW:
                    // Logic to proceed to FORM_CONTROL_VIEW
                    setRegisterState(REGISTER_STATES.FORM_CONTROL_VIEW);
                    break;
               case REGISTER_STATES.FORM_CONTROL_VIEW:
                    // Logic to proceed to CREATE_ABHA_ADDRESS_VIEW
                    setRegisterState(REGISTER_STATES.CREATE_ABHA_ADDRESS_VIEW);
                    break;
               default:
                    // Handle other cases or end of the flow
                    break;
          }
     };

     const moveToPreviousState = () => {
          switch (registerState) {
               case REGISTER_STATES.CREATE_ABHA_ADDRESS_VIEW:
                    // Logic to move back to FORM_CONTROL_VIEW
                    setRegisterState(REGISTER_STATES.FORM_CONTROL_VIEW);
                    break;
               case REGISTER_STATES.FORM_CONTROL_VIEW:
                    // Logic to move back to ADDRESS_VIEW
                    setRegisterState(REGISTER_STATES.ADDRESS_VIEW);
                    break;
               case REGISTER_STATES.ADDRESS_VIEW:
                    // Logic to move back to OTP_VIEW
                    setRegisterState(REGISTER_STATES.OTP_VIEW);
                    break;
               case REGISTER_STATES.OTP_VIEW:
                    // Logic to move back to DEFAULT_VIEW
                    setRegisterState(REGISTER_STATES.DEFAULT_VIEW);
                    break;
               default:
                    // Handle other cases or end of the flow
                    break;
          }
     };


     return (
          <>
               {registerState === REGISTER_STATES.DEFAULT_VIEW && (
                    <>default view</>
               )}
               {registerState === REGISTER_STATES.OTP_VIEW && (
                    <>otp view</>
               )}
               {registerState === REGISTER_STATES.ADDRESS_VIEW && (
                    <>address view</>
               )}
               {registerState === REGISTER_STATES.FORM_CONTROL_VIEW && (
                    <>form control view</>
               )}
               {registerState === REGISTER_STATES.CREATE_ABHA_ADDRESS_VIEW && (
                    <>create abha address view</>
               )}
          </>
     );
};
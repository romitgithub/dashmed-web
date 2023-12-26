import React, { createContext, useState, ReactNode } from 'react';


export const REGISTER_TYPES = {
     DEFAULT_TYPE: 'DEFAULT_TYPE',
     ABHA_NUMBER: 'ABHA_NUMBER',
     MOBILE_NUMBER: 'MOBILE_NUMBER',
     EMAIL_ID: 'EMAIL_ID',
};


export const REGISTER_STATES = {
     DEFAULT_VIEW: 'DEFAULT_VIEW',
     OTP_VIEW: 'OTP_VIEW',
     ADDRESS_VIEW: 'ADDRESS_VIEW',
     FORM_CONTROL_VIEW: 'FORM_CONTROL_VIEW',
     CREATE_ABHA_ADDRESS_VIEW: 'CREATE_ABHA_ADDRESS_VIEW',
};

export interface RegisterFormDataChecks {
     transactionId: string;
     value: string;
     password: string;
     selectedAddress: string;
     otp: string;
     addresses: string[] | null;
};

export type SetRegisterFormDataChecks = React.Dispatch<React.SetStateAction<RegisterFormDataChecks>>;

export interface RegisterFormDataProps {
     setFormControl: SetRegisterFormDataChecks;
     registerFormData: RegisterFormDataChecks;
};

interface RegisterFormDataProviderProps {
     children: ReactNode;
};

export const RegisterFormDataContext = createContext<any>(null);


export const RegisterFormDataProvider = ({ children }: RegisterFormDataProviderProps) => {

     const initialRegisterFormData: RegisterFormDataChecks = {
          transactionId: '',
          value: '',
          password: '',
          selectedAddress: '',
          otp: '',
          addresses: null,
     };

     const [registerType, setRegisterType] = useState<string>(REGISTER_TYPES.DEFAULT_TYPE);
     const [registerState, setRegisterState] = useState<string>(REGISTER_STATES.DEFAULT_VIEW);
     const [registerFormData, setRegisterFormData] = useState<RegisterFormDataChecks>(initialRegisterFormData);

     const resetRegisterFormControl = () => {
          setRegisterFormData(initialRegisterFormData);
     };

     const handleChangeRegisterType = (value: string) => {
          setRegisterType(value);
     };

     return (
          <RegisterFormDataContext.Provider
               value={{
                    registerFormData,
                    setRegisterFormData,
                    registerType,
                    setRegisterType,
                    registerState,
                    setRegisterState,
                    resetRegisterFormControl,
                    handleChangeRegisterType,
               }}
          >
               {children}
          </RegisterFormDataContext.Provider>
     );
};

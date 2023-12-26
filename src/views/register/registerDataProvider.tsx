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

interface RegisterFormDataProviderProps {
     children: ReactNode;
};

export const RegisterFormDataContext = createContext<any>(null);


export const RegisterFormDataProvider = ({ children }: RegisterFormDataProviderProps) => {

     const [registerType, setRegisterType] = useState<string>(REGISTER_TYPES.DEFAULT_TYPE);
     const [registerState, setRegisterState] = useState<string>(REGISTER_STATES.DEFAULT_VIEW);

     const handleChangeRegisterType = (value: string) => {
          setRegisterType(value);
     };

     return (
          <RegisterFormDataContext.Provider
               value={{
                    registerType,
                    setRegisterType,
                    registerState,
                    setRegisterState,
                    handleChangeRegisterType,
               }}
          >
               {children}
          </RegisterFormDataContext.Provider>
     );
};

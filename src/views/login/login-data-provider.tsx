import React, { createContext, useState, ReactNode } from 'react';


export const LOGIN_TYPES = {
     ABHA_ADD: "ABHA_ADD",
     ABHA_NO: "ABHA_NO",
     MOBILE: "MOBILE",
     EMAIL: "EMAIL",
};

export const LOGIN_STATES = {
     DEFAULT_VIEW: "DEFAULT_VIEW",
     OTP_VIEW: "OTP_VIEW",
     ADDRESS_VIEW: "ADDRESS_VIEW",
};

// Constants for login type text
export const loginTypeTextMap: Record<string, string> = {
     [LOGIN_TYPES?.MOBILE]: "Mobile Number",
     [LOGIN_TYPES?.ABHA_ADD]: "ABHA address",
     [LOGIN_TYPES?.ABHA_NO]: "ABHA Number",
     [LOGIN_TYPES?.EMAIL]: "Email Id",
};

interface LoginProviderProps {
     children: ReactNode;
};

export const LoginContext = createContext<any>(null);

export const LoginProvider = ({ children }: LoginProviderProps) => {

     const [loginType, setLoginType] = useState<string>(LOGIN_TYPES.MOBILE);
     const [loginState, setLoginState] = useState<string>(LOGIN_STATES.DEFAULT_VIEW);
     const [transactionId, setTransactionId] = useState(null);
     const [addresses, setAddresses] = useState([]);
     const [loading, setLoading] = useState(false);

     return (
          <LoginContext.Provider
               value={{
                    loginType,
                    setLoginType,
                    loginState,
                    setLoginState,
                    transactionId,
                    setTransactionId,
                    addresses,
                    setAddresses,
                    loading,
                    setLoading,
               }}>
               {children}
          </LoginContext.Provider>
     );
};

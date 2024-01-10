import React, { useContext } from 'react';
import { AuthInputForm } from '@/components/auth-input-form';
import { ViaAbhaAddress } from './via-abha-address';
import { LoginContext } from './login-data-provider';

const LOGIN_TYPES = {
     ABHA_ADD: 'ABHA_ADD',
     ABHA_NO: 'ABHA_NO',
     MOBILE: 'MOBILE',
     EMAIL: 'EMAIL',
};

interface LoginViaProps {
     onSubmit: (formData: Record<string, any>) => void;
};

interface InputConfig {
     inputLabel: string;
     inputType: 'text' | 'tel' | 'email';
     maxLength: number;
     minLength: number;
     placeholder: string;
};

const loginInputConfigs: Record<string, InputConfig> = {
     [LOGIN_TYPES?.MOBILE]: {
          inputLabel: 'Enter Mobile Number',
          inputType: 'tel',
          maxLength: 10,
          minLength: 10,
          placeholder: 'Enter mobile number',
     },
     [LOGIN_TYPES?.ABHA_NO]: {
          inputLabel: 'Enter ABHA Number',
          inputType: 'tel',
          maxLength: 14,
          minLength: 14,
          placeholder: 'Enter ABHA number',
     },
     [LOGIN_TYPES?.EMAIL]: {
          inputLabel: 'Enter Email',
          inputType: 'email',
          maxLength: 50,
          minLength: 5,
          placeholder: 'Enter email',
     },
};

export const LoginVia: React.FC<LoginViaProps> = ({ onSubmit }) => {

     const {
          loginType,
          loading,
          setLoading,
     } = useContext(LoginContext);

     const handleSubmit = (data: any) => {
          if (onSubmit) onSubmit(data);
     };

     return (
          <>
               {loginType === LOGIN_TYPES.ABHA_ADD ?
                    <ViaAbhaAddress onSubmit={handleSubmit} /> :
                    <AuthInputForm isLoading={loading} onSubmit={handleSubmit} inputType={loginType} inputConfigs={loginInputConfigs} />}
          </>
     );
};

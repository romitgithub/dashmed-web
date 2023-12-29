import React from 'react';
import { AuthInputForm } from '@/components/authInputForm';
import { ViaAbhaAddress } from './viaAbhaAddress';

const LOGIN_TYPES = {
     ABHA_ADD: 'ABHA_ADD',
     ABHA_NO: 'ABHA_NO',
     MOBILE: 'MOBILE',
     EMAIL: 'EMAIL',
};

interface LoginViaProps {
     loginType: string;
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

export const LoginVia: React.FC<LoginViaProps> = ({ onSubmit, loginType }) => {

     const handleSubmit = (data: any) => {
          if (onSubmit) onSubmit(data);
     };

     return (
          <>
               {loginType === LOGIN_TYPES.ABHA_ADD ?
                    <ViaAbhaAddress onSubmit={handleSubmit} /> :
                    <AuthInputForm onSubmit={handleSubmit} inputType={loginType} inputConfigs={loginInputConfigs} />}
          </>
     );
};

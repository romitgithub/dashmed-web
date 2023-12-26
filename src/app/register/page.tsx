"use client";

import { RegisterView } from "@/views/register";
import { RegisterFormDataProvider } from "@/views/register/registerDataProvider";

const Register = () => {
  return (
    <RegisterFormDataProvider>
      <RegisterView />
    </RegisterFormDataProvider>
  );
};

export default Register;
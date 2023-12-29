"use client";

import { RegisterView } from "@/views/register";
import { RegisterFormDataProvider } from "@/views/register/register-data-provider";

const Register = () => {
  return (
    <RegisterFormDataProvider>
      <RegisterView />
    </RegisterFormDataProvider>
  );
};
export default Register;

// export default withUser<wcProps>(Register);
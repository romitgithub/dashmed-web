"use client";

import withUser, { wcProps } from "@/hoc/withUser";
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

// export default withUser<wcProps>(Register);
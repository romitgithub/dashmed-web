"use client";

import withUser from "@/hoc/withUser";
import { LoginView } from "@/views/login";
import { LoginProvider } from "@/views/login/login-data-provider";

const Login = () => {
     return (
          <LoginProvider>
               <LoginView />
          </LoginProvider>
     );
};
export default withUser(Login);
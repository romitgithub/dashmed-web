"use client";

import withUser, { wcProps } from "@/hoc/withUser";
import { LoginView } from "@/views/login";
// export default LoginView;
export default withUser<wcProps>(LoginView);
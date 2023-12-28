// withUser.tsx

import { ComponentType, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN } from "@/constants";

export interface wcProps {
     user?: any;
};

const withUser = <P extends wcProps>(WrappedComponent: ComponentType<P>): React.FC<P> => {
     const ComponentWithUser: React.FC<P> = (props) => {
          const router = useRouter();

          useEffect(() => {
               const token = localStorage.getItem(ACCESS_TOKEN);
               const isLoginPage = router?.pathname === "/login";
               const isRegisterPage = router?.pathname === "/register";
               if (!token && !isLoginPage && !isRegisterPage && router) router.replace("/login");
          }, [router?.pathname]);

          return <WrappedComponent {...props} />;
     };
     return ComponentWithUser;
};

export default withUser;

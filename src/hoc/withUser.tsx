import { ComponentType, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ACCESS_TOKEN } from "@/constants";

export interface wcProps {
     user?: any;
}

const withUser = <P extends wcProps>(WrappedComponent: ComponentType<P>): React.FC<P> => {

     const ComponentWithUser: React.FC<P> = (props) => {

          const router = useRouter();
          const pathname = usePathname();

          useEffect(() => {

               const token = localStorage.getItem(ACCESS_TOKEN);
               const isLoginPage = pathname === "/login";
               const isRegisterPage = pathname === "/register";

               if (!token && !isLoginPage && !isRegisterPage && router) router.replace("/login");
               if (token && pathname === "/login") router.replace("/scan");
               console.log({ token, pathname });

          }, [pathname, router]);
          return <WrappedComponent {...props} />;
     };

     return ComponentWithUser;
};

export default withUser;

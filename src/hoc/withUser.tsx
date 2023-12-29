import { ComponentType, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ACCESS_TOKEN } from "@/constants";

const withUser = (WrappedComponent: any) => {

     const ComponentWithUser = (props: any) => {

          const router = useRouter();
          const pathname = usePathname();

          useEffect(() => {

               // const token = localStorage.getItem(ACCESS_TOKEN);
               // const isLoginPage = pathname === "/login";
               // const isRegisterPage = pathname === "/register";
               // if (!token && !isLoginPage && !isRegisterPage && router) router.replace("/login");
               // if (token && pathname === "/login") router.replace("/scan");
               // // if (!token) router.replace("/login");

          }, [pathname, router]);

          return <WrappedComponent {...props} />;
     };

     return ComponentWithUser;
};

export default withUser;

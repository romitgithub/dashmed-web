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
               if (!token) {
                    router.replace("/login"); // Redirect to login if no token
               }
          }, []);

          return <WrappedComponent {...props} />;
     };

     return ComponentWithUser;
};

export default withUser;

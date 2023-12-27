import { LeftArrowIcon } from "@/atoms/leftIArrowIcon";
import { useContext } from "react";
import { REGISTER_TYPES, RegisterFormDataContext } from "./registerDataProvider";
interface HeaderProps {
     title: string;
     onBackClick: () => void;
};


export const Header: React.FC<HeaderProps> = ({
     title,
     onBackClick,
}) => {

     const { registerType } = useContext(RegisterFormDataContext);

     const handleBack = () => {
          if (onBackClick) onBackClick();
     };

     return (
          <div className="flex flex-row items-center justify-center relative p-2 w-full">
               <span className="flex absolute cursor-pointer top-2 left-0 mt-0 ml-0 p-1" onClick={handleBack}>
                    {registerType !== REGISTER_TYPES.DEFAULT_TYPE && <LeftArrowIcon />}
               </span>
               <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4 pl-4">
                    {title}
               </span>
          </div>
     );
};

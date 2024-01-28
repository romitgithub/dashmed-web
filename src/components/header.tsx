import { LeftArrowIcon } from '@/atoms/left-arrow-icon';
import { ACCESS_TOKEN } from '@/constants';
import React from 'react';
import { Menu } from '@headlessui/react';
import { MenuIcon } from '@/atoms/menu';
import { useRouter } from 'next/navigation';


interface HeaderProps {
     title: string;
     onBackClick?: () => void;
     showBackButton?: boolean;
};

export const Header: React.FC<HeaderProps> = ({
     title,
     onBackClick,
     showBackButton = true,
}) => {

     const router = useRouter();
     const handleBack = () => {
          if (onBackClick) onBackClick();
     };

     const handleLogout = () => {
          console.log("logout successful");
          localStorage.removeItem(ACCESS_TOKEN);
          router.replace("/login");
     };

     return (
          <div className="flex flex-row items-center justify-center relative p-2 w-full pt-4">
               {
                    showBackButton &&
                    onBackClick &&
                    <span className="flex absolute cursor-pointer top-2 left-0 mt-0 ml-0 p-1" onClick={handleBack}>
                         <LeftArrowIcon />
                    </span>
               }
               <span className="ml-0 font-semibold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">
                    {title}
               </span>
               <div className='absolute right-4'>
                    <Menu>
                         <Menu.Button className='bg-gray-100 rounded-sm py-1 px-2'>
                              <MenuIcon />
                         </Menu.Button>
                         <Menu.Items className="flex flex-col p-2 absolute right-1 shadow-md bg-white rounded-md">
                              <Menu.Item>
                                   {({ active }) => (
                                        <span onClick={handleLogout} className={`${active && 'bg-blue-100'} cursor-pointer py-1 px-3 rounded-md`}>Logout</span>
                                   )}
                              </Menu.Item>
                         </Menu.Items>
                    </Menu>
               </div>
          </div>
     );
};

export default Header;

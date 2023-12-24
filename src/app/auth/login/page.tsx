import Link from "next/link";

export default function LoginVia() {
     return (
          <div className="flex min-h-screen flex-col items-center justify-between w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 m-auto p-1">
               <div className="w-full m-2 p-2 flex flex-col mt-2 sm:mt-2 md:mt-2 lg:mt-4 xl:mt-6">
                    <div className="flex flex-col justify-center w-full ">
                         <span className="ml-0 flex justify-center font-semibold text-lg sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl">Login Via</span>
                    </div>
                    <div className="flex flex-col w-full justify-center align-middle mt-5">
                         <Link href={'#'} className="mt-5">
                              <button className="border-2 border-#1b5887 text-sm sm:text-md md:text-lg lg:text-lg xl:text-xl w-full py-4 px-4 rounded-md text-#1b5887 font-semibold transition duration-300">ABHA Address</button>
                         </Link>
                         <Link href={'#'} className="mt-5">
                              <button className="border-2 border-#1b5887 text-sm sm:text-md md:text-lg lg:text-lg xl:text-xl w-full py-4 px-4 rounded-md text-#1b5887 font-semibold transition duration-300">Email ID</button>
                         </Link>
                         <Link href={'#'} className="mt-5">
                              <button className="border-2 border-#1b5887 text-sm sm:text-md md:text-lg lg:text-lg xl:text-xl w-full py-4 px-4 rounded-md text-#1b5887 font-semibold transition duration-300">ABHA Number</button>
                         </Link>
                    </div>
               </div>
          </div>
     );
};

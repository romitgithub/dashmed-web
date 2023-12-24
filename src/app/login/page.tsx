import FormControlForMobileNo from "@/components/mobileLogin/mobileLogin/mobileLoginForm";
import Link from "next/link";


export default function Login() {
     return (
          <>
               <div className="flex min-h-screen flex-col items-center justify-between w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 m-auto p-1">
                    <div className="w-full m-2 p-2 flex flex-col mt-2 sm:mt-2 md:mt-2 lg:mt-4 xl:mt-6">
                         <div className="flex flex-col sm:flex-row sm:items-center justify-center lg:justify-center xl:justify-center">
                              <span className="font-semibold sm:text-lg md:text-2xl lg:text-3xl xl:text-3xl">Hello!</span>
                              {" "}
                              <span className="ml-0 sm:ml-3 font-semibold sm:text-lg md:text-2xl lg:text-3xl xl:text-3xl">Romit Choudhary</span>
                         </div>
                         <div>
                              <FormControlForMobileNo />
                         </div>
                         <div className="flex flex-col w-full justify-center align-middle">
                              <span className="m-auto text-xl">Or</span>
                              <Link href={"/auth/login"}><span className="block text-center mt-5 font-medium text-teal-700">Other Login Options</span></Link>
                              <div className="flex flex-col w-full justify-center align-middle mt-5">
                                   <Link href={'#'} className="mt-5">
                                        <button className="border border-#1b5887 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg w-full py-1 px-1 rounded-md text-#1b5887 font-medium transition duration-300">ABHA Address</button>
                                   </Link>
                                   <Link href={'#'} className="mt-5">
                                        <button className="border border-#1b5887 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg w-full py-1 px-1 rounded-md text-#1b5887 font-medium transition duration-300">Email ID</button>
                                   </Link>
                                   <Link href={'#'} className="mt-5">
                                        <button className="border border-#1b5887 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg w-full py-1 px-1 rounded-md text-#1b5887 font-medium transition duration-300">ABHA Number</button>
                                   </Link>
                              </div>
                         </div>
                    </div>
                    <div>
                         <div>
                              <span className="font-medium block text-center text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg">{"Don't have an ABHA Address?"}</span>
                              <span className="flex justify-center align-middle font-medium text-teal-700">Register</span>
                         </div>
                         <div className="mt-4 mb-4">
                              <span className="font-medium block text-center text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg">{"Don't have an ABHA number?"}</span>
                              <span className="flex justify-center align-middle font-medium text-teal-700">Create Now</span>
                         </div>
                         <div className="mb-3">
                              <span className="flex justify-center align-middle mt-2 font-medium text-teal-700 text-sm underline">Privacy Policy</span>
                         </div>
                    </div>
               </div>
          </>
     );
};

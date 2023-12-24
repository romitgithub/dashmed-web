"use client";


export default function LoginWithMobile() {

     const addresses = [
          {
               'address': '7897417171@abdm',
               'username': 'Vibhor Agnihotri'
          },
          {
               'address': 'vibhor.agnihotri@abdm',
               'username': 'Vibhor Agnihotri'
          },
     ];


     return (
          <div className="flex min-h-screen flex-col items-center justify-between w-full">
               <div className="w-full m-2 p-2 flex flex-col mt-2 sm:mt-2 md:mt-2 lg:mt-4 xl:mt-6">
                    <div className="flex flex-row items-center justify-center shadow-lg">
                         <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">Login with Mobile Number</span>
                    </div>
                    <div className="flex flex-row items-center justify-center mt-5">
                         <span className="ml-0 font-md sm:text-lg md:text-xl lg:text-xl xl:text-2xl mb-4">Select the ABHA Address through which you wish to login</span>
                    </div>
                    <div className="flex min-h-screen flex-col items-center w-full small:w-4/5 sm:w-3/5 md:w-2/5 lg:w-2/6 xl:w-2/6 m-auto p-1">
                         {
                              addresses?.map((address) => {
                                   return <div className="border border-solid border-gray-700 w-full flex flex-col p-2 pl-7 rounded-md m-2">
                                        <span className="text-gray-500">{address?.address}</span>
                                        <span className="font-medium">{address?.username}</span>
                                   </div>
                              })
                         }
                         <div className='mt-5 mb-5 w-full'>
                              <button
                                   type="submit"
                                   className="p-2 w-full text-sm sm:text-md md:text-md lg:text-lg xl:text-xl bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300"
                              >
                                   LOGIN
                              </button>
                         </div>
                    </div>

               </div>
               <></>
          </div>
     );
};

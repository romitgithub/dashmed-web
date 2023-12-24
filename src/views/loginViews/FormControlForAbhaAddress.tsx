import { FormControlProps } from "@/components/mobileLogin/mobileLogin/mobileLoginForm";
import { useState } from "react";


const FormControlForAbhaAddress: React.FC<FormControlProps> = ({ setLoginChecks, loginChecks }) => {

     const [showPassword, setShowPassword] = useState(false);

     const [formData, setFormData] = useState({
          abhaAddress: '',
          abhaPassword: '',
          selectedRadioVal: '',
     });

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { value, name, type } = e.target;
          if (type === 'radio') {
               setFormData({
                    ...formData,
                    selectedRadioVal: value,
               });
          } else {
               setFormData({
                    ...formData,
                    [name]: value,
               });
          }
     };


     const handleForgetSection = () => {
          setLoginChecks({
               ...loginChecks,
               forgetPassword: true,
          });
     };


     console.log({ loginChecks });

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
          e.preventDefault();
          console.log({ formData });
          // try {
          //      const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/phr/api/login/sendOtp', {
          //           method: 'POST',
          //           headers: {
          //                'Content-Type': 'application/json',
          //           },
          //           body: JSON.stringify({ value: abhaAddress, type: "ABHA_ADD" }), // Send the necessary data in the body
          //      });

          //      if (!response.ok) {
          //           throw new Error('Network response was not ok');
          //      }

          //      const data = await response.json();
          //      console.log({ data });
          //      if (data?.transactionId) {
          //           setLoginChecks({
          //                ...loginChecks,
          //                isOtpSent: true,
          //                transactionId: data?.transactionId,
          //                type: "ABHA_ADD",
          //           });
          //      }
          // } catch (error) {
          //      console.error('Error:', error);
          // }

          setLoginChecks({
               ...loginChecks,
               isOtpSent: true,
               type: "ABHA_ADD",
          });
     };


     return (
          <form onSubmit={handleSubmit} className='pt-5 pb-5'>
               <div className="flex flex-col border-red-500 pb-5">
                    <label>Enter your ABHA address</label>
                    <div className="rounded border border-gray-300 flex mt-2 items-center space-x-2 pr-5">
                         <input
                              type="tel"
                              className="p-2   flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
                              placeholder="Enter ABHA Number"
                              value={formData?.abhaAddress}
                              name='abhaAddress'
                              onChange={handleInputChange}
                              maxLength={14}
                              minLength={14}
                         />
                         <span className="pr-5">@abdm</span>
                    </div>
               </div>
               <div className="flex flex-col border-red-500 pt-5">
                    <label className="mt-7">Enter your password</label>
                    <div className="rounded border border-gray-300 flex items-center space-x-2 mt-2 mb-5">
                         <input
                              type={showPassword ? "text" : "password"}
                              className="p-2   flex-1 w-full sm:w-auto md:w-1/2 lg:w-2/3 xl:w-1/2"
                              placeholder="Enter ABHA Number"
                              value={formData?.abhaPassword}
                              name='abhaPassword'
                              onChange={handleInputChange}
                              maxLength={14}
                              minLength={14}
                         />
                         <span onClick={() => setShowPassword((prev) => !prev)}>
                              {
                                   !showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>

                                   ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                   )
                              }
                         </span>
                    </div>
               </div>

               <div className="flex w-full justify-between">
                    <label className="flex items-center space-x-2 text-teal-500">
                         <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-teal-500 rounded border-gray-300 focus:ring-teal-500"
                         />
                         <span className="pl-3 text-xs sm:text-sm lg:text-md">Remember me</span>
                    </label>
                    <label className="text-teal-500 text-xs sm:text-sm lg:text-md" onClick={handleForgetSection}>Forget ABHA Number?</label>
               </div>
               <span className="flex justify-center align-middle p-2">Or</span>
               <div>
                    <label className="font-semibold">Validate Using</label>
                    <div className="flex flex-col">
                         <label className="mt-3">
                              <input
                                   type="radio"
                                   value="Email OTP"
                                   checked={formData?.selectedRadioVal === "Email OTP"}
                                   onChange={handleInputChange}
                              />
                              <span className="pl-3">Email OTP</span>
                         </label>
                         <label className="mt-3">
                              <input
                                   type="radio"
                                   value="Mobile OTP"
                                   checked={formData?.selectedRadioVal === "Mobile OTP"}
                                   onChange={handleInputChange}
                              />
                              <span className="pl-2"> Mobile OTP</span>

                         </label>
                    </div>

               </div>
               <div className='mt-5 mb-5'>
                    <button
                         type="submit"
                         className="p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300"
                    >
                         Continue
                    </button>
               </div>
          </form>
     );
};

export { FormControlForAbhaAddress };
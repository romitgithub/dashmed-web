import { Button } from "@/atoms/button";
import AppInput from "@/atoms/input";
import { ChangeEvent, useState } from "react";

interface Details {
     abhaNumber?: string;
     abhaAddress?: string;
     name?: string;
     gender?: string;
     dob?: string;
     mobile?: string;
     address?: string;
};

interface Props {
     headingText: string;
     footerText: string;
     onSubmit: (details: Details) => void;
};

export const ScanToShareDetails: React.FC<Props> = ({ headingText, footerText, onSubmit }) => {
     const [details, setDetails] = useState<Details>({});

     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
          const { name, value } = e.target;
          setDetails({
               ...details,
               [name]: value,
          });
     };

     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          console.log({ details });
          if (onSubmit) onSubmit(details);
     };

     const handleBack = () => console.log("back");
     const handleSelect = (field: keyof Details, value: string) => {
          setDetails((prevData) => ({
               ...prevData,
               [field]: value,
          }));
     };

     return (
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
               <span className="w-full text-left font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">
                    Share your details with
               </span>
               <span className="w-full ml-0 font-semibold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">
                    {headingText}
               </span>
               <div className="w-full mt-5 mb-10">
                    <span className="w-full font-medium">Your details</span>
                    <table className="w-full mt-3">
                         <tbody>
                              <tr className="border-b border-gray-200">
                                   <td className="text-gray-500">ABHA Number</td>
                                   <td>
                                        <AppInput
                                             placeholder="XX-XXXX-XXXX-XXXX"
                                             type="number"
                                             value={details?.abhaNumber}
                                             onChange={handleChange}
                                             name='abhaNumber'
                                             className="border-0"
                                        // required
                                        />
                                   </td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                   <td className="text-gray-500">ABHA Number</td>
                                   <td>
                                        <AppInput
                                             placeholder="XX-XXXX-XXXX-XXXX"
                                             type="number"
                                             value={details?.abhaNumber}
                                             onChange={handleChange}
                                             name='abhaNumber'
                                             className="border-0"
                                        // required
                                        />
                                   </td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                   <td className="text-gray-500">ABHA Address</td>
                                   <td>
                                        <AppInput
                                             placeholder="Example123@abdm"
                                             type="text"
                                             value={details?.abhaAddress}
                                             onChange={handleChange}
                                             name='abhaAddress'
                                             className="border-0"
                                        // required
                                        />
                                   </td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                   <td className="text-gray-500">Name</td>
                                   <td>
                                        <AppInput
                                             placeholder="Name"
                                             type="text"
                                             value={details?.name}
                                             onChange={handleChange}
                                             name='name'
                                             className="border-0"
                                        // required
                                        />
                                   </td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                   <td className="text-gray-500">Gender</td>
                                   <td>
                                        <select
                                             className="py-2 flex-1 w-full"
                                             value={details?.gender}
                                             // required
                                             onChange={(e) => handleSelect("gender", e.target.value)}>
                                             <option value="M">Male</option>
                                             <option value="F">Female</option>
                                        </select>
                                   </td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                   <td className="text-gray-500">DOB</td>
                                   <td>
                                        <AppInput
                                             placeholder="DOB"
                                             type="date"
                                             value={details?.dob}
                                             onChange={handleChange}
                                             name='dob'
                                             className="border-0"
                                        // required
                                        />
                                   </td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                   <td className="text-gray-500">Mobile</td>
                                   <td>
                                        <AppInput
                                             placeholder="XX-XXXX-XXXX"
                                             type="tel"
                                             value={details?.mobile}
                                             onChange={handleChange}
                                             name='mobile'
                                             className="border-0"
                                        // required
                                        />
                                   </td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                   <td className="text-gray-500">Address</td>
                                   <td>
                                        <AppInput
                                             placeholder="Address"
                                             type="text"
                                             value={details?.address}
                                             onChange={handleChange}
                                             name='address'
                                             className="border-0"
                                        // required
                                        />
                                   </td>
                              </tr>
                         </tbody>
                    </table>
               </div>
               <span className="w-full ml-0 font-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">
                    {footerText}
               </span>
               <div className="flex justify-between align-middle mt-3 mb-5">
                    <Button onClick={handleBack} className="p-2 bg-blue-500 text-white rounded-sm hover:bg-blue-700 transition duration-300">CANCEL</Button>
                    <Button className="p-2 bg-blue-500 text-white rounded-sm hover:bg-blue-700 transition duration-300">SHARE</Button>
               </div>
          </form>
     );
};




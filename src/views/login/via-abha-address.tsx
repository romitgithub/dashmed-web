import { useContext, useState } from "react";
import { Checkbox } from "@/atoms/checkbox";
import { ViewPasswordIcon } from "@/atoms/show-password-icon";
import { HidePasswordIcon } from "@/atoms/hide-password-icon";
import { Button } from "@/atoms/button";
import { LoginContext } from "./login-data-provider";

interface ViaAbhaAddressProps {
  onSubmit: (formData: Record<string, any>) => void;
};

export const ViaAbhaAddress: React.FC<ViaAbhaAddressProps> = ({ onSubmit }) => {

  const { loading } = useContext(LoginContext);
  const [abhaAddress, setAbhaAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [abhaAddressError, setAbhaAddressError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateAbhaAddress(abhaAddress)) return setAbhaAddressError('Please enter a valid ABHA address');
    else setAbhaAddressError(null);
    if (onSubmit) onSubmit({ value: abhaAddress, password });
  };


  const validateAbhaAddress = (value: any) => {
    const abhaAddressRegex = /^[^\s@]+@abdm$/; // Adjust abha address as per requirements
    if (!abhaAddressRegex.test(value)) return false;
    else return true;
  };


  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <label>Enter your ABHA address</label>
      <div className="flex w-full flex-col mt-2 items-center space-x-2 mb-5">
        <input
          type="text"
          className="rounded border border-gray-300 p-2 flex-1 w-full"
          placeholder="Example@abdm"
          value={abhaAddress}
          required
          onChange={(e) => setAbhaAddress(e.target.value)}
        />
        {abhaAddressError && <div className='w-full text-red-500 text-left'>{abhaAddressError}</div>}
      </div>
      <label className="mt-5">Enter your password</label>
      <div className="rounded border border-gray-300 flex items-center space-x-2 mt-2 mb-5">
        <input
          type={showPassword ? "text" : "password"}
          className="p-2   flex-1 w-full"
          placeholder="Enter ABHA password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span onClick={() => setShowPassword((prev) => !prev)} className="pr-4">
          {!showPassword ? <ViewPasswordIcon /> : <HidePasswordIcon />}
        </span>
      </div>
      <div className="flex w-full justify-between">
        <label className="flex items-center space-x-2 text-teal-500">
          <Checkbox label={"Remember me"} id={""} />
        </label>
        <label className="text-teal-500 text-xs sm:text-sm lg:text-md">
          Forget ABHA Number?
        </label>
      </div>
      <span className="flex justify-center align-middle p-2">Or</span>
      <div>
        <label className="font-semibold">Validate Using</label>
        <div className="flex flex-col">
          <label className="mt-3">
            <input type="radio" value="Email OTP" />
            <span className="pl-3">Email OTP</span>
          </label>
          <label className="mt-3">
            <input type="radio" value="Mobile OTP" />
            <span className="pl-2"> Mobile OTP</span>
          </label>
        </div>
      </div>
      <div className="mt-5">
        <Button isLoading={loading} disabled={loading} spinnerColor="fill-yellow-600" className='disabled:text-gray-400 p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300'>
          LOGIN
        </Button>
      </div>
    </form>
  );
};

"use client";

import { useState } from "react";
import { FooterSection } from "./footer";
import { fetchPostJSONExternal } from "@/utils/apiHelpers";
import { SelectAddress } from "@/components/select-address";
import { ACCESS_TOKEN } from "@/constants";
import { LoginVia } from "./login-via";
import Header from "@/components/header";
import { OtpInput } from "@/components/otp-input";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export const LOGIN_TYPES = {
  ABHA_ADD: "ABHA_ADD",
  ABHA_NO: "ABHA_NO",
  MOBILE: "MOBILE",
  EMAIL: "EMAIL",
};

export const LOGIN_STATES = {
  DEFAULT_VIEW: "DEFAULT_VIEW",
  OTP_VIEW: "OTP_VIEW",
  ADDRESS_VIEW: "ADDRESS_VIEW",
};

// Constants for login type text
const loginTypeTextMap: Record<string, string> = {
  [LOGIN_TYPES?.MOBILE]: "Mobile Number",
  [LOGIN_TYPES?.ABHA_ADD]: "ABHA address",
  [LOGIN_TYPES?.ABHA_NO]: "ABHA Number",
  [LOGIN_TYPES?.EMAIL]: "Email Id",
};

export const LoginView = () => {

  const [loginType, setLoginType] = useState<string>(LOGIN_TYPES.MOBILE);
  const [loginState, setLoginState] = useState<string>(LOGIN_STATES.DEFAULT_VIEW);
  const [transactionId, setTransactionId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [value, setValue] = useState(null);
  const router = useRouter();

  // on saving anything among ABHA num, Abha Address, Mobile num, Email-id and making a network request.
  const handleSubmit = async (data: any) => {
    fetchPostJSONExternal("/phr/api/login/sendOtp", {
      ...data,
      type: loginType,
    })
      .then((res) => {
        console.log({ res });
        if (res?.transactionId) {
          setTransactionId(res?.transactionId);
          setLoginState(LOGIN_STATES.OTP_VIEW);
          setValue(data?.value);
        } else toast.error("Please try again.");
      })
      .catch((err) => {
        toast.error("Please try again.");
        console.log({ err });
      });
  };

  const handleResendOTP = async () => {
    fetchPostJSONExternal("/phr/api/login/sendOtp", {
      value,
      type: loginType,
    })
      .then((res) => {
        console.log({ res });
        if (res?.transactionId) {
          setTransactionId(res?.transactionId);
          setLoginState(LOGIN_STATES.OTP_VIEW);
        } else toast.error("Please try again.");
      })
      .catch((err) => {
        toast.error("Please try again.");
        console.log({ err });
      });
  };

  // save the otp value and make network request
  const handleSubmitOtp = async (otpValue: string) => {
    fetchPostJSONExternal("/phr/api/login/verifyOtp", {
      otp: otpValue,
      transactionId,
      type: loginType,
    })
      .then((res) => {
        console.log({ res });
        if (res?.mappedPhrAddress && res?.transactionId) {
          setTransactionId(res?.transactionId);
          setAddresses(res?.mappedPhrAddress);
          setLoginState(LOGIN_STATES.ADDRESS_VIEW);
        } else toast.error("Please try again.");
      })
      .catch((err) => {
        toast.error("Please try again.");
        console.log({ err });
      });
  };

  // save the selected address value and make network request
  const handleSelectAddress = async (selectedAddressValue: string) => {
    fetchPostJSONExternal("/phr/api/login/abhaAddConfirm", {
      abhaAdd: selectedAddressValue,
      transactionId,
    })
      .then((res) => {
        console.log({ res });
        if (res?.token) {
          localStorage.setItem(ACCESS_TOKEN, res?.token);
          console.log({ token: res?.token });
          router.push("/scan");
        } else toast.error("Please try again.");
      })
      .catch((err) => {
        toast.error("Login failed, Please try again.");
        console.log({ err });
      });
  };

  const handleBackButtonClick = () => {
    console.log({ loginType, loginState });
    if (loginState === LOGIN_STATES.ADDRESS_VIEW)
      setLoginState(LOGIN_STATES.OTP_VIEW);
    else if (loginState === LOGIN_STATES.OTP_VIEW)
      setLoginState(LOGIN_STATES.DEFAULT_VIEW);
    else if (loginState === LOGIN_STATES.DEFAULT_VIEW)
      setLoginType(LOGIN_TYPES.MOBILE);
  };

  const handleToggleLoginType = (value: string) => setLoginType(value);

  return (
    <div className="flex min-h-screen flex-col items-center w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 m-auto p-1">
      <Header
        title={`Login with ${loginTypeTextMap[loginType]}` || "Unknown"}
        onBackClick={handleBackButtonClick}
        showBackButton={loginType !== LOGIN_TYPES.MOBILE}
      />

      {loginState === LOGIN_STATES.DEFAULT_VIEW && (
        <LoginVia onSubmit={handleSubmit} loginType={loginType} />
      )}

      {loginState === LOGIN_STATES.OTP_VIEW && (
        <OtpInput onSubmitOtp={handleSubmitOtp} onResendOTP={handleResendOTP} />
      )}

      {loginState === LOGIN_STATES.ADDRESS_VIEW && ( <SelectAddress
          onSelectAddress={handleSelectAddress}
          addresses={addresses}
        />
      )}

      {loginType === LOGIN_TYPES.MOBILE &&
        LOGIN_STATES.DEFAULT_VIEW === loginState && (
          <FooterSection onToggleLoginType={handleToggleLoginType} />
        )}
    </div>
  );
};

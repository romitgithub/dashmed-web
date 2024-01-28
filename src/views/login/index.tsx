"use client";

import { useCallback, useContext, useState } from "react";
import { FooterSection } from "./footer";
import { fetchPostJSONExternal } from "@/utils/apiHelpers";
import { SelectAddress } from "@/components/select-address";
import { ACCESS_TOKEN } from "@/constants";
import { LoginVia } from "./login-via";
import Header from "@/components/header";
import { OtpInput } from "@/components/otp-input";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LOGIN_STATES, LOGIN_TYPES, LoginContext, loginTypeTextMap } from "./login-data-provider";


export const LoginView = () => {

  const {
    loginType,
    setLoginType,
    loginState,
    setLoginState,
    transactionId,
    setTransactionId,
    addresses,
    setAddresses,
    loading,
    setLoading,
  } = useContext(LoginContext);

  const [value, setValue] = useState(null); // store login-via email, abha no., mobile no. credential value
  const router = useRouter();

  // on saving anything among ABHA num, Abha Address, Mobile num, Email-id and making a network request.
  const handleSubmit = useCallback(async (data: any) => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Please try again.");
        console.log({ err });
        setLoading(false);
      });
  }, [loginType]);


  const handleResendOTP = useCallback(async () => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Please try again.");
        console.log({ err });
        setLoading(false);
      });
  }, [loginType, value]);


  // save the otp value and make network request
  const handleSubmitOtp = useCallback(async (otpValue: string) => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Please try again.");
        console.log({ err });
        setLoading(false);
      });
  }, [loginType, transactionId]);


  // save the selected address value and make network request
  const handleSubmitSelectedAddress = useCallback(async (selectedAddressValue: string) => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Login failed, Please try again.");
        console.log({ err });
        setLoading(false);
      });
  }, [transactionId]);


  const handleBackButtonClick = useCallback(() => {
    setLoading(false);
    if (loginState === LOGIN_STATES.ADDRESS_VIEW) setLoginState(LOGIN_STATES.OTP_VIEW);
    else if (loginState === LOGIN_STATES.OTP_VIEW) setLoginState(LOGIN_STATES.DEFAULT_VIEW);
    else if (loginState === LOGIN_STATES.DEFAULT_VIEW) setLoginType(LOGIN_TYPES.MOBILE);
  }, [loginType, loginState]);


  const handleToggleLoginType = useCallback((value: string) => {
    setLoading(false);
    setLoginType(value)
  }, []);


  return (
    <>
      <Header
        title={`Login with ${loginTypeTextMap[loginType]}` || "Unknown"}
        onBackClick={handleBackButtonClick}
        showBackButton={loginType !== LOGIN_TYPES.MOBILE}
      />
      <div className="flex min-h-screen flex-col items-center w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 m-auto p-1">

        {loginState === LOGIN_STATES.DEFAULT_VIEW && (
          <LoginVia onSubmit={handleSubmit} />
        )}

        {loginState === LOGIN_STATES.OTP_VIEW && (
          <OtpInput isLoading={loading} onSubmitOtp={handleSubmitOtp} onResendOTP={handleResendOTP} />
        )}

        {loginState === LOGIN_STATES.ADDRESS_VIEW && (<SelectAddress
          isLoading={loading}
          onSubmitAddress={handleSubmitSelectedAddress}
          addresses={addresses}
        />
        )}

        {loginType === LOGIN_TYPES.MOBILE &&
          LOGIN_STATES.DEFAULT_VIEW === loginState && (
            <FooterSection onToggleLoginType={handleToggleLoginType} />
          )}
      </div>
    </>
  );
};

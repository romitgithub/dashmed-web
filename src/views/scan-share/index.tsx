import React, { useCallback, useEffect, useState } from "react";
import Header from "@/components/header";
import { ScanToShareDetails } from "./scan-to-share-details";
import TokenModal from "./token-card-pop-over";
import { useRouter } from "next/navigation";
import { fetchPostJSONExternal } from "@/utils/apiHelpers";
import { toast } from "react-toastify";

export const SCAN_FLOW_TYPES = {
     SHARE_DETAILS: "SHARE_DETAILS",
     CONFIRM_SHARE_DETAILS: "CONFIRM_SHARE_DETAILS",
     TOKEN: "TOKEN",
};

const headingText = "Lady hardinge Medical College and Smt Sucheta Kriplani Hospital (LHMC snd SSKH)";
const footerText = "You consent to the above information to be shared with Lady hardinge Medical College and Smt Sucheta Kriplani Hospital (LHMC snd SSKH). The can use information for your registration and linking your health records.";

const ScanView = () => {

     const router = useRouter();
     const [scanType, setScanType] = useState<string>(SCAN_FLOW_TYPES.SHARE_DETAILS);
     const [scannedData, setScannedData] = useState(null);
     const [tokenNum, setTokenNum] = useState<number | null>(null);
     const [showToken, setShowToken] = useState(false);
     const handleOpenCloseModal = () => setShowToken(prev => !prev);
     

     const handleSubmit = (data: any) => {
          console.log({ data });
          fetchPostJSONExternal('/phr/api/scan/shareProfile', {
               value: data?.mobile,
               type: "MOBILE",
          })
               .then((res) => {
                    console.log({ res });
                    if (res?.success) setTokenNum(56);
               })
               .catch((err) => {
                    toast.error("Something went wrong.");
                    console.log({ err });
               });
     };


     const handleBackButtonClick = useCallback(() => {
          if (scanType === SCAN_FLOW_TYPES.TOKEN) setScanType(SCAN_FLOW_TYPES.SHARE_DETAILS);
          else if (scanType === SCAN_FLOW_TYPES?.SHARE_DETAILS) router.push("/scan");
     }, [scanType, router]);


     useEffect(() => {
          const data = JSON.parse(window.localStorage.getItem("scannedData") || "null");
          const parsedData = JSON.parse(data?.text);
          console.log({ data });
          setScannedData(parsedData);
     }, [setScannedData]);


     useEffect(() => {
          const isDataScanned = window.localStorage.getItem("isDataScanned");
          if (isDataScanned === "true") {
               window.localStorage.setItem("isDataScanned", "false");
               window.location.reload();
          }
     }, []);

     console.log({ scannedData });

     return (
          <div className="flex min-h-screen flex-col items-center w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 m-auto p-1">
               <Header title={`Scan to share` || "Unknown"} onBackClick={handleBackButtonClick} showBackButton={true} />
               {SCAN_FLOW_TYPES.SHARE_DETAILS === scanType &&
                    <ScanToShareDetails
                         data={scannedData}
                         tokenNum={tokenNum}
                         headingText={headingText}
                         footerText={footerText}
                         onSubmit={handleSubmit}
                         onOkay={handleOpenCloseModal}
                         onCancel={handleBackButtonClick}
                    />}
               <TokenModal isModalOpen={showToken} onCloseModal={handleOpenCloseModal} />
          </div>
     );
};

export default ScanView;

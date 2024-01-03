import React, { useCallback, useEffect, useState } from "react";
import Header from "@/components/header";
import { ScanToShareDetails } from "./scan-to-share-details";
import TokenModal from "./token-card-pop-over";
import { useRouter } from "next/navigation";

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

     const handleSubmitDetails = (data: any) => {
          console.log({ data });
          setScanType(SCAN_FLOW_TYPES.TOKEN);
     };

     const handleBackButtonClick = useCallback(() => {
          if (scanType === SCAN_FLOW_TYPES.TOKEN) setScanType(SCAN_FLOW_TYPES.SHARE_DETAILS);
          else if (scanType === SCAN_FLOW_TYPES?.SHARE_DETAILS) router.push("/scan");
     }, [scanType, router]);

     useEffect(() => {
          const data = JSON.parse(window.localStorage.getItem("scannedData") || "null");
          setScannedData(data);
     }, [setScannedData]);

     console.log({ scannedData });

     return (
          <div className="flex min-h-screen flex-col items-center w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 m-auto p-1">
               <Header title={`Scan to share` || "Unknown"} onBackClick={handleBackButtonClick} showBackButton={true} />
               {SCAN_FLOW_TYPES.SHARE_DETAILS === scanType && <ScanToShareDetails headingText={headingText} footerText={footerText} onSubmit={handleSubmitDetails} />}
               {scanType === SCAN_FLOW_TYPES.TOKEN && <TokenModal />}
          </div>
     );
};

export default ScanView;

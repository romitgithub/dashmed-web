"use client";

import { useContext, useState } from "react";
import { QrScanner } from "./qr-scanner";
import Modal from "./available-apps";
import { ScanDataContext } from "./scan-data-provider";
import Header from "@/components/header";
import { ScanToShareDetails } from "./scan-to-share-details";

export const LOGIN_STATUS = {
     LOGGED_IN: 'LOGGED_IN',
     NOT_LOGGED_IN: 'NOT_LOGGED_IN',
};

const ScanView = () => {

     const {
          applicationStatus,
          setApplicationStatus,
     } = useContext(ScanDataContext);

     console.log({ applicationStatus });

     const [showModal, setShowModal] = useState(false); // State to control modal visibility
     const [loginStatus, setLoginStatus] = useState<string>(LOGIN_STATUS.LOGGED_IN);
     const [scanResult, setScanResult] = useState(null);

     const handleChangeLoginStatus = (value: string) => setLoginStatus(value);

     const handleScannedData = (scannedData: any) => {
          console.log({ scannedData });
          setScanResult(scannedData);
     };

     const handleBackButtonClick = () => {
          console.log("back");
     }

     return (
          <>
               <Header title={`Scan to share` || "Unknown"} onBackClick={handleBackButtonClick} showBackButton={false} />
               <div className="flex min-h-screen flex-col items-center w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 m-auto p-1 mt-10"></div>
               {/* {!scanResult && <QrScanner onScan={handleScannedData} />} */}
               <Modal onOpenModal={showModal} setShowModal={setShowModal} />
               <ScanToShareDetails
                    headingText={"Lady hardinge Medical College and Smt Sucheta Kriplani Hospital (LHMC snd SSKH)"}
                    footerText={"You consent to the above information to be shared with Lady hardinge Medical College and Smt Sucheta Kriplani Hospital (LHMC snd SSKH). The can use information for your registration and linking your health records."}
               />
          </>
     );
};

export default ScanView;
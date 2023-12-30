"use client";

import { useState } from "react";
import { QrScanner } from "./qr-scanner";
import Modal from "./available-apps";
import { Button } from "@/atoms/button";


export const APP_STATUS = {
     DEFAULT_SCAN_TYPE: 'DEFAULT_SCAN_TYPE',
     APPLICATION_INSTALLED: 'APPLICATION_INSTALLED',
     APPLICATIONS_NOT_INSTALLED: 'APPLICATIONS_NOT_INSTALLED',
};

export const LOGIN_STATUS = {
     LOGGED_IN: 'LOGGED_IN',
     NOT_LOGGED_IN: 'NOT_LOGGED_IN',
};


const ScanView = () => {

     const [showModal, setShowModal] = useState(false); // State to control modal visibility
     const [appStatus, setAppStatus] = useState<string>(APP_STATUS.DEFAULT_SCAN_TYPE);
     const [loginStatus, setLoginStatus] = useState<string>(LOGIN_STATUS.LOGGED_IN);

     const handleChangeAppStatus = (value: string) => setAppStatus(value);
     const handleChangeLoginStatus = (value: string) => setLoginStatus(value);
     const openModal = () => setShowModal(true);

     const handleScannedData = (scannedData: any) => {
          console.log({ scannedData });
          handleChangeAppStatus(APP_STATUS.APPLICATION_INSTALLED);
     };

     return (
          <div className="flex min-h-screen flex-col items-center w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 m-auto p-1 mt-10">
               <span className="w-full flex justify-center align-middle font-bold">WELL-COME TO ABHA</span>
               <span className="w-full flex justify-center align-middle">Scan-View</span>
               <span className="w-full flex justify-center align-middle font-semibold text-teal-600">Login Successful</span>


               {/* {appStatus === APP_STATUS.DEFAULT_SCAN_TYPE ? (
                    <QrScanner onScan={handleScannedData} />
               ) : (
                    <>
                         <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-5" onClick={openModal}>Open Modal</Button>
                         <Modal onOpenModal={showModal} setShowModal={setShowModal} />
                    </>)} */}
          </div>
     );
};

export default ScanView;
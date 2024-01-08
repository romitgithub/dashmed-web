import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import { QrReader } from "react-qr-reader";
import { IS_DATA_SCANNED } from "@/constants";


export const Scanner: React.FC = React.memo(() => {

     const router = useRouter();

     const handleScan = (data: any) => {
          window.localStorage.setItem("scannedData", JSON.stringify(data));
          window.localStorage.setItem(IS_DATA_SCANNED, "true");
          router.push('/scan-share');
     };

     const handleBackButtonClick = () => router.back();

     const qrReader = useMemo(() => (
          <QrReader
               onResult={(result: any, error: any) => {
                    if (!!result) handleScan(result);
                    if (!!error) console.log(error);
               }}
               videoStyle={{ width: "100%", height: 'full' }}
               containerStyle={{ width: "full", height: 'full' }}
               videoContainerStyle={{ width: "full", height: '100%' }}
               constraints={{ facingMode: 'environment' }}
          />
     ), []);

     return (
          <>
               <Header title={`Scan to share`} onBackClick={handleBackButtonClick} showBackButton={true} />
               {qrReader};
          </>
     );
});

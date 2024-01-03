import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import { QRScanner } from "./qr-scanner";
import { IS_DATA_SCANNED } from "@/constants";

export const Scanner: React.FC = React.memo(() => {

     const router = useRouter();
     const [shouldScan, setShouldScan] = useState(true);
     const [isVisible, setIsVisible] = useState(true);

     const handleScan = useCallback((data: any) => {
          window.localStorage.setItem("scannedData", JSON.stringify(data));
          window.localStorage.setItem(IS_DATA_SCANNED, "true");
          setShouldScan(false);
          setIsVisible(false);
          router.push('/scan-share');
     }, [router]);

     const handleBackButtonClick = () => router.back();

     return (
          <>
               <Header title={`Scan to share`} onBackClick={handleBackButtonClick} showBackButton={true} />
               {shouldScan ? <QRScanner onScan={handleScan} isVisible={isVisible} /> : null}
          </>
     );
});

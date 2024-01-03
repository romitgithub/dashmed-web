import React, { useMemo } from "react";
import { QrReader } from "react-qr-reader";

interface QRReaderProps {
     onScan: (data: any) => void;
     isVisible: boolean;
}

export const QRScanner: React.FC<QRReaderProps> = ({ onScan, isVisible }) => {

     const qrReader = useMemo(() => (
          <div className={`w-full ${isVisible ? '' : 'hidden'}`}>
               <QrReader
                    onResult={(result: any, error: any) => {
                         if (!!result) {
                              onScan(result);
                              // ReactDOM.unmountComponentAtNode(QrReader);
                         }
                         if (!!error) console.log(error);
                    }}
                    videoStyle={{ width: "100%" }}
                    constraints={{ facingMode: 'environment' }}
               />
          </div>
     ), []);
     return qrReader;
};
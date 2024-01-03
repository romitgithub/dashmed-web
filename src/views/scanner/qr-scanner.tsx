import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import { QrReader } from "react-qr-reader";

interface QRReaderProps {
     onScan: (data: any) => void;
}

export const QRScanner: React.FC<QRReaderProps> = ({ onScan }) => {
     const qrReader = useMemo(() => (
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
     ), []);
     return qrReader;
};
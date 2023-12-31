"use client";

import { Button } from "@/atoms/button";
import { useContext, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import { APPLICATION_STATUS, ScanDataContext } from "./scan-data-provider";

interface QrScannerProps {
  onScan: (data: string | null) => void;
}

export const QrScanner: React.FC<QrScannerProps> = ({ onScan }) => {

  const {
    applicationStatus,
    setApplicationStatus,
  } = useContext(ScanDataContext);

  const ref = useRef('video');
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [startScan, setStartScan] = useState(false);
  const [isRecording, setIsRecording] = useState<boolean>(true);
  const [selected, setSelected] = useState("environment");
  const [scanResult, setScanResult] = useState(false);


  const openModal = () => setShowModal(true);

  const toggleScan = () => {
    if (!startScan) setIsRecording(true); // Reset isScanning when starting the scan
    setStartScan((prevState) => !prevState); // Toggle camera on/off
  };


  return (
    <div className="flex flex-col justify-center mt-10">
      <Button onClick={toggleScan}> {startScan ? "Stop Scan" : "Start Scan"}</Button>
      <>
        <select onChange={(e) => setSelected(e.target.value)}>
          <option value={"environment"}>Back Camera</option>
          <option value={"user"}>Front Camera</option>
        </select>

        {!scanResult &&
          <QrReader
            onResult={(result: any, error: any) => {
              if (!!result) {
                onScan(result);
                setStartScan(false);
                setScanResult(true);
                setApplicationStatus(APPLICATION_STATUS.APPLICATION_AVAILABLE);
                return openModal();
              };
              if (!!error) console.log(error);
            }}
            videoStyle={{ width: "200%" }}
            scanDelay={2000}
            videoId={ref.current.value}
            constraints={{ facingMode: selected }} />
        }
      </>
    </div>
  );
};

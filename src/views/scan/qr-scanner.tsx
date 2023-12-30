"use client";

import { useState, useCallback } from "react";
import { QrReader } from "react-qr-reader";

interface QrScannerProps {
  onScan: (data: string | null) => void;
}

export const QrScanner: React.FC<QrScannerProps> = ({ onScan }) => {

  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);

  const handleScan = useCallback(
    (scanData: string | null) => {
      setLoadingScan(true);
      console.log("Scanned data:", scanData);
      if (scanData) {
        setStartScan(false); // Stop scanning
        setLoadingScan(false);
        onScan(scanData); // Trigger function with scan data
      }
    },
    [onScan]
  );

  const handleError = useCallback((err: any) => console.error(err), []);
  const toggleScan = () => setStartScan((prevState) => !prevState);

  return (
    <div className="flex flex-col justify-center mt-10">
      <button onClick={toggleScan}>
        {startScan ? "Stop Scan" : "Start Scan"}
      </button>

      {startScan && (
        <>
          <select onChange={(e) => setSelected(e.target.value)}>
            <option value={"environment"}>Back Camera</option>
            <option value={"user"}>Front Camera</option>
          </select>

          <QrReader
            facingMode={selected}
            delay={1000}
            onError={handleError}
            onResult={handleScan}
            style={{ width: "300px" }}
          />
        </>
      )}
      {loadingScan && <p>Loading</p>}
    </div>
  );
};

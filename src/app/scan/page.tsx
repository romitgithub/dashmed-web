"use client";
import ScanView from "@/views/scan";
import { ScanDataProvider } from "@/views/scan/scan-data-provider";

const Scanner = () => {
  return (
    <ScanDataProvider>
      <ScanView />
    </ScanDataProvider>
  );
};
export default Scanner;

// export default withUser<wcProps>(Register);



// import withUser from "@/hoc/withUser";
// import ScanView from "@/views/scan";
// // export default withUser(ScanView);
// export default ScanView;

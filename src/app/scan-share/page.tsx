"use client";

import withUser from "@/hoc/withUser";
import ScanView from "@/views/scan-share";
// export default ScanView;
export default withUser(ScanView);
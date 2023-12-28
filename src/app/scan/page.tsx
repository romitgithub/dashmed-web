"use client";

import withUser, { wcProps } from "@/hoc/withUser";
import ScanView from "@/views/scan";
export default withUser<wcProps>(ScanView);
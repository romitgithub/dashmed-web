"use client";

import withUser, { wcProps } from "@/hoc/withUser";
import DashboardView from "@/views/dash";
export default withUser<wcProps>(DashboardView);
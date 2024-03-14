"use client";

import { CalendarDemo } from "./calendar-demo";
import { DrawerDemo } from "./drawer";
import { Sidebar } from "./sidebar/sidebar";
import { Calendar } from "./ui/calendar";

const Overview = () => {
  return (
    <div className="p-5">
      <Sidebar />
    </div>
  );
};

export default Overview;

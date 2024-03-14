"use client";

import * as React from "react";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  React.useEffect(() => {
    toast(date ? "Date Selected" : "Date Removed", {
      description: date?.toLocaleDateString(),
    });
  }, [date]);
  return (
    <div className="flex items-center justify-center">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  );
}

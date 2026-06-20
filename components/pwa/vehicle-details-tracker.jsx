"use client";

import { useEffect } from "react";
import { incrementDetailViews } from "@/lib/pwa/pwa";

export default function VehicleDetailTracker() {
  useEffect(() => {
    incrementDetailViews();
  }, []);

  return null;
}
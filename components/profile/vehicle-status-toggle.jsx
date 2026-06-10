"use client";

import { useState, useTransition } from "react";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UpdateVehicleStatus } from "@/action/edit-vehicle";


export default function VehicleStatusToggle({
  vehicleId,
  initialStatus,
}) {
  const [status, setStatus] = useState(initialStatus);
  const [open, setOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);

  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    const nextStatus =
      status === "active" ? "sold" : "active";

    setPendingStatus(nextStatus);
    setOpen(true);
  }

  function confirmChange() {
    if (!pendingStatus) return;

    const previousStatus = status;

    // Optimistic update
    setStatus(pendingStatus);
    setOpen(false);

    startTransition(async () => {
      const result = await UpdateVehicleStatus(
        vehicleId,
        pendingStatus
      );

      if (!result.success) {
        setStatus(previousStatus);
      }
    });
  }

  const isActive = status === "active";

  return (
    <>
      <div
        className={`flex items-center gap-2 justify-between border rounded-full px-3 py-1 text-xs font-medium text-white ${
          isActive ? "" : "bg-muted text-foreground"
        }`}
      >
        <span>
          {isActive ? "Active" : "Sold"}
        </span>

        <Switch
          checked={isActive}
          disabled={isPending}
          onCheckedChange={handleToggle}          
        />
      </div>

      <AlertDialog
        open={open}
        onOpenChange={setOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingStatus === "sold"
                ? "Mark vehicle as sold?"
                : "Reactivate vehicle?"}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {pendingStatus === "sold"
                ? "This vehicle will no longer be visible to the public."
                : "This vehicle will become visible to the public again."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={confirmChange}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
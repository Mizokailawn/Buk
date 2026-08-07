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
import { toast } from "sonner";

export default function VehicleStatusToggle({ vehicleId, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [open, setOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);

  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    const nextStatus = status === "active" ? "sold" : "active";

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
      const result = await UpdateVehicleStatus(vehicleId, pendingStatus);

      // if (!result.success) {
      //   setStatus(previousStatus);
      // }

      if (result.success) {
        toast.success(
          pendingStatus === "active"
          ? "Your vehicle is now Active"
          : "Your vehicle is now marked as Sold"
        )
      } else {
        setStatus(previousStatus);
        toast.error("Failed to update vehicle status. Please try again.");
      }
    });
  }

  const isActive = status === "active";

  return (
    <>
      <div
        className={`flex items-center gap-2 justify-between border rounded-full px-3 py-1 text-sm md:text-xs font-medium ${
          isActive ? "" : "bg-muted text-shadow-muted-foreground"
        }`}
      >
        <span>{isActive ? "Active" : "Sold"}</span>
        
        <Switch
          checked={isActive}
          disabled={isPending}
          onCheckedChange={handleToggle}
          className="
        data-[state=checked]:[&>span]:bg-purple-600
          data-[state=unchecked]:[&>span]:bg-muted-foreground
        [&>span]:bg-white
  "
        />
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
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
                : "This vehicle will be visible to the public again."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction onClick={confirmChange}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

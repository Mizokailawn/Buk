// components/ui/public-vehicle-error.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RevalidatePublicVehicles } from "@/action/cache-revalidation";
import { SpinnerButton } from "../spinnerbutton";

export function PublicVehiclesError({ message }) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleRetry = async () => {
    setIsPending(true);

    // 1. Fire the action (this completes almost instantly due to after())
    await RevalidatePublicVehicles();

    // 2. Tell the page to pull down the newly updated cache data
    router.refresh();

    setIsPending(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <p className="mb-4 text-sm text-muted-foreground">{message}</p>

      {/* Wrap the handler safely in a client execution block */}
      <SpinnerButton
        onClick={handleRetry}
        isLoading={isPending}
        loadingText="Revalidating"
      >
        Retry
      </SpinnerButton>
    </div>
  );
}

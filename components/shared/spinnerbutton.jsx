"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Spinner } from "../ui/spinner";

export function SpinnerButton({
  children,
  isLoading = false,
  spinner = <Spinner className="w-4 h-4" />,
  icon,
  loadingText = "Processing...",
  className,
  disabled,
  ...props
}) {
  return (
    <Button
      disabled={isLoading || disabled}
      className={cn("flex items-center justify-center gap-2 w-full", className)}
      {...props}
    >
      {/* Icon / Spinner */}
      {isLoading ? spinner : icon}

      {/* Text */}
      <span className="flex items-center gap-2">
        {isLoading ? loadingText || children : children}
      </span>
    </Button>
  );
}

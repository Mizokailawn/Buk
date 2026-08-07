import UserDetails from "@/components/profile/user-details-wrapper";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <div className="py-15 px-2">
      <Suspense fallback={<div className="flex h-svh w-full mx-auto max-w-6xl justify-center items-center">
        <Spinner className="size-10" />
      </div>}>
        <UserDetails />
      </Suspense>
    </div>
  );
}

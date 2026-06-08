import UserDetails from "@/components/profile/user-details-wrapper";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <div className="py-17 px-2">
      <Suspense>
        <UserDetails />
      </Suspense>
    </div>
  );
}

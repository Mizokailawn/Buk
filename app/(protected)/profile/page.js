import UserDetails from "@/components/profile/user-details-wrapper";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <Suspense>
      <UserDetails />
    </Suspense>
  );
}

import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function EditButton({ vehicleId }) {
  return (
    <div>
      <Button asChild className="rounded-full w-full h-full gap-2 flex">
        <Link href={`/profile/edit/${vehicleId}`} className="flex gap-2 items-center">
          <Edit className="h-6 w-6" />
          Edit
        </Link>
      </Button>
    </div>
  );
}

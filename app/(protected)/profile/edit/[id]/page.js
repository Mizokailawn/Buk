import EditPageWrapper from "@/components/profile/edit-page-wrapper";
import { Suspense } from "react";

export default async function EditPage({ params }) {
  return (
    <div className="flex px-2 py-17 mx-auto justify-center items-center max-w-6xl w-full h-full">
      <Suspense>
        <EditPageWrapper params ={params} />
      </Suspense>
    </div>
  );
}

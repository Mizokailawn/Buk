"use server"

import { revalidateTag } from "next/cache";
import { after } from "next/server";

export async function RevalidatePublicVehicles() {
  after(() => {
    console.log("Revalidating public vehicles silently in the background...")
    revalidateTag("public-vehicles");
  });
}

export async function RevalidatePublicVehicleDetails() {
  after(() => {
    console.log("Revalidating vehicle details silently in the background...")
    revalidateTag("vehicle-details");
  });
}



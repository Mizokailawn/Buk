"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { SpinnerButton } from "../shared/spinnerbutton";


import { formatIndianPrice } from "@/lib/formatters/formatIndianPrice";
import { updateVehicleDetails } from "@/action/edit-vehicle";
import { vehicleSchema } from "../sell/sell-form-schema";
import VehicleFormFields from "../sell/vehicle-form-fields";
import { Loader2 } from "lucide-react";

export default function EditVehicleForm({ vehicle }) {
  
  const router = useRouter()

  const [isWhatsappSame, setIsWhatsappSame] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formattedPrice, setFormattedPrice] = useState(
    formatIndianPrice(vehicle?.price?.toString() || ""),
  );

  const form = useForm({
    resolver: zodResolver(vehicleSchema),
    mode: "onSubmit",

    defaultValues: {
      model: vehicle?.model ?? "",
      brand: vehicle?.brand ?? "",
      category: vehicle?.category ?? "",
      price: vehicle?.price?.toString() ?? "",
      seller: vehicle?.seller ?? "",
      description: vehicle?.description ?? "",
      phone: vehicle?.phone ?? "",
      whatsapp: vehicle?.whatsapp ?? "",
      city: vehicle?.city ?? "",
      registration: vehicle?.registration ?? "",
      fuel: vehicle?.fuel ?? "",
      transmission: vehicle?.transmission ?? "",
    },
  });

  const phoneValue = useWatch({
    control: form.control,
    name: "phone",
  });

  useEffect(() => {
    if (!isWhatsappSame) return;

    form.setValue("whatsapp", phoneValue || "", {
      shouldValidate: true,
    });
  }, [form, phoneValue, isWhatsappSame]);

  const handleSameAsPhone = (checked) => {
    setIsWhatsappSame(checked);

    if (checked) {
      form.setValue("whatsapp", phoneValue, {
        shouldValidate: true,
      });
    } else {
      form.setValue("whatsapp", "");
    }
  };

  const handlePriceChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");

    form.setValue("price", raw, {
      shouldValidate: true,
    });

    setFormattedPrice(formatIndianPrice(raw));
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await updateVehicleDetails({
        vehicleId: vehicle.id,
        vehicle: data,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      setIsSubmitting(false);
      toast.success("Vehicle updated");
      router.push("/profile")

      
    } catch (error) {
      setIsSubmitting(false);
      toast.error(error.message || "Update failed");
    }
  };

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="relative">
      {/* ======================================================
          BACKDROP BLUR OVERLAY (Triggers on submission)
      ====================================================== */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md animate-in fade-in">
          <div className="flex flex-col h-50 w-70 items-center justify-center gap-4 rounded-2xl bg-card p-8 shadow-lg border">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm font-medium text-foreground tracking-wide">
              Updating...
            </p>
          </div>
        </div>
      )}

      <h1 className="flex justify-center mb-4 text-2xl font-bold">
        Update Details
      </h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <VehicleFormFields
          form={form}
          formattedPrice={formattedPrice}
          handlePriceChange={handlePriceChange}
          isWhatsappSame={isWhatsappSame}
          handleSameAsPhone={handleSameAsPhone}
        />

        {/* ======================================================
            SUBMIT
        ====================================================== */}
        <SpinnerButton
          type="submit"
          isLoading={isSubmitting}
          loadingText="Updating..."
        >
          Update
        </SpinnerButton>
      </form>
    </div>
  );
}

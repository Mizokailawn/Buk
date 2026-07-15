"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { publishVehicleListing } from "@/action/vehicle";
import { SpinnerButton } from "../shared/spinnerbutton";
import { formatIndianPrice } from "@/lib/formatters/formatIndianPrice";
import { uploadImages } from "@/lib/vehicle/imageprocesssing/uploadImages";
import { DEFAULT_SELL_FORM_VALUES } from "./sell-form-options";
import { vehicleSchema } from "./sell-form-schema";
import VehicleFormFields from "./vehicle-form-fields";

const ImageProcessor = dynamic(() => import("./ImageUploader"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-89 items-center justify-center rounded-3xl border bg-card text-sm text-muted-foreground">
      Preparing photo uploader...
    </div>
  ),
});

export default function VehicleSellForm() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [formattedPrice, setFormattedPrice] = useState("");
  const [isWhatsappSame, setIsWhatsappSame] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("Processing...");

  const form = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues: DEFAULT_SELL_FORM_VALUES,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = form;

  const phoneValue =
    useWatch({
      control,
      name: "phone",
    }) || "";

  const phoneLength = phoneValue.replace(/\D/g, "").length;

  useEffect(() => {
    if (!isWhatsappSame) return;

    setValue("whatsapp", phoneValue, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [isWhatsappSame, phoneValue, setValue]);

  const handleSameAsPhone = (checked) => {
    setIsWhatsappSame(checked);

    setValue("whatsapp", checked ? phoneValue : "", {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handlePriceChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");

    setValue("price", raw, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setFormattedPrice(formatIndianPrice(raw));
  };

  const onSubmit = async (data) => {
    if (images.length === 0) {
      toast.error("Upload at least one photo");
      return;
    }

    try {
      setSubmitStatus("Uploading photos...");

      const submissionId = crypto.randomUUID();
      const uploads = await uploadImages(images, submissionId);

      setSubmitStatus("Publishing listing...");

      const result = await publishVehicleListing({
        vehicle: data,
        images: uploads,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      toast.success("Vehicle listed successfully");
      router.push(`/vehicle/${result.vehicleId}`);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Could not publish your listing");
    } finally {
      setSubmitStatus("Processing...");
    }
  };

  return (
    <div className="relative">
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md animate-in fade-in">
          <div className="flex h-50 w-70 flex-col items-center justify-center gap-4 rounded-2xl border bg-card p-8 shadow-lg">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm font-medium tracking-wide text-foreground">
              {submitStatus}
            </p>
          </div>
        </div>
      )}

      <h1 className="mb-4 flex justify-center text-2xl font-bold">
        Sell Your Ride
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <ImageProcessor
          disabled={isSubmitting}
          onImagesReady={setImages}
        />

        <VehicleFormFields
          form={form}
          formattedPrice={formattedPrice}
          handlePriceChange={handlePriceChange}
          isWhatsappSame={isWhatsappSame}
          handleSameAsPhone={handleSameAsPhone}
          phoneLength={phoneLength}
        />

        <SpinnerButton
          type="submit"
          isLoading={isSubmitting}
          loadingText={submitStatus}
        >
          Submit
        </SpinnerButton>
      </form>
    </div>
  );
}

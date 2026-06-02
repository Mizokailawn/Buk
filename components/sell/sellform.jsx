"use client";

import { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react"; // Imported for the spinner

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { publishVehicleListing } from "@/action/vehicle";

import { toast } from "sonner";

import { uploadImages } from "@/lib/vehicle/imageprocesssing/uploadImages";
import { Checkbox } from "../ui/checkbox";
import { formatIndianPrice } from "@/lib/formatters/formatIndianPrice";
import { SpinnerButton } from "../shared/spinnerbutton";
import { useRouter } from "next/navigation";
import {
  DEFAULT_SELL_FORM_VALUES,
  SELL_FORM_OPTIONS,
} from "./sell-form-options";
import { vehicleSchema } from "./sell-form-schema";

const ImageProcessor = dynamic(() => import("./ImageUploader"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-89 items-center justify-center rounded-3xl border bg-card text-sm text-muted-foreground">
      Preparing photo uploader...
    </div>
  ),
});

// ======================================================
// COMPONENT
// ======================================================

export default function VehicleSellForm() {
  const [images, setImages] = useState([]);
  const [formattedPrice, setFormattedPrice] = useState("");
  const [isWhatsappSame, setIsWhatsappSame] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("Processing..."); // Default text
  const router = useRouter();

  // ======================================================
  // RHF SETUP
  // ======================================================

  const form = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues: DEFAULT_SELL_FORM_VALUES,
    mode: "onSubmit",
  });

  const phoneValue = useWatch({
    control: form.control,
    name: "phone",
  });

  // ======================================================
  // Whatsapp checked
  // ======================================================

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

  useEffect(() => {
    if (!isWhatsappSame) return;

    form.setValue("whatsapp", phoneValue || "", {
      shouldValidate: Boolean(phoneValue),
    });
  }, [form, isWhatsappSame, phoneValue]);

  // ======================================================
  // Forrmatted Price
  // ======================================================

  const handlePriceChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");

    form.setValue("price", raw, {
      shouldValidate: true,
    });

    setFormattedPrice(formatIndianPrice(raw));
  };

  // ======================================================
  // IMAGE HANDLER
  // ======================================================

  const handleImagesReady = (imgs) => {
    setImages(imgs);
  };

  // ======================================================
  // SUBMIT
  // ======================================================

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

  // ======================================================
  // SHORTCUTS
  // ======================================================

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

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
              {submitStatus}
            </p>
          </div>
        </div>
      )}

      <h1 className="flex justify-center mb-4 text-2xl font-bold">
        Sell Your Ride
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* ======================================================
            IMAGES
        ====================================================== */}

        <ImageProcessor
          disabled={isSubmitting}
          onImagesReady={handleImagesReady}
        />

        {/* ======================================================
            MODEL
        ====================================================== */}

        <div className="space-y-2">
          <label className="text-sm font-medium">Model</label>

          <Input            
            placeholder="Bolero, Ignis etc..."
            {...register("model")}
          />

          {errors.model && (
            <p className="text-sm text-red-500">{errors.model.message}</p>
          )}
        </div>

        {/* ======================================================
            BRAND
        ====================================================== */}

        <div className="space-y-2">
          <label className="text-sm font-medium">Brand</label>

          <Input            
            placeholder="Mahindra, Suzuki etc..."
            {...register("brand")}
          />

          {errors.brand && (
            <p className="text-sm text-red-500">{errors.brand.message}</p>
          )}
        </div>

        {/* ======================================================
            CATEGORY
        ====================================================== */}

        <div className="space-y-1 w-full">
          <label className="block text-sm font-medium">Category</label>

          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>

                <SelectContent className="capitalize">
                  {SELL_FORM_OPTIONS.category.map((c) => (
                      <SelectItem key={c} value={String(c)}>
                        {c}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.category && (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>

        {/* ======================================================
            PRICE
        ====================================================== */}

        <div className="space-y-2">
          <label className="text-sm font-medium">Price (INR)</label>

          <Input
            type="text"
            inputMode="numeric"
            placeholder="12,20,000"
            value={formattedPrice}
            onChange={handlePriceChange}
          />

          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        {/* ======================================================
            SELLER NAME
        ====================================================== */}

        <div className="space-y-2">
          <label className="text-sm font-medium">Seller Name</label>

          <Input
            autoCapitalize="words"
            style={{ textTransform: "capitalize" }}
            placeholder="Motor zuartu hming"
            {...register("seller")}
          />

          {errors.seller && (
            <p className="text-sm text-red-500">{errors.seller.message}</p>
          )}
        </div>

        {/* ======================================================
            DESCRIPTION
        ====================================================== */}

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>

          <Textarea
            placeholder="Describe the vehicle..."
            {...register("description")}
            className="max-w-screen"
          />

          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* ======================================================
            PHONE
        ====================================================== */}

        <div className="space-y-2">
          <label className="text-sm font-medium">Phone</label>

          <Input
            type="tel"
            inputMode="numeric"
            placeholder="9876543210"
            {...register("phone")}
          />

          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* ======================================================
            WHATSAPP
        ====================================================== */}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">WhatsApp</label>

            <div className="flex items-center gap-2">
              <Checkbox
                id="same-as-phone"
                checked={isWhatsappSame}
                onCheckedChange={(checked) =>
                  handleSameAsPhone(checked === true)
                }
              />

              <label
                htmlFor="same-as-phone"
                className="text-xs text-muted-foreground"
              >
                Same as Phone
              </label>
            </div>
          </div>

          <Input
            type="tel"
            inputMode="numeric"
            placeholder="9876543210"
            {...register("whatsapp")}
          />

          {errors.whatsapp && (
            <p className="text-sm text-red-500">{errors.whatsapp.message}</p>
          )}
        </div>

        {/* ======================================================
            DISTRICT + REGISTRATION + FUELTYPE + TRANSMISSION
        ====================================================== */}

        <div className="grid grid-cols-2 gap-4 justify-center items-center">
          {/* DISTRICT */}
          <div className="space-y-2 w-full">
            <label className="block text-center text-sm font-medium">
              District
            </label>

            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="District" />
                  </SelectTrigger>

                  <SelectContent>
                    {SELL_FORM_OPTIONS.city.map((c) => (
                      <SelectItem key={c} value={String(c)}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.city && (
              <p className="text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>

          {/* REGISTRATION */}
          <div className="space-y-2 w-full">
            <label className="block text-center text-sm font-medium">
              Registration
            </label>

            <Controller
              control={control}
              name="registration"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Registration" />
                  </SelectTrigger>

                  <SelectContent>
                    {SELL_FORM_OPTIONS.registration.map((r) => (
                      <SelectItem key={r} value={String(r)}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.registration && (
              <p className="text-sm text-red-500">
                {errors.registration.message}
              </p>
            )}
          </div>

          {/* FUELTYPE */}
          <div className="space-y-2 w-full">
            <label className="block text-center text-sm font-medium">
              Fuel Type
            </label>

            <Controller
              control={control}
              name="fuel"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Fuel Type" />
                  </SelectTrigger>

                  <SelectContent>
                    {SELL_FORM_OPTIONS.fuel.map((f) => (
                      <SelectItem key={f} value={String(f)}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.fuel && (
              <p className="text-sm text-red-500">{errors.fuel.message}</p>
            )}
          </div>

          {/* TRANSMISSION */}
          <div className="space-y-2 w-full">
            <label className="block text-center text-sm font-medium">
              Transmission
            </label>

            <Controller
              control={control}
              name="transmission"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Transmission" />
                  </SelectTrigger>

                  <SelectContent>
                    {SELL_FORM_OPTIONS.transmission.map((t) => (
                      <SelectItem key={t} value={String(t)}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.transmission && (
              <p className="text-sm text-red-500">
                {errors.transmission.message}
              </p>
            )}
          </div>
        </div>

        {/* ======================================================
            SUBMIT
        ====================================================== */}
        <SpinnerButton
          type="submit"
          isLoading={isSubmitting}
          loadingText="Processing..."
        >
          Submit
        </SpinnerButton>
      </form>
    </div>
  );
}
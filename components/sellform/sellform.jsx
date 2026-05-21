"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { createVehicle, saveVehicleImages } from "@/action/vehicle";

import { toast } from "sonner";

import { uploadImages } from "@/lib/imageprocesssing/uploadImages";
import { Checkbox } from "../ui/checkbox";
import { formatIndianPrice } from "@/lib/formatters/formatIndianPrice";
import ImageProcessor from "./ImageUploader";
import { SpinnerButton } from "../spinnerbutton";
import { Fuel } from "lucide-react";
import { useRouter } from "next/navigation";

// ======================================================
// OPTIONS
// ======================================================

const FORM_OPTIONS = {
  wheels: [2, 3, 4, 6, 8, 10, 12],

  registration: [
    "MZ01",
    "MZ02",
    "MZ03",
    "MZ04",
    "MZ05",
    "MZ06",
    "MZ07",
    "MZ08",
    "Other",
  ],

  fuel: ["Petrol", "Diesel", "Other"],

  transmission: ["Manual", "Automatic"],
};

// ======================================================
// ZOD SCHEMA
// ======================================================

const vehicleSchema = z.object({
  brand: z
    .string()
    .trim()
    .min(2, "Brand must be at least 2 characters")
    .max(18, "Brand must be at most 18 characters"),

  model: z
    .string()
    .trim()
    .min(2, "Model must be at least 2 characters")
    .max(50, "Model must be at most 50 characters"),

  wheels: z.string().min(1, "Please select wheels"),

  registration: z.string().min(1, "Please select registration"),

  fuel: z.string().min(1, "Please select fuel type"),

  transmission: z.string().min(1, "Please select transmission"),

  price: z.coerce.number().positive("Price must be greater than 0"),

  city: z.string().min(2, "City must be at least 2 characters"),

  description: z.string().max(1000, "Description too long").optional(),

  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

  whatsapp: z
    .string()
    .regex(/^[0-9]{10}$/, "WhatsApp number must be 10 digits"),
});

// ======================================================
// COMPONENT
// ======================================================

export default function VehicleSellForm() {
  const [images, setImages] = useState([]);
  const [formattedPrice, setFormattedPrice] = useState("");
  const router = useRouter();

  // ======================================================
  // RHF SETUP
  // ======================================================

  const form = useForm({
    resolver: zodResolver(vehicleSchema),

    defaultValues: {
      brand: "",
      model: "",
      wheels: "",
      registration: "",
      fuel: "",
      transmission: "",
      price: "",
      city: "",
      description: "",
      phone: "",
      whatsapp: "",
    },

    mode: "onSubmit",
  });

  const phoneValue = form.watch("phone");

  // ======================================================
  // Whatsapp checked
  // ======================================================

  const handleSameAsPhone = (checked) => {
    if (checked) {
      form.setValue("whatsapp", phoneValue, {
        shouldValidate: true,
      });
    } else {
      form.setValue("whatsapp", "");
    }
  };

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
    console.log("Submitting.....:", data);
    if (images.length === 0) {
      toast.error("Upload at least one photo");
      return;
    }

    let vehicleId = null;

    try {
      const payload = {
        ...data,

        wheels: Number(data.wheels),

        registration: data.registration.toUpperCase(),
      };

      // ======================================================
      // CREATE VEHICLE
      // ======================================================

      const vehicle = await createVehicle(payload);

      vehicleId = vehicle.id;

      // ======================================================
      // UPLOAD IMAGES
      // ======================================================

      const uploads = await uploadImages(images, vehicleId);

      // ======================================================
      // SAVE IMAGE REFERENCES
      // ======================================================

      await saveVehicleImages(vehicleId, uploads);

      toast.success("Vehicle uploaded successfully ✅");

      router.push(`/rides/${vehicleId}`);

      // ======================================================
      // RESET FORM
      // ======================================================
      
    } catch (err) {
      console.error(err);

      // ======================================================
      // ROLLBACK PLACEHOLDER
      // ======================================================

      // TODO:
      // Move rollback logic to server-side eventually

      toast.error("Something went wrong");
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
    <div>
      <h1 className="flex justify-center mb-6 text-2xl font-bold">
        Sell Your Ride
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* ======================================================
            IMAGES
        ====================================================== */}

        <ImageProcessor onImagesReady={handleImagesReady} />

        {/* ======================================================
            MODEL
        ====================================================== */}

        <div className="space-y-2">
          <label className="text-sm font-medium">Model</label>

          <Input
            autoCapitalize="words"
            style={{ textTransform: "capitalize" }}
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
            autoCapitalize="words"
            style={{ textTransform: "capitalize" }}
            placeholder="Mahindra, Suzuki etc..."
            {...register("brand")}
          />

          {errors.brand && (
            <p className="text-sm text-red-500">{errors.brand.message}</p>
          )}
        </div>

        {/* ======================================================
            PRICE
        ====================================================== */}

        <div className="space-y-2">
          <label className="text-sm font-medium">Price (₹)</label>

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
            CITY
        ====================================================== */}

        <div className="space-y-2">
          <label className="text-sm font-medium">District</label>

          <Input
            autoCapitalize="words"
            style={{ textTransform: "capitalize" }}
            placeholder="Aizawl"
            {...register("city")}
          />

          {errors.city && (
            <p className="text-sm text-red-500">{errors.city.message}</p>
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
          {/* TOP ROW */}

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">WhatsApp</label>

            <div className="flex items-center gap-2">
              <Checkbox
                id="same-as-phone"
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

          {/* INPUT */}

          <Input
            type="tel"
            inputMode="numeric"
            placeholder="9876543210"
            {...register("whatsapp")}
          />

          {/* ERROR */}

          {errors.whatsapp && (
            <p className="text-sm text-red-500">{errors.whatsapp.message}</p>
          )}
        </div>

        {/* ======================================================
            WHEELS + REGISTRATION + FUELTYPE + TRANSMISSION
        ====================================================== */}

        <div className="grid grid-cols-2 gap-4 justify-center items-center">
          {/* ======================================================
              WHEELS
          ====================================================== */}

          <div className="space-y-2 w-full">
            <label className="block text-center text-sm font-medium">
              Wheels
            </label>

            <Controller
              control={control}
              name="wheels"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="No. of Wheels" />
                  </SelectTrigger>

                  <SelectContent>
                    {FORM_OPTIONS.wheels.map((w) => (
                      <SelectItem key={w} value={String(w)}>
                        {w}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.wheels && (
              <p className="text-sm text-red-500">{errors.wheels.message}</p>
            )}
          </div>

          {/* ======================================================
              REGISTRATION
          ====================================================== */}

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
                    {FORM_OPTIONS.registration.map((r) => (
                      <SelectItem key={r} value={r}>
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

          {/* ======================================================
             FUELTYPE
          ====================================================== */}
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
                    {FORM_OPTIONS.fuel.map((f) => (
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
          {/* ======================================================
             TRANSMISSION
          ====================================================== */}
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
                    {FORM_OPTIONS.transmission.map((t) => (
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

        {/* <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Uploading..." : "Submit"}
        </Button> */}
        <SpinnerButton type="submit" isLoading={isSubmitting}>
          Submit
        </SpinnerButton>
      </form>
    </div>
  );
}

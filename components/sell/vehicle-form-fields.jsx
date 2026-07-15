import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { SELL_FORM_OPTIONS } from "./sell-form-options";

export default function VehicleFormFields({
  form,
  formattedPrice,
  handlePriceChange,
  isWhatsappSame,
  handleSameAsPhone,
  phoneLength,
}) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const phoneDigits = Math.min(Number(phoneLength) || 0, 10);

  return (
    <>
      {/* ======================================================
                  MODEL
          ====================================================== */}

      <div className="space-y-2">
        <label className="text-sm font-medium">Model</label>

        <Input placeholder="Bolero, Ignis etc..." {...register("model")} />

        {errors.model && (
          <p className="text-sm text-red-500">{errors.model.message}</p>
        )}
      </div>

      {/* ======================================================
                  BRAND
          ====================================================== */}

      <div className="space-y-2">
        <label className="text-sm font-medium">Brand</label>

        <Input placeholder="Mahindra, Suzuki etc..." {...register("brand")} />

        {errors.brand && (
          <p className="text-sm text-red-500">{errors.brand.message}</p>
        )}
      </div>

      {/* ======================================================
                  REGISTRATION YEAR
          ====================================================== */}

      <div className="space-y-2">
        <label className="text-sm font-medium">Registration Year</label>

        <Input
          type="text"
          inputMode="numeric"
          placeholder="Registration tih kum. Eg. 2015"
          {...register("year")}
        />

        {errors.year && (
          <p className="text-sm text-red-500">{errors.year.message}</p>
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
        <label className="text-sm font-medium">Price (₹)</label>

        <Input
          type="text"
          inputMode="numeric"
          placeholder="Motor man zat Eg. 12,20,000"
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
          placeholder="Motor chungchang sawifiahna"
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
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Phone</label>
          <p
            className={`text-sm ${
              phoneDigits === 10 ? "text-green-600" : "text-muted-foreground"
            }`}
          >
            {phoneDigits}/10
          </p>
        </div>

        <Input
          type="tel"
          inputMode="numeric"
          maxLength={10}
          pattern="[0-9]*"
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
              onCheckedChange={(checked) => handleSameAsPhone(checked === true)}
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
          maxLength={10}
          pattern="[0-9]*"
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
    </>
  );
}

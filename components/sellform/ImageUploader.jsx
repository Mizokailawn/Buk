"use client";

import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { processImage } from "@/lib/imageprocesssing/imageProcessing";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import SortableImage from "./sortableimage";

export default function ImageProcessor({ onImagesReady }) {
  const [images, setImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // ======================================================
  // CLEANUP
  // ======================================================

  useEffect(() => {
    return () => {
      images.forEach((img) => {
        URL.revokeObjectURL(img.preview);
      });
    };
  }, [images]);

  // ======================================================
  // SELECT
  // ======================================================

  async function handleSelect(e) {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 5) {
      toast("Maximum 5 Photos");
      return;
    }

    try {
      setIsProcessing(true);
      const processed = await Promise.all(
        files.map(async (file) => {
          const compressed = await processImage(file);

          return {
            file: compressed,

            preview: URL.createObjectURL(compressed),

            id: crypto.randomUUID(),
          };
        }),
      );

      const updated = [...images, ...processed];
      setImages(updated);
      onImagesReady(updated);
    } catch (error) {
      toast.error("Failed to process images. Please try again!");
      console.error(error);
    } finally {
      e.target.value = "";
      setIsProcessing(false);
    }
  }

  // ======================================================
  // DRAG AND DROP REORDERING
  // ======================================================
  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex((item) => item.id === active.id);

    const newIndex = images.findIndex((item) => item.id === over.id);

    const reordered = arrayMove(images, oldIndex, newIndex);

    setImages(reordered);

    onImagesReady(reordered);
  }

  // ======================================================
  // REMOVE
  // ======================================================

  function removeImage(id) {
    const target = images.find((img) => img.id === id);

    if (target) {
      URL.revokeObjectURL(target.preview);
    }

    const updated = images.filter((img) => img.id !== id);

    setImages(updated);
    onImagesReady(updated);
  }

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="relative">
      {isProcessing && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-background/70 backdrop-blur-sm">
          <Spinner className="h-10 w-10" />
        </div>
      )}
      <div className="rounded-3xl bg-card border p-4 space-y-4 min-h-89">
        {/* ======================================================
          UPLOAD SURFACE
      ====================================================== */}

        <label
          className={`
          relative
          flex flex-col items-center justify-center
          rounded-3xl
          bg-muted/40
          transition-all duration-300
          cursor-pointer
          hover:bg-muted/70
          ${images.length === 0 ? "min-h-75" : "min-h-25"}
        `}
        >
          <input
            disabled={isProcessing}
            type="file"
            multiple
            accept="image/*"            
            onChange={handleSelect}
            className="hidden"
          />

          {/* CONTENT */}

          <div className="flex flex-col items-center text-center">
            {/* ICON */}

            <div
              className={`
              flex items-center justify-center            
              rounded-full
              bg-background
              shadow-sm
              transition-all duration-300
              ${images.length === 0 ? "w-20 h-20 mb-5" : "w-8 h-8 mb-1"}
            `}
            >
              <Upload
                className={`
                transition-all duration-300
                ${images.length === 0 ? "w-10 h-10" : "w-4 h-4"}
              `}
              />
            </div>

            {/* TEXT */}

            <h3
              className={`
              font-semibold
              tracking-tight
              transition-all duration-300
              ${images.length === 0 ? "text-xl" : "text-base"}
            `}
            >
              {images.length === 0 ? "Upload Photos" : "Add more photos"}
            </h3>

            <p className="text-xs text-muted-foreground mt-1">
              {images.length}/5 uploaded
            </p>
          </div>
        </label>

        {/* ======================================================
          FIXED PREVIEW AREA
      ====================================================== */}

        <div
          className={`
          overflow-hidden
          transition-all duration-1000

          ${
            images.length === 0
              ? "max-h-0 opacity-0"
              : "max-h-[320px] opacity-100"
          }
        `}
        >
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={images} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-3 gap-3">
                {images.map((img, index) => (
                  <SortableImage
                    key={img.id}
                    img={img}
                    removeImage={removeImage}
                    isCover={index === 0}
                  />
                  //   <div
                  //     key={img.id}
                  //     className="
                  //     relative
                  //     aspect-square
                  //     overflow-hidden
                  //     rounded-2xl
                  //     bg-muted
                  //     "
                  //   >
                  //     <Image
                  //       src={img.preview}
                  //       alt="Vehicle image"
                  //       fill
                  //       className="object-cover"
                  //     />

                  //     {/* REMOVE */}

                  //     <button
                  //       type="button"
                  //       onClick={() => removeImage(img.id)}
                  //       className="
                  //   absolute top-1 right-1
                  //   flex items-center justify-center
                  //   w-6 h-6
                  //   rounded-full
                  //   bg-background
                  //   text-foreground
                  //   backdrop-blur-md
                  //   hover:bg-black/80
                  //   transition-colors
                  // "
                  //     >
                  //       <X className="w-4 h-4" />
                  //     </button>
                  //   </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            First photo will be the thumbnail. Drag and drop to reorder.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { useState, useEffect, useRef } from "react";
import { Upload } from "lucide-react";
import { processImage } from "@/lib/vehicle/imageprocesssing/imageProcessing";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import SortableImage from "./sortableimage";

export default function ImageProcessor({ disabled = false, onImagesReady }) {
  const [images, setImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const imagesRef = useRef([]);

  function syncImages(nextImages) {
    imagesRef.current = nextImages;
    setImages(nextImages);
    onImagesReady(nextImages);
  }

  // ======================================================
  // CLEANUP
  // ======================================================

  useEffect(() => () => {
    imagesRef.current.forEach((img) => URL.revokeObjectURL(img.preview));
    imagesRef.current = [];
  }, []);

  // ======================================================
  // SELECT
  // ======================================================

  async function handleSelect(e) {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 5) {
      toast.error("Maximum 5 photos");
      e.target.value = "";
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
      syncImages(updated);
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

    syncImages(reordered);
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

    syncImages(updated);
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
            disabled={disabled || isProcessing}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
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

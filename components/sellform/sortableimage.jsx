"use client";

import Image from "next/image";

import { X } from "lucide-react";

import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

export default function SortableImage({
  img,
  removeImage,
  isCover,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: img.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="
        relative
        aspect-square
        overflow-hidden
        rounded-2xl
        bg-muted
        touch-none
      "
    >
      <Image
        src={img.preview}
        alt="Vehicle image"
        fill
        className="object-cover"
      />

      {isCover && (
        <div
          className="
            absolute bottom-1 left-1 
            px-2 py-1
            rounded-full
            bg-background/75
            text-foreground
            text-xs
            backdrop-blur-sm
          "
        >
          Thumbnail
        </div>
      )}

      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => removeImage(img.id)}
        className="
          absolute top-1 right-1
          flex items-center justify-center
          w-8 h-8
          rounded-full
          bg-background
          text-foreground
          backdrop-blur-md
          hover:bg-black/80
          transition-colors
        "
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
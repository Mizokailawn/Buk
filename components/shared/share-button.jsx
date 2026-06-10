"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function FloatingShareButton({
  title = "BUK",
  text = "",
  url,
}) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title,
      text,
      url: url || window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  return (
    <>
      <Button

        onClick={handleShare}
        aria-label="Share"
        className="fixed bottom-28 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105 active:scale-95"
      >
        <Share2 className="h-6 w-6" />
      </Button>

      {copied && (
        <div className="fixed bottom-36 right-4 z-50 rounded-md border bg-background px-3 py-2 text-sm shadow-lg">
          Link copied
        </div>
      )}
    </>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";

import {
  ACTIVE_TIME_TARGET,
  DISMISS_KEY,
  DETAIL_VIEW_TARGET,
  addActiveTime,
  getActiveTime,
  getDetailViews,
  hasReachedEngagementThreshold,
} from "@/lib/pwa/pwa";

const DISMISS_DAYS = 30;

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState(null);

  const [visible, setVisible] = useState(false);

  const intervalRef = useRef(null);

  const evaluatePromptEligibility = (
    promptEvent
  ) => {
    if (!promptEvent) return;

    const dismissedUntil = Number(
      localStorage.getItem(DISMISS_KEY) || 0
    );

    if (Date.now() < dismissedUntil) {
      return;
    }

    const isInstalled =
      window.matchMedia(
        "(display-mode: standalone)"
      ).matches ||
      window.navigator.standalone;

    if (isInstalled) {
      return;
    }

    if (hasReachedEngagementThreshold()) {
      setVisible(true);
    }
  };

  useEffect(() => {
    const isInstalled =
      window.matchMedia(
        "(display-mode: standalone)"
      ).matches ||
      window.navigator.standalone;

    if (isInstalled) {
      return;
    }

    const isIOS = /iphone|ipad|ipod/i.test(
      navigator.userAgent
    );

    if (isIOS) {
      return;
    }

    let lastTick = Date.now();

    intervalRef.current = setInterval(() => {
      if (
        document.visibilityState !== "visible"
      ) {
        lastTick = Date.now();
        return;
      }

      const now = Date.now();

      const delta = now - lastTick;

      lastTick = now;

      addActiveTime(delta);

      if (deferredPrompt) {
        evaluatePromptEligibility(
          deferredPrompt
        );
      }
    }, 1000);

    const handleBeforeInstallPrompt = (
      event
    ) => {
      event.preventDefault();

      setDeferredPrompt(event);

      evaluatePromptEligibility(event);
    };

    const handleAppInstalled = () => {
      setVisible(false);

      setDeferredPrompt(null);

      localStorage.removeItem(
        DISMISS_KEY
      );
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    window.addEventListener(
      "appinstalled",
      handleAppInstalled
    );

    return () => {
      clearInterval(intervalRef.current);

      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );

      window.removeEventListener(
        "appinstalled",
        handleAppInstalled
      );
    };
  }, [deferredPrompt]);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    try {
      await deferredPrompt.prompt();

      const result =
        await deferredPrompt.userChoice;

      if (
        result.outcome === "accepted"
      ) {
        setVisible(false);
      }

      setDeferredPrompt(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDismiss = () => {
    const expiresAt =
      Date.now() +
      DISMISS_DAYS *
        24 *
        60 *
        60 *
        1000;

    localStorage.setItem(
      DISMISS_KEY,
      String(expiresAt)
    );

    setVisible(false);
  };

  if (!visible || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-20 z-50 px-4">
      <div className="mx-auto max-w-md rounded-2xl border bg-background/90 p-4 shadow-xl">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-md font-semibold">
              Install
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Install BUK for better experience
            </p>
          </div>

          <button
            onClick={handleDismiss}
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleInstall}
            className="flex justify-center items-center h-8 flex-1 rounded-lg bg-primary px-4 py-2 text-primary-foreground"
          >
            Install
          </button>

          <button
            onClick={handleDismiss}
            className="flex justify-center items-center h-8 rounded-lg border px-4 py-2"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
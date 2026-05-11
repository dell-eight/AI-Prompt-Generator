"use client";

import { useState } from "react";
import { Bookmark, Check, Copy, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type CopyButtonProps = {
  text: string;
  label?: string;
};

export function CopyButton({ text, label = "Copy" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Prompt copied");
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Copy failed", {
        description: "Select the prompt text and copy it manually."
      });
    }
  }

  return (
    <Button type="button" onClick={handleCopy} size="sm">
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : label}
    </Button>
  );
}

type SaveButtonProps = {
  promptId: string;
  initialSaved?: boolean;
  isAuthenticated?: boolean;
};

export function SaveButton({
  promptId,
  initialSaved = false,
  isAuthenticated = false
}: SaveButtonProps) {
  const pathname = usePathname();
  const [saved, setSaved] = useState(initialSaved);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSave() {
    if (!isAuthenticated) {
      const next = encodeURIComponent(pathname || "/prompts");

      toast.message("Log in to save prompts", {
        description: "Create a free account or sign in to keep a saved collection.",
        action: {
          label: "Log in",
          onClick: () => {
            window.location.href = `/login?next=${next}`;
          }
        }
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        saved ? `/api/saved-prompts/${promptId}` : "/api/saved-prompts",
        {
          method: saved ? "DELETE" : "POST",
          headers: saved ? undefined : { "Content-Type": "application/json" },
          body: saved ? undefined : JSON.stringify({ promptId })
        }
      );
      const body = (await response.json()) as {
        error?: {
          message?: string;
        };
      };

      if (!response.ok) {
        throw new Error(body.error?.message ?? "Unable to update saved prompts.");
      }

      setSaved((current) => !current);
      toast.success(saved ? "Removed from saved prompts" : "Prompt saved");
    } catch (error) {
      toast.error("Saved prompt update failed", {
        description:
          error instanceof Error
            ? error.message
            : "Try again in a moment."
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      type="button"
      onClick={handleSave}
      variant={saved ? "secondary" : "outline"}
      size="sm"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Bookmark className={saved ? "h-4 w-4 fill-current" : "h-4 w-4"} />
      )}
      {isLoading ? "Saving" : saved ? "Saved" : "Save"}
    </Button>
  );
}

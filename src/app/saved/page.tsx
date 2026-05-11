import Link from "next/link";
import { Bookmark, UserCircle } from "lucide-react";
import { redirect } from "next/navigation";

import { PromptGrid } from "@/components/prompts/prompt-grid";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/state";
import { getCurrentProfile } from "@/lib/auth";
import { getSavedPromptsForCurrentUser } from "@/lib/saved-prompts";

export const metadata = {
  title: "Saved Prompts",
  robots: {
    index: false,
    follow: false
  }
};

export default async function SavedPromptsPage() {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login?next=/saved");
  }

  const savedPrompts = await getSavedPromptsForCurrentUser(profile.id);
  const prompts = savedPrompts
    .map((savedPrompt) => savedPrompt.prompt)
    .filter((prompt): prompt is NonNullable<typeof prompt> => Boolean(prompt));
  const savedPromptIds = savedPrompts.map((savedPrompt) => savedPrompt.promptId);

  return (
    <section className="section-padding">
      <div className="page-shell">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">Saved Prompts</p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal">
            Your saved prompt collection
          </h1>
          <p className="mt-3 flex items-center gap-2 text-muted-foreground">
            <UserCircle className="h-4 w-4" />
            Signed in as {profile.displayName ?? profile.email}
          </p>
        </div>
        {prompts.length > 0 ? (
          <PromptGrid
            prompts={prompts}
            savedPromptIds={savedPromptIds}
            isAuthenticated
          />
        ) : (
          <>
            <EmptyState
              title="No saved prompts yet"
              message="Browse the library and save prompts you want to reuse."
            />
            <div className="mt-6 flex justify-center">
              <Button asChild>
                <Link href="/prompts">
                  <Bookmark className="h-4 w-4" />
                  Browse prompts
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import {
  CategoryBadge,
  DifficultyBadge,
  ToolBadge
} from "@/components/prompts/prompt-badges";
import { CopyButton, SaveButton } from "@/components/prompts/prompt-actions";
import { PromptGrid } from "@/components/prompts/prompt-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentProfile } from "@/lib/auth";
import { getPromptBySlug } from "@/lib/prompt-api";
import { getSavedPromptIdsForCurrentUser } from "@/lib/saved-prompts";

type PromptDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PromptDetailPageProps) {
  const { slug } = await params;
  const prompt = await getPromptBySlug(slug);

  return {
    title: prompt ? prompt.title : "Prompt",
    description: prompt?.description ?? "View a structured AI prompt on PromptForge.",
    alternates: {
      canonical: `/prompts/${slug}`
    },
    openGraph: {
      title: prompt ? `${prompt.title} - PromptForge` : "Prompt - PromptForge",
      description:
        prompt?.description ?? "View a structured AI prompt on PromptForge.",
      url: `/prompts/${slug}`,
      type: "article"
    }
  };
}

export default async function PromptDetailPage({ params }: PromptDetailPageProps) {
  const { slug } = await params;
  const [prompt, profile] = await Promise.all([
    getPromptBySlug(slug),
    getCurrentProfile()
  ]);

  if (!prompt) {
    notFound();
  }

  const savedPromptIds = profile
    ? await getSavedPromptIdsForCurrentUser(profile.id)
    : [];

  return (
    <section className="section-padding">
      <div className="page-shell max-w-5xl">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/prompts">
            <ArrowLeft className="h-4 w-4" />
            Back to library
          </Link>
        </Button>

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap gap-2">
                <CategoryBadge category={prompt.category.name} />
                <ToolBadge tool={prompt.tool} />
                <DifficultyBadge difficulty={prompt.difficulty} />
              </div>
              <CardTitle className="pt-3 text-3xl leading-tight">
                {prompt.title}
              </CardTitle>
              <p className="text-muted-foreground">{prompt.description}</p>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-wrap gap-2">
                {prompt.tags.map((tag) => (
                  <span
                    key={tag.slug}
                    className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              <pre className="whitespace-pre-wrap rounded-lg bg-muted p-5 text-sm leading-6">
                {prompt.promptText}
              </pre>
            </CardContent>
          </Card>

          <aside className="h-fit rounded-lg border bg-card p-5">
            <h2 className="font-semibold">Prompt actions</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Copy this prompt or keep it in your saved collection.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <CopyButton text={prompt.promptText} label="Copy full prompt" />
              <SaveButton
                promptId={prompt.id}
                initialSaved={savedPromptIds.includes(prompt.id)}
                isAuthenticated={Boolean(profile)}
              />
            </div>
          </aside>
        </div>

        {prompt.relatedPrompts.length > 0 ? (
          <div className="mt-10">
            <div className="mb-4">
              <h2 className="text-2xl font-bold tracking-normal">
                Related prompts
              </h2>
              <p className="mt-2 text-muted-foreground">
                More prompts from the same category or tags.
              </p>
            </div>
            <PromptGrid
              prompts={prompt.relatedPrompts}
              savedPromptIds={savedPromptIds}
              isAuthenticated={Boolean(profile)}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

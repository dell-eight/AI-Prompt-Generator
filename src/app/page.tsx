import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  ClipboardCheck,
  Filter,
  Sparkles
} from "lucide-react";

import { PromptGrid } from "@/components/prompts/prompt-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentProfile } from "@/lib/auth";
import {
  filterAndPaginatePrompts,
  getCategories,
  getPublishedPrompts,
  parsePromptListQuery
} from "@/lib/prompt-api";
import { getSavedPromptIdsForCurrentUser } from "@/lib/saved-prompts";
import { siteConfig } from "@/lib/site";

const workflow = [
  {
    icon: Filter,
    title: "Browse by use case",
    text: "Find prompts for coding, writing, business, automation, and creative tools."
  },
  {
    icon: ClipboardCheck,
    title: "Copy structured prompts",
    text: "Each prompt includes context, goals, constraints, and output format guidance."
  },
  {
    icon: Sparkles,
    title: "Generate your own",
    text: "Turn a simple goal into a structured prompt using the server-side generator."
  }
];

const popularUseCases = [
  {
    href: "/prompts?tool=ChatGPT",
    title: "ChatGPT prompts",
    text: "Reusable prompts for learning, planning, writing, research, and everyday work."
  },
  {
    href: "/prompts?category=coding",
    title: "Coding prompts",
    text: "Prompt templates for planning features, writing code, and reviewing implementation details."
  },
  {
    href: "/prompts?category=debugging",
    title: "Debugging prompts",
    text: "Structured prompts for explaining errors, finding likely causes, and planning safe fixes."
  },
  {
    href: "/prompts?category=business-ideas",
    title: "Business idea prompts",
    text: "Prompts for validating ideas, describing customers, and planning practical next steps."
  },
  {
    href: "/prompts?category=book-writing",
    title: "Book writing prompts",
    text: "Prompts for outlines, chapters, scenes, editing, and writing momentum."
  },
  {
    href: "/prompts?category=ai-automation",
    title: "AI automation prompts",
    text: "Prompts for workflows, automations, agents, and n8n process planning."
  }
];

export const dynamic = "force-dynamic";

export const metadata = {
  title: "AI Prompt Library and Generator",
  description: siteConfig.description,
  alternates: {
    canonical: "/"
  }
};

export default async function HomePage() {
  const homeData = await getHomeData();
  const stats = [
    { label: "Published prompts", value: homeData.promptCount.toString() },
    { label: "Categories", value: homeData.categoryCount.toString() },
    { label: "Core workflows", value: "4" }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteConfig.url}/prompts?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      <section className="border-b bg-card">
        <div className="page-shell grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div className="flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground">
              <BookOpenCheck className="h-4 w-4 text-primary" />
              AI prompts that are ready to use
            </div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-normal sm:text-5xl">
              PromptForge
            </h1>
            <p className="mt-3 text-xl font-medium text-foreground">
              AI prompt library and generator for clearer, stronger prompts.
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Browse, copy, save, and generate high-quality prompts for ChatGPT,
              Cursor, Claude, Canva AI, image generators, book writing, coding,
              debugging, and automation.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/prompts">
                  Browse prompt library
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/generator">Generate a prompt</Link>
              </Button>
            </div>
          </div>

          <div className="grid content-start gap-4">
            <div className="rounded-lg border bg-background p-5 shadow-soft">
              <p className="text-sm font-medium text-muted-foreground">
                Featured prompt structure
              </p>
              <div className="mt-4 rounded-md bg-muted p-4 text-sm leading-6">
                Context: who you are helping
                <br />
                Goal: what success looks like
                <br />
                Constraints: limits and rules
                <br />
                Output: exact format to return
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-lg border bg-background p-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="page-shell">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold tracking-normal">Featured prompts</h2>
              <p className="mt-2 text-muted-foreground">
                A quick sample from the live prompt library API.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/prompts">View all</Link>
            </Button>
          </div>
          <PromptGrid
            prompts={homeData.featuredPrompts}
            savedPromptIds={homeData.savedPromptIds}
            isAuthenticated={homeData.isAuthenticated}
          />
        </div>
      </section>

      <section className="border-t bg-background section-padding">
        <div className="page-shell">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-normal">
              Popular AI prompt use cases
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Start with a focused prompt category, then copy, save, or adapt it
              for the AI tool you already use.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {popularUseCases.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border bg-card p-5 transition-colors hover:border-primary/50 hover:bg-muted/40"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-card section-padding">
        <div className="page-shell">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-normal">Built for better prompting</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              The MVP focuses on useful workflows: live prompt data, accounts,
              saved prompts, search, admin management, and AI generation.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {workflow.map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <div className="mb-2 grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  {item.text}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

async function getHomeData() {
  try {
    const filters = parsePromptListQuery(
      new URLSearchParams({
        featured: "true",
        limit: "6",
        sort: "featured"
      })
    );
    const profile = await getCurrentProfile();
    const [prompts, categories, savedPromptIds] = await Promise.all([
      getPublishedPrompts(),
      getCategories(),
      profile ? getSavedPromptIdsForCurrentUser(profile.id) : Promise.resolve([])
    ]);
    const featured = filterAndPaginatePrompts(prompts, filters);

    return {
      featuredPrompts: featured.data,
      promptCount: prompts.length,
      categoryCount: categories.data.length,
      savedPromptIds,
      isAuthenticated: Boolean(profile)
    };
  } catch {
    return {
      featuredPrompts: [],
      promptCount: 0,
      categoryCount: 0,
      savedPromptIds: [],
      isAuthenticated: false
    };
  }
}

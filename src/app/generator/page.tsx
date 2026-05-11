import { PromptGeneratorForm } from "@/components/generator/prompt-generator-form";

export const metadata = {
  title: "AI Prompt Generator",
  description:
    "Turn a simple goal into a structured, copy-paste-ready AI prompt with role, context, task, constraints, output format, and quality checks.",
  alternates: {
    canonical: "/generator"
  },
  openGraph: {
    title: "AI Prompt Generator - PromptForge",
    description:
      "Generate structured prompts for ChatGPT, Claude, Cursor, Canva AI, image tools, writing, coding, and automation.",
    url: "/generator"
  }
};

export default function GeneratorPage() {
  return (
    <section className="section-padding">
      <div className="page-shell">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">Prompt Generator</p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal">
            Build a structured prompt from your goal
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Describe what you need, add context and constraints, and generate a
            copy-paste-ready prompt for your chosen AI tool.
          </p>
        </div>
        <PromptGeneratorForm />
      </div>
    </section>
  );
}

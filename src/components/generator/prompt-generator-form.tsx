"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PromptOutputBox } from "@/components/generator/prompt-output-box";
import { promptCategories, promptTools } from "@/lib/constants";
import type {
  GeneratedPromptRequest,
  GeneratedPromptResponse,
  PromptCategory,
  PromptTool
} from "@/lib/types";

const starterOutput =
  "Your generated prompt will appear here after you describe what you want to create.";

export function PromptGeneratorForm() {
  const [promptType, setPromptType] = useState<PromptCategory>("ChatGPT");
  const [targetTool, setTargetTool] = useState<PromptTool>("ChatGPT");
  const [userGoal, setUserGoal] = useState("");
  const [context, setContext] = useState("");
  const [audience, setAudience] = useState("");
  const [outputFormat, setOutputFormat] = useState("Step-by-step checklist");
  const [tone, setTone] = useState("Clear and practical");
  const [constraints, setConstraints] = useState("");
  const [examples, setExamples] = useState("");
  const [output, setOutput] = useState(starterOutput);
  const [generatedPromptId, setGeneratedPromptId] = useState<string | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: GeneratedPromptRequest = {
      promptType,
      targetTool,
      userGoal,
      context,
      audience,
      outputFormat,
      tone,
      constraints,
      examples
    };

    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const body = (await response.json()) as Partial<GeneratedPromptResponse> & {
        error?: {
          message?: string;
        };
      };

      if (!response.ok || !body.data) {
        throw new Error(
          body.error?.message ?? "Unable to generate a prompt right now."
        );
      }

      setOutput(body.data.generatedPrompt);
      setGeneratedPromptId(body.data.generatedPromptId);
      setIsGenerated(true);
      toast.success("Prompt generated");
    } catch (error) {
      toast.error("Generation failed", {
        description:
          error instanceof Error
            ? error.message
            : "Try again with a shorter prompt idea."
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <form onSubmit={handleSubmit} className="rounded-lg border bg-card p-5 shadow-sm">
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium">
              Prompt type
              <Select
                value={promptType}
                onChange={(event) =>
                  setPromptType(event.target.value as PromptCategory)
                }
                disabled={isLoading}
              >
                {promptCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Target AI tool
              <Select
                value={targetTool}
                onChange={(event) =>
                  setTargetTool(event.target.value as PromptTool)
                }
                disabled={isLoading}
              >
                {promptTools.map((promptTool) => (
                  <option key={promptTool} value={promptTool}>
                    {promptTool}
                  </option>
                ))}
              </Select>
            </label>
          </div>
          <label className="grid gap-2 text-sm font-medium">
            User goal
            <Textarea
              value={userGoal}
              onChange={(event) => setUserGoal(event.target.value)}
              placeholder="Example: Help me write a product launch email for a new bookkeeping service."
              maxLength={500}
              required
              disabled={isLoading}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Context/background
            <Textarea
              value={context}
              onChange={(event) => setContext(event.target.value)}
              placeholder="Example: The service is for solo founders who need clean monthly reports without hiring a full-time accountant."
              maxLength={1200}
              disabled={isLoading}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Target audience
            <Input
              value={audience}
              onChange={(event) => setAudience(event.target.value)}
              placeholder="Example: Busy small business owners"
              maxLength={240}
              disabled={isLoading}
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium">
              Tone
              <Input
                value={tone}
                onChange={(event) => setTone(event.target.value)}
                placeholder="Clear and practical"
                maxLength={160}
                disabled={isLoading}
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Output format
              <Input
                value={outputFormat}
                onChange={(event) => setOutputFormat(event.target.value)}
                placeholder="Example: Table, checklist, JSON, email draft"
                maxLength={240}
                disabled={isLoading}
              />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-medium">
            Constraints
            <Textarea
              value={constraints}
              onChange={(event) => setConstraints(event.target.value)}
              placeholder="Example: Keep it under 300 words and include 3 subject lines."
              maxLength={800}
              disabled={isLoading}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Examples/references
            <Textarea
              value={examples}
              onChange={(event) => setExamples(event.target.value)}
              placeholder="Example: Use the structure of a short launch announcement, but make it warmer and less salesy."
              maxLength={1200}
              disabled={isLoading}
            />
          </label>
          <Button type="submit" className="w-full sm:w-fit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {isLoading ? "Generating" : "Generate prompt"}
          </Button>
        </div>
      </form>
      <PromptOutputBox
        output={output}
        isGenerated={isGenerated}
        generatedPromptId={generatedPromptId}
      />
    </div>
  );
}

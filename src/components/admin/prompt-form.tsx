"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Save, WandSparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { difficulties, promptTools } from "@/lib/constants";
import type {
  AdminPromptInput,
  AdminPromptListItem,
  AdminTaxonomy
} from "@/lib/admin-prompts";
import { cn } from "@/lib/utils";

type PromptFormProps = {
  mode: "create" | "edit";
  prompt?: AdminPromptListItem;
  taxonomy: AdminTaxonomy;
};

type FormState = AdminPromptInput;

export function PromptForm({ mode, prompt, taxonomy }: PromptFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>(() => ({
    title: prompt?.title ?? "",
    slug: prompt?.slug ?? "",
    description: prompt?.description ?? "",
    promptText: prompt?.promptText ?? "",
    categoryId: prompt?.categoryId ?? taxonomy.categories[0]?.id ?? "",
    tool: prompt?.tool ?? promptTools[0],
    difficulty: prompt?.difficulty ?? "Beginner",
    tags: prompt?.tags ?? [],
    isFeatured: prompt?.isFeatured ?? false,
    isPublished: prompt?.isPublished ?? false
  }));

  const tagText = useMemo(() => form.tags.join(", "), [form.tags]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const endpoint =
      mode === "create"
        ? "/api/admin/prompts"
        : `/api/admin/prompts/${prompt?.id}`;

    try {
      const response = await fetch(endpoint, {
        method: mode === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body?.error?.message ?? "Unable to save prompt.");
      }

      router.push("/dashboard/admin/prompts");
      router.refresh();
    } catch (saveError) {
      setError(
        saveError instanceof Error ? saveError.message : "Unable to save prompt."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function updateTags(value: string) {
    updateField(
      "tags",
      value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    );
  }

  function generateSlug() {
    updateField("slug", slugify(form.title));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title">
          <Input
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            required
            maxLength={140}
          />
        </Field>
        <Field label="Slug">
          <div className="flex gap-2">
            <Input
              value={form.slug}
              onChange={(event) => updateField("slug", event.target.value)}
              required
              maxLength={160}
              pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              title="Generate slug from title"
              onClick={generateSlug}
            >
              <WandSparkles className="h-4 w-4" />
            </Button>
          </div>
        </Field>
      </div>

      <Field label="Description">
        <Textarea
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          required
          maxLength={600}
        />
      </Field>

      <Field label="Prompt text">
        <Textarea
          className="min-h-72 font-mono"
          value={form.promptText}
          onChange={(event) => updateField("promptText", event.target.value)}
          required
          maxLength={12000}
        />
      </Field>

      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Category">
          <Select
            value={form.categoryId}
            onChange={(event) => updateField("categoryId", event.target.value)}
            required
          >
            {taxonomy.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Tool">
          <Select
            value={form.tool}
            onChange={(event) => updateField("tool", event.target.value)}
          >
            {promptTools.map((tool) => (
              <option key={tool} value={tool}>
                {tool}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Difficulty">
          <Select
            value={form.difficulty}
            onChange={(event) =>
              updateField("difficulty", event.target.value as FormState["difficulty"])
            }
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Tags">
        <Input
          value={tagText}
          onChange={(event) => updateTags(event.target.value)}
          placeholder="business, planning, beginner"
        />
      </Field>

      <div className="flex flex-wrap gap-4">
        <CheckboxField
          label="Published"
          checked={form.isPublished}
          onChange={(checked) => updateField("isPublished", checked)}
        />
        <CheckboxField
          label="Featured"
          checked={form.isFeatured}
          onChange={(checked) => updateField("isFeatured", checked)}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isSubmitting || taxonomy.categories.length === 0}>
          <Save className="h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save prompt"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
  className
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block space-y-2 text-sm font-medium", className)}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function CheckboxField({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex min-h-10 items-center gap-2 rounded-md border px-3 text-sm font-medium">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4"
      />
      {label}
    </label>
  );
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

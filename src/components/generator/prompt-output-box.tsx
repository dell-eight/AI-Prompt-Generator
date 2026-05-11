import { CopyButton } from "@/components/prompts/prompt-actions";

type PromptOutputBoxProps = {
  output: string;
  isGenerated?: boolean;
  generatedPromptId?: string | null;
};

export function PromptOutputBox({
  output,
  isGenerated = false,
  generatedPromptId = null
}: PromptOutputBoxProps) {
  return (
    <section className="rounded-lg border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold">Prompt output</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {isGenerated
              ? generatedPromptId
                ? "Generated and saved to your prompt history."
                : "Generated prompt ready to copy."
              : "Fill out the form to generate a structured prompt."}
          </p>
        </div>
        <CopyButton text={output} label="Copy prompt" />
      </div>
      <pre className="mt-4 min-h-80 whitespace-pre-wrap rounded-md bg-muted p-4 text-sm leading-6 text-foreground">
        {output}
      </pre>
    </section>
  );
}

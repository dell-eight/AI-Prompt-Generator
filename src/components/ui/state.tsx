import { AlertCircle, Loader2, SearchX } from "lucide-react";

import { cn } from "@/lib/utils";

type StateProps = {
  title: string;
  message: string;
  className?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export function LoadingState({ title, message, className }: StateProps) {
  return (
    <div className={cn("rounded-lg border bg-card p-6 text-center", className)}>
      <Loader2 className="mx-auto mb-3 h-6 w-6 animate-spin text-primary" />
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

export function EmptyState({ title, message, className, action }: StateProps) {
  return (
    <div className={cn("rounded-lg border border-dashed bg-card p-8 text-center", className)}>
      <SearchX className="mx-auto mb-3 h-7 w-7 text-muted-foreground" />
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      {action ? (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-4 inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          {action.label}
        </button>
      ) : null}
    </div>
  );
}

export function ErrorMessage({ title, message, className }: StateProps) {
  return (
    <div className={cn("rounded-lg border border-destructive/30 bg-destructive/5 p-4", className)}>
      <div className="flex gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 text-destructive" />
        <div>
          <h3 className="font-semibold text-destructive">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    </div>
  );
}

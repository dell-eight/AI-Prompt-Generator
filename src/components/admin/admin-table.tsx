"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import type { AdminPromptListItem } from "@/lib/admin-prompts";

export function AdminTable({ prompts }: { prompts: AdminPromptListItem[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");

  async function deletePrompt(prompt: AdminPromptListItem) {
    const confirmed = window.confirm(
      `Delete "${prompt.title}"? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setDeletingId(prompt.id);

    try {
      const response = await fetch(`/api/admin/prompts/${prompt.id}`, {
        method: "DELETE"
      });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body?.error?.message ?? "Unable to delete prompt.");
      }

      router.refresh();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error ? deleteError.message : "Unable to delete prompt."
      );
    } finally {
      setDeletingId("");
    }
  }

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
        <div>
          <h2 className="font-semibold">Prompt inventory</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage prompt content, publishing, and featured placement.
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/dashboard/admin/prompts/new">New prompt</Link>
        </Button>
      </div>
      {error ? (
        <div className="border-b bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}
      {prompts.length === 0 ? (
        <div className="p-6">
          <h3 className="font-medium">No prompts yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Create the first admin-managed prompt to populate the library.
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prompt</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Tool</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prompts.map((prompt) => (
              <TableRow key={prompt.id}>
                <TableCell>
                  <div className="font-medium">{prompt.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    /prompts/{prompt.slug}
                  </div>
                </TableCell>
                <TableCell>{prompt.category.name}</TableCell>
                <TableCell>{prompt.tool}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={prompt.isPublished ? "success" : "warning"}>
                      {prompt.isPublished ? "Published" : "Draft"}
                    </Badge>
                    {prompt.isFeatured ? (
                      <Badge variant="info">Featured</Badge>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button asChild variant="outline" size="icon" title="Edit prompt">
                      <Link href={`/dashboard/admin/prompts/${prompt.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      title="Delete prompt"
                      disabled={deletingId === prompt.id}
                      onClick={() => deletePrompt(prompt)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

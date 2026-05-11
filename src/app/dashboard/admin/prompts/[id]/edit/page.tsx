import { notFound, redirect } from "next/navigation";

import { PromptForm } from "@/components/admin/prompt-form";
import { ErrorMessage } from "@/components/ui/state";
import {
  getAdminPromptById,
  getAdminTaxonomy
} from "@/lib/admin-prompts";
import { getCurrentProfile } from "@/lib/auth";

type EditAdminPromptPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata = {
  title: "Edit Prompt",
  robots: {
    index: false,
    follow: false
  }
};

export const dynamic = "force-dynamic";

export default async function EditAdminPromptPage({
  params
}: EditAdminPromptPageProps) {
  const { id } = await params;
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect(`/login?next=/dashboard/admin/prompts/${id}/edit`);
  }

  if (profile.role !== "admin") {
    return (
      <section className="section-padding">
        <div className="page-shell max-w-3xl">
          <ErrorMessage
            title="Admin access required"
            message="Your account is signed in, but it does not have the admin role."
          />
        </div>
      </section>
    );
  }

  const [prompt, taxonomy] = await Promise.all([
    getAdminPromptById(id),
    getAdminTaxonomy()
  ]);

  if (!prompt) {
    notFound();
  }

  return (
    <section className="section-padding">
      <div className="page-shell max-w-4xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">Admin Prompts</p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal">
            Edit prompt
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Update the prompt content, taxonomy, and publishing state.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-5">
          <PromptForm mode="edit" prompt={prompt} taxonomy={taxonomy} />
        </div>
      </div>
    </section>
  );
}

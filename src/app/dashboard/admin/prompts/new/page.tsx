import { redirect } from "next/navigation";

import { PromptForm } from "@/components/admin/prompt-form";
import { ErrorMessage } from "@/components/ui/state";
import { getAdminTaxonomy } from "@/lib/admin-prompts";
import { getCurrentProfile } from "@/lib/auth";

export const metadata = {
  title: "New Prompt",
  robots: {
    index: false,
    follow: false
  }
};

export const dynamic = "force-dynamic";

export default async function NewAdminPromptPage() {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login?next=/dashboard/admin/prompts/new");
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

  const taxonomy = await getAdminTaxonomy();

  return (
    <section className="section-padding">
      <div className="page-shell max-w-4xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">Admin Prompts</p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal">
            Create prompt
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Add a prompt template and choose whether it should publish
            immediately or remain a draft.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-5">
          <PromptForm mode="create" taxonomy={taxonomy} />
        </div>
      </div>
    </section>
  );
}

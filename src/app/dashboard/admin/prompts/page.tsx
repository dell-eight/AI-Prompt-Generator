import { redirect } from "next/navigation";

import { AdminTable } from "@/components/admin/admin-table";
import { ErrorMessage } from "@/components/ui/state";
import { getAdminPrompts } from "@/lib/admin-prompts";
import { getCurrentProfile } from "@/lib/auth";

export const metadata = {
  title: "Admin Prompts",
  robots: {
    index: false,
    follow: false
  }
};

export const dynamic = "force-dynamic";

export default async function AdminPromptsPage() {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login?next=/dashboard/admin/prompts");
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

  const prompts = await getAdminPrompts();

  return (
    <section className="section-padding">
      <div className="page-shell">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">Admin Prompts</p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal">
            Prompt inventory
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            View every prompt, including drafts, and manage publishing,
            featured status, categories, tools, difficulty, and tags.
          </p>
        </div>
        <AdminTable prompts={prompts} />
      </div>
    </section>
  );
}

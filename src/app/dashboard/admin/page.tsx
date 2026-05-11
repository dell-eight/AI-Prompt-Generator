import { redirect } from "next/navigation";
import Link from "next/link";
import { BookOpenText, FilePlus2, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorMessage } from "@/components/ui/state";
import { getAdminPrompts } from "@/lib/admin-prompts";
import { getCurrentProfile } from "@/lib/auth";

export const metadata = {
  title: "Admin Dashboard",
  robots: {
    index: false,
    follow: false
  }
};

export const dynamic = "force-dynamic";

export default async function DashboardAdminPage() {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login?next=/dashboard/admin");
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
  const publishedCount = prompts.filter((prompt) => prompt.isPublished).length;
  const draftCount = prompts.length - publishedCount;

  return (
    <section className="section-padding">
      <div className="page-shell">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-primary">Admin Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold tracking-normal">
              Manage prompt library content
            </h1>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Create, edit, publish, feature, and delete prompt templates. Access
              is limited to accounts with the admin role.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/admin/prompts/new">
              <FilePlus2 className="h-4 w-4" />
              New prompt
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <StatCard icon={BookOpenText} label="Total prompts" value={prompts.length} />
          <StatCard icon={ShieldCheck} label="Published" value={publishedCount} />
          <StatCard icon={FilePlus2} label="Drafts" value={draftCount} />
        </div>

        <div className="mt-8 rounded-lg border bg-card p-5">
          <h2 className="font-semibold">Prompt CRUD</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Signed in as {profile.displayName ?? profile.email}. Admin actions
            are protected by route checks, API checks, and Supabase row level
            security.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/dashboard/admin/prompts">Manage prompts</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/prompts">View public library</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon: Icon,
  label,
  value
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-2 grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent className="text-3xl font-bold">{value}</CardContent>
    </Card>
  );
}

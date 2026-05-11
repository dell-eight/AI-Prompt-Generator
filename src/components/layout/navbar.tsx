import Link from "next/link";
import { BookOpenText, LogOut, Sparkles, UserCircle } from "lucide-react";

import { logoutAction } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { getCurrentProfile } from "@/lib/auth";

const navItems = [
  { href: "/prompts", label: "Library" },
  { href: "/generator", label: "Generator" },
  { href: "/saved", label: "Saved" },
  { href: "/dashboard/admin", label: "Admin" }
];

export async function Navbar() {
  const profile = await getCurrentProfile();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="page-shell flex min-h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <BookOpenText className="h-5 w-5" />
          </span>
          <span className="hidden sm:inline">PromptForge</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Button key={item.href} asChild variant="ghost" size="sm">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {profile ? (
            <>
              <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
                <UserCircle className="h-4 w-4" />
                <span className="max-w-36 truncate">
                  {profile.displayName ?? profile.email}
                </span>
              </div>
              <form action={logoutAction}>
                <Button type="submit" variant="ghost" size="sm">
                  <LogOut className="h-4 w-4" />
                  Log out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">
                  <Sparkles className="h-4 w-4" />
                  Start free
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

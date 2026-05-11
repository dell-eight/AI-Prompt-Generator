import Link from "next/link";

const footerLinks = [
  { href: "/prompts", label: "Prompt Library" },
  { href: "/prompts?tool=ChatGPT", label: "ChatGPT Prompts" },
  { href: "/prompts?category=coding", label: "Coding Prompts" },
  { href: "/prompts?category=ai-automation", label: "Automation Prompts" },
  { href: "/generator", label: "AI Prompt Generator" }
];

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="page-shell flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">PromptForge</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse, save, copy, and generate structured prompts for better AI
            results.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

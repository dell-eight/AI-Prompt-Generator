export const siteConfig = {
  name: "PromptForge",
  url: getSiteUrl(),
  description:
    "Browse, save, copy, and generate structured AI prompts for ChatGPT, Cursor, Claude, Canva AI, image generators, book writing, business ideas, coding, debugging, automation, and n8n workflows."
};

function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredUrl) {
    return configuredUrl.replace(/\/+$/, "");
  }

  return "http://localhost:3000";
}

import { AuthForm } from "@/components/auth/auth-form";

export const metadata = {
  title: "Log in",
  robots: {
    index: false,
    follow: false
  }
};

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;

  return (
    <section className="section-padding">
      <div className="page-shell">
        <AuthForm mode="login" nextPath={next} />
      </div>
    </section>
  );
}

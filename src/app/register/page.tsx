import { AuthForm } from "@/components/auth/auth-form";

export const metadata = {
  title: "Register",
  robots: {
    index: false,
    follow: false
  }
};

type RegisterPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const { next } = await searchParams;

  return (
    <section className="section-padding">
      <div className="page-shell">
        <AuthForm mode="register" nextPath={next} />
      </div>
    </section>
  );
}

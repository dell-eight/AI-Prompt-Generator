"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { LockKeyhole } from "lucide-react";

import {
  type AuthActionState,
  loginAction,
  registerAction
} from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type AuthFormProps = {
  mode: "login" | "register";
  nextPath?: string;
};

const initialState: AuthActionState = {};

export function AuthForm({ mode, nextPath = "/saved" }: AuthFormProps) {
  const isLogin = mode === "login";
  const action = isLogin ? loginAction : registerAction;
  const [state, formAction] = useActionState(action, initialState);
  const authSwitchHref = `${isLogin ? "/register" : "/login"}?next=${encodeURIComponent(
    nextPath
  )}`;

  return (
    <Card className="mx-auto w-full max-w-md shadow-soft">
      <CardHeader>
        <div className="mb-2 grid h-11 w-11 place-items-center rounded-lg bg-primary text-primary-foreground">
          <LockKeyhole className="h-5 w-5" />
        </div>
        <CardTitle>{isLogin ? "Log in" : "Create your account"}</CardTitle>
        <CardDescription>
          {isLogin
            ? "Log in to manage saved prompts and your account."
            : "Create an account to save prompts and keep your workflow organized."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid gap-4">
          <input type="hidden" name="next" value={nextPath} />
          {!isLogin ? (
            <label className="grid gap-2 text-sm font-medium">
              Name
              <Input name="name" placeholder="Alex Builder" autoComplete="name" />
            </label>
          ) : null}
          <label className="grid gap-2 text-sm font-medium">
            Email
            <Input
              name="email"
              placeholder="you@example.com"
              type="email"
              autoComplete="email"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Password
            <Input
              name="password"
              placeholder="At least 8 characters"
              type="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              minLength={8}
              required
            />
          </label>
          {state.error ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {state.error}
            </p>
          ) : null}
          {state.message ? (
            <p className="rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-sm text-muted-foreground">
              {state.message}
            </p>
          ) : null}
          <SubmitButton label={isLogin ? "Log in" : "Create account"} />
        </form>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          {isLogin ? "Need an account?" : "Already have an account?"}{" "}
          <Link
            href={authSwitchHref}
            className="font-medium text-primary hover:underline"
          >
            {isLogin ? "Register" : "Log in"}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="mt-2" disabled={pending}>
      {pending ? "Working..." : label}
    </Button>
  );
}

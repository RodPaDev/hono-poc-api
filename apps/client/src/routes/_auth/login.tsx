import { AuthCover } from "@/routes/_auth/-components/auth-cover";
import { LoginForm } from "@/routes/_auth/-components/login-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage,
});

export function LoginPage() {
  return (
    <div className="flex h-full w-full">
      <div className="relative flex w-1/2 items-center justify-center">
        <img
          src="auth/logo.png"
          alt="logo"
          className="absolute top-4 left-4 w-24 h-auto"
        />
        <LoginForm />
      </div>
      <div className="w-1/2 h-full">
        <AuthCover />
      </div>
    </div>
  );
}

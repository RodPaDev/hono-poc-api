import { AuthCover } from "@/routes/_auth/-components/auth-cover";
import { ForgotPasswordForm } from "@/routes/_auth/-components/forgot-password-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return (
    <div className="flex h-full w-full">
      <div className="relative flex w-1/2 items-center justify-center">
        <img
          src="auth/logo.png"
          alt="logo"
          className="absolute top-4 left-4 w-24 h-auto"
        />
        <ForgotPasswordForm />
      </div>
      <div className="w-1/2 h-full">
        <AuthCover />
      </div>
    </div>
  );
}

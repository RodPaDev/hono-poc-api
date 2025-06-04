import { AuthCover } from "@/routes/_auth/-components/auth-cover";
import { ResetPasswordForm } from "@/routes/_auth/-components/reset-password-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/reset-password")({
  component: ResetPasswordPage,
  validateSearch: (search: Record<string, unknown>): { email: string } => {
    return {
      email: (search?.email as string) || "",
    };
  },
});

function ResetPasswordPage() {
  return (
    <div className="flex h-full w-full">
      <div className="relative flex w-1/2 items-center justify-center">
        <img
          src="auth/logo.png"
          alt="logo"
          className="absolute top-4 left-4 w-24 h-auto"
        />
        <ResetPasswordForm />
      </div>
      <div className="w-1/2 h-full">
        <AuthCover />
      </div>
    </div>
  );
}

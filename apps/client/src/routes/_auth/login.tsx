import { createFileRoute, redirect, useLocation } from "@tanstack/react-router";

import {
  LoginForm,
  type SignInForm,
} from "@/routes/_auth/-components/login-form";

import { signIn } from "@/lib/auth-client";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

export function RouteComponent() {
  const location = useLocation();
  const navigate = Route.useNavigate();

  async function handleLogin(values: SignInForm) {
    try {
      await signIn.email(
        { email: values.email, password: values.password },
        {
          onSuccess: async () => {
            await navigate({
              to: "/dashboard",
              search: location.search,
            });
          },
        },
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Login failed:", err);
    }
  }

  return <LoginForm onSubmit={handleLogin} />;
}

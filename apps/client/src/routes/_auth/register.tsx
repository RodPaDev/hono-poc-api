import { signUp } from "@/lib/auth-client";
import {
  SignUpForm,
  type SignUpFormValues,
} from "@/routes/_auth/-components/register-form";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  async function handleSignup(values: SignUpFormValues) {
    try {
      await signUp.email(
        { email: values.email, password: values.password, name: values.name },
        {
          onSuccess: (ctx) => {
            redirect({
              to: "/dashboard",
              search: location.search,
            });
          },
        },
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Signup failed:", err);
    }
  }

  return <SignUpForm onSubmit={handleSignup} />;
}

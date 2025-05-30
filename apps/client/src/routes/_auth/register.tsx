import { signUp } from "@/lib/auth-client";
import {
  SignUpForm,
  type SignUpFormValues,
} from "@/routes/_auth/-components/register-form";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  async function handleSignup(values: SignUpFormValues) {
    try {
      await signUp.email(
        { email: values.email, password: values.password, name: values.name },
        {
          onSuccess: () => {
            router.invalidate();
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

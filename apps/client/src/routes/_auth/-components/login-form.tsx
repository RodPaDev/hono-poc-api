import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "@tanstack/react-router";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: t("authentication.login.invalidEmail") }),
  password: z
    .string()
    .min(6, { message: t("authentication.login.invalidPassword") }),
});

export type SignInForm = z.infer<typeof formSchema>;

type LoginFormProps = {
  className?: string;
};

export function LoginForm({ className, ...props }: LoginFormProps) {
  const router = useRouter();
  const form = useForm<SignInForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(values: SignInForm) {
    try {
      const { error } = await signIn.email(
        { email: values.email, password: values.password },
        {
          onSuccess: async () => {
            router.invalidate();
          },
        },
      );
      if (error?.code) {
        toast.error(t(`errors.${error.code}`));
        // eslint-disable-next-line no-console
        console.error("Login failed:", error);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Login failed:", err);
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-6 w-full max-w-md p-8 text-center",
        className,
      )}
      {...props}>
      <Card className="bg-transparent border-transparent shadow-none">
        <CardHeader>
          <CardTitle>{t("authentication.login.title")}</CardTitle>
          <CardDescription>
            {t("authentication.login.subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("authentication.login.email")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>
                        {t("authentication.login.password")}
                      </FormLabel>
                      <Link to="/forgot-password" className="underline text-sm">
                        {t("authentication.login.forgotPassword")}
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {t("authentication.login.loginButton")}
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            {t("authentication.login.createAccount")}{" "}
            <Link to="/register" className="underline underline-offset-4">
              {t("authentication.login.signUpButton")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

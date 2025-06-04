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
import { emailOtp } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";

const forgotPasswordFormSchema = z.object({
  email: z.string().email({ message: t("authentication.invalidEmail") }),
});
export type ForgotPasswordForm = z.infer<typeof forgotPasswordFormSchema>;

export function ForgotPasswordForm() {
  const router = useRouter();
  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function handleForgotPassword(values: ForgotPasswordForm) {
    try {
      await emailOtp.sendVerificationOtp({
        email: values.email,
        type: "forget-password",
      });

      await router.navigate({
        to: "/reset-password",
        search: { email: values.email },
        replace: true,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Forgot Password failed:", err);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-md p-8 text-center")}>
      <Card className="bg-transparent border-transparent shadow-none">
        <CardHeader>
          <CardTitle>{t("authentication.forgotPassword.title")}</CardTitle>
          <CardDescription>
            {t("authentication.forgotPassword.subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleForgotPassword)}
              className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("authentication.email")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {t("authentication.forgotPassword.resetButton")}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

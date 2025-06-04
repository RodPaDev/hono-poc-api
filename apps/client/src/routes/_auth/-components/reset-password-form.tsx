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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { emailOtp } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const resetPasswordFormSchema = z
  .object({
    email: z.string().email({ message: t("authentication.invalidEmail") }),
    confirmationCode: z
      .string()
      .length(6, { message: t("authentication.invalidOTP") }),
    password: z
      .string()
      .min(6, { message: t("authentication.invalidPassword") }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: t("authentication.passwordMismatch"),
    path: ["confirmPassword"],
  });
export type ResetPasswordForm = z.infer<typeof resetPasswordFormSchema>;

export function ResetPasswordForm() {
  const navigate = useNavigate();
  const searchParams = useSearch({ from: "/_auth/reset-password" });
  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email: searchParams.email,
      password: "",
      confirmPassword: "",
    },
  });

  async function handleResetPassword(values: ResetPasswordForm) {
    try {
      const email = form.getValues("email");
      const { error } = await emailOtp.resetPassword({
        email,
        otp: values.confirmationCode,
        password: values.password,
      });

      if (error?.code) {
        toast.error(t(`errors.${error.code}`));
        // eslint-disable-next-line no-console
        console.error("Reset Password failed:", error);
        return;
      }

      navigate({
        to: "/login",
        replace: true,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Reset Password failed:", err);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-md p-8 text-center")}>
      <Card className="bg-transparent border-transparent shadow-none">
        <CardHeader>
          <CardTitle>{t("authentication.resetPassword.title")}</CardTitle>
          <CardDescription>
            {t("authentication.resetPassword.subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleResetPassword)}
              className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                disabled={true}
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
              <FormField
                control={form.control}
                name="confirmationCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("authentication.confirmationCode")}
                    </FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="flex flex-row justify-between w-full">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup className="flex flex-row justify-between w-full">
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
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
                    <FormLabel>{t("authentication.password")}</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("authentication.confirmPassword")}</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {t("authentication.resetPassword.resetButton")}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

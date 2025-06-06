import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatInitials } from "@/utils/formatting";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  organizationName: z.string().min(3),
  ownerName: z.string().min(3),
  ownerEmail: z.string().email({ message: t("authentication.invalidEmail") }),
});
export type CreateOrganizationForm = z.infer<typeof formSchema>;

export const AddOrganization = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<CreateOrganizationForm>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      organizationName: "",
      ownerName: "",
      ownerEmail: "",
    },
  });

  const organizationName = form.watch("organizationName") || "";

  async function handleCreateOrganization(values: CreateOrganizationForm) {
    const submissionData = {
      ...values,
      organizationImage: "",
    };

    if (selectedFile) {
      //TODO: handle file upload to AWS S3
      // 1. Get a presigned URL from your backend
      // 2. Upload the file to AWS S3 using that URL
      // 3. Use the resulting S3 URL in your form submission
      console.log("File to upload:", selectedFile.name);
      console.log("File size:", selectedFile.size);
      console.log("File type:", selectedFile.type);

      const s3FileUrl = "";
      submissionData.organizationImage = s3FileUrl;
    }

    console.log("Creating organization with values:", submissionData);
    console.log("Form is valid:", form.formState.isValid);
  }

  return (
    <SheetContent
      onPointerDownOutside={(e) => e.preventDefault()}
      onInteractOutside={(e) => e.preventDefault()}>
      <SheetHeader>
        <SheetTitle>{t("organization.create.title")}</SheetTitle>
        <SheetDescription>{t("organization.create.subtitle")}</SheetDescription>
      </SheetHeader>
      <Card className="m-4">
        <CardTitle className="px-2">
          {t("organization.create.details")}
        </CardTitle>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateOrganization)}
              className="space-y-6">
              <div className="space-y-2">
                <FormLabel>
                  {t("organization.create.organizationImage")}
                </FormLabel>
                <div className="flex flex-row items-center gap-4">
                  <Avatar className="size-14">
                    <AvatarImage
                      src={imagePreview || ""}
                      alt="Organization logo"
                    />
                    <AvatarFallback>
                      {formatInitials(organizationName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="relative">
                    <Input
                      type="file"
                      accept="image/*"
                      id="org-image-upload"
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSelectedFile(file);
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                    <div className="flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer">
                      <p>Upload</p>
                      {selectedFile && (
                        <span className="text-xs text-muted-foreground ml-2">
                          {selectedFile.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <FormField
                control={form.control}
                name="organizationName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("organization.create.organizationName")}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ownerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("organization.create.ownerName")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ownerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("organization.create.ownerEmail")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={!form.formState.isValid}>
                {t("organization.create.createButton")}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </SheetContent>
  );
};

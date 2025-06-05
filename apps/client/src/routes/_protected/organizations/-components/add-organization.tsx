import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { t } from "i18next";

export const AddOrganization = () => {
  return (
    <SheetContent
      onPointerDownOutside={(e) => e.preventDefault()}
      onInteractOutside={(e) => e.preventDefault()}>
      <SheetHeader>
        <SheetTitle>{t("organization.create.title")}</SheetTitle>
        <SheetDescription>{t("organization.create.subtitle")}</SheetDescription>
      </SheetHeader>
      <div className="grid flex-1 auto-rows-min gap-6 px-4">
        <div className="grid gap-3">
          <Label htmlFor="sheet-demo-name">Name</Label>
          <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="sheet-demo-username">Username</Label>
          <Input id="sheet-demo-username" defaultValue="@peduarte" />
        </div>
      </div>
      <SheetFooter>
        <Button type="submit">{t("organization.create.createButton")}</Button>
      </SheetFooter>
    </SheetContent>
  );
};

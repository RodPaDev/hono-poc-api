import { AppLogo } from "@/components/svgr/IntusLogo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AppSplashScreen() {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-4">
      <Card>
        <CardHeader className="flex flex-col items-center gap-2 ">
          <AppLogo />
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4 my-8">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-lg text-primary">Preparing your workspace...</p>
        </CardContent>
      </Card>
    </div>
  );
}

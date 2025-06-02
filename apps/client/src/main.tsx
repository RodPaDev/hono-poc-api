import { Toaster } from "@/components/ui/sonner";
import "@/index.css";
import { routeTree } from "@/routeTree.gen";
import enTranslations from "@/translations/en.json";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import i18n from "i18next";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initReactI18next } from "react-i18next";

const queryClient = new QueryClient();

i18n.use(initReactI18next).init({
  resources: {
    en: enTranslations,
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  saveMissing: true,
  saveMissingTo: "all",
  missingKeyHandler: (_lng, _ns, _key, _fallbackValue) => {
    // UNCOMMENT THIS TO LOG MISSING TRANSLATIONS IN BROWSER CONSOLE
    // console.log(
    //   `Missing translation - Language: ${_lng}, Namespace: ${_ns}, Key: ${_key}`,
    // );
  },
});

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster
        richColors={true}
        expand={true}
        position="bottom-right"
        theme="light"
      />
    </StrictMode>,
  );
}

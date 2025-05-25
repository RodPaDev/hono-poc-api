import type { auth, AuthType } from "@/lib/auth.js";

export type HonoContext = {
  Bindings: AuthType;
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

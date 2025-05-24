import type { auth, AuthType } from "./auth";

export type HonoContext = {
  Bindings: AuthType;
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

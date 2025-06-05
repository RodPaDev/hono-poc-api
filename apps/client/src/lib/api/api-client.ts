import { hcWithType } from "@fsm/api/hc";

export const apiClient = hcWithType("http://localhost:3000/", {
  init: {
    /* This includes better-auth cookies in requests */
    credentials: "include",
  },
});

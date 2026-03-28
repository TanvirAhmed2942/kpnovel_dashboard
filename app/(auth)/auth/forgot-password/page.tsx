import type { Metadata } from "next";

import Forgotpassword from "@/src/auth/forgotpassword";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Reset your KPnovel account password",
};

export default function ForgotPasswordPage() {
  return <Forgotpassword />;
}

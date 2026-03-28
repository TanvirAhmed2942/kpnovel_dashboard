import type { Metadata } from "next";

import Login from "@/src/auth/login";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your KPnovel dashboard",
};

export default function LoginPage() {
  return <Login />;
}

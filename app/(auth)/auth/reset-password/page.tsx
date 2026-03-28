import type { Metadata } from "next";

import Resetpassword from "@/src/auth/resetpassword";

export const metadata: Metadata = {
    title: "Reset password",
    description: "Set a new password for your KPnovel account",
};

export default function ResetPasswordPage() {
    return <Resetpassword />;
}

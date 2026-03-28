import type { Metadata } from "next";
import { Suspense } from "react";

import VerifyOtp from "@/src/auth/verifyotp";

export const metadata: Metadata = {
    title: "Verify code",
    description: "Enter the verification code sent to your email",
};

function VerifyOtpFallback() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="h-24 rounded-lg bg-muted" />
            <div className="h-11 rounded-lg bg-muted" />
            <div className="h-11 rounded-lg bg-muted" />
        </div>
    );
}

export default function VerifyOtpPage() {
    return (
        <Suspense fallback={<VerifyOtpFallback />}>
            <VerifyOtp />
        </Suspense>
    );
}

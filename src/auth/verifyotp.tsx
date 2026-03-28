"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

function VerifyOtp() {
    const otpId = useId();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const router = useRouter();
    const [code, setCode] = useState("");

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <Link
                    href="/auth/forgot-password"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                >
                    <ArrowLeftIcon className="size-4 shrink-0" aria-hidden />
                    Back
                </Link>

                <div className="space-y-2 text-center sm:text-left">
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        Enter verification code
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {email
                            ? `We sent a 6-digit code to ${email}. Enter it below to continue.`
                            : "We sent a 6-digit code to your email. Enter it below to continue."}
                    </p>
                </div>
            </div>

            <form
                className="space-y-5"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <div className="space-y-2">
                    <Label htmlFor={otpId}>Verification code</Label>
                    <InputOTP
                        id={otpId}
                        maxLength={6}
                        value={code}
                        onChange={setCode}
                        pattern={REGEXP_ONLY_DIGITS}
                        containerClassName="justify-start sm:justify-start"
                    >
                        <InputOTPGroup className="shadow-xs">
                            <InputOTPSlot index={0} className="h-11 w-10 text-base" />
                            <InputOTPSlot index={1} className="h-11 w-10 text-base" />
                            <InputOTPSlot index={2} className="h-11 w-10 text-base" />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup className="shadow-xs">
                            <InputOTPSlot index={3} className="h-11 w-10 text-base" />
                            <InputOTPSlot index={4} className="h-11 w-10 text-base" />
                            <InputOTPSlot index={5} className="h-11 w-10 text-base" />
                        </InputOTPGroup>
                    </InputOTP>
                    <input type="hidden" name="otp" value={code} />
                </div>

                <Button
                    type="submit"
                    className="h-11 w-full bg-violet-600 text-white hover:bg-violet-600/90"
                    disabled={code.length !== 6}
                    onClick={() => {
                        router.push("/auth/reset-password");
                    }}
                >
                    Verify and continue
                </Button>
            </form>

            <Separator className="bg-border" />

            <p className="text-center text-sm text-muted-foreground">
                Didn&apos;t receive a code?{" "}
                <button
                    type="button"
                    className="font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                >
                    Resend code
                </button>
            </p>
        </div>
    );
}

export default VerifyOtp;

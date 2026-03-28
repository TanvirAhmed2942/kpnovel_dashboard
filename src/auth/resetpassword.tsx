"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

function Resetpassword() {
    const newPasswordId = useId();
    const confirmPasswordId = useId();
    const router = useRouter();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                >
                    <ArrowLeftIcon className="size-4 shrink-0" aria-hidden />
                    Back to login
                </Link>

                <div className="space-y-2 text-center sm:text-left">
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        Set new password
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Choose a strong password and confirm it below.
                    </p>
                </div>
            </div>

            <form
                className="space-y-5"
                onSubmit={(e) => {
                    e.preventDefault();
                    setError(null);
                    if (newPassword !== confirmPassword) {
                        setError("Passwords do not match.");
                        return;
                    }
                    if (newPassword.length < 8) {
                        setError("Password must be at least 8 characters.");
                        return;
                    }
                }}
            >
                <div className="space-y-2">
                    <Label htmlFor={newPasswordId}>New password</Label>
                    <div className="relative">
                        <Input
                            id={newPasswordId}
                            name="newPassword"
                            type={showNew ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="••••••••"
                            className="h-11 pr-11"
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                setError(null);
                            }}
                            minLength={8}
                            required
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            className="absolute top-1/2 right-1 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowNew((v) => !v)}
                            aria-label={showNew ? "Hide password" : "Show password"}
                        >
                            {showNew ? (
                                <EyeOffIcon className="size-4" />
                            ) : (
                                <EyeIcon className="size-4" />
                            )}
                        </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor={confirmPasswordId}>Confirm password</Label>
                    <div className="relative">
                        <Input
                            id={confirmPasswordId}
                            name="confirmPassword"
                            type={showConfirm ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="••••••••"
                            className="h-11 pr-11"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setError(null);
                            }}
                            minLength={8}
                            required
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            className="absolute top-1/2 right-1 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowConfirm((v) => !v)}
                            aria-label={
                                showConfirm ? "Hide password" : "Show password"
                            }
                        >
                            {showConfirm ? (
                                <EyeOffIcon className="size-4" />
                            ) : (
                                <EyeIcon className="size-4" />
                            )}
                        </Button>
                    </div>
                </div>

                {error ? (
                    <p className="text-sm text-destructive" role="alert">
                        {error}
                    </p>
                ) : null}

                <Button
                    type="submit"
                    className="h-11 w-full bg-violet-600 text-white hover:bg-violet-600/90"
                    onClick={() => {
                        router.push("/auth/login");
                    }}
                >
                    Update password
                </Button>
            </form>

            <Separator className="bg-border" />

            <p className="text-center text-sm text-muted-foreground">
                <Link
                    href="/auth/login"
                    className="font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                >
                    Sign in
                </Link>
                {" · "}
                <Link
                    href="/auth/forgot-password"
                    className="font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                >
                    Request a new code
                </Link>
            </p>
        </div>
    );
}

export default Resetpassword;

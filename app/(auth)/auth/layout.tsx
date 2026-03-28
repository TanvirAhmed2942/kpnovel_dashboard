import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenIcon } from "lucide-react";

export const metadata: Metadata = {
    title: "Account — KPnovel",
    description: "Sign in or create your KPnovel account",
};

/**
 * Auth routes: outer chrome is fixed; only {children} swaps (login, register, etc.).
 */
export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div className="flex min-h-screen flex-1 items-center justify-center bg-linear-to-b from-indigo-700  to-violet-950 p-4 md:p-6 lg:p-8">
            <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-card text-card-foreground shadow-xl ring-1 ring-foreground/10 md:min-h-[min(640px,calc(100dvh-6rem))] lg:grid-cols-12">
                {/* Fixed branding panel — does not change per route */}
                <aside className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-[#0f0820] via-[#2d1b69] to-[#5D38FF] p-8 text-white lg:col-span-5 lg:flex xl:p-10">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-[0.12]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />
                    <div className="relative z-10">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-white/95 transition-opacity hover:opacity-90"
                        >
                            <span className="flex size-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                                <BookOpenIcon className="size-5" aria-hidden />
                            </span>
                            KPnovel
                        </Link>
                        <p className="mt-10 max-w-[16rem] text-2xl font-semibold leading-snug tracking-tight xl:text-3xl">
                            Read and publish stories readers love.
                        </p>
                        <p className="mt-4 max-w-[18rem] text-sm leading-relaxed text-white/75">
                            Dashboard access for authors and teams. Your session stays on this
                            side — forms update in the panel beside you.
                        </p>
                    </div>
                    <p className="relative z-10 text-xs text-white/50">
                        © {new Date().getFullYear()} KPnovel
                    </p>
                </aside>

                {/* Middle / main slot — only this region is replaced by nested pages */}
                <main className="flex flex-col justify-center bg-white px-6 py-10 text-zinc-950 sm:px-10 lg:col-span-7 lg:px-12 lg:py-12 dark:bg-white dark:text-zinc-950">
                    <div className="mx-auto w-full max-w-md">{children}</div>
                </main>
            </div>

        </div>
    );
}

"use client"

import * as React from "react"
import { AlertTriangle, MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import ScriptInput from "./ScriptInput"
import TrackingId from "./TrackingId"

const STORAGE_KEY = "kpnovel_super_admin_site_analytics"

type PersistedAnalytics = {
    gaId: string
    gtmId: string
    fbPixelId: string
    headScripts: string
    bodyScripts: string
    trackingEnabled: boolean
}

const defaultState: PersistedAnalytics = {
    gaId: "",
    gtmId: "",
    fbPixelId: "",
    headScripts: "",
    bodyScripts: "",
    trackingEnabled: true,
}

function loadPersisted(): PersistedAnalytics {
    if (typeof window === "undefined") return defaultState
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return defaultState
        const parsed = JSON.parse(raw) as Partial<PersistedAnalytics>
        return { ...defaultState, ...parsed }
    } catch {
        return defaultState
    }
}

function EnableTrackingRow({
    enabled,
    onEnabledChange,
}: {
    enabled: boolean
    onEnabledChange: (value: boolean) => void
}) {
    return (
        <>
            <Separator className="bg-gray-200" />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-900">Enable tracking</p>
                    <p className="text-sm text-gray-500">Scripts will run on all pages.</p>
                </div>
                <Switch
                    checked={enabled}
                    onCheckedChange={onEnabledChange}
                    className="data-checked:bg-emerald-600"
                />
            </div>
        </>
    )
}

function SiteAnalyticsLayout() {
    const [hydrated, setHydrated] = React.useState(false)
    const [gaId, setGaId] = React.useState("")
    const [gtmId, setGtmId] = React.useState("")
    const [fbPixelId, setFbPixelId] = React.useState("")
    const [headScripts, setHeadScripts] = React.useState("")
    const [bodyScripts, setBodyScripts] = React.useState("")
    const [trackingEnabled, setTrackingEnabled] = React.useState(true)

    React.useEffect(() => {
        const s = loadPersisted()
        setGaId(s.gaId)
        setGtmId(s.gtmId)
        setFbPixelId(s.fbPixelId)
        setHeadScripts(s.headScripts)
        setBodyScripts(s.bodyScripts)
        setTrackingEnabled(s.trackingEnabled)
        setHydrated(true)
    }, [])

    const handleSave = React.useCallback(() => {
        const payload: PersistedAnalytics = {
            gaId,
            gtmId,
            fbPixelId,
            headScripts,
            bodyScripts,
            trackingEnabled,
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    }, [
        gaId,
        gtmId,
        fbPixelId,
        headScripts,
        bodyScripts,
        trackingEnabled,
    ])

    const handleResetFields = React.useCallback(() => {
        setGaId("")
        setGtmId("")
        setFbPixelId("")
        setHeadScripts("")
        setBodyScripts("")
        setTrackingEnabled(true)
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Tracking &amp; custom scripts
                    </h1>
                    <p className="mt-1 text-base text-gray-500">
                        Inject analytics or custom code into your website
                    </p>
                </div>
                <div className="flex shrink-0 items-center gap-2 self-start sm:self-auto">
                    <Badge
                        variant="outline"
                        className={`h-8 gap-1.5 border-0 ${trackingEnabled ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-20  0"} px-3 text-sm font-medium ${trackingEnabled ? "text-emerald-800" : "text-red-800"}`}
                    >
                        <span
                            className={`size-2 shrink-0 rounded-full ${trackingEnabled ? "bg-emerald-500" : "bg-red-500"}`}
                            aria-hidden
                        />
                        {trackingEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="size-9 shrink-0 rounded-lg border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
                                aria-label="More options"
                            >
                                <MoreHorizontal className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={handleResetFields}>
                                Clear all fields
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleSave}>Save changes</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div
                className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50/90 p-4 text-amber-950"
                role="status"
            >
                <AlertTriangle
                    className="mt-0.5 size-5 shrink-0 text-amber-600"
                    strokeWidth={2}
                />
                <p className="text-sm leading-relaxed">
                    Only super admins can add scripts. Incorrect or malicious code may
                    break or compromise the website. Only paste scripts from trusted
                    sources.
                </p>
            </div>

            <Tabs defaultValue="ids" className="w-full gap-6">
                <TabsList className="inline-flex h-11 items-center justify-center gap-1 border border-gray-200 bg-gray-50/90 shadow-none">
                    <TabsTrigger
                        value="ids"
                        className="px-5 py-2 text-sm font-medium text-gray-800 shadow-none transition-none hover:text-gray-900 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none"
                    >
                        Analytics IDs
                    </TabsTrigger>
                    <TabsTrigger
                        value="scripts"
                        className="px-5 py-2 text-sm font-medium text-gray-800 shadow-none transition-none hover:text-gray-900 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none"
                    >
                        Custom scripts
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="ids" className="mt-0 space-y-4 outline-none">
                    <Card className="rounded-xl border border-gray-200 bg-white py-0 shadow-none ring-0">
                        <CardHeader className="px-5 pb-0 pt-5">
                            <CardTitle className="text-base font-bold text-gray-900">
                                Analytics identifiers
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-500">
                                Connect GA4, Tag Manager, or Meta without editing raw HTML.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 p-5 pt-4">
                            {!hydrated ? (
                                <p className="text-sm text-gray-500">Loading…</p>
                            ) : (
                                <>
                                    <TrackingId
                                        gaId={gaId}
                                        gtmId={gtmId}
                                        fbPixelId={fbPixelId}
                                        onGaIdChange={setGaId}
                                        onGtmIdChange={setGtmId}
                                        onFbPixelIdChange={setFbPixelId}
                                    />
                                    <EnableTrackingRow
                                        enabled={trackingEnabled}
                                        onEnabledChange={setTrackingEnabled}
                                    />
                                </>
                            )}
                        </CardContent>
                    </Card>
                    <Button
                        type="button"
                        variant="outline"
                        className="h-10 rounded-lg border-gray-300 bg-white px-5 font-medium text-gray-900 hover:bg-gray-50 hover:text-blue-600"
                        onClick={handleSave}
                    >
                        Save changes
                    </Button>
                </TabsContent>

                <TabsContent value="scripts" className="mt-0 space-y-4 outline-none">
                    <Card className="rounded-xl border border-gray-200 bg-white py-0 shadow-none ring-0">
                        <CardHeader className="px-5 pb-0 pt-5">
                            <CardTitle className="text-base font-bold text-gray-900">
                                Custom HTML &amp; scripts
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-500">
                                Paste snippets you have reviewed. They will be injected site-wide
                                when tracking is enabled.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 p-5 pt-4">
                            {!hydrated ? (
                                <p className="text-sm text-gray-500">Loading…</p>
                            ) : (
                                <>
                                    <ScriptInput
                                        headScripts={headScripts}
                                        bodyScripts={bodyScripts}
                                        onHeadScriptsChange={setHeadScripts}
                                        onBodyScriptsChange={setBodyScripts}
                                    />
                                    <EnableTrackingRow
                                        enabled={trackingEnabled}
                                        onEnabledChange={setTrackingEnabled}
                                    />
                                </>
                            )}
                        </CardContent>
                    </Card>
                    <Button
                        type="button"
                        variant="outline"
                        className="h-10 rounded-lg border-gray-300 bg-white px-5 font-medium text-gray-900 hover:bg-gray-50 hover:text-blue-600"
                        onClick={handleSave}
                    >
                        Save changes
                    </Button>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default SiteAnalyticsLayout

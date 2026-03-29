"use client"

import { BellIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type NotificationItem = {
  id: string
  title: string
  body: string
  time: string
  unread: boolean
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "New comment on Chapter 15",
    body: `DragonFan2024 commented: "This chapter was absolutely amazing!"`,
    time: "2 min ago",
    unread: true,
  },
  {
    id: "2",
    title: "New follower",
    body: "StorySeeker started following your novel.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: "3",
    title: "Review published",
    body: "Your latest chapter received a 5-star review.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "4",
    title: "Milestone reached",
    body: "You've passed 10k total views on your series.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: "5",
    title: "Schedule reminder",
    body: "Your draft for Chapter 18 is due in 3 days.",
    time: "3 days ago",
    unread: false,
  },
]

const tabTriggerClass =
  "flex-0 rounded-full border-0 bg-transparent px-3  text-sm font-medium text-gray-500  shadow-none transition-colors data-active:bg-blue-600 data-active:text-white  data-active:shadow-none hover:text-black dark:data-active:text-primary-foreground"

function NotificationCard({ item }: { item: NotificationItem }) {
  return (
    <Card
      className={cn(
        "relative gap-0 py-3.5 ",
        "bg-card"
      )}
      size="sm"
    >
      {item.unread ? (
        <span
          className="bg-primary absolute top-3.5 right-3.5 size-2 shrink-0 rounded-full"
          aria-hidden
        />
      ) : null}
      <CardHeader className="gap-1.5 pr-8">
        <CardTitle className="text-sm font-semibold text-gray-900">
          {item.title}
        </CardTitle>
        <CardDescription className="text-[13px] leading-snug">
          {item.body}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2 pb-0">
        <p className="text-gray-500 text-xs">{item.time}</p>
      </CardContent>
    </Card>
  )
}

export function NotificationsSheetTrigger({
  className,
}: {
  className?: string
}) {
  const all = NOTIFICATIONS.length
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length
  const readCount = all - unreadCount

  return (
    <Sheet>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "mr-4 size-8 rounded-xl border text-gray-900 hover:bg-gray-200 hover:text-gray-700",
                className
              )}
              aria-label="Open notifications"
            >
              <BellIcon className="size-4" />
            </Button>
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Notifications</p>
        </TooltipContent>
      </Tooltip>
      <SheetContent
        side="right"
        className="flex h-full w-full flex-col gap-0 overflow-hidden p-0 sm:max-w-lg bg-gray-100"
      >
        <SheetHeader className="border-border shrink-0 space-y-1 border-b px-4 py-5 text-left">
          <SheetTitle className="font-heading text-xl font-semibold tracking-tight text-gray-900">
            Notifications
          </SheetTitle>
          <SheetDescription>
            Stay updated with your latest activities
          </SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col gap-4 px-4 py-4">
          <Tabs defaultValue="all">
            <TabsList
              variant="default"
              className="bg-gray-200 grid h-auto w-full grid-cols-3 gap-0 rounded-full border border-border p-1"
            >
              <TabsTrigger value="all" className={tabTriggerClass}>
                All ({all})
              </TabsTrigger>
              <TabsTrigger value="unread" className={tabTriggerClass}>
                Unread ({unreadCount})
              </TabsTrigger>
              <TabsTrigger value="read" className={tabTriggerClass}>
                Read ({readCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="all"
              className="mt-0 min-h-0 flex-1 overflow-y-auto outline-none"
            >
              <ul className="flex flex-col gap-3">
                {NOTIFICATIONS.map((item) => (
                  <li key={item.id}>
                    <NotificationCard item={item} />
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent
              value="unread"
              className="mt-0 min-h-0 flex-1 overflow-y-auto outline-none"
            >
              <ul className="flex flex-col gap-3">
                {NOTIFICATIONS.filter((n) => n.unread).map((item) => (
                  <li key={item.id}>
                    <NotificationCard item={item} />
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent
              value="read"
              className="mt-0 min-h-0 flex-1 overflow-y-auto outline-none"
            >
              <ul className="flex flex-col gap-3">
                {NOTIFICATIONS.filter((n) => !n.unread).map((item) => (
                  <li key={item.id}>
                    <NotificationCard item={item} />
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  )
}

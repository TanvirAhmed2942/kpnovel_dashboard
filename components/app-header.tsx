"use client"
import { NotificationsSheetTrigger } from "@/components/notifications-sheet"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { CirclePower } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { clearStoredUserRole } from "@/lib/auth-storage"
import { useRouter } from "next/navigation"
import { Separator } from "./ui/separator"

export function AppHeader() {
  const router = useRouter()
  return (
    <TooltipProvider>

      <header className="flex h-16 w-full shrink-0 items-center justify-between gap-2 border-b border-border bg-sidebar transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <Tooltip>
          <TooltipTrigger>
            <SidebarTrigger className="ml-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md p-2 hover:cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle Sidebar</p>
          </TooltipContent>
        </Tooltip>


        <div className="flex items-center gap-2 mr-4">
          <Tooltip>
            <TooltipTrigger>
              <NotificationsSheetTrigger className="mr-2" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="h-8 w-px bg-gray-200" />
          <Tooltip>
            <TooltipTrigger>
              <CirclePower className="text-red-400 hover:text-red-700 hover:bg-gray-200 rounded-xl p-2 hover:cursor-pointer size-8  " onClick={() => {
                clearStoredUserRole()
                router.push("/auth/login")
              }} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </header>
    </TooltipProvider >
  )
}

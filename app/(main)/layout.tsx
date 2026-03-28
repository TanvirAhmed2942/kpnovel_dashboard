import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

/**
 * Shared shell for admin, author, and super_admin dashboards.
 */
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="h-full min-h-0 flex-1 bg-gray-100 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

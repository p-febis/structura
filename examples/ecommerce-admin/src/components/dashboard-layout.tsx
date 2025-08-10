import { Outlet } from "react-router";
import { DashboardSidebar } from "./dashboard-sidebar";
import { SidebarProvider } from "./ui/sidebar";
import { DashboardHeader } from "./dashboard-header";
import { Toaster } from "sonner";

export const DashboardLayout = () => {
  return (
    <div className="flex h-svh flex-col">
      <SidebarProvider>
        <DashboardSidebar />
        <div className="flex h-full w-full flex-col">
          <DashboardHeader />
          <div className="flex grow items-center justify-center p-4">
            <Outlet />
          </div>
        </div>
        <Toaster richColors />
      </SidebarProvider>
    </div>
  );
};

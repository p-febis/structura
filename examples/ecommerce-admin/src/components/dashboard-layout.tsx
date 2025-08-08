import { Outlet } from "react-router";
import { DashboardSidebar } from "./dashboard-sidebar";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";

export const DashboardLayout = () => {
  return (
    <div className="flex flex-col h-svh">
      <SidebarProvider>
        <DashboardSidebar />
        <div className="flex flex-col h-full w-full">
          <header className="mb-4 flex items-center min-h-16 border-b">
            <SidebarTrigger className="mx-2" />
            <Separator orientation="vertical" />
            <nav className="h-full p-2 flex items-center w-full">
              <h3 className="text-xl font-semibold">Structura</h3>
            </nav>
          </header>
          <div className="flex items-center justify-center grow p-4">
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

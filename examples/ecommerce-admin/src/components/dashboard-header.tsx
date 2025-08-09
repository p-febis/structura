import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

export const DashboardHeader = () => {
  return (
    <header className="mb-4 flex min-h-16 items-center border-b">
      <SidebarTrigger className="mx-2" />
      <Separator orientation="vertical" />
      <nav className="flex h-full w-full items-center p-2">
        <h3 className="text-xl font-semibold">Structura</h3>
      </nav>
    </header>
  );
};

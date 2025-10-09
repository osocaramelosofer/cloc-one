import { AppSidebar } from "@/modules/common/components/app-sidebar";
import { ChatWidget } from "@/modules/common/components/chat-widget";
import { SidebarTrigger } from "@/modules/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
                  {/* <AppNavbar /> */}
      <AppSidebar />
      <main className="h-full w-full">
        <SidebarTrigger />
        {children}
        <ChatWidget />
      </main>
    </div>
  );
}
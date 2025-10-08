import { ChatWidget } from "@/modules/common/components/chat-widget";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      {children}
      <ChatWidget />
    </main>
  );
}
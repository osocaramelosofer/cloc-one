import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "@/lib/fonts/fonts";
import { SidebarProvider, SidebarTrigger } from "@/modules/ui/sidebar";
import { AppSidebar } from "@/modules/common/components/app-sidebar";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/providers/theme.provider";
import { HeroUIProvider } from "@/providers/hero-ui.provider";
import AuthProvider from "@/providers/auth.provider";


export const metadata: Metadata = {
  title: "Cloc One",
  description: "Cloc One",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={ `${geistSans.variable} ${geistMono.variable}`}
      >
        <AuthProvider>
          <HeroUIProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider defaultOpen={defaultOpen}>
                <AppSidebar /> 
                <main className="h-full w-full">
                  <SidebarTrigger />
                  {children}
                </main>
              </SidebarProvider>
            </ThemeProvider>
          </HeroUIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

import { Home, Inbox, ScanFace, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LogoutButton } from "@/modules/auth/components/logout-button"
import { LoginButton } from "@/modules/auth/components/login-button"
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/config/auth"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Organizations",
    url: "/organizations",
    icon: Inbox,
  },
  {
    title: "Login",
    url: "/login",
    icon: ScanFace,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export async function AppSidebar() {
  const session = await getServerSession(authOptions);
  console.log("SESSION", session);
  return (
    <Sidebar className="bg-red-200" collapsible="icon">
      <SidebarContent >
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {session ? (
              <SidebarMenuButton asChild>
                <LogoutButton />
              </SidebarMenuButton>
              ) : (
              <SidebarMenuButton asChild>
                <LoginButton />
              </SidebarMenuButton>
              )}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
"use client";
import { SidebarMenuButton } from "@/modules/ui/sidebar";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
    const handleLogout = async () => {
        try {
          await signOut();
        } catch (error) {
          console.error("Login failed:", error);
        }
      };
    
    return (
      <SidebarMenuButton onClick={handleLogout}>
      <LogOut />
      <span>Cerrar sesión</span>
    </SidebarMenuButton>
    );
};
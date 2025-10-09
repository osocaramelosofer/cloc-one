"use client";
import { SidebarMenuButton } from "@/modules/ui/sidebar";
import { ScanFace } from "lucide-react";
import { signIn } from "next-auth/react";

export const LoginButton = () => {
    const handleLogin = async () => {
        try {
          await signIn("cognito", { callbackUrl: "/dashboard" });
        } catch (error) {
          console.error("Login failed:", error);
        }
      };
    
    return (
      <SidebarMenuButton onClick={handleLogin}>
        <ScanFace />
        <span>Inciar sesión</span>
      </SidebarMenuButton>
    );
};
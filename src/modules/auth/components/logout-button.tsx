"use client";
import { Button } from "@heroui/button";
import { Mail } from "lucide-react";
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
        <Button
        size="lg"
        color="danger"
        className="w-full"
        onPress={handleLogout}
        startContent={<Mail className="w-5 h-5" />}
      >
        Cerrar sesión
      </Button>
    );
};
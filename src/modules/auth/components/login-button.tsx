"use client";
import { Button } from "@heroui/button";
import { Mail } from "lucide-react";
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
        <Button
        size="lg"
        color="primary"
        className="w-full"
        onPress={handleLogin}
        startContent={<Mail className="w-5 h-5" />}
      >
        Iniciar sesión con Magic Link
      </Button>
    );
};
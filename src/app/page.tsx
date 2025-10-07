"use client"
import { ToggleTheme } from "@/modules/common/components/toggle-theme";
import { CloudLightning } from "lucide-react";
import {Button, Card, CardBody, CardHeader} from "@heroui/react";
import { ChatWidget } from "@/modules/common/components/chat-widget";

export default function Home() {
  return (
    <div className="">
      <h1 className="text-2xl font-bold text-center">Home page!!</h1>
      <ToggleTheme />
      <ChatWidget />
    </div>
  );
}
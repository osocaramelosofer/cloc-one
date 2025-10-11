"use client"
import {Card, CardHeader, CardBody} from "@heroui/react";
import { useRouter } from "next/navigation";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

export default function DashboardCard({title, description, icon, link}: DashboardCardProps) {
  const router = useRouter();
  
  return (
    <Card 
      className="py-4 w-80 flex-shrink-0"
      isPressable
      onPress={() => {
        router.push(link);
      }}
      isHoverable
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h3 className="font-bold text-large">{title}</h3>
        <small className="text-default-500 break-words whitespace-normal text-xs">{description}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        {icon}
      </CardBody>
    </Card>
  )
}
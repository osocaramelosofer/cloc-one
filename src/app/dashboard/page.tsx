"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";
import { Building2, Users } from "lucide-react";
import DashboardCard from "@/modules/dashboard/components/dashboard-card";

const cards = [
  {
    title: "Organizations",
    description: "Manage your organizations",
    icon: <Building2 />,
    link: "/dashboard/organizations",
  },
  {
    title: "Users",
    description: "Manage your users",
    icon: <Users />,
    link: "/dashboard/users",
  },
]

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if(!session) {
    return <div>No session</div>;
  }


 return(
  <div className="min-h-screen w-full flex flex-col relative">
    <h1 className="text-2xl font-bold text-center">Dashboard</h1>
    <section className="flex flex-col items-start justify-start flex-1 p-5">
      <div className="flex flex-wrap gap-4">
        {cards.map((card) => (
          <DashboardCard key={card.title} title={card.title} description={card.description} icon={card.icon} link={card.link} />
        ))}
      </div>
    </section>
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
      <span className="text-default-500">Signed in as {session?.user?.email}</span>
    </div>
  </div>
 )
}
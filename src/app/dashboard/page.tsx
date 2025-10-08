"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";
import { LogoutButton } from "@/modules/auth/components/logout-button";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if(!session) {
    return <div>No session</div>;
  }
 return(
  <div>
    <h1 className="text-2xl font-bold text-center">Dashboard</h1>
    <p>Signed in as {session?.user?.email}</p>
  </div>
 )
}
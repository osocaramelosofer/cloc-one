"use client"

import OrganizationsTable from "@/modules/organizations/components/organizations-table"
import { Building } from "lucide-react"

export default function OrganizationsPage() {
  
  return (
  <div className=" flex flex-col">
    <div className="flex items-end gap-2 justify-center">
      <Building size={64} />
      <h1 className="text-2xl font-bold">Organizations</h1>
    </div>
      <section className="p-5">
        <OrganizationsTable />
      </section>
  </div>
  )
}
import React from "react";
import { redirect } from "next/navigation";
import { getCurrentAuth } from "@/lib/auth/session";
import AdminDashboardShell from "./AdminDashboardShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const auth = await getCurrentAuth();

  if (!auth) {
    redirect("/admin/login");
  }

  return (
    <AdminDashboardShell user={auth.user} session={auth.session}>
      {children}
    </AdminDashboardShell>
  );
}

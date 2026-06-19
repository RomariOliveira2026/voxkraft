import { redirect } from "next/navigation";
import { AssinaturaClient } from "@/components/dashboard/assinatura-client";
import {
  getCurrentUser,
  getDashboardMetrics,
  getInvoices,
  getSubscription,
} from "@/lib/data";

export default async function AssinaturaPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [subscription, invoices, metrics] = await Promise.all([
    getSubscription(user.id),
    getInvoices(user.id),
    getDashboardMetrics(user.id),
  ]);

  if (!subscription) redirect("/login");

  return (
    <AssinaturaClient
      subscription={subscription}
      invoices={invoices}
      audiosThisMonth={metrics.audiosThisMonth}
    />
  );
}

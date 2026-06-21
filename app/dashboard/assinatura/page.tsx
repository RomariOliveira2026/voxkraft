import { redirect } from "next/navigation";
import { AssinaturaClient } from "@/components/dashboard/assinatura-client";
import { AssinaturaDemoClient } from "@/components/dashboard/assinatura-demo-client";
import {
  getCurrentUser,
  getDashboardMetrics,
  getInvoices,
  getSubscription,
} from "@/lib/data";
import { isDemoMode } from "@/lib/config/demo-mode";

export default async function AssinaturaPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const invoices = await getInvoices(user.id);

  if (isDemoMode()) {
    return <AssinaturaDemoClient userId={user.id} invoices={invoices} />;
  }

  const [subscription, metrics] = await Promise.all([
    getSubscription(user.id),
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

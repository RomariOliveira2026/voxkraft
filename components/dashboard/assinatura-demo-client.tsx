"use client";

import { useMemo } from "react";
import { AssinaturaClient } from "@/components/dashboard/assinatura-client";
import { getClientDashboardMetrics, getClientSubscription } from "@/lib/demo-store/client-store";
import { useDemoStoreVersion } from "@/lib/demo-store/use-demo-store";
import type { Invoice } from "@/lib/types/database";

type AssinaturaDemoClientProps = {
  userId: string;
  invoices: Invoice[];
};

export function AssinaturaDemoClient({ userId, invoices }: AssinaturaDemoClientProps) {
  const version = useDemoStoreVersion(true);

  const { subscription, audiosThisMonth } = useMemo(() => {
    const metrics = getClientDashboardMetrics(userId);
    return {
      subscription: getClientSubscription(userId),
      audiosThisMonth: metrics.audiosThisMonth,
    };
  }, [userId, version]);

  return (
    <AssinaturaClient
      subscription={subscription}
      invoices={invoices}
      audiosThisMonth={audiosThisMonth}
    />
  );
}

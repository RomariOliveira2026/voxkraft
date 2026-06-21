import { getCreditSnapshot } from "@/lib/credits";
import { formatMinutesUsed } from "@/lib/format";
import type { CreditSubscriptionInput } from "@/lib/credits";

type CreditsSummaryCardProps = {
  subscription: CreditSubscriptionInput;
};

export function CreditsSummaryCard({ subscription }: CreditsSummaryCardProps) {
  const credits = getCreditSnapshot(subscription);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className="text-sm text-slate-400">Créditos do plano</p>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-500">Minutos disponíveis</p>
          <p className="mt-1 text-2xl font-black">
            {credits.isUnlimited ? "Ilimitado" : formatMinutesUsed(credits.minutesAvailable)}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Minutos utilizados</p>
          <p className="mt-1 text-2xl font-black">{formatMinutesUsed(credits.minutesUsed)}</p>
        </div>
      </div>

      {!credits.isUnlimited && (
        <>
          <p className="mt-4 text-xs text-slate-500">
            {credits.usagePercent}% consumido · de {formatMinutesUsed(credits.minutesLimit)} no
            plano
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-blue-600"
              style={{ width: `${credits.usagePercent}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}

import type { PlanId } from "@/lib/types/database";

export type CreditSnapshot = {
  plan: PlanId;
  minutesLimit: number;
  minutesUsed: number;
  minutesAvailable: number;
  usagePercent: number;
  isUnlimited: boolean;
};

export type CreditCheckReason = "insufficient_credits" | "premium_voice" | "empty_text";

export type CreditCheckInput = {
  text: string;
  speed?: number;
  voiceIsPremium?: boolean;
  plan: PlanId;
  minutesLimit: number;
  minutesUsed: number;
};

export type CreditCheckResult =
  | {
      ok: true;
      estimatedMinutes: number;
      remainingMinutes: number;
    }
  | {
      ok: false;
      reason: CreditCheckReason;
      message: string;
      estimatedMinutes?: number;
      remainingMinutes?: number;
    };

export type CreditSubscriptionInput = {
  plan: PlanId;
  minutes_limit: number;
  minutes_used: number;
};

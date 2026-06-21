import { estimateDurationSeconds } from "@/lib/format";
import {
  creditsExhaustedMessage,
  emptyTextMessage,
  insufficientCreditsMessage,
  premiumVoiceBlockedMessage,
} from "@/lib/credits/messages";
import type {
  CreditCheckInput,
  CreditCheckResult,
  CreditSnapshot,
  CreditSubscriptionInput,
} from "@/lib/credits/types";

export function getCreditSnapshot(subscription: CreditSubscriptionInput): CreditSnapshot {
  const isUnlimited = subscription.plan === "enterprise";
  const minutesLimit = isUnlimited ? Infinity : subscription.minutes_limit;
  const minutesUsed = Math.max(0, Number(subscription.minutes_used));
  const minutesAvailable = isUnlimited
    ? Infinity
    : Math.max(0, subscription.minutes_limit - minutesUsed);
  const usagePercent = isUnlimited
    ? 0
    : Math.min(100, Math.round((minutesUsed / subscription.minutes_limit) * 100));

  return {
    plan: subscription.plan,
    minutesLimit: isUnlimited ? 0 : subscription.minutes_limit,
    minutesUsed,
    minutesAvailable,
    usagePercent,
    isUnlimited,
  };
}

export function getRemainingMinutes(subscription: CreditSubscriptionInput): number {
  if (subscription.plan === "enterprise") return Infinity;
  return Math.max(0, subscription.minutes_limit - Number(subscription.minutes_used));
}

export function checkCredits(input: CreditCheckInput): CreditCheckResult {
  const text = input.text.trim();

  if (!text) {
    return { ok: false, reason: "empty_text", message: emptyTextMessage() };
  }

  if (input.voiceIsPremium && input.plan === "free") {
    return { ok: false, reason: "premium_voice", message: premiumVoiceBlockedMessage() };
  }

  const speed = input.speed ?? 1;
  const estimatedMinutes = estimateDurationSeconds(text, speed) / 60;
  const remainingMinutes = getRemainingMinutes({
    plan: input.plan,
    minutes_limit: input.minutesLimit,
    minutes_used: input.minutesUsed,
  });

  if (input.plan !== "enterprise" && estimatedMinutes > remainingMinutes) {
    if (remainingMinutes <= 0) {
      return {
        ok: false,
        reason: "insufficient_credits",
        message: creditsExhaustedMessage(),
        estimatedMinutes,
        remainingMinutes,
      };
    }

    return {
      ok: false,
      reason: "insufficient_credits",
      message: insufficientCreditsMessage(estimatedMinutes, remainingMinutes),
      estimatedMinutes,
      remainingMinutes,
    };
  }

  return {
    ok: true,
    estimatedMinutes,
    remainingMinutes,
  };
}

export function debitMinutes(minutesUsed: number, debitAmount: number): number {
  return Math.max(0, minutesUsed + debitAmount);
}

export function refundMinutes(minutesUsed: number, refundAmount: number): number {
  return Math.max(0, minutesUsed - refundAmount);
}

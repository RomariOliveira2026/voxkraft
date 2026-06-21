import { formatMinutesUsed } from "@/lib/format";

export function creditsExhaustedMessage(planName = "Essencial") {
  return `Você utilizou todos os minutos do plano ${planName} deste mês. Faça upgrade para continuar gerando áudios.`;
}

export function insufficientCreditsMessage(estimatedMinutes: number, remainingMinutes: number) {
  return `Este texto precisa de ~${formatMinutesUsed(estimatedMinutes)}, mas você tem apenas ${formatMinutesUsed(remainingMinutes)} disponíveis. Reduza o texto ou faça upgrade do plano.`;
}

export function premiumVoiceBlockedMessage() {
  return "Esta voz está disponível apenas no plano Profissional. Faça upgrade para desbloqueá-la.";
}

export function emptyTextMessage() {
  return "Digite um texto para gerar o áudio.";
}

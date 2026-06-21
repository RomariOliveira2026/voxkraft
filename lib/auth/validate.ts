const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type AuthCredentials = {
  email: string;
  password: string;
  fullName?: string;
};

export function validateSignupInput({ email, password, fullName }: AuthCredentials) {
  const name = fullName?.trim() ?? "";

  if (name.length < 2) {
    return "Informe seu nome completo.";
  }

  if (!EMAIL_PATTERN.test(email.trim())) {
    return "Informe um e-mail válido.";
  }

  if (password.length < 8) {
    return "A senha deve ter no mínimo 8 caracteres.";
  }

  return null;
}

export function validateLoginInput({ email, password }: AuthCredentials) {
  if (!EMAIL_PATTERN.test(email.trim())) {
    return "Informe um e-mail válido.";
  }

  if (password.length < 8) {
    return "A senha deve ter no mínimo 8 caracteres.";
  }

  return null;
}

export function authErrorMessage(error: unknown, fallback: string) {
  if (error instanceof DOMException && error.name === "AbortError") {
    return "Tempo esgotado. Verifique sua conexão e tente novamente.";
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

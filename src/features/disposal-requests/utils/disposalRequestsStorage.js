const DISPOSAL_REQUESTS_STORAGE_KEY = "ecoponto-sp:disposal-requests";

export const disposalRequestStatusOptions = [
  "Pendente",
  "Recebido",
  "Processado",
  "Cancelado",
];

/**
 * Remove caracteres não numéricos do CPF.
 *
 * Mantemos o CPF salvo apenas com números para facilitar busca, comparação e
 * evitar inconsistência entre valores com ou sem máscara.
 */
export function normalizeCpf(cpfValue) {
  return String(cpfValue || "")
    .replace(/\D/g, "")
    .slice(0, 11);
}

/**
 * Aplica máscara visual ao CPF.
 *
 * A máscara é usada somente na interface. A persistência continua usando o CPF
 * normalizado, apenas com números.
 */
export function formatCpf(cpfValue) {
  const cpf = normalizeCpf(cpfValue);

  if (cpf.length <= 3) {
    return cpf;
  }

  if (cpf.length <= 6) {
    return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
  }

  if (cpf.length <= 9) {
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
  }

  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
    6,
    9
  )}-${cpf.slice(9, 11)}`;
}

/**
 * Normaliza e-mail para busca e comparação.
 */
export function normalizeEmail(emailValue) {
  return String(emailValue || "").trim().toLowerCase();
}

/**
 * Valida um formato simples de e-mail.
 *
 * A validação é propositalmente pragmática para o MVP: evita campos vazios e
 * formatos claramente inválidos sem tentar cobrir todas as regras possíveis.
 */
export function isValidEmail(emailValue) {
  const email = normalizeEmail(emailValue);

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Valida o preenchimento básico do CPF.
 *
 * Neste MVP, verificamos se há 11 dígitos. A validação matemática completa do
 * CPF pode ser adicionada depois como melhoria.
 */
export function isCpfComplete(cpfValue) {
  return normalizeCpf(cpfValue).length === 11;
}

/**
 * Verifica se o status informado faz parte do fluxo administrativo permitido.
 */
function getValidRequestStatus(status) {
  return disposalRequestStatusOptions.includes(status) ? status : "Pendente";
}

/**
 * Normaliza uma solicitação de descarte.
 *
 * A função preserva campos antigos, mas garante os campos essenciais para o
 * fluxo público, consulta por CPF/e-mail e gestão administrativa.
 */
function normalizeDisposalRequest(request) {
  return {
    ...request,
    id: request.id || crypto.randomUUID(),
    name: String(request.name || "").trim(),
    cpf: normalizeCpf(request.cpf),
    email: normalizeEmail(request.email),
    status: getValidRequestStatus(request.status),
    createdAt: request.createdAt || new Date().toISOString(),
  };
}

/**
 * Lê as solicitações salvas no LocalStorage.
 */
export function getStoredDisposalRequests() {
  const storedRequests = localStorage.getItem(DISPOSAL_REQUESTS_STORAGE_KEY);

  if (!storedRequests) {
    return [];
  }

  try {
    const parsedRequests = JSON.parse(storedRequests);

    return Array.isArray(parsedRequests)
      ? parsedRequests.map(normalizeDisposalRequest)
      : [];
  } catch {
    return [];
  }
}

/**
 * Salva a lista completa de solicitações.
 */
export function saveDisposalRequests(requests) {
  const normalizedRequests = requests.map(normalizeDisposalRequest);

  localStorage.setItem(
    DISPOSAL_REQUESTS_STORAGE_KEY,
    JSON.stringify(normalizedRequests)
  );
}

/**
 * Cria uma nova solicitação de descarte.
 */
export function createDisposalRequest(requestData) {
  const currentRequests = getStoredDisposalRequests();

  const newRequest = normalizeDisposalRequest({
    ...requestData,
    id: crypto.randomUUID(),
    status: "Pendente",
    createdAt: new Date().toISOString(),
  });

  const updatedRequests = [newRequest, ...currentRequests];

  saveDisposalRequests(updatedRequests);

  return updatedRequests;
}

/**
 * Atualiza o status de uma solicitação pelo ID.
 */
export function updateDisposalRequestStatus(requestId, nextStatus) {
  const currentRequests = getStoredDisposalRequests();

  const updatedRequests = currentRequests.map((request) => {
    if (request.id !== requestId) {
      return request;
    }

    return normalizeDisposalRequest({
      ...request,
      status: nextStatus,
      updatedAt: new Date().toISOString(),
    });
  });

  saveDisposalRequests(updatedRequests);

  return updatedRequests;
}

/**
 * Busca solicitações pelo CPF ou e-mail informado pelo cidadão.
 *
 * A busca é exata para evitar exibir solicitações de outras pessoas por
 * correspondências parciais.
 */
export function findDisposalRequestsByIdentifier(identifier) {
  const cpf = normalizeCpf(identifier);
  const email = normalizeEmail(identifier);
  const requests = getStoredDisposalRequests();

  if (cpf.length === 11) {
    return requests.filter((request) => normalizeCpf(request.cpf) === cpf);
  }

  if (isValidEmail(email)) {
    return requests.filter((request) => normalizeEmail(request.email) === email);
  }

  return [];
}
const DISPOSAL_REQUESTS_STORAGE_KEY = "ecoponto-sp:disposal-requests";

export const disposalRequestStatusOptions = [
  "Pendente",
  "Recebido",
  "Processado",
  "Cancelado",
];

/**
 * Verifica se o status informado faz parte do fluxo administrativo permitido.
 *
 * Isso evita salvar valores inesperados no LocalStorage e mantém a listagem
 * administrativa previsível.
 */
function getValidRequestStatus(status) {
  return disposalRequestStatusOptions.includes(status) ? status : "Pendente";
}

/**
 * Normaliza uma solicitação de descarte.
 *
 * A função preserva os campos existentes para não quebrar registros antigos,
 * mas garante campos essenciais para leitura administrativa, dashboard e
 * alteração de status.
 */
function normalizeDisposalRequest(request) {
  return {
    ...request,
    id: request.id || crypto.randomUUID(),
    status: getValidRequestStatus(request.status),
    createdAt: request.createdAt || new Date().toISOString(),
  };
}

/**
 * Lê as solicitações salvas no LocalStorage.
 *
 * Quando não há registros ou quando ocorre erro de leitura, retornamos uma
 * lista vazia para manter a interface segura.
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
 *
 * O projeto ainda não possui backend, então a coleção inteira é persistida no
 * LocalStorage a cada alteração.
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
 *
 * A solicitação nasce como "Pendente", simulando um fluxo administrativo em que
 * o responsável precisa revisar e atualizar o andamento depois.
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
 *
 * Essa função centraliza a mutação para que a página administrativa não precise
 * conhecer detalhes de persistência no LocalStorage.
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
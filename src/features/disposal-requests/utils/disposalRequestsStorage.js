const DISPOSAL_REQUESTS_STORAGE_KEY = "ecoponto-sp:disposal-requests";

function createRequestId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return String(Date.now());
}

export function getStoredDisposalRequests() {
  const storedRequests = localStorage.getItem(DISPOSAL_REQUESTS_STORAGE_KEY);

  if (!storedRequests) {
    return [];
  }

  try {
    const parsedRequests = JSON.parse(storedRequests);

    return Array.isArray(parsedRequests) ? parsedRequests : [];
  } catch {
    return [];
  }
}

export function saveDisposalRequests(requests) {
  localStorage.setItem(
    DISPOSAL_REQUESTS_STORAGE_KEY,
    JSON.stringify(requests)
  );
}

export function createDisposalRequest(requestData) {
  const currentRequests = getStoredDisposalRequests();

  const newRequest = {
    id: createRequestId(),
    status: "Pendente",
    createdAt: new Date().toISOString(),
    ...requestData,
  };

  saveDisposalRequests([newRequest, ...currentRequests]);

  return newRequest;
}
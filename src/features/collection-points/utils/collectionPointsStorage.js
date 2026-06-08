import { collectionPoints as initialCollectionPoints } from "../data/collectionPoints.js";

const COLLECTION_POINTS_STORAGE_KEY = "ecoponto-sp:collection-points";

/**
 * Gera um ID incremental simples para os pontos de coleta.
 *
 * Como o projeto ainda não possui backend, usamos o maior ID existente
 * como referência para criar o próximo registro local.
 */
function createCollectionPointId(points) {
  const highestId = points.reduce((highest, point) => {
    return Number(point.id) > highest ? Number(point.id) : highest;
  }, 0);

  return highestId + 1;
}

/**
 * Normaliza um ponto de coleta.
 *
 * As instruções de descarte deixaram de pertencer ao ponto e passaram para
 * uma página centralizada de orientações. Por isso, este normalizador mantém
 * apenas os dados operacionais necessários para listagem, detalhe, filtros
 * e dashboard.
 */
function normalizeCollectionPointData(pointData) {
  return {
    name: pointData.name || "",
    address: pointData.address || "",
    district: pointData.district || "",
    status: pointData.status || "Ativo",
    acceptedWasteTypes: Array.isArray(pointData.acceptedWasteTypes)
      ? pointData.acceptedWasteTypes
      : [],
    openingHours: pointData.openingHours || "",
    estimatedVolumeKg: Number(pointData.estimatedVolumeKg) || 0,
  };
}

/**
 * Normaliza pontos já existentes no LocalStorage ou nos dados mockados.
 *
 * Isso permite que versões antigas do objeto, ainda com instructions, sejam
 * usadas sem quebrar a aplicação, mas sem continuar propagando esse campo.
 */
function normalizeStoredCollectionPoint(point) {
  return {
    id: Number(point.id),
    ...normalizeCollectionPointData(point),
  };
}

/**
 * Lê os pontos de coleta do LocalStorage.
 *
 * Quando ainda não existe nada salvo, retorna os dados mockados iniciais.
 * Isso mantém o projeto funcional desde o primeiro acesso.
 */
export function getStoredCollectionPoints() {
  const storedPoints = localStorage.getItem(COLLECTION_POINTS_STORAGE_KEY);

  if (!storedPoints) {
    return initialCollectionPoints.map(normalizeStoredCollectionPoint);
  }

  try {
    const parsedPoints = JSON.parse(storedPoints);

    return Array.isArray(parsedPoints)
      ? parsedPoints.map(normalizeStoredCollectionPoint)
      : initialCollectionPoints.map(normalizeStoredCollectionPoint);
  } catch {
    return initialCollectionPoints.map(normalizeStoredCollectionPoint);
  }
}

/**
 * Salva a lista completa de pontos.
 *
 * O CRUD trabalha sempre substituindo a coleção inteira, uma abordagem simples
 * e suficiente para persistência local em projetos front-end sem backend.
 */
export function saveCollectionPoints(points) {
  const normalizedPoints = points.map(normalizeStoredCollectionPoint);

  localStorage.setItem(
    COLLECTION_POINTS_STORAGE_KEY,
    JSON.stringify(normalizedPoints)
  );
}

/**
 * Cria um novo ponto de coleta e persiste a lista atualizada.
 */
export function createCollectionPoint(pointData) {
  const currentPoints = getStoredCollectionPoints();

  const newPoint = {
    id: createCollectionPointId(currentPoints),
    ...normalizeCollectionPointData(pointData),
  };

  const updatedPoints = [newPoint, ...currentPoints];

  saveCollectionPoints(updatedPoints);

  return updatedPoints;
}

/**
 * Atualiza um ponto existente pelo ID.
 */
export function updateCollectionPoint(pointId, pointData) {
  const currentPoints = getStoredCollectionPoints();

  const updatedPoints = currentPoints.map((point) => {
    if (point.id !== Number(pointId)) {
      return point;
    }

    return {
      id: point.id,
      ...normalizeCollectionPointData(pointData),
    };
  });

  saveCollectionPoints(updatedPoints);

  return updatedPoints;
}

/**
 * Remove um ponto de coleta pelo ID.
 */
export function deleteCollectionPoint(pointId) {
  const currentPoints = getStoredCollectionPoints();

  const updatedPoints = currentPoints.filter(
    (point) => point.id !== Number(pointId)
  );

  saveCollectionPoints(updatedPoints);

  return updatedPoints;
}
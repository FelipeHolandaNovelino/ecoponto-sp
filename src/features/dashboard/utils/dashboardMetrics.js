const POINT_STATUS_ORDER = ["Ativo", "Cheio", "Em manutenção"];

/**
 * Agrupa uma lista por chave e soma uma quantidade.
 *
 * Essa função evita repetição nas métricas do dashboard, já que várias análises
 * seguem o mesmo padrão: agrupar dados e transformar em uma lista para gráfico.
 */
function groupAndSum(items, getGroupKey, getQuantity = () => 1) {
  const groupedItems = items.reduce((accumulator, item) => {
    const groupKey = getGroupKey(item);
    const quantity = Number(getQuantity(item)) || 0;

    if (!groupKey) {
      return accumulator;
    }

    accumulator[groupKey] = (accumulator[groupKey] || 0) + quantity;

    return accumulator;
  }, {});

  return Object.entries(groupedItems)
    .map(([label, total]) => ({
      label,
      total,
    }))
    .sort((firstItem, secondItem) => secondItem.total - firstItem.total);
}

/**
 * Calcula os números principais exibidos nos cards superiores do dashboard.
 *
 * Esses dados são derivados dos pontos e solicitações persistidos no
 * LocalStorage, mantendo o painel conectado ao estado real do MVP.
 */
export function getDashboardSummary(points, requests) {
  const activePoints = points.filter((point) => point.status === "Ativo");

  const pendingRequests = requests.filter(
    (request) => request.status === "Pendente"
  );

  const estimatedVolumeKg = points.reduce((total, point) => {
    return total + Number(point.estimatedVolumeKg || 0);
  }, 0);

  const servedDistricts = new Set(points.map((point) => point.district));

  return {
    activePointsCount: activePoints.length,
    pendingRequestsCount: pendingRequests.length,
    estimatedVolumeKg,
    servedDistrictsCount: servedDistricts.size,
  };
}

/**
 * Monta os dados de pontos por status.
 *
 * A ordem fixa ajuda o dashboard a manter consistência visual mesmo quando
 * algum status ainda não possui pontos cadastrados.
 */
export function buildPointStatusData(points) {
  return POINT_STATUS_ORDER.map((status) => ({
    label: status,
    total: points.filter((point) => point.status === status).length,
  }));
}

/**
 * Monta os dados de resíduos registrados nas solicitações.
 *
 * Usamos a quantidade informada pelo usuário, não apenas o número de
 * solicitações, porque isso representa melhor o volume de itens descartados.
 */
export function buildRequestWasteTypeData(requests) {
  return groupAndSum(
    requests,
    (request) => request.wasteType,
    (request) => request.quantity
  );
}

/**
 * Monta os dados de pontos cadastrados por bairro.
 *
 * Essa métrica ajuda o administrador a visualizar a cobertura territorial
 * simulada da plataforma.
 */
export function buildDistrictPointData(points) {
  return groupAndSum(points, (point) => point.district);
}
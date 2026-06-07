function normalizeText(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function getUniqueDistricts(points) {
  return [...new Set(points.map((point) => point.district))].sort();
}

export function filterCollectionPoints(
  points,
  { searchTerm, selectedDistrict, selectedWasteType, selectedStatus }
) {
  const normalizedSearch = normalizeText(searchTerm);

  return points.filter((point) => {
    const matchesSearch =
      !normalizedSearch ||
      normalizeText(point.name).includes(normalizedSearch) ||
      normalizeText(point.address).includes(normalizedSearch) ||
      normalizeText(point.district).includes(normalizedSearch) ||
      point.acceptedWasteTypes.some((wasteType) =>
        normalizeText(wasteType).includes(normalizedSearch)
      );

    const matchesDistrict =
      selectedDistrict === "Todos os bairros" ||
      point.district === selectedDistrict;

    const matchesWasteType =
      selectedWasteType === "Todos os resíduos" ||
      point.acceptedWasteTypes.includes(selectedWasteType);

    const matchesStatus =
      selectedStatus === "Todos os status" || point.status === selectedStatus;

    return matchesSearch && matchesDistrict && matchesWasteType && matchesStatus;
  });
}
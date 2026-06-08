import { useMemo, useState } from "react";
import { MapPin, Search } from "lucide-react";

import { CollectionPointCard } from "../features/collection-points/components/CollectionPointCard.jsx";
import { getStoredCollectionPoints } from "../features/collection-points/utils/collectionPointsStorage.js";
import {
  filterCollectionPoints,
  getUniqueDistricts,
} from "../features/collection-points/utils/collectionPointFilters.js";
import { wasteTypes } from "../features/waste-types/data/wasteTypes.js";

export function CollectionPointsPage() {
  /**
   * A página pública lê os pontos persistidos para refletir alterações feitas
   * na área administrativa.
   */
  const points = useMemo(() => getStoredCollectionPoints(), []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("Todos os bairros");
  const [selectedWasteType, setSelectedWasteType] =
    useState("Todos os resíduos");
  const [selectedStatus, setSelectedStatus] = useState("Todos os status");

  const districts = useMemo(() => getUniqueDistricts(points), [points]);

  const filteredCollectionPoints = useMemo(() => {
    return filterCollectionPoints(points, {
      searchTerm,
      selectedDistrict,
      selectedWasteType,
      selectedStatus,
    });
  }, [points, searchTerm, selectedDistrict, selectedWasteType, selectedStatus]);

  return (
    <section className="page-section">
      <div className="page-header">
        <span className="eyebrow">Área pública</span>
        <h1>Pontos de coleta</h1>
        <p>
          Consulte locais disponíveis para descarte de resíduos eletrônicos.
          Use os filtros para encontrar pontos compatíveis com o material que
          você precisa descartar.
        </p>
      </div>

      <div className="toolbar">
        <label className="search-field">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar por bairro, ponto ou resíduo"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>

        <select
          value={selectedDistrict}
          onChange={(event) => setSelectedDistrict(event.target.value)}
        >
          <option>Todos os bairros</option>

          {districts.map((district) => (
            <option key={district}>{district}</option>
          ))}
        </select>

        <select
          value={selectedWasteType}
          onChange={(event) => setSelectedWasteType(event.target.value)}
        >
          <option>Todos os resíduos</option>

          {wasteTypes.map((wasteType) => (
            <option key={wasteType}>{wasteType}</option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={(event) => setSelectedStatus(event.target.value)}
        >
          <option>Todos os status</option>
          <option>Ativo</option>
          <option>Cheio</option>
          <option>Em manutenção</option>
        </select>
      </div>

      <div className="content-grid">
        <div className="map-preview">
          <MapPin size={36} />
          <strong>Mapa simulado</strong>

          <p>
            {filteredCollectionPoints.length} ponto
            {filteredCollectionPoints.length === 1 ? "" : "s"} encontrado
            {filteredCollectionPoints.length === 1 ? "" : "s"} com os filtros
            atuais.
          </p>

          <p>
            Nesta versão inicial, o mapa será representado de forma visual e
            simulada. Depois podemos evoluir para Leaflet ou outra solução de
            mapas.
          </p>
        </div>

        <div className="cards-column">
          {filteredCollectionPoints.length > 0 ? (
            filteredCollectionPoints.map((point) => (
              <CollectionPointCard key={point.id} point={point} />
            ))
          ) : (
            <article className="collection-card">
              <h2>Nenhum ponto encontrado</h2>
              <p>
                Tente remover algum filtro ou buscar por outro bairro, status ou
                tipo de resíduo.
              </p>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
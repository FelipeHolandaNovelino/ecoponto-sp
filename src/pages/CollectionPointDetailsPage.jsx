import {
  ArrowLeft,
  Clock,
  Info,
  MapPin,
  PackageCheck,
  Recycle,
  SearchX,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { EmptyState } from "../components/ui/EmptyState.jsx";
import { getStoredCollectionPoints } from "../features/collection-points/utils/collectionPointsStorage.js";

function getStatusClassName(status) {
  const statusClasses = {
    Ativo: "status-active",
    Cheio: "status-warning",
    "Em manutenção": "status-warning",
  };

  return statusClasses[status] || "status-warning";
}

export function CollectionPointDetailsPage() {
  const { id } = useParams();

  /**
   * A tela de detalhes usa os pontos persistidos para manter consistência
   * com o CRUD administrativo.
   */
  const points = getStoredCollectionPoints();

  const point = points.find(
    (collectionPoint) => collectionPoint.id === Number(id)
  );

  if (!point) {
    return (
      <section className="page-section">
        <EmptyState
          icon={SearchX}
          eyebrow="Ponto não encontrado"
          title="Não encontramos esse ponto de coleta"
          description="O ponto solicitado não existe na base atual do EcoPonto SP. Ele pode ter sido removido pelo administrador ou a rota pode estar incorreta."
          actionLabel="Voltar para pontos"
          actionTo="/pontos"
          secondaryActionLabel="Gerenciar pontos"
          secondaryActionTo="/admin/pontos"
        />
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="page-header">
        <span className="eyebrow">Detalhes do ponto</span>
        <h1>{point.name}</h1>
        <p>
          Consulte endereço, horário, status operacional e tipos de resíduos
          aceitos por este ponto de coleta.
        </p>
      </div>

      <div className="content-grid">
        <article className="collection-card">
          <span className={`status-pill ${getStatusClassName(point.status)}`}>
            {point.status}
          </span>

          <h2>Informações do local</h2>

          <p>
            <MapPin size={16} /> {point.address} • {point.district}
          </p>

          <p>
            <Clock size={16} /> {point.openingHours}
          </p>

          <p>
            <Recycle size={16} /> Volume estimado registrado:{" "}
            {point.estimatedVolumeKg}kg.
          </p>

          <h2>Resíduos aceitos</h2>

          <p>
            <PackageCheck size={16} />{" "}
            {point.acceptedWasteTypes.join(", ")}.
          </p>


          <div className="hero-actions">
            <Link to="/pontos" className="secondary-button">
              <ArrowLeft size={18} />
              Voltar
            </Link>

            <Link to="/orientacoes-descarte" className="secondary-button">
              Ver orientações
            </Link>

            <Link
              to={`/registrar-descarte?pointId=${point.id}`}
              className="primary-button"
            >
              Registrar descarte
            </Link>
          </div>
        </article>

        <aside className="map-preview">
          <MapPin size={36} />
          <strong>Localização simulada</strong>
          <p>
            Nesta versão inicial, a localização é representada por uma área
            visual simulada. Em uma evolução futura, este espaço pode receber um
            mapa real com Leaflet ou outra biblioteca de mapas.
          </p>
        </aside>
      </div>
    </section>
  );
}
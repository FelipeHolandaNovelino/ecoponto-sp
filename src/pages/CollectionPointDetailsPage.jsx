import {
  ArrowLeft,
  Clock,
  Info,
  MapPin,
  PackageCheck,
  Recycle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

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
        <div className="page-header">
          <span className="eyebrow">Ponto não encontrado</span>
          <h1>Não encontramos esse ponto de coleta.</h1>
          <p>
            O ponto solicitado não existe na base atual do EcoPonto SP. Volte
            para a listagem e escolha outro local.
          </p>

          <Link to="/pontos" className="secondary-button">
            <ArrowLeft size={18} />
            Voltar para pontos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="page-header">
        <span className="eyebrow">Detalhes do ponto</span>
        <h1>{point.name}</h1>
        <p>
          Consulte endereço, horário, status operacional e orientações para
          realizar o descarte corretamente.
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

          <h2>Instruções de descarte</h2>

          <p>
            <Info size={16} /> {point.instructions}
          </p>

          <div className="hero-actions">
            <Link to="/pontos" className="secondary-button">
              <ArrowLeft size={18} />
              Voltar
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
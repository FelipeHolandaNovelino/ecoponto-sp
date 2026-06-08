import { Clock, MapPin, PackageCheck, Recycle } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Define a classe visual do status operacional do ponto.
 *
 * Essa regra fica no card porque é apenas uma decisão de apresentação:
 * cada status recebe uma aparência diferente na interface.
 */
function getStatusClassName(status) {
  const statusClasses = {
    Ativo: "status-active",
    Cheio: "status-warning",
    "Em manutenção": "status-warning",
  };

  return statusClasses[status] || "status-warning";
}

/**
 * Card público de ponto de coleta.
 *
 * Exibe as informações principais usadas na listagem de pontos. As orientações
 * gerais de descarte ficam centralizadas em uma página própria, por isso este
 * card mantém apenas o acesso aos detalhes do ponto.
 */
export function CollectionPointCard({ point }) {
  return (
    <article className="collection-card">
      <div>
        <h2>{point.name}</h2>

        <p>
          <MapPin size={16} /> {point.address} • {point.district}
        </p>
      </div>

      <span className={`status-pill ${getStatusClassName(point.status)}`}>
        {point.status}
      </span>

      <p>
        <Clock size={16} /> {point.openingHours}
      </p>

      <p>
        <PackageCheck size={16} /> Aceita:{" "}
        {point.acceptedWasteTypes.join(", ")}.
      </p>

      <p>
        <Recycle size={16} /> Volume estimado registrado:{" "}
        {point.estimatedVolumeKg}kg.
      </p>

      <div className="hero-actions">
        <Link to={`/pontos/${point.id}`} className="secondary-button">
          Ver detalhes do ponto
        </Link>
      </div>
    </article>
  );
}
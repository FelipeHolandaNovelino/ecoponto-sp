import { Clock, MapPin, PackageCheck, Recycle } from "lucide-react";
import { Link } from "react-router-dom";

function getStatusClassName(status) {
  const statusClasses = {
    Ativo: "status-active",
    Cheio: "status-warning",
    "Em manutenção": "status-warning",
  };

  return statusClasses[status] || "status-warning";
}

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

      <p>{point.instructions}</p>

      <Link to={`/pontos/${point.id}`} className="secondary-button">
        Ver detalhes do ponto
      </Link>
    </article>
  );
}
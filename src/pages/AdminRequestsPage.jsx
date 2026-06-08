import { ArrowLeft, CalendarDays, ClipboardList, PackageCheck } from "lucide-react";
import { Link } from "react-router-dom";

import { getStoredDisposalRequests } from "../features/disposal-requests/utils/disposalRequestsStorage.js";

function formatDate(dateValue) {
  if (!dateValue) {
    return "Data não informada";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(dateValue));
}

function getRequestStatusClassName(status) {
  const statusClasses = {
    Pendente: "status-warning",
    Recebido: "status-active",
    Processado: "status-active",
    Cancelado: "status-warning",
  };

  return statusClasses[status] || "status-warning";
}

export function AdminRequestsPage() {
  const requests = getStoredDisposalRequests();

  return (
    <section className="page-section">
      <div className="page-header">
        <span className="eyebrow">Área administrativa</span>
        <h1>Solicitações de descarte</h1>
        <p>
          Lista de solicitações registradas pelos usuários. Os dados desta etapa
          são carregados do LocalStorage, simulando uma área administrativa
          simples.
        </p>

        <Link to="/admin" className="secondary-button">
          <ArrowLeft size={18} />
          Voltar para dashboard
        </Link>
      </div>

      {requests.length > 0 ? (
        <div className="cards-column">
          {requests.map((request) => (
            <article key={request.id} className="collection-card">
              <span
                className={`status-pill ${getRequestStatusClassName(
                  request.status
                )}`}
              >
                {request.status}
              </span>

              <h2>{request.userName}</h2>

              <p>
                <PackageCheck size={16} />
                {request.quantity}x {request.wasteType}
              </p>

              <p>
                <ClipboardList size={16} />
                {request.collectionPointName}
              </p>

              <p>
                <CalendarDays size={16} />
                Registrado em {formatDate(request.createdAt)}
              </p>

              {request.notes ? <p>{request.notes}</p> : null}
            </article>
          ))}
        </div>
      ) : (
        <article className="collection-card">
          <span className="status-pill status-warning">Sem registros</span>

          <h2>Nenhuma solicitação encontrada</h2>

          <p>
            Para testar este fluxo, vá até um ponto de coleta, clique em
            “Registrar descarte” e envie uma solicitação. Depois volte para esta
            página administrativa.
          </p>

          <Link to="/pontos" className="primary-button">
            Ir para pontos de coleta
          </Link>
        </article>
      )}
    </section>
  );
}
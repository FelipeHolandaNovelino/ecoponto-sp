import {
  ArrowLeft,
  CalendarDays,
  ClipboardList,
  Inbox,
  PackageCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import { EmptyState } from "../components/ui/EmptyState.jsx";
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
  /**
   * A página administrativa lê as solicitações do LocalStorage para simular
   * uma operação interna sem depender de backend nesta etapa do projeto.
   */
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
        <EmptyState
          icon={Inbox}
          eyebrow="Sem solicitações"
          title="Nenhuma solicitação encontrada"
          description="Para testar este fluxo, acesse um ponto de coleta pela área pública, clique em Registrar descarte e envie uma solicitação. Depois volte para esta página administrativa."
          actionLabel="Ir para pontos de coleta"
          actionTo="/pontos"
          secondaryActionLabel="Voltar para dashboard"
          secondaryActionTo="/admin"
        />
      )}
    </section>
  );
}
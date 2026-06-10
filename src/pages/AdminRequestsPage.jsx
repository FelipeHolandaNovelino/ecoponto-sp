import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarClock,
  ClipboardList,
  Mail,
  MapPin,
  PackageCheck,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

import { EmptyState } from "../components/ui/EmptyState.jsx";
import { ToastMessage } from "../components/ui/ToastMessage.jsx";
import {
  disposalRequestStatusOptions,
  getStoredDisposalRequests,
  updateDisposalRequestStatus,
} from "../features/disposal-requests/utils/disposalRequestsStorage.js";

/**
 * Formata datas salvas em ISO para uma leitura mais amigável.
 */
function formatRequestDate(dateValue) {
  if (!dateValue) {
    return "Data não informada";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(dateValue));
}

/**
 * Retorna uma classe visual para cada status da solicitação.
 *
 * As classes reutilizam o padrão de status do projeto quando possível e
 * adicionam classes específicas para estados administrativos.
 */
function getRequestStatusClassName(status) {
  const statusClasses = {
    Pendente: "status-warning",
    Recebido: "request-status-received",
    Processado: "status-active",
    Cancelado: "request-status-canceled",
  };

  return statusClasses[status] || "status-warning";
}

/**
 * Página administrativa de solicitações.
 *
 * Permite visualizar solicitações registradas no fluxo público e alterar o
 * status administrativo de cada uma. A persistência é feita no LocalStorage
 * enquanto o projeto não possui backend.
 */
export function AdminRequestsPage() {
  const [requests, setRequests] = useState(() => getStoredDisposalRequests());
  const [feedback, setFeedback] = useState(null);

  const requestStats = useMemo(() => {
    return disposalRequestStatusOptions.map((status) => {
      const total = requests.filter((request) => request.status === status).length;

      return {
        status,
        total,
      };
    });
  }, [requests]);

  function showFeedback(message) {
    setFeedback({
      message,
      tone: "success",
    });
  }

  function closeFeedback() {
    setFeedback(null);
  }

  /**
   * Atualiza o status da solicitação selecionada.
   *
   * Depois da alteração, a lista local é atualizada com o retorno da função de
   * persistência para garantir que tela e LocalStorage continuem sincronizados.
   */
  function handleStatusChange(requestId, nextStatus) {
    const updatedRequests = updateDisposalRequestStatus(requestId, nextStatus);

    setRequests(updatedRequests);
    showFeedback(`Status atualizado para "${nextStatus}".`);
  }

  return (
    <>
      <ToastMessage
        message={feedback?.message}
        tone={feedback?.tone}
        onClose={closeFeedback}
      />

      <section className="page-section">
        <div className="page-header">
          <span className="eyebrow">Área administrativa</span>
          <h1>Solicitações de descarte</h1>
          <p>
            Acompanhe as intenções de descarte registradas pela área pública e
            atualize o andamento de cada solicitação.
          </p>

          <Link to="/admin" className="secondary-button">
            <ArrowLeft size={18} />
            Voltar para dashboard
          </Link>
        </div>

        <div className="stats-grid">
          {requestStats.map((item) => (
            <article key={item.status} className="stat-card">
              <ClipboardList size={24} />
              <span>{item.status}</span>
              <strong>{item.total}</strong>
            </article>
          ))}
        </div>

        <div className="cards-column">
          {requests.length > 0 ? (
            requests.map((request) => (
              <article key={request.id} className="collection-card">
                <div className="admin-card-header">
                  <div>
                    <h2>{request.wasteType || "Resíduo não informado"}</h2>

                    <p>
                      <CalendarClock size={16} />
                      Registrada em {formatRequestDate(request.createdAt)}
                    </p>
                  </div>

                  <span
                    className={`status-pill ${getRequestStatusClassName(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>
                </div>

                <p>
                  <User size={16} />
                  {request.name || "Nome não informado"}
                </p>

                <p>
                  <Mail size={16} />
                  {request.email || "E-mail não informado"}
                </p>

                <p>
                  <PackageCheck size={16} />
                  Quantidade estimada: {request.quantityKg || 0}kg
                </p>

                <p>
                  <MapPin size={16} />
                  Ponto escolhido:{" "}
                  {request.collectionPointName ||
                    request.selectedCollectionPoint ||
                    request.collectionPoint ||
                    "Não informado"}
                </p>

                {request.notes ? <p>{request.notes}</p> : null}

                <label className="form-field request-status-field">
                  <span>Status da solicitação</span>

                  <select
                    value={request.status}
                    onChange={(event) =>
                      handleStatusChange(request.id, event.target.value)
                    }
                  >
                    {disposalRequestStatusOptions.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </label>
              </article>
            ))
          ) : (
            <EmptyState
              icon={ClipboardList}
              eyebrow="Sem solicitações"
              title="Nenhuma solicitação registrada"
              description="Quando um cidadão registrar uma intenção de descarte pela área pública, ela aparecerá aqui para acompanhamento administrativo."
              actionLabel="Ir para registro"
              actionTo="/registrar-descarte"
              secondaryActionLabel="Ver pontos"
              secondaryActionTo="/pontos"
            />
          )}
        </div>
      </section>
    </>
  );
}
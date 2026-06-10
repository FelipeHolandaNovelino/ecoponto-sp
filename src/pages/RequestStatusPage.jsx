import { useState } from "react";
import {
  ArrowLeft,
  CalendarClock,
  ClipboardList,
  Fingerprint,
  Mail,
  MapPin,
  PackageCheck,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  findDisposalRequestsByIdentifier,
  formatCpf,
  isCpfComplete,
  isValidEmail,
  normalizeEmail,
} from "../features/disposal-requests/utils/disposalRequestsStorage.js";

import "../styles/requestStatus.css";

/**
 * Formata datas ISO para leitura brasileira.
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
 * Retorna a classe visual correspondente ao status da solicitação.
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
 * Página pública de acompanhamento.
 *
 * Permite ao cidadão consultar solicitações registradas anteriormente usando
 * CPF ou e-mail, sem precisar acessar a área administrativa.
 */
export function RequestStatusPage() {
  const [identifier, setIdentifier] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [formError, setFormError] = useState("");

  function handleIdentifierChange(value) {
    const shouldFormatAsCpf = !value.includes("@");

    setIdentifier(shouldFormatAsCpf ? formatCpf(value) : value);
    setFormError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedIdentifier = identifier.trim();
    const isCpfSearch = isCpfComplete(trimmedIdentifier);
    const isEmailSearch = isValidEmail(normalizeEmail(trimmedIdentifier));

    if (!isCpfSearch && !isEmailSearch) {
      setFormError("Informe um CPF completo ou um e-mail válido.");
      setResults([]);
      setHasSearched(false);
      return;
    }

    const foundRequests = findDisposalRequestsByIdentifier(trimmedIdentifier);

    setResults(foundRequests);
    setHasSearched(true);
  }

  return (
    <section className="page-section">
      <div className="page-header">
        <span className="eyebrow">Acompanhamento</span>

        <h1>Acompanhar solicitação</h1>

        <p>
          Consulte o andamento de uma solicitação de descarte usando o CPF ou
          e-mail informado no registro.
        </p>

        <Link to="/registrar-descarte" className="secondary-button">
          <ArrowLeft size={18} />
          Voltar para registro
        </Link>
      </div>

      <div className="request-status-grid">
        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-header">
            <ClipboardList size={28} />

            <div>
              <h2>Consultar status</h2>
              <p>
                Digite exatamente o CPF ou e-mail usado no momento do registro.
              </p>
            </div>
          </div>

          <label className="form-field">
            <span>CPF ou e-mail</span>

            <input
              type="text"
              value={identifier}
              onChange={(event) => handleIdentifierChange(event.target.value)}
              placeholder="000.000.000-00 ou exemplo@email.com"
              autoComplete="off"
            />
          </label>

          {formError ? <p className="form-error">{formError}</p> : null}

          <button type="submit" className="primary-button">
            <ClipboardList size={18} />
            Consultar solicitação
          </button>
        </form>

        <aside className="request-summary">
          <Fingerprint size={28} />

          <h2>Consulta demonstrativa</h2>

          <p>
            Este projeto usa LocalStorage. Em uma versão real, a consulta de
            status deveria usar backend, autenticação, regras de privacidade e
            proteção adequada dos dados pessoais.
          </p>

          <div className="summary-list">
            <p>
              <Fingerprint size={18} />
              CPF precisa ter 11 dígitos.
            </p>

            <p>
              <Mail size={18} />
              E-mail precisa ser o mesmo usado no registro.
            </p>
          </div>
        </aside>
      </div>

      {hasSearched ? (
        <section className="request-status-results">
          <h2>Resultado da consulta</h2>

          {results.length > 0 ? (
            <div className="cards-column">
              {results.map((request) => (
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
                    {request.collectionPointName || "Não informado"}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="request-status-empty">
              <ClipboardList size={34} />
              <h2>Nenhuma solicitação encontrada</h2>
              <p>
                Confira se o CPF ou e-mail foi digitado exatamente como no
                registro da solicitação.
              </p>
            </div>
          )}
        </section>
      ) : null}
    </section>
  );
}
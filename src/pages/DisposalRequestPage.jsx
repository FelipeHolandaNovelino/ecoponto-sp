import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  Info,
  PackageCheck,
  Send,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import { getStoredCollectionPoints } from "../features/collection-points/utils/collectionPointsStorage.js";
import { createDisposalRequest } from "../features/disposal-requests/utils/disposalRequestsStorage.js";
import { wasteTypes } from "../features/waste-types/data/wasteTypes.js";

function getInitialFormData(pointIdFromUrl, points) {
  const pointExists = points.some((point) => point.id === Number(pointIdFromUrl));

  return {
    userName: "",
    wasteType: "Celulares",
    quantity: 1,
    collectionPointId: pointExists ? String(pointIdFromUrl) : "",
    notes: "",
  };
}

function validateForm(formData) {
  const errors = {};

  if (!formData.wasteType) {
    errors.wasteType = "Selecione o tipo de resíduo.";
  }

  if (!formData.collectionPointId) {
    errors.collectionPointId = "Selecione um ponto de coleta.";
  }

  if (!formData.quantity || Number(formData.quantity) < 1) {
    errors.quantity = "Informe uma quantidade válida.";
  }

  return errors;
}

export function DisposalRequestPage() {
  const [searchParams] = useSearchParams();
  const pointIdFromUrl = searchParams.get("pointId");

  /**
   * O formulário usa os pontos persistidos para permitir descarte em pontos
   * criados ou editados pelo administrador.
   */
  const points = useMemo(() => getStoredCollectionPoints(), []);

  const [formData, setFormData] = useState(() =>
    getInitialFormData(pointIdFromUrl, points)
  );
  const [formErrors, setFormErrors] = useState({});
  const [createdRequest, setCreatedRequest] = useState(null);

  const selectedPoint = useMemo(() => {
    return points.find(
      (point) => point.id === Number(formData.collectionPointId)
    );
  }, [points, formData.collectionPointId]);

  function updateField(fieldName, value) {
    setFormData((currentData) => ({
      ...currentData,
      [fieldName]: value,
    }));

    setFormErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: undefined,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const errors = validateForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const request = createDisposalRequest({
      userName: formData.userName.trim() || "Usuário visitante",
      wasteType: formData.wasteType,
      quantity: Number(formData.quantity),
      collectionPointId: Number(formData.collectionPointId),
      collectionPointName: selectedPoint?.name || "Ponto não identificado",
      notes: formData.notes.trim(),
    });

    setCreatedRequest(request);
  }

  return (
    <section className="page-section">
      <div className="page-header">
        <span className="eyebrow">Área pública</span>
        <h1>Registrar descarte</h1>
        <p>
          Informe o tipo de resíduo eletrônico, a quantidade e o ponto de coleta
          desejado. Nesta versão, a solicitação é salva no navegador com
          LocalStorage.
        </p>
      </div>

      <div className="content-grid">
        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-header">
            <ClipboardList size={24} />
            <div>
              <h2>Dados da solicitação</h2>
              <p>Campos simples para simular o fluxo de descarte.</p>
            </div>
          </div>

          <label className="form-field">
            <span>Nome opcional</span>
            <input
              type="text"
              placeholder="Ex: Felipe"
              value={formData.userName}
              onChange={(event) => updateField("userName", event.target.value)}
            />
          </label>

          <label className="form-field">
            <span>Tipo de resíduo</span>
            <select
              value={formData.wasteType}
              onChange={(event) => updateField("wasteType", event.target.value)}
            >
              {wasteTypes.map((wasteType) => (
                <option key={wasteType}>{wasteType}</option>
              ))}
            </select>

            {formErrors.wasteType && (
              <small className="form-error">{formErrors.wasteType}</small>
            )}
          </label>

          <label className="form-field">
            <span>Quantidade</span>
            <input
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(event) => updateField("quantity", event.target.value)}
            />

            {formErrors.quantity && (
              <small className="form-error">{formErrors.quantity}</small>
            )}
          </label>

          <label className="form-field">
            <span>Ponto de coleta</span>
            <select
              value={formData.collectionPointId}
              onChange={(event) =>
                updateField("collectionPointId", event.target.value)
              }
            >
              <option value="">Selecione um ponto</option>

              {points.map((point) => (
                <option key={point.id} value={point.id}>
                  {point.name} — {point.district}
                </option>
              ))}
            </select>

            {formErrors.collectionPointId && (
              <small className="form-error">
                {formErrors.collectionPointId}
              </small>
            )}
          </label>

          <label className="form-field">
            <span>Observação opcional</span>
            <textarea
              rows="4"
              placeholder="Ex: Dois celulares antigos sem carregador."
              value={formData.notes}
              onChange={(event) => updateField("notes", event.target.value)}
            />
          </label>

          <button type="submit" className="primary-button">
            <Send size={18} />
            Enviar solicitação
          </button>
        </form>

        <aside className="request-summary">
          {createdRequest ? (
            <>
              <CheckCircle2 size={38} />
              <span className="eyebrow">Solicitação registrada</span>

              <h2>Descarte salvo com sucesso.</h2>

              <p>
                Sua solicitação foi registrada com status{" "}
                <strong>{createdRequest.status}</strong>.
              </p>

              <div className="summary-list">
                <p>
                  <PackageCheck size={16} />
                  {createdRequest.quantity}x {createdRequest.wasteType}
                </p>

                <p>
                  <ClipboardList size={16} />
                  {createdRequest.collectionPointName}
                </p>
              </div>

              <Link to="/pontos" className="secondary-button">
                <ArrowLeft size={18} />
                Voltar para pontos
              </Link>
            </>
          ) : (
            <>
              <Info size={38} />
              <span className="eyebrow">Resumo</span>

              <h2>Revise antes de enviar.</h2>

              <p>
                Ao enviar, a solicitação será criada com status{" "}
                <strong>Pendente</strong>.
              </p>

              <div className="summary-list">
                <p>
                  <PackageCheck size={16} />
                  {formData.quantity || 0}x {formData.wasteType}
                </p>

                <p>
                  <ClipboardList size={16} />
                  {selectedPoint
                    ? selectedPoint.name
                    : "Nenhum ponto selecionado"}
                </p>
              </div>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
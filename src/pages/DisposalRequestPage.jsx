import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  Fingerprint,
  Leaf,
  Mail,
  MapPin,
  PackageCheck,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

import { getStoredCollectionPoints } from "../features/collection-points/utils/collectionPointsStorage.js";
import {
  createDisposalRequest,
  formatCpf,
  isCpfComplete,
  isValidEmail,
  normalizeCpf,
  normalizeEmail,
} from "../features/disposal-requests/utils/disposalRequestsStorage.js";

const initialFormData = {
  name: "",
  cpf: "",
  email: "",
  wasteType: "",
  quantityKg: "",
  collectionPointId: "",
  notes: "",
};

const wasteTypeOptions = [
  "Celulares e smartphones",
  "Computadores e notebooks",
  "Cabos e carregadores",
  "Pilhas e baterias",
  "Pequenos eletrônicos",
  "Outros resíduos eletrônicos",
];

/**
 * Retorna o nome de um ponto de coleta de forma segura.
 *
 * Alguns registros podem vir de seeds ou do CRUD administrativo. Por isso,
 * mantemos fallback para variações simples de nomenclatura.
 */
function getCollectionPointName(collectionPoint) {
  return (
    collectionPoint?.name ||
    collectionPoint?.title ||
    collectionPoint?.locationName ||
    "Ponto não informado"
  );
}

/**
 * Página pública de registro de descarte.
 *
 * O cidadão informa dados básicos obrigatórios para que depois consiga
 * acompanhar a solicitação pelo CPF ou e-mail.
 */
export function DisposalRequestPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const collectionPoints = useMemo(() => getStoredCollectionPoints(), []);

  function updateFormField(fieldName, value) {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [fieldName]: value,
    }));

    setFormError("");
    setSuccessMessage("");
  }

  function validateForm() {
    if (!formData.name.trim()) {
      return "Informe o nome completo.";
    }

    if (!isCpfComplete(formData.cpf)) {
      return "Informe um CPF com 11 dígitos.";
    }

    if (!isValidEmail(formData.email)) {
      return "Informe um e-mail válido.";
    }

    if (!formData.wasteType) {
      return "Selecione o tipo de resíduo eletrônico.";
    }

    if (!formData.quantityKg || Number(formData.quantityKg) <= 0) {
      return "Informe uma quantidade estimada válida.";
    }

    return "";
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationMessage = validateForm();

    if (validationMessage) {
      setFormError(validationMessage);
      return;
    }

    const selectedCollectionPoint = collectionPoints.find(
      (collectionPoint) =>
        String(collectionPoint.id) === String(formData.collectionPointId)
    );

    createDisposalRequest({
      name: formData.name.trim(),
      cpf: normalizeCpf(formData.cpf),
      email: normalizeEmail(formData.email),
      wasteType: formData.wasteType,
      quantityKg: Number(formData.quantityKg),
      collectionPointId: formData.collectionPointId,
      collectionPointName: selectedCollectionPoint
        ? getCollectionPointName(selectedCollectionPoint)
        : "Não informado",
      notes: formData.notes.trim(),
    });

    setFormData(initialFormData);
    setSuccessMessage(
      "Solicitação registrada com sucesso. Você poderá acompanhar o andamento pelo CPF ou e-mail informado."
    );
  }

  return (
    <section className="page-section">
      <div className="page-header">
        <span className="eyebrow">Registro de descarte</span>

        <h1>Registrar descarte eletrônico</h1>

        <p>
          Informe seus dados e os resíduos que deseja descartar. Depois, você
          poderá consultar o andamento da solicitação pelo CPF ou e-mail.
        </p>

        <Link to="/acompanhar-solicitacao" className="secondary-button">
          <ClipboardList size={18} />
          Acompanhar solicitação
        </Link>
      </div>

      <div className="content-grid">
        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-header">
            <PackageCheck size={28} />

            <div>
              <h2>Dados da solicitação</h2>
              <p>
                Campos com nome, CPF e e-mail são obrigatórios para permitir a
                consulta posterior do status.
              </p>
            </div>
          </div>

          <label className="form-field">
            <span>Nome completo *</span>
            <input
              type="text"
              value={formData.name}
              onChange={(event) => updateFormField("name", event.target.value)}
              placeholder="Ex: Ana Souza"
              autoComplete="name"
            />
          </label>

          <label className="form-field">
            <span>CPF *</span>
            <input
              type="text"
              value={formData.cpf}
              onChange={(event) =>
                updateFormField("cpf", formatCpf(event.target.value))
              }
              placeholder="000.000.000-00"
              inputMode="numeric"
              autoComplete="off"
              maxLength={14}
            />
          </label>

          <label className="form-field">
            <span>E-mail *</span>
            <input
              type="email"
              value={formData.email}
              onChange={(event) => updateFormField("email", event.target.value)}
              placeholder="exemplo@email.com"
              autoComplete="email"
            />
          </label>

          <label className="form-field">
            <span>Tipo de resíduo *</span>
            <select
              value={formData.wasteType}
              onChange={(event) =>
                updateFormField("wasteType", event.target.value)
              }
            >
              <option value="">Selecione uma opção</option>

              {wasteTypeOptions.map((wasteType) => (
                <option key={wasteType} value={wasteType}>
                  {wasteType}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Quantidade estimada em kg *</span>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={formData.quantityKg}
              onChange={(event) =>
                updateFormField("quantityKg", event.target.value)
              }
              placeholder="Ex: 2.5"
            />
          </label>

          <label className="form-field">
            <span>Ponto de coleta preferencial</span>
            <select
              value={formData.collectionPointId}
              onChange={(event) =>
                updateFormField("collectionPointId", event.target.value)
              }
            >
              <option value="">Não selecionar agora</option>

              {collectionPoints.map((collectionPoint) => (
                <option key={collectionPoint.id} value={collectionPoint.id}>
                  {getCollectionPointName(collectionPoint)}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Observações</span>
            <textarea
              rows={4}
              value={formData.notes}
              onChange={(event) => updateFormField("notes", event.target.value)}
              placeholder="Descreva os itens, condição dos aparelhos ou alguma informação importante."
            />
          </label>

          {formError ? <p className="form-error">{formError}</p> : null}

          {successMessage ? (
            <p className="status-pill status-active">{successMessage}</p>
          ) : null}

          <button type="submit" className="primary-button">
            <CheckCircle2 size={18} />
            Registrar solicitação
          </button>
        </form>

        <aside className="request-summary">
          <Leaf size={28} />

          <h2>Por que informar CPF e e-mail?</h2>

          <p>
            Esses dados permitem localizar a solicitação posteriormente, sem
            depender de login. No projeto real, esse fluxo exigiria backend,
            autenticação, criptografia e cuidados de LGPD.
          </p>

          <div className="summary-list">
            <p>
              <User size={18} />
              Nome identifica o solicitante.
            </p>

            <p>
              <Fingerprint size={18} />
              CPF permite consulta individual.
            </p>

            <p>
              <Mail size={18} />
              E-mail permite acompanhar solicitações registradas.
            </p>

            <p>
              <MapPin size={18} />
              O ponto escolhido ajuda a organizar a operação.
            </p>
          </div>

          <Link to="/acompanhar-solicitacao" className="secondary-button">
            <ClipboardList size={18} />
            Consultar status
          </Link>
        </aside>
      </div>
    </section>
  );
}
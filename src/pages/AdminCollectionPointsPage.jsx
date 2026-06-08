import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Edit3,
  MapPin,
  PackageCheck,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import { ConfirmModal } from "../components/ui/ConfirmModal.jsx";
import { EmptyState } from "../components/ui/EmptyState.jsx";
import { ToastMessage } from "../components/ui/ToastMessage.jsx";
import {
  createCollectionPoint,
  deleteCollectionPoint,
  getStoredCollectionPoints,
  updateCollectionPoint,
} from "../features/collection-points/utils/collectionPointsStorage.js";
import { wasteTypes } from "../features/waste-types/data/wasteTypes.js";
import "../styles/adminCollectionPoints.css";

const emptyFormData = {
  name: "",
  address: "",
  district: "",
  status: "Ativo",
  acceptedWasteTypes: [],
  openingHours: "",
  instructions: "",
  estimatedVolumeKg: 0,
};

/**
 * Valida os campos essenciais para criar ou editar um ponto de coleta.
 *
 * A validação fica próxima da página porque ela está diretamente ligada
 * ao formulário administrativo desta tela.
 */
function validateCollectionPointForm(formData) {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Informe o nome do ponto.";
  }

  if (!formData.address.trim()) {
    errors.address = "Informe o endereço.";
  }

  if (!formData.district.trim()) {
    errors.district = "Informe o bairro.";
  }

  if (!formData.openingHours.trim()) {
    errors.openingHours = "Informe o horário de funcionamento.";
  }

  if (!formData.instructions.trim()) {
    errors.instructions = "Informe as instruções de descarte.";
  }

  if (formData.acceptedWasteTypes.length === 0) {
    errors.acceptedWasteTypes = "Selecione pelo menos um tipo de resíduo.";
  }

  if (Number(formData.estimatedVolumeKg) < 0) {
    errors.estimatedVolumeKg = "O volume estimado não pode ser negativo.";
  }

  return errors;
}

/**
 * Define a classe visual usada para exibir o status operacional do ponto.
 *
 * Essa regra é apenas visual, por isso permanece neste arquivo em vez de ir
 * para uma camada de regra de negócio.
 */
function getStatusClassName(status) {
  const statusClasses = {
    Ativo: "status-active",
    Cheio: "status-warning",
    "Em manutenção": "status-warning",
  };

  return statusClasses[status] || "status-warning";
}

export function AdminCollectionPointsPage() {
  const [points, setPoints] = useState(() => getStoredCollectionPoints());
  const [formData, setFormData] = useState(emptyFormData);
  const [formErrors, setFormErrors] = useState({});
  const [editingPointId, setEditingPointId] = useState(null);
  const [pointPendingDeletion, setPointPendingDeletion] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const isEditing = editingPointId !== null;

  const activePointsCount = useMemo(() => {
    return points.filter((point) => point.status === "Ativo").length;
  }, [points]);

  /**
   * Exibe uma mensagem curta de feedback para o usuário.
   *
   * O feedback fica centralizado nesta função para manter o componente
   * preparado para novos tipos de mensagem no futuro.
   */
  function showFeedback(message, tone = "success") {
    setFeedback({
      message,
      tone,
    });
  }

  function closeFeedback() {
    setFeedback(null);
  }

  /**
   * Atualiza um campo do formulário e limpa o erro daquele campo.
   *
   * Isso melhora a experiência do usuário, porque a mensagem de erro some
   * assim que ele começa a corrigir o valor.
   */
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

  /**
   * Alterna a seleção dos resíduos aceitos pelo ponto.
   *
   * O formulário guarda os resíduos como array para facilitar filtros,
   * exibição nos cards e persistência no LocalStorage.
   */
  function toggleWasteType(wasteType) {
    setFormData((currentData) => {
      const alreadySelected = currentData.acceptedWasteTypes.includes(wasteType);

      const acceptedWasteTypes = alreadySelected
        ? currentData.acceptedWasteTypes.filter((type) => type !== wasteType)
        : [...currentData.acceptedWasteTypes, wasteType];

      return {
        ...currentData,
        acceptedWasteTypes,
      };
    });

    setFormErrors((currentErrors) => ({
      ...currentErrors,
      acceptedWasteTypes: undefined,
    }));
  }

  /**
   * Restaura o formulário para o modo de criação.
   */
  function resetForm() {
    setFormData(emptyFormData);
    setFormErrors({});
    setEditingPointId(null);
  }

  /**
   * Salva o ponto.
   *
   * A mesma função atende criação e edição. A diferença é definida pelo estado
   * editingPointId: quando existe ID, editamos; quando não existe, criamos.
   */
  function handleSubmit(event) {
    event.preventDefault();

    const errors = validateCollectionPointForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      showFeedback("Revise os campos obrigatórios antes de salvar.", "info");
      return;
    }

    const updatedPoints = isEditing
      ? updateCollectionPoint(editingPointId, formData)
      : createCollectionPoint(formData);

    setPoints(updatedPoints);

    showFeedback(
      isEditing
        ? "Alterações salvas com sucesso."
        : "Ponto cadastrado com sucesso."
    );

    resetForm();
  }

  /**
   * Preenche o formulário com os dados do ponto escolhido.
   *
   * Isso transforma o formulário de criação em formulário de edição sem
   * precisar criar uma segunda tela.
   */
  function handleEdit(point) {
    setEditingPointId(point.id);

    setFormData({
      name: point.name,
      address: point.address,
      district: point.district,
      status: point.status,
      acceptedWasteTypes: point.acceptedWasteTypes,
      openingHours: point.openingHours,
      instructions: point.instructions,
      estimatedVolumeKg: point.estimatedVolumeKg,
    });

    setFormErrors({});
    showFeedback(`Editando "${point.name}".`, "info");
  }

  /**
   * Abre o modal de confirmação antes da exclusão.
   *
   * Guardamos o ponto inteiro para exibir o nome dele no modal, deixando a ação
   * mais clara para quem está administrando o sistema.
   */
  function requestPointDeletion(point) {
    setPointPendingDeletion(point);
  }

  function cancelPointDeletion() {
    setPointPendingDeletion(null);
  }

  /**
   * Remove o ponto após a confirmação do usuário.
   *
   * Se o ponto removido estava em edição, limpamos o formulário para evitar que
   * o usuário continue editando um registro que não existe mais.
   */
  function confirmPointDeletion() {
    if (!pointPendingDeletion) {
      return;
    }

    const deletedPointName = pointPendingDeletion.name;
    const updatedPoints = deleteCollectionPoint(pointPendingDeletion.id);

    setPoints(updatedPoints);

    if (editingPointId === pointPendingDeletion.id) {
      resetForm();
    }

    setPointPendingDeletion(null);
    showFeedback(`"${deletedPointName}" foi removido com sucesso.`);
  }

  const deletionDescription = pointPendingDeletion
    ? `Essa ação removerá "${pointPendingDeletion.name}" da área pública e do dashboard. Solicitações antigas continuarão salvas como histórico do navegador.`
    : "";

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
          <h1>Gerenciar pontos de coleta</h1>
          <p>
            Cadastre, edite e remova pontos de coleta. Os dados são persistidos
            no LocalStorage para simular uma gestão administrativa sem backend.
          </p>

          <Link to="/admin" className="secondary-button">
            <ArrowLeft size={18} />
            Voltar para dashboard
          </Link>
        </div>

        <div className="stats-grid">
          <article className="stat-card">
            <MapPin size={24} />
            <span>Total de pontos</span>
            <strong>{points.length}</strong>
          </article>

          <article className="stat-card">
            <PackageCheck size={24} />
            <span>Pontos ativos</span>
            <strong>{activePointsCount}</strong>
          </article>
        </div>

        <div className="content-grid">
          <form className="form-card" onSubmit={handleSubmit}>
            <div className="form-header">
              {isEditing ? <Edit3 size={24} /> : <Plus size={24} />}

              <div>
                <h2>{isEditing ? "Editar ponto" : "Novo ponto de coleta"}</h2>
                <p>
                  Preencha as informações principais usadas na área pública do
                  sistema.
                </p>
              </div>
            </div>

            <label className="form-field">
              <span>Nome do ponto</span>
              <input
                type="text"
                placeholder="Ex: EcoPonto Moema"
                value={formData.name}
                onChange={(event) => updateField("name", event.target.value)}
              />

              {formErrors.name ? (
                <small className="form-error">{formErrors.name}</small>
              ) : null}
            </label>

            <label className="form-field">
              <span>Endereço</span>
              <input
                type="text"
                placeholder="Ex: Av. Ibirapuera, 1500"
                value={formData.address}
                onChange={(event) => updateField("address", event.target.value)}
              />

              {formErrors.address ? (
                <small className="form-error">{formErrors.address}</small>
              ) : null}
            </label>

            <label className="form-field">
              <span>Bairro</span>
              <input
                type="text"
                placeholder="Ex: Moema"
                value={formData.district}
                onChange={(event) =>
                  updateField("district", event.target.value)
                }
              />

              {formErrors.district ? (
                <small className="form-error">{formErrors.district}</small>
              ) : null}
            </label>

            <label className="form-field">
              <span>Status operacional</span>
              <select
                value={formData.status}
                onChange={(event) => updateField("status", event.target.value)}
              >
                <option>Ativo</option>
                <option>Cheio</option>
                <option>Em manutenção</option>
              </select>
            </label>

            <label className="form-field">
              <span>Horário de funcionamento</span>
              <input
                type="text"
                placeholder="Ex: Segunda a sexta, das 8h às 17h"
                value={formData.openingHours}
                onChange={(event) =>
                  updateField("openingHours", event.target.value)
                }
              />

              {formErrors.openingHours ? (
                <small className="form-error">{formErrors.openingHours}</small>
              ) : null}
            </label>

            <label className="form-field">
              <span>Volume estimado em kg</span>
              <input
                type="number"
                min="0"
                value={formData.estimatedVolumeKg}
                onChange={(event) =>
                  updateField("estimatedVolumeKg", event.target.value)
                }
              />

              {formErrors.estimatedVolumeKg ? (
                <small className="form-error">
                  {formErrors.estimatedVolumeKg}
                </small>
              ) : null}
            </label>

            <div className="form-field">
              <span>Resíduos aceitos</span>

              <div className="admin-checkbox-grid">
                {wasteTypes.map((wasteType) => (
                  <label key={wasteType} className="admin-checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.acceptedWasteTypes.includes(wasteType)}
                      onChange={() => toggleWasteType(wasteType)}
                    />
                    {wasteType}
                  </label>
                ))}
              </div>

              {formErrors.acceptedWasteTypes ? (
                <small className="form-error">
                  {formErrors.acceptedWasteTypes}
                </small>
              ) : null}
            </div>

            <label className="form-field">
              <span>Instruções de descarte</span>
              <textarea
                rows="4"
                placeholder="Ex: Separe os resíduos por tipo e entregue no balcão identificado."
                value={formData.instructions}
                onChange={(event) =>
                  updateField("instructions", event.target.value)
                }
              />

              {formErrors.instructions ? (
                <small className="form-error">{formErrors.instructions}</small>
              ) : null}
            </label>

            <div className="admin-card-actions">
              <button type="submit" className="primary-button">
                <Save size={18} />
                {isEditing ? "Salvar alterações" : "Cadastrar ponto"}
              </button>

              {isEditing ? (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={resetForm}
                >
                  <X size={18} />
                  Cancelar edição
                </button>
              ) : null}
            </div>
          </form>

          <div className="cards-column">
            {points.length > 0 ? (
              points.map((point) => (
                <article key={point.id} className="collection-card">
                  <div className="admin-card-header">
                    <div>
                      <h2>{point.name}</h2>
                      <p>
                        <MapPin size={16} />
                        {point.address} • {point.district}
                      </p>
                    </div>

                    <span
                      className={`status-pill ${getStatusClassName(
                        point.status
                      )}`}
                    >
                      {point.status}
                    </span>
                  </div>

                  <p>
                    <PackageCheck size={16} />
                    Aceita: {point.acceptedWasteTypes.join(", ")}.
                  </p>

                  <p>{point.openingHours}</p>

                  <div className="admin-card-actions">
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => handleEdit(point)}
                    >
                      <Edit3 size={18} />
                      Editar
                    </button>

                    <button
                      type="button"
                      className="danger-button"
                      onClick={() => requestPointDeletion(point)}
                    >
                      <Trash2 size={18} />
                      Remover
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <EmptyState
                icon={MapPin}
                eyebrow="Sem pontos"
                title="Nenhum ponto cadastrado"
                description="Cadastre um novo ponto usando o formulário. Depois ele também aparecerá na área pública de pontos de coleta e poderá receber solicitações de descarte."
              />
            )}
          </div>
        </div>
      </section>

      <ConfirmModal
        isOpen={Boolean(pointPendingDeletion)}
        title="Remover ponto de coleta?"
        description={deletionDescription}
        confirmLabel="Remover ponto"
        cancelLabel="Cancelar"
        onConfirm={confirmPointDeletion}
        onCancel={cancelPointDeletion}
      />
    </>
  );
}
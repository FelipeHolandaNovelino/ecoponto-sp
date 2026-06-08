import { AlertTriangle, X } from "lucide-react";

import "../../styles/confirmModal.css";

/**
 * Modal reutilizável de confirmação.
 *
 * Ele substitui confirmações nativas do navegador, como window.confirm,
 * oferecendo uma experiência visual mais consistente com o restante da aplicação.
 */
export function ConfirmModal({
  isOpen,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="confirm-modal-backdrop" role="presentation">
      <section
        className="confirm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        <button
          type="button"
          className="confirm-modal-close"
          aria-label="Fechar modal"
          onClick={onCancel}
        >
          <X size={18} />
        </button>

        <div className="confirm-modal-icon">
          <AlertTriangle size={28} />
        </div>

        <div>
          <h2 id="confirm-modal-title">{title}</h2>
          <p>{description}</p>
        </div>

        <div className="confirm-modal-actions">
          <button type="button" className="secondary-button" onClick={onCancel}>
            {cancelLabel}
          </button>

          <button type="button" className="danger-button" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}
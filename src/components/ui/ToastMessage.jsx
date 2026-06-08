import { CheckCircle2, Info, X } from "lucide-react";

import "../../styles/toastMessage.css";

/**
 * Mensagem flutuante reutilizável.
 *
 * Este componente exibe feedbacks curtos após ações importantes do usuário,
 * como criar, editar ou remover registros. Ele evita que a interface pareça
 * "silenciosa" depois de uma operação bem-sucedida.
 */
export function ToastMessage({
  message,
  tone = "success",
  onClose,
}) {
  if (!message) {
    return null;
  }

  const Icon = tone === "success" ? CheckCircle2 : Info;

  return (
    <aside className={`toast-message toast-message-${tone}`} role="status">
      <div className="toast-message-icon">
        <Icon size={22} />
      </div>

      <p>{message}</p>

      <button
        type="button"
        className="toast-message-close"
        aria-label="Fechar mensagem"
        onClick={onClose}
      >
        <X size={16} />
      </button>
    </aside>
  );
}
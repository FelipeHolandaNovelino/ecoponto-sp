import { Link } from "react-router-dom";

import "../../styles/emptyState.css";

/**
 * Estado vazio reutilizável da aplicação.
 *
 * Este componente centraliza mensagens de ausência de dados, erros de busca,
 * rotas inexistentes e fluxos ainda não preenchidos. Assim evitamos repetir
 * estruturas parecidas em várias páginas e mantemos a experiência visual mais
 * consistente.
 */
export function EmptyState({
  icon: Icon,
  eyebrow = "Sem resultados",
  title,
  description,
  actionLabel,
  actionTo,
  secondaryActionLabel,
  secondaryActionTo,
}) {
  return (
    <article className="empty-state-card">
      {Icon ? (
        <div className="empty-state-icon">
          <Icon size={30} />
        </div>
      ) : null}

      <span className="empty-state-eyebrow">{eyebrow}</span>

      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="empty-state-actions">
        {actionLabel && actionTo ? (
          <Link to={actionTo} className="primary-button">
            {actionLabel}
          </Link>
        ) : null}

        {secondaryActionLabel && secondaryActionTo ? (
          <Link to={secondaryActionTo} className="secondary-button">
            {secondaryActionLabel}
          </Link>
        ) : null}
      </div>
    </article>
  );
}
import { Navigate, useLocation } from "react-router-dom";

import { isAdminAuthenticated } from "../../features/auth/utils/authStorage.js";

/**
 * Protege as rotas administrativas.
 *
 * Quando o usuário não está autenticado, redirecionamos para a página de login
 * e preservamos a rota original no state. Isso facilita evoluir o fluxo depois,
 * caso seja necessário voltar para a página solicitada após autenticar.
 */
export function ProtectedAdminRoute({ children }) {
  const location = useLocation();

  if (!isAdminAuthenticated()) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return children;
}
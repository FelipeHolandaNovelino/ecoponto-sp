import { Navigate, Outlet, useLocation } from "react-router-dom";

import { isAdminAuthenticated } from "../../features/auth/utils/authStorage.js";

/**
 * Protege as rotas administrativas.
 *
 * Quando o usuário ainda não está autenticado, ele é redirecionado para o login.
 * Quando está autenticado, o Outlet renderiza a rota filha solicitada:
 * /admin, /admin/pontos ou /admin/solicitacoes.
 */
export function ProtectedAdminRoute() {
  const location = useLocation();

  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
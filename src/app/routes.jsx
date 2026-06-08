import { AdminCollectionPointsPage } from "../pages/AdminCollectionPointsPage.jsx";
import { AdminDashboardPage } from "../pages/AdminDashboardPage.jsx";
import { AdminLoginPage } from "../pages/AdminLoginPage.jsx";
import { AdminRequestsPage } from "../pages/AdminRequestsPage.jsx";
import { CollectionPointDetailsPage } from "../pages/CollectionPointDetailsPage.jsx";
import { CollectionPointsPage } from "../pages/CollectionPointsPage.jsx";
import { DisposalGuidelinesPage } from "../pages/DisposalGuidelinesPage.jsx";
import { DisposalRequestPage } from "../pages/DisposalRequestPage.jsx";
import { HomePage } from "../pages/HomePage.jsx";
import { NotFoundPage } from "../pages/NotFoundPage.jsx";

/**
 * Rotas públicas da aplicação.
 *
 * Essas páginas representam a experiência do cidadão que procura pontos,
 * aprende a preparar resíduos e registra uma intenção de descarte.
 */
export const publicRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/pontos",
    element: <CollectionPointsPage />,
  },
  {
    path: "/pontos/:id",
    element: <CollectionPointDetailsPage />,
  },
  {
    path: "/orientacoes-descarte",
    element: <DisposalGuidelinesPage />,
  },
  {
    path: "/registrar-descarte",
    element: <DisposalRequestPage />,
  },
];

/**
 * Rotas de autenticação administrativa.
 *
 * O login fica fora das rotas protegidas para que o usuário consiga acessar
 * a página de entrada antes de ter uma sessão administrativa.
 */
export const adminAuthRoutes = [
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
];

/**
 * Rotas administrativas protegidas.
 *
 * Elas simulam a operação interna da plataforma, separando dashboard,
 * solicitações e gerenciamento dos pontos de coleta.
 */
export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminDashboardPage />,
  },
  {
    path: "/admin/pontos",
    element: <AdminCollectionPointsPage />,
  },
  {
    path: "/admin/solicitacoes",
    element: <AdminRequestsPage />,
  },
];

/**
 * Rota de fallback.
 *
 * O React Router usa "*" para capturar qualquer caminho que não corresponda
 * às rotas públicas, de autenticação ou administrativas registradas acima.
 */
export const fallbackRoutes = [
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
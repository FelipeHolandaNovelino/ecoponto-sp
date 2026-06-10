import { createBrowserRouter } from "react-router-dom";

import { ProtectedAdminRoute } from "../components/auth/ProtectedAdminRoute.jsx";
import { AppLayout } from "../components/layout/AppLayout.jsx";
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
import { RequestStatusPage } from "../pages/RequestStatusPage.jsx";

/**
 * Rotas principais do EcoPonto SP.
 *
 * A aplicação separa rotas públicas, rota de login administrativo e rotas
 * administrativas protegidas. A rota /admin usa index route para carregar o
 * dashboard quando o usuário autenticado acessa diretamente /admin.
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "pontos",
        element: <CollectionPointsPage />,
      },
      {
        path: "pontos/:id",
        element: <CollectionPointDetailsPage />,
      },
      {
        path: "orientacoes-descarte",
        element: <DisposalGuidelinesPage />,
      },
      {
        path: "registrar-descarte",
        element: <DisposalRequestPage />,
      },
      {
        path: "acompanhar-solicitacao",
        element: <RequestStatusPage />,
      },
      {
        path: "admin/login",
        element: <AdminLoginPage />,
      },
      {
        path: "admin",
        element: <ProtectedAdminRoute />,
        children: [
          {
            index: true,
            element: <AdminDashboardPage />,
          },
          {
            path: "pontos",
            element: <AdminCollectionPointsPage />,
          },
          {
            path: "solicitacoes",
            element: <AdminRequestsPage />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
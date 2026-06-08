import { AdminDashboardPage } from "../pages/AdminDashboardPage.jsx";
import { CollectionPointDetailsPage } from "../pages/CollectionPointDetailsPage.jsx";
import { CollectionPointsPage } from "../pages/CollectionPointsPage.jsx";
import { DisposalRequestPage } from "../pages/DisposalRequestPage.jsx";
import { HomePage } from "../pages/HomePage.jsx";

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
    path: "/registrar-descarte",
    element: <DisposalRequestPage />,
  },
];

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminDashboardPage />,
  },
];
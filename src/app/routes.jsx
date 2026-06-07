import { AdminDashboardPage } from "../pages/AdminDashboardPage.jsx";
import { CollectionPointDetailsPage } from "../pages/CollectionPointDetailsPage.jsx";
import { CollectionPointsPage } from "../pages/CollectionPointsPage.jsx";
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
];

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminDashboardPage />,
  },
];
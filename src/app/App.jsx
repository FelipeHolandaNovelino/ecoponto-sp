import { RouterProvider } from "react-router-dom";

import { router } from "./routes.jsx";

/**
 * Componente raiz da aplicação.
 *
 * Mantém o App simples e delega toda a árvore de rotas para routes.jsx.
 * As rotas públicas, administrativas e protegidas ficam centralizadas no
 * roteador principal da aplicação.
 */
export default function App() {
  return <RouterProvider router={router} />;
}
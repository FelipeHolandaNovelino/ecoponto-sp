import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppLayout } from "../components/layout/AppLayout.jsx";
import { adminRoutes, publicRoutes } from "./routes.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          {adminRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
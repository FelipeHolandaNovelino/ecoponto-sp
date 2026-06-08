import {
  Home,
  LayoutDashboard,
  LogOut,
  MapPin,
  Recycle,
  ShieldCheck,
} from "lucide-react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  clearAdminSession,
  isAdminAuthenticated,
} from "../../features/auth/utils/authStorage.js";

/**
 * Layout principal da aplicação.
 *
 * Centraliza cabeçalho, navegação e área de conteúdo. O botão de sair aparece
 * apenas em rotas administrativas quando existe uma sessão simulada ativa.
 */
export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminArea = location.pathname.startsWith("/admin");
  const isAuthenticated = isAdminAuthenticated();

  function handleLogout() {
    clearAdminSession();
    navigate("/admin/login", {
      replace: true,
    });
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink to="/" className="brand">
          <span className="brand-icon">
            <Recycle size={24} />
          </span>

          <span>
            <strong>EcoPonto SP</strong>
            <small>Descarte eletrônico consciente</small>
          </span>
        </NavLink>

        <nav className="main-nav" aria-label="Navegação principal">
          <NavLink to="/" end className="nav-link">
            <Home size={18} />
            Home
          </NavLink>

          <NavLink to="/pontos" className="nav-link">
            <MapPin size={18} />
            Pontos
          </NavLink>

          <NavLink to="/orientacoes-descarte" className="nav-link">
            <ShieldCheck size={18} />
            Orientações
          </NavLink>

          <NavLink to="/admin" className="nav-link">
            <LayoutDashboard size={18} />
            Admin
          </NavLink>

          {isAdminArea && isAuthenticated ? (
            <button type="button" className="nav-link" onClick={handleLogout}>
              <LogOut size={18} />
              Sair
            </button>
          ) : null}
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
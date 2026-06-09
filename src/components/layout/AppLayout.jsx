import {
  Home,
  LayoutDashboard,
  LogOut,
  MapPin,
  User,
} from "lucide-react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  clearAdminSession,
  isAdminAuthenticated,
} from "../../features/auth/utils/authStorage.js";

/**
 * Layout principal da aplicação.
 *
 * Centraliza cabeçalho, navegação e área de conteúdo. A identidade visual usa
 * a marca do EcoPonto SP com ícone próprio e navegação principal consistente
 * entre área pública e administrativa.
 */
export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminArea = location.pathname.startsWith("/admin");
  const isAuthenticated = isAdminAuthenticated();

  /**
   * Encerra a sessão administrativa simulada.
   *
   * Como a autenticação atual usa LocalStorage, basta limpar a sessão local e
   * redirecionar o usuário para a tela de login.
   */
  function handleLogout() {
    clearAdminSession();

    navigate("/admin/login", {
      replace: true,
    });
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink to="/" className="brand" aria-label="Ir para a Home">
          <span className="brand-logo">
            <img
              src="/images/ecoponto-logo-icon.png"
              alt=""
              aria-hidden="true"
            />
          </span>

          <span className="brand-copy">
            <strong className="brand-title">EcoPonto SP</strong>
            <small className="brand-subtitle">
              Descarte eletrônico consciente
            </small>
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

          <NavLink to="/admin" className="nav-link">
            <LayoutDashboard size={18} />
            Admin
          </NavLink>
        </nav>

        <div className="header-actions">


          {isAdminArea && isAuthenticated ? (
            <button type="button" className="login-button" onClick={handleLogout}>
              <LogOut size={18} />
              Sair
            </button>
          ) : (
            <NavLink to="/admin/login" className="login-button">
              <User size={18} />
              Entrar
            </NavLink>
          )}
        </div>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
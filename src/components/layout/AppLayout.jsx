import { Home, LayoutDashboard, MapPin, Recycle } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink to="/" className="brand">
          <span className="brand-icon">
            <Recycle size={22} />
          </span>

          <div>
            <strong>EcoPonto SP</strong>
            <small>Descarte eletrônico consciente</small>
          </div>
        </NavLink>

        <nav className="main-nav" aria-label="Navegação principal">
          <NavLink to="/" className="nav-link">
            <Home size={18} />
            <span>Home</span>
          </NavLink>

          <NavLink to="/pontos" className="nav-link">
            <MapPin size={18} />
            <span>Pontos</span>
          </NavLink>

          <NavLink to="/admin" className="nav-link">
            <LayoutDashboard size={18} />
            <span>Admin</span>
          </NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
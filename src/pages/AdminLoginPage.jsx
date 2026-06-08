import { useState } from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import {
  authenticateAdmin,
  getDemoAdminPassword,
  isAdminAuthenticated,
} from "../features/auth/utils/authStorage.js";
import "../styles/adminLogin.css";

/**
 * Página de login administrativo.
 *
 * Esta tela simula uma camada de autenticação para proteger o dashboard e as
 * rotas administrativas. A validação é local porque o projeto ainda não possui
 * backend, mas a estrutura já prepara o fluxo para uma autenticação real futura.
 */
export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const redirectPath = location.state?.from || "/admin";

  if (isAdminAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const wasAuthenticated = authenticateAdmin(password);

    if (!wasAuthenticated) {
      setErrorMessage("Senha incorreta. Confira a senha de demonstração.");
      return;
    }

    navigate(redirectPath, {
      replace: true,
    });
  }

  function updatePassword(value) {
    setPassword(value);
    setErrorMessage("");
  }

  return (
    <section className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-icon">
          <ShieldCheck size={34} />
        </div>

        <div>
          <span className="eyebrow">Área administrativa</span>
          <h1>Acesse o painel operacional</h1>
          <p>
            Esta área é protegida por uma autenticação simulada. Em uma versão
            com backend, esse fluxo pode ser substituído por login real com API.
          </p>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Senha administrativa</span>

            <div className="admin-login-password-field">
              <LockKeyhole size={18} />
              <input
                type="password"
                placeholder="Digite a senha de acesso"
                value={password}
                onChange={(event) => updatePassword(event.target.value)}
              />
            </div>

            {errorMessage ? (
              <small className="form-error">{errorMessage}</small>
            ) : null}
          </label>

          <button type="submit" className="primary-button">
            Entrar no dashboard
          </button>
        </form>

        <div className="admin-login-demo-box">
          <strong>Senha de demonstração</strong>
          <code>{getDemoAdminPassword()}</code>
          <p>
            Essa senha fica visível apenas porque o projeto ainda é um protótipo
            de portfólio sem backend.
          </p>
        </div>
      </div>
    </section>
  );
}
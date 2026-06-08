const ADMIN_AUTH_STORAGE_KEY = "ecoponto-sp:admin-auth";
const DEMO_ADMIN_PASSWORD = "ecoponto123";

/**
 * Valida a senha administrativa de demonstração.
 *
 * Esta autenticação é apenas uma simulação front-end para fins de portfólio.
 * Em uma versão com backend, esta função deve ser substituída por uma chamada
 * para API, com sessão segura, token e validação no servidor.
 */
export function authenticateAdmin(password) {
  const isValidPassword = password === DEMO_ADMIN_PASSWORD;

  if (!isValidPassword) {
    return false;
  }

  const session = {
    isAuthenticated: true,
    authenticatedAt: new Date().toISOString(),
  };

  localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, JSON.stringify(session));

  return true;
}

/**
 * Verifica se existe uma sessão administrativa local.
 *
 * Como o projeto ainda não possui backend, usamos LocalStorage apenas para
 * manter a experiência de navegação entre rotas protegidas.
 */
export function isAdminAuthenticated() {
  const storedSession = localStorage.getItem(ADMIN_AUTH_STORAGE_KEY);

  if (!storedSession) {
    return false;
  }

  try {
    const parsedSession = JSON.parse(storedSession);

    return Boolean(parsedSession?.isAuthenticated);
  } catch {
    return false;
  }
}

/**
 * Encerra a sessão administrativa simulada.
 */
export function clearAdminSession() {
  localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
}

/**
 * Expõe a senha de demonstração para a tela de login.
 *
 * Em um produto real, uma senha nunca deve ficar disponível no front-end.
 * Aqui ela aparece apenas porque o objetivo é demonstrar o fluxo de login.
 */
export function getDemoAdminPassword() {
  return DEMO_ADMIN_PASSWORD;
}
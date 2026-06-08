import {
  BarChart3,
  ClipboardList,
  MapPin,
  Recycle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export function AdminDashboardPage() {
  return (
    <section className="page-section">
      <div className="page-header">
        <span className="eyebrow">Área administrativa</span>
        <h1>Dashboard operacional</h1>
        <p>
          Visão inicial dos pontos de coleta, solicitações e indicadores de
          impacto ambiental da plataforma.
        </p>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <MapPin size={24} />
          <span>Pontos ativos</span>
          <strong>18</strong>
        </article>

        <article className="stat-card">
          <ClipboardList size={24} />
          <span>Solicitações pendentes</span>
          <strong>12</strong>
        </article>

        <article className="stat-card">
          <Recycle size={24} />
          <span>Volume estimado</span>
          <strong>186kg</strong>
        </article>

        <article className="stat-card">
          <BarChart3 size={24} />
          <span>Bairros atendidos</span>
          <strong>9</strong>
        </article>
      </div>

      <div className="content-grid">
        <article className="collection-card">
          <h2>Solicitações de descarte</h2>
          <p>
            Visualize os registros criados pelos usuários na área pública. Nesta
            versão, os dados são lidos do LocalStorage do navegador.
          </p>

          <Link to="/admin/solicitacoes" className="primary-button">
            Ver solicitações
            <ArrowRight size={18} />
          </Link>
        </article>

        <article className="collection-card">
          <h2>Gerenciamento de pontos</h2>
          <p>
            Em uma próxima etapa, vamos criar o CRUD administrativo para
            cadastrar, editar e remover pontos de coleta.
          </p>

          <span className="status-pill status-warning">Em breve</span>
        </article>
      </div>
    </section>
  );
}
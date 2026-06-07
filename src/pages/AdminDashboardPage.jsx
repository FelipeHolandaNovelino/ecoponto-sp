import { BarChart3, ClipboardList, MapPin, Recycle } from "lucide-react";

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

      <div className="admin-panel-placeholder">
        <h2>Próximos módulos administrativos</h2>
        <p>
          Nas próximas etapas, vamos criar o gerenciamento de pontos de coleta,
          solicitações de descarte e gráficos com dados simulados.
        </p>
      </div>
    </section>
  );
}
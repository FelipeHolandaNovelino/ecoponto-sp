import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  MapPin,
  Recycle,
} from "lucide-react";
import { Link } from "react-router-dom";

import { getStoredCollectionPoints } from "../features/collection-points/utils/collectionPointsStorage.js";
import { DashboardBarChart } from "../features/dashboard/components/DashboardBarChart.jsx";
import {
  buildDistrictPointData,
  buildPointStatusData,
  buildRequestWasteTypeData,
  getDashboardSummary,
} from "../features/dashboard/utils/dashboardMetrics.js";
import { getStoredDisposalRequests } from "../features/disposal-requests/utils/disposalRequestsStorage.js";
import "../styles/dashboard.css";

export function AdminDashboardPage() {
  /**
   * O dashboard lê diretamente os dados persistidos no LocalStorage.
   *
   * Isso mantém os indicadores sincronizados com o CRUD de pontos e com os
   * registros de descarte feitos pela área pública.
   */
  const points = getStoredCollectionPoints();
  const requests = getStoredDisposalRequests();

  const summary = getDashboardSummary(points, requests);
  const pointStatusData = buildPointStatusData(points);
  const requestWasteTypeData = buildRequestWasteTypeData(requests);
  const districtPointData = buildDistrictPointData(points);

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
          <strong>{summary.activePointsCount}</strong>
        </article>

        <article className="stat-card">
          <ClipboardList size={24} />
          <span>Solicitações pendentes</span>
          <strong>{summary.pendingRequestsCount}</strong>
        </article>

        <article className="stat-card">
          <Recycle size={24} />
          <span>Volume estimado</span>
          <strong>{summary.estimatedVolumeKg}kg</strong>
        </article>

        <article className="stat-card">
          <BarChart3 size={24} />
          <span>Bairros atendidos</span>
          <strong>{summary.servedDistrictsCount}</strong>
        </article>
      </div>

      <div className="content-grid">
        <article className="collection-card">
          <h2>Gerenciar pontos de coleta</h2>
          <p>
            Cadastre, edite e remova pontos usados na área pública do sistema.
            As alterações são salvas no LocalStorage.
          </p>

          <Link to="/admin/pontos" className="primary-button">
            Gerenciar pontos
            <ArrowRight size={18} />
          </Link>
        </article>

        <article className="collection-card">
          <h2>Solicitações de descarte</h2>
          <p>
            Visualize os registros criados pelos usuários na área pública. Nesta
            versão, os dados são lidos do LocalStorage do navegador.
          </p>

          <Link to="/admin/solicitacoes" className="secondary-button">
            Ver solicitações
            <ArrowRight size={18} />
          </Link>
        </article>
      </div>

      <div className="dashboard-chart-grid">
        <DashboardBarChart
          title="Pontos por status"
          description="Distribuição operacional dos pontos cadastrados."
          data={pointStatusData}
          labelKey="label"
          dataKey="total"
          valueLabel="Pontos"
          emptyMessage="Cadastre pontos de coleta para visualizar a distribuição por status."
        />

        <DashboardBarChart
          title="Resíduos registrados"
          description="Quantidade de itens registrados nas solicitações de descarte."
          data={requestWasteTypeData}
          labelKey="label"
          dataKey="total"
          valueLabel="Itens"
          layout="vertical"
          emptyMessage="Registre descartes pela área pública para visualizar os resíduos mais recorrentes."
        />

        <DashboardBarChart
          title="Pontos por bairro"
          description="Cobertura territorial simulada da rede de coleta."
          data={districtPointData}
          labelKey="label"
          dataKey="total"
          valueLabel="Pontos"
          layout="vertical"
          emptyMessage="Cadastre pontos com bairros informados para visualizar a cobertura territorial."
        />
      </div>
    </section>
  );
}
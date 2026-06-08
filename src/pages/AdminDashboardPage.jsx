import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  MapPin,
  Recycle,
} from "lucide-react";
import { Link } from "react-router-dom";

import { getStoredCollectionPoints } from "../features/collection-points/utils/collectionPointsStorage.js";
import { getStoredDisposalRequests } from "../features/disposal-requests/utils/disposalRequestsStorage.js";

export function AdminDashboardPage() {
  /**
   * O dashboard lê dados persistidos localmente para refletir o estado real
   * do MVP, em vez de exibir apenas números fixos.
   */
  const points = getStoredCollectionPoints();
  const requests = getStoredDisposalRequests();

  const activePoints = points.filter((point) => point.status === "Ativo");
  const pendingRequests = requests.filter(
    (request) => request.status === "Pendente"
  );

  const estimatedVolumeKg = points.reduce((total, point) => {
    return total + Number(point.estimatedVolumeKg || 0);
  }, 0);

  const servedDistricts = new Set(points.map((point) => point.district));

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
          <strong>{activePoints.length}</strong>
        </article>

        <article className="stat-card">
          <ClipboardList size={24} />
          <span>Solicitações pendentes</span>
          <strong>{pendingRequests.length}</strong>
        </article>

        <article className="stat-card">
          <Recycle size={24} />
          <span>Volume estimado</span>
          <strong>{estimatedVolumeKg}kg</strong>
        </article>

        <article className="stat-card">
          <BarChart3 size={24} />
          <span>Bairros atendidos</span>
          <strong>{servedDistricts.size}</strong>
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
    </section>
  );
}
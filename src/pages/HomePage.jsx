import {
  ArrowRight,
  BarChart3,
  BatteryCharging,
  ClipboardList,
  Leaf,
  MapPin,
  Monitor,
  Recycle,
  Search,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";

import "../styles/home.css";

export function HomePage() {
  /**
   * A Home funciona como vitrine do produto.
   *
   * Ela apresenta a proposta do EcoPonto SP, direciona o usuário para a busca
   * de pontos e também oferece acesso rápido ao dashboard administrativo.
   */
  return (
    <section className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <span className="home-badge">
            <Leaf size={16} />
            GreenTech • GovTech • Portfólio
          </span>

          <h1>Encontre pontos de descarte eletrônico em São Paulo</h1>

          <p>
            Localize pontos de coleta, saiba como descartar corretamente seus
            eletrônicos e acompanhe o impacto positivo gerado por uma cidade
            mais limpa, consciente e sustentável.
          </p>

          <div className="home-hero-actions">
            <Link to="/pontos" className="primary-button">
              <MapPin size={18} />
              Ver pontos de coleta
            </Link>

            <Link to="/admin" className="secondary-button">
              <BarChart3 size={18} />
              Ver dashboard
            </Link>
          </div>

          <small className="home-context-line">
            <Leaf size={15} />
            Protótipo funcional para descarte eletrônico responsável.
          </small>
        </div>

        <div className="home-visual-panel" aria-label="Ilustração do EcoPonto SP">
          <div className="home-city-shape" />

          <div className="home-bin">
            <Recycle size={54} />

            <div className="home-device home-device-phone">
              <Smartphone size={28} />
            </div>

            <div className="home-device home-device-monitor">
              <Monitor size={34} />
            </div>

            <div className="home-device home-device-battery">
              <BatteryCharging size={28} />
            </div>
          </div>

          <div className="home-leaf home-leaf-one" />
          <div className="home-leaf home-leaf-two" />
          <div className="home-leaf home-leaf-three" />

          <aside className="home-impact-card">
            <div className="home-impact-header">
              <div>
                <span>Impacto em São Paulo</span>
                <strong>Dados simulados do projeto</strong>
              </div>

              <Leaf size={20} />
            </div>

            <div className="home-impact-list">
              <div className="home-impact-item">
                <span>
                  <MapPin size={22} />
                </span>

                <div>
                  <strong>24</strong>
                  <small>Pontos cadastrados</small>
                </div>
              </div>

              <div className="home-impact-item">
                <span>
                  <Recycle size={22} />
                </span>

                <div>
                  <strong>186 kg</strong>
                  <small>Volume estimado</small>
                </div>
              </div>

              <div className="home-impact-item">
                <span>
                  <ClipboardList size={22} />
                </span>

                <div>
                  <strong>12</strong>
                  <small>Solicitações registradas</small>
                </div>
              </div>
            </div>

            <p>
              <Leaf size={14} />
              Métricas usadas para demonstrar o fluxo do MVP.
            </p>
          </aside>
        </div>
      </section>

      <section className="home-features" aria-labelledby="home-features-title">
        <div className="home-section-heading">
          <span>
            <Leaf size={16} />
          </span>

          <h2 id="home-features-title">Como o EcoPonto SP ajuda você</h2>

          <span>
            <Leaf size={16} />
          </span>
        </div>

        <div className="home-feature-grid">
          <article className="home-feature-card home-feature-green">
            <div className="home-feature-illustration">
              <MapPin size={44} />
            </div>

            <div>
              <h3>Pontos de coleta</h3>

              <p>
                Encontre locais de coleta perto de você, filtre por bairro, tipo
                de resíduo e status operacional.
              </p>
            </div>

            <Link to="/pontos">
              Buscar pontos
              <ArrowRight size={17} />
            </Link>
          </article>

          <article className="home-feature-card home-feature-blue">
            <div className="home-feature-illustration">
              <Recycle size={44} />
            </div>

            <div>
              <h3>Orientação de descarte</h3>

              <p>
                Aprenda como separar e preparar resíduos eletrônicos para um
                descarte seguro e correto.
              </p>
            </div>

            <Link to="/pontos">
              Ver orientações
              <ArrowRight size={17} />
            </Link>
          </article>

          <article className="home-feature-card home-feature-purple">
            <div className="home-feature-illustration">
              <BarChart3 size={44} />
            </div>

            <div>
              <h3>Gestão administrativa</h3>

              <p>
                Acesse indicadores, solicitações e dados operacionais em um
                dashboard administrativo.
              </p>
            </div>

            <Link to="/admin">
              Acessar dashboard
              <ArrowRight size={17} />
            </Link>
          </article>
        </div>
      </section>

      <section className="home-impact-strip">
        <div className="home-impact-strip-icon">
          <Leaf size={30} />
        </div>

        <div>
          <h2>Pequenas atitudes, grande impacto.</h2>
          <p>
            Descarte eletrônico correto hoje, uma cidade mais sustentável amanhã.
          </p>
        </div>

        <Link to="/pontos" className="secondary-button">
          <Search size={17} />
          Encontrar ponto
        </Link>
      </section>
    </section>
  );
}
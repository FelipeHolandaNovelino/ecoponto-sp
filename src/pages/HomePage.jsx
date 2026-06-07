import { ArrowRight, BarChart3, MapPin, Recycle, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <section className="page-section">
      <div className="hero-grid">
        <div className="hero-content">
          <span className="eyebrow">GreenTech • GovTech • Portfólio</span>

          <h1>Encontre pontos de descarte eletrônico em São Paulo.</h1>

          <p>
            O EcoPonto SP é uma plataforma web responsiva criada para ajudar
            cidadãos a localizar pontos de coleta, entender como descartar
            resíduos eletrônicos e acompanhar indicadores de impacto ambiental.
          </p>

          <div className="hero-actions">
            <Link to="/pontos" className="primary-button">
              Ver pontos de coleta
              <ArrowRight size={18} />
            </Link>

            <Link to="/admin" className="secondary-button">
              Ver dashboard
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="impact-card-header">
            <span>
              <Recycle size={22} />
            </span>
            <strong>Impacto simulado</strong>
          </div>

          <div className="impact-list">
            <div>
              <strong>24</strong>
              <span>Pontos cadastrados</span>
            </div>

            <div>
              <strong>186kg</strong>
              <span>Volume estimado</span>
            </div>

            <div>
              <strong>42</strong>
              <span>Solicitações registradas</span>
            </div>
          </div>
        </div>
      </div>

      <div className="feature-grid">
        <article className="feature-card">
          <MapPin size={24} />
          <h2>Pontos de coleta</h2>
          <p>Busca por bairro, tipo de resíduo e status operacional.</p>
        </article>

        <article className="feature-card">
          <ShieldCheck size={24} />
          <h2>Orientação de descarte</h2>
          <p>Instruções claras para separar e entregar resíduos eletrônicos.</p>
        </article>

        <article className="feature-card">
          <BarChart3 size={24} />
          <h2>Gestão administrativa</h2>
          <p>Dashboard com indicadores, solicitações e dados operacionais.</p>
        </article>
      </div>
    </section>
  );
}
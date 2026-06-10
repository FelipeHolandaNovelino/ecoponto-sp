import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  Leaf,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

import "../styles/home.css";

/**
 * Home principal do EcoPonto SP.
 *
 * A página funciona como uma landing page de apresentação do produto.
 * O hero divide a tela em duas áreas: conteúdo textual à esquerda e imagem
 * institucional à direita, mantendo o acesso principal aos pontos de coleta.
 */
export function HomePage() {
  return (
    <section className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <h1>Encontre pontos de descarte eletrônico em São Paulo</h1>

          <p>
            Localize pontos de coleta, saiba como descartar corretamente seus
            eletrônicos e ajude a construir uma cidade mais limpa, consciente e
            sustentável.
          </p>

          <div className="home-hero-actions">
            <Link to="/pontos" className="home-primary-button">
              <MapPin size={20} />
              Ver pontos de coleta
            </Link>

            <Link to="/acompanhar-solicitacao" className="home-outline-button">
              <ClipboardList size={20} />
              Verificar solicitação
            </Link>
          </div>

          <small className="home-context-line">
            <Leaf size={16} />
            Plataforma demonstrativa para descarte eletrônico responsável.
          </small>
        </div>

        <div className="home-hero-visual" aria-label="Ilustração do EcoPonto SP">
          <img
            src="/images/ecoponto-hero-illustration.png"
            alt="Caixa de reciclagem com eletrônicos em uma paisagem urbana sustentável"
            className="home-hero-image"
          />
        </div>
      </section>

      <section
        className="home-feature-area"
        aria-label="Funcionalidades principais"
      >
        <article className="home-feature-card">
          <div className="home-feature-image">
            <img
              src="/images/ecoponto-feature-guidelines.png"
              alt="Lixeira verde com resíduos eletrônicos para orientação de descarte"
            />
          </div>

          <div>
            <h2>Orientação de descarte</h2>

            <p>
              Aprenda como separar e preparar seus resíduos eletrônicos para um
              descarte seguro e correto.
            </p>
          </div>

          <Link to="/orientacoes-descarte">
            Ver orientações
            <ArrowRight size={18} />
          </Link>
        </article>

        <article className="home-feature-card">
          <div className="home-feature-image">
            <img
              src="/images/ecoponto-feature-admin.png"
              alt="Monitor com gráficos representando gestão administrativa"
            />
          </div>

          <div>
            <h2>Gestão administrativa</h2>

            <p>
              Acesse indicadores, solicitações e dados operacionais em um
              dashboard completo.
            </p>
          </div>

          <Link to="/admin">
            Acessar dashboard
            <ArrowRight size={18} />
          </Link>
        </article>

        <article className="home-feature-card">
          <div className="home-feature-image">
            <img
              src="/images/ecoponto-feature-points.png"
              alt="Ilustração de ponto de coleta para consulta de solicitação"
            />
          </div>

          <div>
            <h2>Verificar solicitação</h2>

            <p>
              Consulte o andamento do descarte usando o CPF ou e-mail informado
              no registro.
            </p>
          </div>

          <Link to="/acompanhar-solicitacao">
            Consultar status
            <ArrowRight size={18} />
          </Link>
        </article>
      </section>
    </section>
  );
}
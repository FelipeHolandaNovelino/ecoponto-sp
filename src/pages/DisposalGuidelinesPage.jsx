import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Info,
  Recycle,
} from "lucide-react";
import { Link } from "react-router-dom";

import { disposalGuidelines } from "../features/disposal-guidelines/data/disposalGuidelines.js";
import "../styles/disposalGuidelines.css";

/**
 * Página de orientações gerais de descarte.
 *
 * Esta tela centraliza regras de preparo por tipo de resíduo. Assim, os pontos
 * de coleta ficam responsáveis apenas por dados operacionais, enquanto as
 * orientações de descarte ficam em um lugar único e reutilizável.
 */
export function DisposalGuidelinesPage() {
  return (
    <section className="page-section">
      <div className="page-header">
        <span className="eyebrow">Orientação de descarte</span>
        <h1>Prepare seus eletrônicos antes de descartar</h1>
        <p>
          Consulte orientações gerais para separar, proteger e entregar resíduos
          eletrônicos com mais segurança. Sempre confirme se o ponto escolhido
          aceita o tipo de material que você pretende levar.
        </p>

        <Link to="/" className="secondary-button">
          <ArrowLeft size={18} />
          Voltar para Home
        </Link>
      </div>

      <section className="guidelines-alert-card">
        <div className="guidelines-alert-icon">
          <AlertTriangle size={26} />
        </div>

        <div>
          <h2>Atenção antes do descarte</h2>
          <p>
            As orientações abaixo são gerais. Pilhas, baterias e eletrônicos
            devem ser destinados a pontos adequados de entrega ou logística
            reversa. Em caso de item danificado, vazando, inchado ou quebrado,
            redobre o cuidado no transporte.
          </p>
        </div>
      </section>

      <section className="guidelines-grid" aria-label="Regras por tipo de resíduo">
        {disposalGuidelines.map((guideline) => (
          <article key={guideline.id} className="guideline-card">
            <div className="guideline-card-header">
              <span>
                <Recycle size={22} />
              </span>

              <div>
                <h2>{guideline.wasteType}</h2>
                <p>{guideline.summary}</p>
              </div>
            </div>

            <ul>
              {guideline.rules.map((rule) => (
                <li key={rule}>
                  <CheckCircle2 size={17} />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="guidelines-footer-card">
        <Info size={24} />

        <div>
          <h2>Depois de preparar o material</h2>
          <p>
            Vá até a página de pontos de coleta, filtre pelo tipo de resíduo e
            escolha um local compatível. O EcoPonto SP simula esse fluxo para
            demonstrar como uma plataforma pública poderia orientar o cidadão.
          </p>
        </div>

        <Link to="/pontos" className="primary-button">
          Ver pontos de coleta
        </Link>
      </section>
    </section>
  );
}
import { Home, MapPin, RouteOff } from "lucide-react";

import { EmptyState } from "../components/ui/EmptyState.jsx";

/**
 * Página 404 da aplicação.
 *
 * Essa tela é exibida quando o usuário acessa uma rota que não existe.
 * Ela evita tela em branco e oferece caminhos seguros para retornar ao fluxo
 * principal do produto.
 */
export function NotFoundPage() {
  return (
    <section className="page-section">
      <EmptyState
        icon={RouteOff}
        eyebrow="Página não encontrada"
        title="Essa rota não existe no EcoPonto SP"
        description="O endereço acessado não corresponde a nenhuma página disponível. Você pode voltar para a Home ou consultar os pontos de coleta cadastrados."
        actionLabel={
          <>
            <Home size={18} />
            Voltar para Home
          </>
        }
        actionTo="/"
        secondaryActionLabel={
          <>
            <MapPin size={18} />
            Ver pontos de coleta
          </>
        }
        secondaryActionTo="/pontos"
      />
    </section>
  );
}
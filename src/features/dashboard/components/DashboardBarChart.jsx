import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 * Formata números no padrão brasileiro para melhorar a leitura dos tooltips.
 */
function formatNumber(value) {
  return new Intl.NumberFormat("pt-BR").format(Number(value) || 0);
}

/**
 * Componente reutilizável para gráficos de barras do dashboard.
 *
 * Mantemos Recharts para demonstrar integração com biblioteca de gráficos.
 * O ResponsiveContainer recebe altura numérica e limites mínimos para evitar
 * erro de dimensão inválida no deploy da Vercel.
 */
export function DashboardBarChart({
  title,
  description,
  data,
  labelKey,
  dataKey,
  valueLabel,
  emptyMessage,
  layout = "horizontal",
}) {
  const hasData = data.some((item) => Number(item[dataKey]) > 0);
  const isHorizontalBar = layout === "vertical";

  /**
   * Altura fixa e controlada por tipo de gráfico.
   *
   * Isso evita que o Recharts dependa de um container com height: 100% ainda
   * não calculado pelo navegador durante a primeira renderização em produção.
   */
  const chartHeight = isHorizontalBar ? 290 : 260;

  return (
    <article className="dashboard-chart-card">
      <div className="dashboard-chart-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      {hasData ? (
        <div className="dashboard-chart-wrapper">
          <ResponsiveContainer
            width="100%"
            height={chartHeight}
            minWidth={0}
            minHeight={220}
            debounce={80}
          >
            <BarChart
              data={data}
              layout={isHorizontalBar ? "vertical" : "horizontal"}
              margin={{
                top: 8,
                right: 12,
                bottom: 8,
                left: isHorizontalBar ? 24 : 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              {isHorizontalBar ? (
                <>
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis
                    type="category"
                    dataKey={labelKey}
                    width={125}
                    tickLine={false}
                    axisLine={false}
                  />
                </>
              ) : (
                <>
                  <XAxis dataKey={labelKey} tickLine={false} axisLine={false} />
                  <YAxis
                    allowDecimals={false}
                    tickLine={false}
                    axisLine={false}
                  />
                </>
              )}

              <Tooltip
                formatter={(value) => [formatNumber(value), valueLabel]}
                labelFormatter={(label) => String(label)}
              />

              <Bar
                dataKey={dataKey}
                name={valueLabel}
                fill="var(--color-primary)"
                radius={isHorizontalBar ? [0, 10, 10, 0] : [10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="dashboard-chart-empty">
          <strong>Sem dados suficientes</strong>
          <p>{emptyMessage}</p>
        </div>
      )}
    </article>
  );
}
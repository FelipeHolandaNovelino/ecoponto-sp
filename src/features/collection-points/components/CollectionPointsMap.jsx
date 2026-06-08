import { useEffect, useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Link } from "react-router-dom";

import "leaflet/dist/leaflet.css";
import "../../../styles/collectionMap.css";

const SAO_PAULO_CENTER = [-23.55052, -46.633308];

/**
 * Ajusta automaticamente o enquadramento do mapa conforme os pontos filtrados.
 *
 * Quando existe apenas um ponto, aproximamos o zoom nele. Quando há vários,
 * o mapa enquadra todos os marcadores visíveis.
 */
function MapBoundsController({ points }) {
  const map = useMap();

  useEffect(() => {
    const pointsWithCoordinates = points.filter((point) => {
      return Number.isFinite(point.latitude) && Number.isFinite(point.longitude);
    });

    if (pointsWithCoordinates.length === 0) {
      map.setView(SAO_PAULO_CENTER, 11);
      return;
    }

    if (pointsWithCoordinates.length === 1) {
      const [point] = pointsWithCoordinates;

      map.setView([point.latitude, point.longitude], 14);
      return;
    }

    const bounds = L.latLngBounds(
      pointsWithCoordinates.map((point) => [point.latitude, point.longitude])
    );

    map.fitBounds(bounds, {
      padding: [36, 36],
    });
  }, [map, points]);

  return null;
}

/**
 * Cria um marcador visual customizado.
 *
 * Usamos divIcon para evitar problemas comuns de caminhos de imagem dos
 * marcadores padrão do Leaflet em builds com Vite.
 */
function createMarkerIcon(index) {
  return L.divIcon({
    className: "collection-map-marker",
    html: `<span>${index + 1}</span>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18],
  });
}

/**
 * Mapa real dos pontos de coleta.
 *
 * O componente recebe os pontos já filtrados pela página pública e exibe apenas
 * os marcadores correspondentes ao resultado atual da busca.
 */
export function CollectionPointsMap({ points }) {
  const pointsWithCoordinates = useMemo(() => {
    return points.filter((point) => {
      return Number.isFinite(point.latitude) && Number.isFinite(point.longitude);
    });
  }, [points]);

  return (
    <section className="collection-map-card" aria-label="Mapa de pontos de coleta">
      <div className="collection-map-header">
        <div>
          <strong>Mapa dos pontos</strong>
          <p>
            {pointsWithCoordinates.length} ponto
            {pointsWithCoordinates.length === 1 ? "" : "s"} exibido
            {pointsWithCoordinates.length === 1 ? "" : "s"} no mapa.
          </p>
        </div>
      </div>

      <div className="collection-map-wrapper">
        <MapContainer
          center={SAO_PAULO_CENTER}
          zoom={11}
          scrollWheelZoom={false}
          className="collection-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapBoundsController points={pointsWithCoordinates} />

          {pointsWithCoordinates.map((point, index) => (
            <Marker
              key={point.id}
              position={[point.latitude, point.longitude]}
              icon={createMarkerIcon(index)}
            >
              <Popup>
                <div className="collection-map-popup">
                  <strong>{point.name}</strong>
                  <span>{point.district}</span>
                  <small>{point.status}</small>

                  <Link to={`/pontos/${point.id}`}>Ver detalhes</Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
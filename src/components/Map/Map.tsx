import React, {useEffect, useState, useMemo, useCallback, memo} from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import './styles.css';
import { Mountain } from "@interfaces/Mountain";
import { Ascent } from "@interfaces/Ascent";

// Configurar iconos por defecto de Leaflet
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Obtener color del marcador
const getMarkerColor = (mountain: Mountain, ascents: Ascent[]) => {
    const isMountainCompleted = ascents.some(ascent => ascent.mountain_id === mountain.id);
    return isMountainCompleted ? "#16a34a" : mountain.essencial ? "#000000" : "#a3a3a3";
};

// Componente FitBounds para ajustar los límites del mapa y notificar cuando se haya realizado
const FitBounds = ({ mountains, onBoundsSet }: { mountains: Mountain[], onBoundsSet: () => void }) => {
    const map = useMap();
    useEffect(() => {
        if (mountains.length > 0) {
            const bounds = L.latLngBounds(
                mountains.map(mountain => [+mountain.latitude, +mountain.longitude])
            );
            map.fitBounds(bounds);
            onBoundsSet(); // Señalar que los límites se han establecido
        }
    }, [map, mountains, onBoundsSet]);
    return null;
};

interface MapComponentProps {
    mountains: Mountain[];
    ascents: Ascent[];
    onSelectMountain: (mountain: Mountain | undefined) => void;
}

const MapComponent = ({ mountains, ascents, onSelectMountain }: MapComponentProps) => {
    const [isBoundsSet, setIsBoundsSet] = useState(false);

    // Memoriza los marcadores para evitar recalcular en cada render
    const markers = useMemo(() => {
        return mountains.map((mountain) => {
            const markerColor = getMarkerColor(mountain, ascents);
            const CustomMarker = L.divIcon({
                className: "",
                html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <g id="pin-mount">
                        <path fill="${markerColor}" d="M256 13c106.8 0 194 87.2 194 194 0 132.4-162.3 268.4-194 294-32.3-24.4-194-154.9-194-294 0-106.8 86.6-194 194-194"/>
                        <path fill="#fff" d="m256 81.3 120.2 194-19.5 12.2-50.7-81.1-23.2 34.2-25-29.3-25 29.9-25-37.2-52.5 84.2-20.1-12.8z"/>
                        <path fill="${markerColor}" d="m256 126.5 36 57.9-11.6 17.1-23.2-26.8-22.6 26.8-13.4-20.1z"/>
                    </g>
                </svg>`,
                iconSize: [36, 36],
            });
            return (
                <Marker
                    key={mountain.id}
                    position={[+mountain.latitude, +mountain.longitude]}
                    icon={CustomMarker}
                    eventHandlers={{
                        click: () => onSelectMountain(mountain)
                    }}
                />
            );
        });
    }, [mountains, ascents, onSelectMountain]);

    // Callback para señalar que los límites se han configurado
    const handleBoundsSet = useCallback(() => {
        setIsBoundsSet(true);
    }, []);

    return (
        <div className="relative w-full h-full">
            <MapContainer
                style={{ width: '100%', height: '100%', position: 'relative' }}
                minZoom={7}
                scrollWheelZoom={true}
                attributionControl={false}
                zoom={15}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {isBoundsSet && (
                    <MarkerClusterGroup
                        showCoverageOnHover={false}
                        disableClusteringAtZoom={10}
                        maxClusterRadius={50}
                        spiderfyOnMaxZoom={false}
                    >
                        {markers}
                    </MarkerClusterGroup>
                )}
                <FitBounds mountains={mountains} onBoundsSet={handleBoundsSet} />
            </MapContainer>
        </div>
    );
};

export default memo(MapComponent);

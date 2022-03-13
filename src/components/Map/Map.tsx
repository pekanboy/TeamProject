import React, {useEffect, useState} from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import {LatLngExpression, LeafletMouseEvent, Map as LeafletMap} from "leaflet";
import style from './Map.module.css';
import 'leaflet/dist/leaflet.css';
import {MapButton} from "../Buttons/MapButton";
import {MarkerComponent, MarkerComponentProps} from './Marker/Marker';
import {Line} from "./Line/Line";

interface MapProps {
    initCenter: LatLngExpression;
}

export const Map: React.FC<MapProps> = ({initCenter}) => {
    const [center] = useState<LatLngExpression>(initCenter);
    const [map, setMap] = useState<LeafletMap|null>(null)
    const [isActiveLabel, setIsActiveLabel] = useState<boolean>(false);
    const [isActiveLine, setIsActiveLine] = useState<boolean>(false);
    const [currentLabels, setCurrentLabels] = useState<MarkerComponentProps[]>([]);
    const [currentLine, setCurrentLine] = useState<LatLngExpression[]>([]);

    useEffect(() => {
        if (!map) {
            return;
        }

        map.on('click', ({latlng}: LeafletMouseEvent) => {
            if (isActiveLabel) {
                const point: MarkerComponentProps = {
                    position: latlng,
                };

                setCurrentLabels((prev) => [...prev, point]);
            } else if (isActiveLine) {
                setCurrentLine((prev) => [...prev, latlng]);
            }
        });

        return () => {
            map.off('click')
        };
    }, [isActiveLine, isActiveLabel])

    const handleClickLabel = () => {
        setIsActiveLabel((prev) => !prev);
        setIsActiveLine(false);
    }

    const handleClickLine = () => {
        setIsActiveLine((prev) => !prev);
        setIsActiveLabel(false);
    }

    const whenMapCreated = (map: LeafletMap) => {
        setMap(map);
    };

    return (
    <div className={style.container}>
        <MapContainer  className={style.mapContainer} center={center} zoom={5} whenCreated={whenMapCreated}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {currentLabels.map(({title, position}) => (
                <MarkerComponent title={title} position={position} key={position.toString()}/>
                )
            )}
            <Line points={currentLine}/>
        </MapContainer>
        <MapButton className={style.label} isActive={isActiveLabel} onClick={handleClickLabel}>Метка</MapButton>
        <MapButton className={style.line} isActive={isActiveLine} onClick={handleClickLine}>Линия</MapButton>
    </div>
  );
}
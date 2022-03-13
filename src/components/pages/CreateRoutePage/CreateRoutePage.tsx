import {Map} from "../../Map/Map";
import React from "react";
import {LatLngExpression} from "leaflet";

export const CreateRoutePage = () => {
    const initCenter: LatLngExpression = [63, 62];
    return (
        <Map initCenter={initCenter}/>
    )
}
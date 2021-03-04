import { MapLocation } from "./location.interface";

export interface Hotel {
    geometry: {
        location: MapLocation
    };
    name: string;
    photos: [];
    place_id: string;
}

export interface Photo {
    getUrl: Function;
    height: number;
    html_attributions: string[];
    width: number;
}
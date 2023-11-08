interface TrainMarker {
    lat: number;
    lon: number;
    routeId: number;
    icon: string;
}

interface RouteData {
    trainMarkers: Record<string, TrainMarker>;
    routeLines: Record<
        string,
        {
            routeData: {
                lat: number;
                lon: number;
                city: number;
                station: number;
            }[];
            lineColor: string;
            trainId: number;
            circleLine: number;
            direction: number;
        }[]
    >;
}

interface Station {
    lat: number;
    lon: number;
}

interface UserData {
    company: string;
    account: number;
    lastStockUpdate: number;
    points: number;
    baseId: number;
    baseLat: string;
    baseLon: string;
    realism: number;
    ipo: number;
    companyValue: number;
    lastCompanyValue: string;
    intro: number;
    lang: string;
    mapPref: string;
    mapPreference: number;
    fuelPct: number;
    spotPct: number;
    checklist: number;
    batSave: number;
    stock: string;
    zoomBought: boolean;
    mapSatRail: number;
    mapDarkRail: number;
    mapSat: number;
    mapDark: number;
    maxZoom: number;
    speedBoost: number;
    cargo: number;
    boostFactor: number;
    fleet: number;
    pending: number;
    yarded: number;
    routes: number;
    station: number;
    enroute: number;
}

export interface LiveData {
    id: number;
    trainId: number;
    speedPerSec: number;
    totalDistance: number;
    totalRouteTime: number;
    secondsEnroute: number;
    stops: number;
    routeName: string;
    trainSpeed: string;
    stationStopTime: number;
    speedIndicated: number;
    nextStation: number;
    stopWait: number;
    isCompleted: number;
}

export interface IUserInfo {
    userData: UserData;
    liveData: LiveData[];
}

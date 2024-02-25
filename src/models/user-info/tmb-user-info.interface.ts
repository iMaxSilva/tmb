import { UserData } from "./user-info.interface";

export interface ITrainEnrouteInfo {
    lineName: string;
    trainId: number;
    destinationTime: string;
}

export interface ITMBUserInfo {
    userData: UserData;
    trainList: {
        enroute: ITrainEnrouteInfo[];
        station: number[];
        yarded: number[];
        allTrainsIds?: number[];
    }
}

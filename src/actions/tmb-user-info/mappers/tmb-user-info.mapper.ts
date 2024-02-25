import { IReqUserInfo, ITMBUserInfo, ITrainEnrouteInfo } from "../../../models/user-info";
import { calculateTime } from "../../../utils/calculate-time/calculate-time.util";

function getTrainInfo(userData: IReqUserInfo) {
    const enrouteTrains: ITrainEnrouteInfo[] = [];
    const stationTrains: number[] = [];
    const yardedTrains: number[] = [];
    const allTrainsIds: number[] = [];
    const trainList = Object.keys(userData.routeData.trainMarkers);

    trainList.forEach((train) => {
        const trainInfo = userData.routeData.trainMarkers[train];
        if (trainInfo.routeId === 0) {
            yardedTrains.push(Number(train));
        } else {
            allTrainsIds.push(Number(train));
            if (userData.liveData && userData.liveData[trainInfo.routeId]) {
                const { routeName, trainId, speedPerSec, totalDistance, secondsEnroute } = userData.liveData[trainInfo.routeId];
                const destinationTime = calculateTime(speedPerSec, totalDistance, secondsEnroute);

                enrouteTrains.push({
                    lineName: routeName,
                    trainId: trainId,
                    destinationTime,
                });
            } else {
                stationTrains.push(Number(train));
            }
        }
    });

    return {
        enroute: enrouteTrains,
        station: stationTrains,
        yarded: yardedTrains,
        allTrainsIds,
    };
}

export default function tmbUserInfoMapper(userInfo: IReqUserInfo): ITMBUserInfo {
    const { userData } = userInfo;
    const trainList = getTrainInfo(userInfo);

    return {
        userData,
        trainList,
    };
}

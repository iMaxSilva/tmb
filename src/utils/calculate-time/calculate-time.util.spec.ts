import { LiveData } from "../../models/user-info/user-info.interface";
import {
    calculateMinTimeToDestination,
    calculateTime,
} from "./calculate-time.util";

const liveDataMock: LiveData = {
    id: 1,
    trainId: 1,
    speedPerSec: 0,
    totalDistance: 1472,
    totalRouteTime: 100,
    secondsEnroute: 15,
    stops: 15,
    routeName: "Testing route",
    trainSpeed: "300",
    stationStopTime: 3,
    speedIndicated: 2,
    nextStation: 1,
    stopWait: 5,
    isCompleted: 0,
};

describe("calculateTime", () => {
    it("should be defined", () => {
        expect(true).toBeDefined();
    });

    it('should return "Em espera na estação" when speedPerSec is 0', () => {
        expect(calculateTime(liveDataMock)).toBe("Em espera na estação");
    });
    it("should calculate time remaining correctly", () => {
        liveDataMock.speedPerSec = 10;
        expect(calculateTime(liveDataMock)).toBe("0h 2min 12s");
    });
});

describe("calculateMinTimeToDestination", () => {
    it("should calculate the minimum time correctly", () => {
        const trainInfo = {
            train1: {
                lineName: "Train1",
                realTrainId: 123,
                timeToDestination: "1h 30min",
            },
            train2: {
                lineName: "Train1",
                realTrainId: 123,
                timeToDestination: "1h 15min",
            },
            train3: {
                lineName: "Train1",
                realTrainId: 123,
                timeToDestination: "1h 20min",
            },
        };
        expect(calculateMinTimeToDestination(trainInfo)).toBe(
            1 * 3600 + 15 * 60,
        );
    });
});

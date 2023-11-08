import { ITrainInfo } from "../../models/train-info/train-info.interface";
import {
    IUserInfo,
    LiveData,
} from "../../models/user-info/user-info.interface";
import { calculateTime } from "../../utils/calculate-time/calculate-time.util";
import LoggerUtil from "../../utils/logger/logger.util";

class TMBTrainInfo {
    constructor(private loggerUtil: LoggerUtil) {}

    private trainInfo(trainId: number, userData: IUserInfo): ITrainInfo | null {
        const liveData: LiveData | undefined = userData.liveData[trainId];

        if (!liveData) {
            this.loggerUtil.addLog(
                "[ERROR]",
                `Trem ${trainId} não encontrado nas informações do usuário.`,
            );
            return null;
        }

        const lineName = liveData.routeName;
        const realTrainId = liveData.trainId;

        return {
            lineName,
            realTrainId,
            timeToDestination: calculateTime(liveData),
        };
    }

    async getTrainInfo(
        userData: IUserInfo,
    ): Promise<Record<string, ITrainInfo>> {
        const trainIds = Object.keys(userData.liveData);
        const trainInfo: Record<string, ITrainInfo> = {};

        for (const trainId of trainIds) {
            const info = this.trainInfo(parseInt(trainId, 10), userData);
            if (info) {
                trainInfo[trainId] = info;
            }
        }

        return trainInfo;
    }

    sendTrainInfoToLogger(trainInfo: Record<string, ITrainInfo>): void {
        this.loggerUtil.addLog(
            "",
            `
╔═════════════════════════════════════════════════════════════════╗
║                      Informações dos trens                      ║
╚═════════════════════════════════════════════════════════════════╝
    ${Object.keys(trainInfo)
        .map((trainId) => {
            const train = trainInfo[trainId];
            return `Trem ${train.realTrainId} - Nome da linha: ${train.lineName}, Tempo restante: ${train.timeToDestination}`;
        })
        .join("\n")}
          `,
        );
    }
}

export default TMBTrainInfo;

import { ITrainEnrouteInfo } from "../../models/user-info";
import LoggerUtil from "../../utils/logger/logger.util";

class TMBTrainInfo {
    constructor(private loggerUtil: LoggerUtil) {}
    sendTrainInfoToLogger(enrouteList: ITrainEnrouteInfo[]): void {
        this.loggerUtil.addLog(
            "",
            `
╔═════════════════════════════════════════════════════════════════╗
║                      Informações dos trens                      ║
╚═════════════════════════════════════════════════════════════════╝
    ${enrouteList
        .map((train) => {
            return `Trem ${train.trainId} - Nome da linha: ${train.lineName}, Tempo restante: ${train.destinationTime}`;
        })
        .join("\n")}
          `,
        );
    }
}

export default TMBTrainInfo;

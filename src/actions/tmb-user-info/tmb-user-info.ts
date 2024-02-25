import { ITMBUserInfo } from "../../models/user-info";
import { IReqUserInfo, UserData } from "../../models/user-info";
import HttpClient from "../../services/http-client";
import LoggerUtil from "../../utils/logger/logger.util";
import tmbUserInfoMapper from "./mappers/tmb-user-info.mapper";

class TMBUserInfo {
    constructor(
        private httpClient: HttpClient,
        private loggerUtil: LoggerUtil,
    ) {}

    async getInfo(): Promise<ITMBUserInfo | undefined> {
        try {
            const response = await this.httpClient.get<IReqUserInfo>(
                "/data/main.user.data.php",
            );
            const data = {
                liveData: response.data?.liveData,
                userData: response.data.userData,
                routeData: response.data.routeData,
            };

            return tmbUserInfoMapper(data);
        } catch (error) {
            this.loggerUtil.addLog(
                "[ERROR]",
                "Erro ao coletar as informações do usuário.",
            );
        }
    }

    sendInfoToLogger(userData: UserData): void {
        this.loggerUtil.addLog(
            "",
            `
╔═════════════════════════════════════════════════════════════════╗
║                      Informações do Usuário                     ║
╚═════════════════════════════════════════════════════════════════╝
Nome da companhia: ${userData.company}
Valor da companhia: ${userData.stock}
Dinheiro: ${userData.account}
Pontos: ${userData.points}
Diesel: ${userData.fuelPct}
Energia: ${userData.spotPct}
Trens estacionados: ${userData.station}
          `,
        );
    }
}

export default TMBUserInfo;

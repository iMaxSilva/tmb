import { IUserInfo } from "../../models/user-info/user-info.interface";
import HttpClient from "../../services/http-client";
import LoggerUtil from "../../utils/logger/logger.util";

class TMBUserInfo {
    constructor(
        private httpClient: HttpClient,
        private loggerUtil: LoggerUtil,
    ) {}

    async getInfo() {
        try {
            const response = await this.httpClient.get<IUserInfo>(
                "/data/main.user.data.php",
            );
            return {
                liveData: response.data?.liveData,
                userData: response.data.userData,
                routeData: response.data.routeData,
            };
        } catch (error) {
            this.loggerUtil.addLog(
                "[ERROR]",
                "Erro ao coletar as informações do usuário.",
            );
        }
    }

    sendInfoToLogger(data: IUserInfo): void {
        this.loggerUtil.addLog(
            "",
            `
╔═════════════════════════════════════════════════════════════════╗
║                      Informações do Usuário                     ║
╚═════════════════════════════════════════════════════════════════╝
Nome da companhia: ${data.userData.company}
Valor da companhia: ${data.userData.stock}
Dinheiro: ${data.userData.account}
Pontos: ${data.userData.points}
Diesel: ${data.userData.fuelPct}
Energia: ${data.userData.spotPct}
Trens estacionados: ${data.userData.station}
          `,
        );
    }
}

export default TMBUserInfo;

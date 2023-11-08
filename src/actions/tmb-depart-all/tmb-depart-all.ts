import HttpClient from "../../services/http-client";
import LoggerUtil from "../../utils/logger/logger.util";

class TMBDepartAll {
    constructor(
        private httpClient: HttpClient,
        private loggerUtil: LoggerUtil,
    ) {}

    async depart(): Promise<void> {
        try {
            await this.httpClient.get("/depart.php?mode=all");
            this.loggerUtil.addLog("[INFO]", "Trens despachados.");
        } catch (error) {
            this.loggerUtil.addLog("[ERRO]", "Falha ao enviar todos os trens.");
        }
    }
}

export default TMBDepartAll;

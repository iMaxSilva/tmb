import { AxiosResponse } from "axios";
import HttpClient from "../../services/http-client";
import LoggerUtil from "../../utils/logger/logger.util";

export async function tmbBuyFuel(httpClient: HttpClient, loggerUtil: LoggerUtil, fuel: number) {
    try {
        if (fuel < 0.5) {
            const responseSpot: AxiosResponse<string> = await httpClient.get('/fuel-spot.php');
            const regex = /var\s+fCapacity\s*=\s*(\d+);/;
            const match = regex.exec(responseSpot.data);

            if (match && match[1]) {
                const missingFuel = parseInt(match[1], 10);
                await httpClient.get(`/fuel-spot.php?mode=do&amount=${missingFuel}`);
                loggerUtil.addLog("[INFO]", "Combustível comprado com sucesso.");
            } else {
                loggerUtil.addLog("[ERRO]", "Padrão de variável fCapacity não encontrado na resposta.");
            }
        }
    } catch (err) {
        loggerUtil.addLog("[ERRO]", `Erro ao comprar combustível: ${err}`);
    }
}

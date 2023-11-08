import HttpClient from "../../services/http-client";
import LoggerUtil from "../../utils/logger/logger.util";

export async function tmbBuyFuel(httpClient: HttpClient, loggerUtil: LoggerUtil, fuel: number) {
    try {
        if (fuel < 0.5) {
            const missingFuel = 124874 - fuel * 124874;
            await httpClient.get(
                `/fuel-spot.php?mode=do&amount=${missingFuel}`,
            );
            loggerUtil.addLog("[INFO]", "Combustível comprado com sucesso.");
        }
    } catch (err) {
        loggerUtil.addLog("[ERRO]", "Erro ao comprar combustível.");
    }
}

import HttpClient from "../../services/http-client";
import LoggerUtil from "../../utils/logger/logger.util";
import TmbTransactionInfoMapper from "./mappers/tmb-transaction-info.mapper";

export default class TMBTransactionInfo {

    constructor(private httpClient: HttpClient, private loggerUtil: LoggerUtil) {
    }

    async getTransactionInfo(): Promise<any> {
        try {
            const response = await this.httpClient.get<string>('/finance.php?_=1701931142257');
            return TmbTransactionInfoMapper(response.data)
        }catch(e) {
            this.loggerUtil.addLog('[ERROR]', 'Não foi possível localizar os logs das transações.')
        }
    }
}

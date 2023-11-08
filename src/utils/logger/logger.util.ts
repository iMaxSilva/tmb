    import { ILogger } from "../../models/logger/logger.interface";

    class LoggerUtil {
        private logs: ILogger[] = [];
        private maxLogs;

        constructor(maxLogs = 30) {
            this.maxLogs = maxLogs;
        }

        addLog(type: string, message: string): void {

            const log = {
                type,
                message,
            };
            this.logs.push(log);

            if (this.logs.length > this.maxLogs) {
                this.logs.shift();
            }
        }

        getLogs(): ILogger[] {
            return this.logs;
        }
    }

    export default LoggerUtil;

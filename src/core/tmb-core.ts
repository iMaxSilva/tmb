import TMBAuth from "../actions/tmb-auth/tmb-auth";
import { tmbBuyFuel } from "../actions/tmb-buy-fuel/tmb-buy-fuel";
import TMBTrainInfo from "../actions/tmb-train-info/tmb-train-info";
import TMBUserInfo from "../actions/tmb-user-info/tmb-user-info";
import TMBRepair from "../actions/tmb-repair/tmb-repair";
import HttpClient from "../services/http-client";
import LoggerUtil from "../utils/logger/logger.util";
import TMBDepartAll from "../actions/tmb-depart-all/tmb-depart-all";
import TMBBuyMarketing from "../actions/tmb-buy-marketing/tmb-buy-marketing";
import { calculateMinTimeToDestination } from "../utils/calculate-time/calculate-time.util";
import { loggerControl } from "../shared/loggerControl";
import { ILogger } from "../models/logger/logger.interface";
import TMBTransactionInfo from "../actions/tmb-transaction-info/tmb-transaction-info";
import { ITMBUserInfo } from "../models/user-info";

export default class TMBCore {
    public username: string;
    public timeout: null | NodeJS.Timeout = null;
    private readonly http: HttpClient;
    private readonly loggerUtil: LoggerUtil;
    private tmbAuth: TMBAuth;
    private tmbRepair: TMBRepair;
    private tmbUserInfo: TMBUserInfo;
    private tmbTrainInfo: TMBTrainInfo;
    private tmbDepartAll: TMBDepartAll;
    private tmbBuyMarketing: TMBBuyMarketing;
    private tmbTransactionInfo: TMBTransactionInfo;
    private spotPct: number = 0;
    private retryCount: number = 0;
    private trainIds: number[] = [];

    constructor(username: string) {
        this.http = new HttpClient();
        this.loggerUtil = new LoggerUtil();
        this.tmbAuth = new TMBAuth(this.http);
        this.tmbRepair = new TMBRepair(this.http);
        this.tmbUserInfo = new TMBUserInfo(this.http, this.loggerUtil);
        this.tmbTrainInfo = new TMBTrainInfo(this.loggerUtil);
        this.tmbDepartAll = new TMBDepartAll(this.http, this.loggerUtil);
        this.tmbBuyMarketing = new TMBBuyMarketing(this.http, this.loggerUtil);
        this.tmbTransactionInfo = new TMBTransactionInfo(this.http, this.loggerUtil);

        this.username = username;
    }

    automaticRepair(): void {
        setTimeout(() => this.tmbRepair.automaticRepair(this.trainIds), 86400000)
    }


    showLogs(type?: string): ILogger[] | void {
        const logs = this.loggerUtil.getLogs();
        if(type === 'object') {
            return logs;
        } else {
            logs.forEach((log) => {
                console.log(`${log.type} ${log.message}`);
            });
        }

    }

    start(): void {
        this.buyMarketing();
        this.automaticRepair();
        this.monitorUserData();
    }

    async transactionInfo(): Promise<any> {
        return await this.tmbTransactionInfo.getTransactionInfo();
    }

    async login(password: string): Promise<boolean> {
        return await this.tmbAuth.login(this.username, password);
    }

    async buyFuel() {
        await tmbBuyFuel(this.http, this.loggerUtil, this.spotPct);
    }

    async manualRepair(trainId: number): Promise<void> {
        await this.tmbRepair.manualRepair(trainId);
    }

    async userInfo(): Promise<ITMBUserInfo | undefined> {
        return await this.tmbUserInfo.getInfo();
    }

    async departAll(): Promise<void> {
        await this.tmbDepartAll.depart();
    }

    async buyMarketing(): Promise<void> {
        await this.tmbBuyMarketing.buyCampaign();
    }

    async monitorUserData(): Promise<void> {
        try {
            const userData = await this.userInfo();

            this.spotPct = userData!.userData.spotPct;
            userData?.trainList.allTrainsIds !== undefined ? this.trainIds.push(...userData!.trainList.allTrainsIds) : [];

            if (userData!.userData.station > 0) {
                await this.buyFuel();
                await this.departAll();
                this.timeout = setTimeout(() => this.monitorUserData(), 60000);
                return;
            }

            const updateInterval = Math.max(
                calculateMinTimeToDestination(userData!.trainList.enroute) * 1000 + 120000,
                10000,
            );

            if (loggerControl.userInfo)
                this.tmbUserInfo.sendInfoToLogger(userData!.userData);
            if (loggerControl.trainInfo)
                this.tmbTrainInfo.sendTrainInfoToLogger(userData!.trainList.enroute);

            this.loggerUtil.addLog(
                "[INFO]",
                `Próxima atualização em ${updateInterval / 60000} minutos`,
            );
            this.timeout = setTimeout(
                () => this.monitorUserData(),
                updateInterval,
            );
        } catch (err) {
            {
                this.loggerUtil.addLog(
                    "[ERRO]",
                    "Não foi possível obter as informações do usuário.",
                );
                this.loggerUtil.addLog(
                    "[INFO]",
                    `O sistema está na ${this.retryCount + 1
                    }ª tentativa de reconexão.`,
                );
                this.retryCount++;
                setTimeout(() => this.monitorUserData(), 60000);
                return;
            }
        }
    }
}

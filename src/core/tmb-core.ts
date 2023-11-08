import TMBAuth from "../actions/tmb-auth/tmb-auth";
import { tmbBuyFuel } from "../actions/tmb-buy-fuel/tmb-buy-fuel";
import TMBTrainInfo from "../actions/tmb-train-info/tmb-train-info";
import TMBUserInfo from "../actions/tmb-info-user/tmb-user-info";
import TMBRepair from "../actions/tmb-repair/tmb-repair";
import { IUserInfo } from "../models/user-info/user-info.interface";
import HttpClient from "../services/http-client";
import LoggerUtil from "../utils/logger/logger.util";
import TMBDepartAll from "../actions/tmb-depart-all/tmb-depart-all";
import TMBBuyMarketing from "../actions/tmb-buy-marketing/tmb-buy-marketing";
import { calculateMinTimeToDestination } from "../utils/calculate-time/calculate-time.util";
import { ITrainInfo } from "../models/train-info/train-info.interface";
import { loggerControl } from "../shared/loggerControl";

export default class TMBCore {
    public username: string;
    public timeout: null | NodeJS.Timeout = null;
    private http: HttpClient;
    private loggerUtil: LoggerUtil;
    private tmbAuth: TMBAuth;
    private tmbRepair: TMBRepair;
    private tmbUserInfo: TMBUserInfo;
    private tmbTrainInfo: TMBTrainInfo;
    private tmbDepartAll: TMBDepartAll;
    private tmbBuyMarketing: TMBBuyMarketing;
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

        this.username = username;
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

    automaticRepair(): void {
        this.tmbRepair.automaticRepair(this.trainIds);
    }

    async userInfo(): Promise<IUserInfo | undefined> {
        return await this.tmbUserInfo.getInfo();
    }

    async trainInfo(userData: IUserInfo): Promise<Record<string, ITrainInfo>> {
        return await this.tmbTrainInfo.getTrainInfo(userData);
    }

    async departAll(): Promise<void> {
        await this.tmbDepartAll.depart();
    }

    async buyMarketing(): Promise<void> {
        await this.tmbBuyMarketing.buyCampaign();
    }

    showLogs(): void {
        const logs = this.loggerUtil.getLogs();
        logs.forEach((log) => {
            console.log(`${log.type} ${log.message}`);
        });
    }

    start(): void {
        this.buyMarketing();
        this.monitorUserData();
    }

    async monitorUserData(): Promise<void> {
        try {
            const userData = await this.userInfo();
            this.spotPct = userData!.userData.spotPct;

            if (userData!.userData.station > 0) {
                await this.buyFuel();
                await this.departAll();
                this.timeout = setTimeout(() => this.monitorUserData(), 60000);
            }

            const trainInfo = await this.trainInfo(userData!);
            this.trainIds = Object.values(trainInfo).map(
                (train) => train.realTrainId,
            );

            if (loggerControl.userInfo)
                await this.tmbUserInfo.sendInfoToLogger(userData!);
            if (loggerControl.trainInfo)
                await this.tmbTrainInfo.sendTrainInfoToLogger(trainInfo);

            const updateInterval = Math.max(
                calculateMinTimeToDestination(trainInfo) * 1000 + 120000,
                10000,
            );

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
                    `O sistema está na ${
                        this.retryCount + 1
                    }ª tentativa de reconexão.`,
                );
                this.retryCount++;
                setTimeout(() => this.monitorUserData(), 60000);
                return;
            }
        }
    }
}

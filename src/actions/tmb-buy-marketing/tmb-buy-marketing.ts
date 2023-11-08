import { IBuyMarketingCampaignTime } from '../../models/buy-marketing/buy-marketing.interface';
import HttpClient from '../../services/http-client';
import LoggerUtil from '../../utils/logger/logger.util';

export default class TMBBuyMarketing {
  constructor(private httpClient: HttpClient, private loggerUtil: LoggerUtil) {}

  async buyCampaign(): Promise<void> {
    try {
      const activeCampaigns = await this.getActiveCampaigns();

      if (activeCampaigns['1'] && activeCampaigns['3']) {
        return await this.setTimeOutCampaignWithShortestTime(activeCampaigns);
      }

      if (!activeCampaigns['1']) {
        await this.buyGeneralCampaign();
      }

      if (!activeCampaigns['3']) {
        await this.buyLobbyingCampaign();
      }

      this.loggerUtil.addLog('[INFO]', 'Compra de campanhas realizada com êxito!');
      return await this.setTimeOutCampaignWithShortestTime(activeCampaigns);
    } catch (err) {
      this.loggerUtil.addLog('[ERROR]', 'Erro ao comprar campanhas.');
    }
  }

  private async setTimeOutCampaignWithShortestTime(response: Record<string, IBuyMarketingCampaignTime>): Promise<void> {
    let activeCampaigns = response;
    let shortestTimeInMilliseconds = Infinity;

    if (Object.keys(response).length <= 1) {
      activeCampaigns = await this.getActiveCampaigns();
    }

    for (const campaign in activeCampaigns) {
      const timeRemaining = this.calculateRemainingTime(activeCampaigns[campaign].end);

      if (timeRemaining.milliseconds < shortestTimeInMilliseconds) {
        shortestTimeInMilliseconds = timeRemaining.milliseconds;
      }
    }

    if (shortestTimeInMilliseconds !== Infinity) {
      const shortestTimeInSeconds = shortestTimeInMilliseconds / 1000;
      const hours = Math.floor(shortestTimeInSeconds / 3600);
      const minutes = Math.floor((shortestTimeInSeconds % 3600) / 60);

      let shortestTimeFormatted = `${hours} horas`;

      if (minutes > 0) {
        shortestTimeFormatted += ` e ${minutes} minutos`;
      }

      setTimeout(() => this.buyCampaign(), shortestTimeInMilliseconds);
      this.loggerUtil.addLog('[INFO]', `Próxima aquisição de campanhas de marketing em ${shortestTimeFormatted}.`);
    } else {
      this.loggerUtil.addLog('[INFO]', 'Nenhuma campanha ativa encontrada.');
    }
  }

  private async getActiveCampaigns(): Promise<Record<string, IBuyMarketingCampaignTime>> {
    const response = await this.httpClient.get<string>('/marketing.php');
    const regex = /var active = (\{[^]*?\});/;
    const match = regex.exec(response.data);
    return match ? JSON.parse(match[1]) : {};
  }

  private async buyGeneralCampaign(): Promise<void> {
    await this.httpClient.get<void>('/marketing-new.php?mode=do&type=1&duration=24&reach=45');
  }

  private async buyLobbyingCampaign(): Promise<void> {
    await this.httpClient.get<void>('/marketing-lobbying.php?mode=start&hours=20');
  }

  private calculateRemainingTime(end: number): { minutes: number; milliseconds: number } {
    const now = Math.floor(Date.now() / 1000);
    const remainingTime = end - now;
    const remainingMinutes = remainingTime / 60;
    const remainingMilliseconds = remainingTime * 1000;

    return {
      minutes: remainingMinutes,
      milliseconds: remainingMilliseconds,
    };
  }
}

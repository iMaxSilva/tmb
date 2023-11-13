import HttpClient from "../../services/http-client";

class TMBRepair {
    private timeout: number;
    constructor(private httpClient: HttpClient) {
        this.timeout = 10000;
    }

    async manualRepair(trainId: number): Promise<boolean> {
        try {
          await this.httpClient.get(
            `/service-repair.php?mode=do&id=${trainId}&_=1696180480506`,
          );
          return true;
        } catch (err) {
          console.error(`Erro ao reparar trem ${trainId}: ${err}`);
          return false;
        }
      }

      async automaticRepair(trainIds: number[]): Promise<number[]> {
        const repairedTrains = [];

        for (const trainId of trainIds) {
          try {
            const success = await this.manualRepair(trainId);
            if (success) {
              repairedTrains.push(trainId);
            } else {
              console.log(`Trem ${trainId} não foi reparado.`);
            }
          } catch (err) {
            console.error(`Erro ao reparar trem ${trainId}: ${err}`);
          }

          await new Promise((resolve) => setTimeout(resolve, this.timeout));
        }

        if (repairedTrains.length > 0) {
          console.log("Todos os trens foram reparados com sucesso.");
        } else {
          console.log("Nenhum trem foi reparado.");
        }

        return repairedTrains;
      }
}

export default TMBRepair;

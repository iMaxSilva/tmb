import { Request, Response } from "express";
import { userMonitors } from "../../../../shared/usersMonitors.arr";
import TMBCore from "../../../../core/tmb-core";
import { IInstanceList } from "../../../../models/express/instance-list/instance-list.interface";
import { IUserInfoController } from "../../../../models/express/user-info/user-info.interface";
import { tmbStopMonitoring } from "../../../../actions/tmb-stop-monitoring/tmb-stop-monitoring";

class InstanceController {
  getList(req: Request, res: Response): Response<IInstanceList> {
    try {
      const instances = userMonitors.map((i: TMBCore, index: number) => {
        return {
          id: index,
          user: i.username
        };
      });

      return res.json({
        data: instances
      });
    } catch (err) {
      return res.sendStatus(500);
    }
  }

  async getEnrouteList(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const userInfo = await userMonitors[id].userInfo();
      const trainInfo = await userMonitors[id].trainInfo(userInfo!);
      res.json({
        data: trainInfo
      })
    } catch (err) {
      return res.sendStatus(500);
    }
  }

  async getUserInfo(req: Request, res: Response): Promise<Response<IUserInfoController | null>> {
    try {
      const id = Number(req.params.id);
      const userInfo = await userMonitors[id].userInfo()
      return res.json({
        data: {
          companyName: userInfo?.userData.company,
          companyValue: userInfo?.userData.stock,
          money: userInfo?.userData.account,
          points: userInfo?.userData.points,
          energy: userInfo?.userData.spotPct,
          fuel: userInfo?.userData.fuelPct,
          parkedTrains: userInfo?.userData.station,
          enrouteTrains: userInfo?.userData.enroute,
          pendingTrains: userInfo?.userData.pending,
          realism: userInfo?.userData.realism === 1 ? true : false,
        }
      });
    } catch (err) {
      return res.sendStatus(500)
    }
  }

  getLogs(req: Request, res: Response) {
    const id = Number(req.params.id);
    return res.json({ data: userMonitors[id].showLogs('object') });
  }

  async stopMonitoring(req: Request, res: Response) {
    const id = Number(req.params.id);
    if(await tmbStopMonitoring(userMonitors[id])) {
      return res.json({
        data: {
          stopped: true,
          message: 'A instância foi finalizada.'
        }
      })
    }    
    return res.sendStatus(500);    
  }
}

const instanceController = new InstanceController();
export default instanceController;

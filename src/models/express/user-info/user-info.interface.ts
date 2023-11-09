export interface IUserInfoController {
    data?: {
      companyName: string;
      companyValue: string;
      money: number;
      points: number;
      energy: number;
      fuel: number;
      parkedTrains: number;
      enrouteTrains: number;
      pendingTrains: number;
      realism: boolean;
    }
  }
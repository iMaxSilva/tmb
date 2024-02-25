import { ITrainEnrouteInfo } from "../../../models/user-info";
import { TrainInfoTypeEnum } from "../enum/train-info-type.enum";

export type TrainInfoType = ITrainEnrouteInfo | TrainInfoTypeEnum;

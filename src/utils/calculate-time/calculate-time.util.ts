import { ITrainInfo } from "../../models/train-info/train-info.interface";
import { LiveData } from "../../models/user-info/user-info.interface";

export function calculateTime(liveData: LiveData): string {
  const { speedPerSec, totalDistance, secondsEnroute } = liveData;

  if (speedPerSec === 0) {
    return "Em espera na estação";
  }

  const remainingDistance = totalDistance - speedPerSec * secondsEnroute;
  const timeRemaining = remainingDistance / speedPerSec;


  const hoursRemaining = Math.floor(timeRemaining / 3600);
  const minutesRemaining = Math.floor((timeRemaining % 3600) / 60);

  let timeString = `${hoursRemaining}h ${minutesRemaining}min`;

  return timeString;
}

export function calculateMinTimeToDestination(trainInfo: Record<string, ITrainInfo>): number {
    return Math.min(
        ...Object.values(trainInfo).map((train) => {
          const [hours, minutes] = train.timeToDestination.split("h ");
          return parseInt(hours) * 3600 + parseInt(minutes) * 60;
        }),
      );
}

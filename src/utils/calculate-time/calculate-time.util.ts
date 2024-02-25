import { ITrainEnrouteInfo } from "../../models/user-info";

export function calculateTime(speedPerSec: number, totalDistance: number, secondsEnroute: number): string {
  if (speedPerSec === 0) {
    return "Em espera na estação";
  }

  const remainingDistance = totalDistance - speedPerSec * secondsEnroute;
  const timeRemaining = remainingDistance / speedPerSec;
  const hoursRemaining = Math.floor(timeRemaining / 3600);
  const minutesRemaining = Math.floor((timeRemaining % 3600) / 60);
  const timeString = `${hoursRemaining}h ${minutesRemaining}min`;

  return timeString;
}

export function calculateMinTimeToDestination(enrouteTrains: ITrainEnrouteInfo[]): number {
    return Math.min(
        ...Object.values(enrouteTrains).map((train) => {
          const [hours, minutes] = train.destinationTime.split("h ");
          return parseInt(hours) * 3600 + parseInt(minutes) * 60;
        }),
      );
}

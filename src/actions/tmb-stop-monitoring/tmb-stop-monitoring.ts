import TMBCore from "../../core/tmb-core";

export function tmbStopMonitoring(monitor: TMBCore): null {
    if (monitor.timeout) {
      clearTimeout(monitor.timeout);
      monitor.timeout = null;
    }
    return monitor.timeout;
}

export function tmbStopAllMonitoring(monitors: TMBCore[]): void {
    monitors.forEach(async (monitor: TMBCore) => {
        await tmbStopMonitoring(monitor);
    });
    console.log("Saindo da aplicação.");
    process.exit();
}

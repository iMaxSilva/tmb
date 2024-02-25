import TMBCore from "../../core/tmb-core";
import { tmbInstanceListPage } from "../../questions/tmb-instance-list-page/tmb-instance-list-page";
import { userMonitors } from "../../shared/usersMonitors.arr";

function cancelMonitorTimeout(monitor: TMBCore): null {
    if (monitor.timeout) {
        clearTimeout(monitor.timeout);
        monitor.timeout = null;
    }
    return monitor.timeout;
}


export function tmbStopAllMonitoring(monitors: TMBCore[]): void {
    monitors.forEach(async (monitor: TMBCore) => {
        await cancelMonitorTimeout(monitor);
    });
    console.log("Saindo da aplicação.");
    process.exit();
}

export async function tmbStopMonitoring(monitor: TMBCore) {
    console.clear();
    const index = userMonitors.indexOf(monitor);
    if (index !== -1) {
        await cancelMonitorTimeout(monitor);
        userMonitors.splice(index, 1);
        return true;
    } else {
        return false;
    }
}

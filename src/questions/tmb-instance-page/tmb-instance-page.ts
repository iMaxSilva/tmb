import inquirer from "inquirer";
import {
    IChoice,
    InstancePageChoiceEnum,
    InstancePageChoiceLabelEnum,
} from "../../models/choice/choice";
import TMBCore from "../../core/tmb-core";
import { tmbMainPage } from "../tmb-main-page/tmb-main-page";
import { tmbStopMonitoring } from "../../actions/tmb-stop-monitoring/tmb-stop-monitoring";
import { userMonitors } from "../../shared/usersMonitors.arr";
import { tmbInstanceListPage } from "../tmb-instance-list-page/tmb-instance-list-page";

export async function tmbInstancePage(monitor: TMBCore) {
    const list: IChoice[] = [
        {
            name: InstancePageChoiceLabelEnum.BUY_FUEL,
            value: InstancePageChoiceEnum.BUY_FUEL,
        },
        {
            name: InstancePageChoiceLabelEnum.REPAIR_TRAIN,
            value: InstancePageChoiceEnum.REPAIR_TRAIN,
        },
        {
            name: InstancePageChoiceLabelEnum.REPAIR_ALL_TRAINS,
            value: InstancePageChoiceEnum.REPAIR_ALL_TRAINS,
        },
        {
            name: InstancePageChoiceLabelEnum.UPDATE_INFO,
            value: InstancePageChoiceEnum.UPDATE_INFO,
        },
        {
            name: InstancePageChoiceLabelEnum.SHOW_LOGS,
            value: InstancePageChoiceEnum.SHOW_LOGS,
        },
        {
            name: InstancePageChoiceLabelEnum.MAIN_MENU,
            value: InstancePageChoiceEnum.MAIN_MENU,
        },
        {
            name: InstancePageChoiceLabelEnum.REMOVE_INSTANCE,
            value: InstancePageChoiceEnum.REMOVE_INSTANCE,
        },
    ];

    while (true) {
        const answer = await inquirer.prompt([
            {
                name: "tmbInstancePage",
                type: "list",
                choices: list,
                message: "Escolha uma opção:",
            },
        ]);

        switch (answer.tmbInstancePage) {
            case InstancePageChoiceEnum.BUY_FUEL:
                console.clear();
                await monitor.buyFuel();
                break;
            case InstancePageChoiceEnum.REPAIR_ALL_TRAINS:
                console.clear();
                await monitor.automaticRepair();
                break;
            case InstancePageChoiceEnum.SHOW_LOGS:
                console.clear();
                await monitor.showLogs();
                break;
            case InstancePageChoiceEnum.MAIN_MENU:
                console.clear();
                await tmbMainPage();
                return; // Retorna para evitar chamadas recursivas
            case InstancePageChoiceEnum.REMOVE_INSTANCE:
                console.clear();
                await deleteMonitor(monitor);
                return; // Retorna para evitar chamadas recursivas
            default:
                console.log("Escolha inválida. Tente novamente.");
        }
    }

    async function deleteMonitor(monitor: TMBCore) {
        console.clear();
        const index = userMonitors.indexOf(monitor);
        if (index !== -1) {
            await tmbStopMonitoring(monitor);
            userMonitors.splice(index, 1);
            console.log(`Instância de ${monitor.username} foi removida.`);
            await tmbInstanceListPage();
        } else {
            console.log("Erro ao remover a instância.");
        }
    }
}

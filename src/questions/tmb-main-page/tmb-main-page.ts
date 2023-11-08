import inquirer from "inquirer";
import {
    IChoice,
    MainPageChoiceEnum,
    MainPageChoiceLabelEnum,
} from "../../models/choice/choice";
import { tmbLoginPage } from "../tmb-login-page/tmb-login-page";
import { tmbInstanceListPage } from "../tmb-instance-list-page/tmb-instance-list-page";
import { userMonitors } from "../../shared/usersMonitors.arr";
import { tmbStopAllMonitoring, tmbStopMonitoring } from "../../actions/tmb-stop-monitoring/tmb-stop-monitoring";
import TMBCore from "../../core/tmb-core";

export async function tmbMainPage() {
    const list: IChoice[] = [
        {
            name: MainPageChoiceLabelEnum.LOGIN,
            value: MainPageChoiceEnum.LOGIN,
        },
        {
            name: MainPageChoiceLabelEnum.LIST_INSTANCES,
            value: MainPageChoiceEnum.LIST_INSTANCES,
        },
        {
            name: MainPageChoiceLabelEnum.DEVFN,
            value: MainPageChoiceEnum.DEVFN,
        },
        { name: MainPageChoiceLabelEnum.EXIT, value: MainPageChoiceEnum.EXIT },
    ];

    const answer = await inquirer.prompt([
        {
            name: "tmbMainPage",
            type: "list",
            choices: list,
            message: "Escolha uma opção:",
        },
    ]);

    console.clear();
    if (answer.tmbMainPage === MainPageChoiceEnum.LOGIN) {
        await tmbLoginPage();
    } else if (answer.tmbMainPage === MainPageChoiceEnum.LIST_INSTANCES) {
        await tmbInstanceListPage();
    } else if (answer.tmbMainPage === MainPageChoiceEnum.DEVFN) {
        console.log(userMonitors);
        await tmbMainPage();
    } else if (answer.tmbMainPage === MainPageChoiceEnum.EXIT) {
        tmbStopAllMonitoring(userMonitors);
    }
}

import inquirer from "inquirer";
import {
    IChoice,
    MainPageChoiceEnum,
    MainPageChoiceLabelEnum,
} from "../../models/choice/choice";
import TMBCore from "../../core/tmb-core";
import { tmbMainPage } from "../tmb-main-page/tmb-main-page";
import { tmbInstancePage } from "../tmb-instance-page/tmb-instance-page";
import { tmbStopMonitoring } from "../../actions/tmb-stop-monitoring/tmb-stop-monitoring";
import { userMonitors } from "../../shared/usersMonitors.arr";

export async function tmbInstanceListPage() {
    const list: IChoice[] = [
        {
            name: MainPageChoiceLabelEnum.BACK,
            value: MainPageChoiceEnum.BACK,
        },
        {
            name: MainPageChoiceLabelEnum.EXIT,
            value: MainPageChoiceEnum.EXIT,
        },
    ];

    console.clear();

    for (let i = 0; i < userMonitors.length; i++) {
        list.unshift({
            name: `Entrar na instância de ${userMonitors[i].username}`,
            value: i,
        });
    }

    await inquirer
        .prompt([
            {
                name: "tmbInstanceListPage",
                type: "list",
                choices: list,
                message: "Escolha uma opção:",
            },
        ])
        .then(async (answer) => {
            console.clear();
            if (answer.tmbInstanceListPage === MainPageChoiceEnum.EXIT) {
                await exitAllMonitors(userMonitors);
            } else if (answer.tmbInstanceListPage === MainPageChoiceEnum.BACK) {
                await tmbMainPage();
                return;
            } else if (
                answer.tmbInstanceListPage >= 0 &&
                answer.tmbInstanceListPage < userMonitors.length
            ) {
                const selectedMonitor =
                    userMonitors[answer.tmbInstanceListPage];
                console.clear();
                console.log(
                    `Você entrou na instância de ${selectedMonitor.username}.`,
                );
                await tmbInstancePage(selectedMonitor);
                return;
            } else {
                console.log("Número de instância inválido. Tente novamente.");
                return;
            }
        });

    function exitAllMonitors(monitors: TMBCore[]): void {
        console.clear();
        monitors.forEach((userMonitor) => {
            tmbStopMonitoring(userMonitor);
        });
        process.exit();
    }
}

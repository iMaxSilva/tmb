import inquirer from "inquirer";
import TMBCore from "../../core/tmb-core";
import { tmbMainPage } from "../tmb-main-page/tmb-main-page";
import { userMonitors } from "../../shared/usersMonitors.arr";

export async function tmbLoginPage(): Promise<void> {
    await inquirer
        .prompt([
            {
                type: "input",
                name: "mail",
                message: "Digite um nome de usuário:",
                default: "maxdeveloper017@gmail.com"
            },
            {
                type: "password",
                name: "pass",
                message: "Digite uma senha:",
                default: "88780811s2S@"
            },
        ])
        .then(async (answers) => {
            const { mail, pass } = answers;
            const userMonitor = new TMBCore(mail);

            try {
                const loginSuccessful = await userMonitor.login(pass);
                if (loginSuccessful) {
                    userMonitors.push(userMonitor);
                    userMonitor.start();
                    console.clear();
                    console.log(
                        "Autenticado com sucesso e monitoramento iniciado.",
                    );
                    await tmbMainPage();
                } else {
                    console.clear();
                    console.log("Falha na autenticação. Tente novamente.");
                    await tmbMainPage();
                }
            } catch (error) {
                console.error("Erro na solicitação à API: " + error);
                await tmbMainPage();
            }
        });
}

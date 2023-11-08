import { tmbMainPage } from "./questions/tmb-main-page/tmb-main-page";

export async function TMB(): Promise<any> {
    console.clear();
    await tmbMainPage();
}

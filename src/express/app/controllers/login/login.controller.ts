import { Request, Response } from "express";
import { userMonitors } from "../../../../shared/usersMonitors.arr";
import TMBCore from "../../../../core/tmb-core";
let loginController: LoginController;


class LoginController {
    constructor() { }

    public async login(req: Request, res: Response) {
        try {
            const { mail, pass } = req.body;
            
            if(!mail || !pass || !req.body){
                return res.sendStatus(401)
            }

            const userMonitor = new TMBCore(mail);
            const loginSuccessful = await userMonitor.login(pass);
            if (loginSuccessful) {
                userMonitors.push(userMonitor);
                userMonitor.start();
                return res.json({ data: "Autenticado com sucesso e monitoramento iniciado." });
            }
            return res.sendStatus(401)
        } catch (err) {
            return res.sendStatus(500)
        }
    }
}
export default loginController = new LoginController();
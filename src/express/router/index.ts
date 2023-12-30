import { Router } from "express";
import loginController from "../app/controllers/login/login.controller";
import instanceController from "../app/controllers/instance/instance.controller";

const router: Router = Router();

router.get("/instance/list", instanceController.getList);
router.get("/instance/:id/logs", instanceController.getLogs);
router.get("/instance/:id/transaction", instanceController.getTransactionInfo);
router.get("/instance/:id/user-info", instanceController.getUserInfo);
router.get("/instance/:id/enroute-list", instanceController.getEnrouteList);
router.get("/instance/:id/repair", instanceController.repairTrains)
router.get("/instance/:id/stopMonitoring", instanceController.stopMonitoring);
router.get("/calculator/:capacity/:passenger/:time", instanceController.calculatorRoute);
router.get("/health", instanceController.health)
router.post("/login", loginController.login);

export { router };

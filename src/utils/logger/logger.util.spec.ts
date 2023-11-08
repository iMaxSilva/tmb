import LoggerUtil from "./logger.util";

describe("loggerUtil", () => {
    let loggerUtil: LoggerUtil

    beforeEach(() => {
        loggerUtil = new LoggerUtil();
    })

    it("should be defined", () => {
        expect(true).toBeDefined();
    });

    it("should add the log inside the array", () => {
        const addLogSpy = jest.spyOn(loggerUtil, "addLog");

        loggerUtil.addLog("[INFO]", "Teste Message Jest");

        expect(addLogSpy).toHaveBeenCalledWith("[INFO]", "Teste Message Jest");
    });

    it("should read the log that is inside the array", () => {
        const getLogsSpy = jest.spyOn(loggerUtil, "getLogs");
        const logs = loggerUtil.getLogs();

        loggerUtil.addLog("[INFO]", "Teste Message Jest");

        expect(getLogsSpy).toHaveBeenCalled();
        expect(logs).toEqual([
            { type: "[INFO]", message: "Teste Message Jest" },
        ]);
    });

    it("should remove logs when the limit is exceeded", () => {
        const loggerClass = new LoggerUtil(3);
        const logs = loggerClass.getLogs();

        loggerClass.addLog("[INFO]", "Log 1");
        loggerClass.addLog("[INFO]", "Log 2");
        loggerClass.addLog("[INFO]", "Log 3");
        loggerClass.addLog("[INFO]", "Log 4");

        expect(logs.map(logs => logs.message)).toEqual([
            "Log 2",
            "Log 3",
            "Log 4",
        ]);

        expect(logs).toHaveLength(3);
    });
});

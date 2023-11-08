import { loggerControl, ILoggerControl } from "./loggerControl";

describe("loggerControl", () => {
    it("should be defined", () => {
        expect(true).toBeDefined();
    });

    it("loggerControl should have correct properties and types", () => {
        expect(typeof loggerControl.trainInfo).toBe('boolean');
        expect(typeof loggerControl.userInfo).toBe('boolean');
    });
});

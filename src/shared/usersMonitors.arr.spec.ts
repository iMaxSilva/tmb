import TMBCore from "../core/tmb-core";
import { userMonitors } from "./usersMonitors.arr";

describe("usersMonitors", () => {
    it("should be defined", () => {
        expect(true).toBeDefined();
    });

    it("should be of type TMBCore[]", () => {
        expect(Array.isArray(userMonitors)).toBe(true);
        expect(userMonitors).toHaveLength(0);
    });
});

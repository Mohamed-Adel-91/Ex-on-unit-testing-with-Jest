const lib = require("../lib");

describe("absolute", () => {
    it("absolute - should return positive no if input is positive ", () => {
        const result = lib.absolute(5);
        expect(result).toBe(5);
    });

    it("absolute - should return positive no if input is negative ", () => {
        const result = lib.absolute(-5);
        expect(result).toBe(5);
    });

    it("absolute - should return 0 no if input is 0 ", () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe("greet", () => {
    it("should return a greeting message", () => {
        const result = lib.greet("John");
        expect(result).toMatch(/John/);
        expect(result).toContain("John");
    });
});

describe("getCurrencies", () => {
    it("returns an array of currency codes", () => {
        const result = lib.getCurrencies();
        expect(result instanceof Array).toBeTruthy;
        expect(result[0]).toEqual("USD");

        // too general
        expect(result).not.toHaveLength(1);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        // too specific
        expect(result[0]).toBe("USD");
        expect(result[1]).toBe("AUD");
        expect(result[2]).toBe("EUR");

        // proper way
        expect(result).toContain("USD");
        expect(result).toContain("AUD");
        expect(result).toContain("EUR");

        // ideal way
        expect(result).toEqual(expect.arrayContaining(["USD", "AUD", "EUR"]));
    });
});

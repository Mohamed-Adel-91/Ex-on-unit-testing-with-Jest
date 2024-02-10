const lib = require("../exercise1");

describe("Fizz Buzz", () => {
    it("should throw an exception if input is not number", () => {
        expect(() => {
            lib.fizzBuzz("a");
        }).toThrow();
        expect(() => {
            lib.fizzBuzz(null);
        }).toThrow();
        expect(() => {
            lib.fizzBuzz(undefined);
        }).toThrow();
        expect(() => {
            lib.fizzBuzz({});
        }).toThrow();
        expect(() => {
            lib.fizzBuzz(NaN); // the type of  NaN is "number" in JavaScript, so this test will fail!
        }).not.toThrow();
        expect(() => {
            lib.fizzBuzz(0);
        }).not.toThrow();
    });

    it("should return 'FizzBuzz' if input divisible by 3 and 5 ", () => {
        let result = lib.fizzBuzz(15);
        expect(result).toEqual("FizzBuzz");
    });

    it("should return 'Fizz' if input divisible only by 3", () => {
        let result = lib.fizzBuzz(9);
        expect(result).toBe("Fizz");
    });

    it("should return 'Buzz' when input is divisible only by  5", () => {
        let result = lib.fizzBuzz(10);
        expect(result).toBe("Buzz");
    });

    it("should return the same value as the input if it is not divisible by either 3 or 5", () => {
        for (let i = 2; i < 100; i++) {
            if (i % 3 !== 0 && i % 5 !== 0) {
                expect(lib.fizzBuzz(i)).toBe(i);
            }
        }
    });

    it("should return same numbers that are not multiples of either  3 or 5", () => {
        let result = lib.fizzBuzz(7);
        expect(result).toBe(7);
        result = lib.fizzBuzz(4);
        expect(result).toBe(4);
    });
});

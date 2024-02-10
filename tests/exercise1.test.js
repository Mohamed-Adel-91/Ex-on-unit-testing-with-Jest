const lib = require("../exercise1");

describe("Fizz Buzz", () => {
    it("should throw an exception if input is not number", () => {
        expect(() => {
            lib.fizzBuzz("a");
        }).toThrow();
    });
});

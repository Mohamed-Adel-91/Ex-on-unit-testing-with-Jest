const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

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

describe("getProduct", () => {
    it("returns the product with given id from products list", () => {
        const result = lib.getProduct(1);
        // here if i want it the same  as in the example, I can use toEqual() method
        expect(result).toEqual({ id: 1, price: 10 });
        // we can  also check if  some properties are there and they have correct values
        expect(result).toMatchObject({ id: 1, price: 10 });
        // or we can spot on  one property
        expect(result).toHaveProperty("id", 1);
    });
});

describe("registerUser", () => {
    it("should throw if username is falsy", () => {
        // Null
        // undefined
        // NaN
        // ''
        // false
        const args = [null, undefined, "", NaN, false, 0];
        args.forEach((arg) => {
            expect(() => lib.registerUser(arg)).toThrowError(/username/i);
        });
    });

    it("adds a new user to users list", () => {
        const result = lib.registerUser("Mohamed");
        expect(result).toMatchObject({ username: "Mohamed" });
        expect(result.id).toBeGreaterThan(0);
    });
});

describe("apply Discount", () => {
    it("should apply 10% discount if customer has more than 10 pointes", () => {
        db.getCustomerSync = function (customerId) {
            console.log("fake Reading a customer from MongoDB...");
            return { id: customerId, points: 20 };
        };
        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

describe("notify Customer", () => {
    it("should send an email to customer", () => {
        db.getCustomerSync = function (customerId) {
            return { email: "a" };
        };
        let mailSent = false;
        mail.send = function (email, message) {
            mailSent = true;
        };
        lib.notifyCustomer({ customerId: 1 });
        expect(mailSent).toBe(true);
    });
});

/* anther  example of previous */

describe("notify Customer", () => {
    it("should send an email to customer", () => {
        db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
        mail.send = jest.fn();
        lib.notifyCustomer({ customerId: 1 });
        expect(mail.send).toHaveBeenCalled(); // Verify that the mock was called once
        expect(mail.send).toHaveBeenCalledWith(
            "a",
            "Your order was placed successfully."
        ); // this method must be have the same arguments  as in real implementation
        expect(mail.send.mock.calls[0][0]).toBe("a");
        expect(mail.send.mock.calls[0][1]).toMatch(/order/); // this  expression will match any string that contains 'order' to not write the same string like in last method in line 125
        expect(db.getCustomerSync).toHaveBeenCalledWith(1); // Checking args passed to getCustomerSync()
    });
});

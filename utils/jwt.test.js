const { createToken } = require("./jwt");

console.error = jest.fn();

describe("Sunny case: test", () => {
  it("Test hash function", async () => {
    const token = await createToken("trungDz@gmail.com", "121");
    console.log("🚀 ~ file: bcrypt.test.js:10 ~ it ~ hashedEmail", token);

    expect(token).not.toBe(null);
  });
});

describe("Rainy case: test", () => {
  it("Test hash function error", async () => {
    try {
      await createToken();
    } catch (error) {
      expect(err).toMatch("error");
    }
  });
});

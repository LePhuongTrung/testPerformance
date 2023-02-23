const handleTime = require("../handleTimeService");

console.error = jest.fn();

describe("Sunny case: test", () => {
  it("Test checkHoliday return true", async () => {
    const day_name = "SunDay";
    const type = "internal diseases";
    const test = await handleTime.checkHoliday(day_name, type);
    expect(test).toEqual(true);
  });
  it("Test checkHoliday return true", async () => {
    const day_name = "Saturday";
    const type = "internal diseases";
    const test = await handleTime.checkHoliday(day_name, type);
    expect(test).toEqual(true);
  });
  it("Test checkHoliday return false", async () => {
    const day_name = "SunDay";
    const type = "emergency";
    const test = await handleTime.checkHoliday(day_name, type);
    expect(test).toEqual(false);
  });
  it("Test checkDay return SunDay", async () => {
    const test = await handleTime.checkDay(0);
    expect(test).toEqual("SunDay");
  });
  it("Test checkDay return Monday", async () => {
    const test = await handleTime.checkDay(1);
    expect(test).toEqual("Monday");
  });
  it("Test checkDay return TuesDay", async () => {
    const test = await handleTime.checkDay(2);
    expect(test).toEqual("TuesDay");
  });
  it("Test checkDay return Wednesday", async () => {
    const test = await handleTime.checkDay(3);
    expect(test).toEqual("Wednesday");
  });
  it("Test checkDay return Thursday", async () => {
    const test = await handleTime.checkDay(4);
    expect(test).toEqual("Thursday");
  });
  it("Test checkDay return Friday", async () => {
    const test = await handleTime.checkDay(5);
    expect(test).toEqual("Friday");
  });
  it("Test checkDay return Saturday", async () => {
    const test = await handleTime.checkDay(6);
    expect(test).toEqual("Saturday");
  });
  it("Test calculateTimeRemaining hours < 11", async () => {
    const hours = 10;
    const minutes = 20;
    const test = await handleTime.calculateTimeRemaining(hours, minutes);
    expect(test).toEqual(280);
  });
  it("Test calculateTimeRemaining else", async () => {
    const hours = 16;
    const minutes = 20;
    const test = await handleTime.calculateTimeRemaining(hours, minutes);
    expect(test).toEqual(40);
  });
  it("Test calculateTimeWait return 999999", async () => {
    const waitNumber = 16;
    const currentNumber = 10;
    const timeRemaining = 20;

    const test = await handleTime.calculateTimeWait(
      waitNumber,
      currentNumber,
      timeRemaining
    );
    expect(test).toEqual(999999);
  });
  it("Test calculateTimeWait return else", async () => {
    const waitNumber = 16;
    const currentNumber = 10;
    const timeRemaining = 500;

    const test = await handleTime.calculateTimeWait(
      waitNumber,
      currentNumber,
      timeRemaining
    );
    expect(test).toEqual(60);
  });
  it("Test calculateTimeWait return 999999", async () => {
    const waitNumber = 22;
    const currentNumber = 10;
    const timeRemaining = 101;

    const test = await handleTime.calculateTimeWait(
      waitNumber,
      currentNumber,
      timeRemaining
    );
    expect(test).toEqual(999999);
  });
});

describe("Rainy case: test", () => {});

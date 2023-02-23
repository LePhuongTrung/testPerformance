const repository = require("./WaitRepository");
const DB = require("../Database/connect");

console.error = jest.fn();

beforeAll(async () => {
  jest.setTimeout(60000);
  await DB.connectDatabase();
});

afterAll(async () => {
  await DB.disconnectDatabase();
});

const DATA = {
  AccountId: "6386b0548525d648be9748a6",
  numericalOrder: 2,
  RoomId: 1,
};
const medicine1 = {
  name: "Beatil",
  amount: 25,
  timesPerDay: 1,
  Dosage: "1 capsule",
};
const medicine2 = {
  name: "Traphaco",
  amount: 20,
  timesPerDay: 2,
  Dosage: "1 package",
};

describe("Sunny case: test", () => {
  it("Test create wait", async () => {
    const create = await repository.create(DATA);
    expect(create.numericalOrder).toEqual(DATA.numericalOrder);
    expect(create.RoomId).toEqual(DATA.RoomId);
    const del = await repository.deleteWait(create._id);
  });
  it("Test find wait", async () => {
    const find = await repository.findOne(DATA.RoomId, DATA.numericalOrder);
    expect(find).toBeTruthy;
  });
  it("Test find by ID wait", async () => {
    const AccountId = "6386b0548525d648be9748a6";
    const find = await repository.findOneById(AccountId);
    expect(find).toBeTruthy;
    expect(String(find.AccountId)).toEqual(AccountId);
  });
  it("Test update wait", async () => {
    let MedicalForm = [{ Diagnostic: "hypertension" }];
    MedicalForm = [...MedicalForm, medicine1, medicine2];
    const update = await repository.update(DATA.AccountId, MedicalForm);
    expect(update).toBeTruthy;
    expect(update.MedicalForm.length).toBeGreaterThan(1);
  });
});

describe("Rainy case: test", () => {
  it("Test create wait failed", async () => {
    await repository.create("");
    expect(console.error).toHaveBeenCalled();
  });
  it("Test del wait failed", async () => {
    await repository.deleteWait("638d6cf2a");
    expect(console.error).toHaveBeenCalled();
  });
  it("Test find wait failed", async () => {
    await DB.disconnectDatabase();
    await repository.findOne(DATA.RoomId, DATA.numericalOrder);
    expect(console.error).toHaveBeenCalled();
  });
  it("Test find wait by id failed", async () => {
    await DB.disconnectDatabase();
    const AccountId = "6386b0548525d648be9748a6";
    await repository.findOneById(AccountId);
    expect(console.error).toHaveBeenCalled();
  });
});

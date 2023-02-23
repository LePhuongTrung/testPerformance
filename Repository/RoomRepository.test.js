const repository = require("./RoomRepository");
const DB = require("../Database/connect");

console.error = jest.fn();

beforeAll(async () => {
  jest.setTimeout(60000);
  await DB.connectDatabase();
});

afterAll(async () => {
  await DB.disconnectDatabase();
});

const data = {
  roomNumber: 888,
  CurrentNumber: 5,
  TotalNumber: 10,
};

describe("Sunny case: test", () => {
  it("Test create Room", async () => {
    const create = await repository.create(data);
    expect(create.roomNumber).toEqual(data.roomNumber);
    expect(create.DoctorName).toEqual(data.DoctorName);
    expect(create.CurrentNumber).toEqual(data.CurrentNumber);
    expect(create.TotalNumber).toEqual(data.TotalNumber);
    await repository.deleteRoom(create._id);
  });
  it("Test find room", async () => {
    const roomNumber = 1;
    const find = await repository.findOne(roomNumber);
    expect(find).toBeTruthy;
    expect(find.roomNumber).toEqual(roomNumber);
  });
  it("Test find all room", async () => {
    const options = { limit: 10, page: 1 };
    const find = await repository.findAll(options);
    expect(find).toBeTruthy();
  });
  it("Test find all with filter room", async () => {
    const type = "internal diseases";
    const isPrioritized = true;
    const options = { limit: 10, page: 1 };
    const find = await repository.findAllFilter(options, type, isPrioritized);
    expect(find).toBeTruthy();
  });
  it("Test update Room", async () => {
    const roomId = "638763b4706ade847b664771";
    const find = await repository.update(roomId, 5, 11);
    expect(find).toBeTruthy;
  });
});

describe("Rainy case: test", () => {
  it("Test create Room failed", async () => {
    try {
      await repository.create("a");
    } catch (err) {
      expect(err).toMatch("error");
    }
    expect(console.error).toHaveBeenCalled();
  });
  it("Test update Room failed", async () => {
    try {
      await repository.update("638187f532bf4710f96ee1", data);
    } catch (err) {
      expect(err).toMatch("error");
    }
    expect(console.error).toHaveBeenCalled();
  });
  it("Test del Room failed", async () => {
    try {
      await repository.deleteRoom("638d6cf2a");
    } catch (err) {
      expect(err).toMatch("error");
    }
    expect(console.error).toHaveBeenCalled();
  });
  it("Test find room failed", async () => {
    await DB.disconnectDatabase();
    const roomNumber = 1;
    await repository.findOne(roomNumber);
    expect(console.error).toHaveBeenCalled();
  });
  it("Test find all room failed", async () => {
    await DB.disconnectDatabase();
    const options = { limit: 10, page: 1 };
    await repository.findAll(options);
    expect(console.error).toHaveBeenCalled();
  });
  it("Test find all room with filter failed", async () => {
    await DB.disconnectDatabase();
    const type = "internal diseases";
    const isPrioritized = true;
    const options = { limit: 10, page: 1 };
    const find = await repository.findAllFilter(options, type, isPrioritized);
    expect(console.error).toHaveBeenCalled();
  });
});

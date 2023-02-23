const Repository = require("../Repository/RoomRepository");
const amqp = require("amqplib");
const RoomService = require("../service/RoomService");

let channel,
  channel1,
  result = true;

async function connect() {
  const amqpServer = "amqp://localhost:5672";
  const connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("GetRoomNumber", {
    timeout: 500,
  });

  channel1 = await connection.createChannel();
  await channel1.assertQueue("UpdateRoom", {
    timeout: 500,
  });
}

connect().then(() => {
  channel.consume("GetRoomNumber", async (data) => {
    channel.ack(data);
    const { isPrioritized, type } = JSON.parse(data.content);
    const dataPush = await GetNumber(isPrioritized, type);

    await channel.sendToQueue(
      "TakeRoomNumber",
      Buffer.from(
        JSON.stringify({
          currentNumber: dataPush.currentNumber,
          waitNumber: dataPush.waitNumber,
          RoomNumber: dataPush.RoomNumber,
        })
      )
    );
  });
  channel1.consume("UpdateRoom", async (data) => {
    channel1.ack(data);
    const { RoomNumber, waitNumber } = JSON.parse(data.content);
    await UpdateRoom(RoomNumber, waitNumber);

    await channel1.sendToQueue(
      "SendUpdateRoom",
      Buffer.from(
        JSON.stringify({
          result: result,
        })
      )
    );
  });
});

const GetNumber = async (isPrioritized, type) => {
  const room = await Repository.findAllNotPaginated(isPrioritized, type);

  var currentNumber = room[0].CurrentNumber;
  var waitNumber = room[0].TotalNumber;
  var RoomNumber = room[0].roomNumber;
  var RoomID = room[0]._id;
  for (let i = 0; i <= room.length - 2; i++) {
    if (waitNumber > room[i + 1].TotalNumber) {
      currentNumber = room[i + 1].CurrentNumber;
      waitNumber = room[i + 1].TotalNumber;
      RoomNumber = room[i + 1].roomNumber;
      RoomID = room[i + 1]._id;
    }
  }
  waitNumber += 1;
  const dataPush = {
    currentNumber,
    waitNumber,
    RoomNumber,
    RoomID,
  };

  return dataPush;
};

const UpdateRoom = async (RoomNumber, waitNumber) => {
  const update = await Repository.updateWait(RoomNumber, waitNumber);
  if (!update) {
    result = false;
  }
};

const Create = async (req, res, next) => {
  await RoomService.checkNull(req.body);

  await RoomService.checkDatabase(req.body.roomNumber);

  const create = await RoomService.checkDatabase(req.body);

  return res.status(200).send(create);
};

const findAll = async (req, res, next) => {
  const { page = 1, limit = 5 } = req.params;
  const room = await Repository.findAll({ page, limit });
  return res.status(200).send(room);
};

const findAllFilter = async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;
  const { isPrioritized, type } = req.body;

  if (!type || !isPrioritized)
    return res.status(403).send("Please select filter information");

  const room = await Repository.findAllFilter(
    { page, limit },
    type,
    isPrioritized
  );
  return res.status(200).send(room);
};

const Update = async (req, res, next) => {
  const data = await RoomService.checkDatabase(req.body);

  await RoomService.checkNullDatabase(req.body.roomNumber);

  const create = await Repository.updateWait(req.body.roomNumber, data);

  return res.status(200).send(create);
};

module.exports = {
  Create,
  findAll,
  findAllFilter,
  Update,
};

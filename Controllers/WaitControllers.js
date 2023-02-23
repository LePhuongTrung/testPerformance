const WaitRepository = require("../Repository/WaitRepository");
const amqp = require("amqplib");
const handlerTime = require("../service/handleTimeService");

var amqpServer = "amqp://localhost:5672";

const getNumber = async (req, res, next) => {
  try {
    let current_day, hours, minutes;

    current_day = date.getDay();
    hours = date.getHours();
    minutes = date.getMinutes();

    const day_name = handlerTime.checkDay(current_day);

    const { isPrioritized, type } = req.body;
    if (handlerTime.checkHoliday(day_name, type) == true)
      return res.status(200).send("today is holiday");

    if (hours < 7 || hours > 17 || 11 >= hours >= 13)
      return res.status(200).send("Outside working hours");

    const Wait = await WaitRepository.findOneById(req.UID);
    if (Wait) {
      return res
        .status(403)
        .send(
          "you have taken the number, please complete the medical examination"
        );
    }

    const TakeWait = await CheckRoom(isPrioritized, type);
    if (TakeWait) return res.status(500).send("Can't check room");
    let timeRemaining = handlerTime.calculateTimeRemaining(hours, minutes);

    const timeWait = handlerTime.calculateTimeWait(
      TakeWait.waitNumber,
      TakeWait.currentNumber,
      timeRemaining
    );

    if (timeWait == 999999)
      return res.status(200).send("The day is full of examination time");
    const dataCreate = {
      UID: req.UID,
      numericalOrder: TakeWait.waitNumber,
      RoomId: TakeWait.RoomNumber,
    };
    const EnterWait = await WaitRepository.create(dataCreate);
    if (!EnterWait)
      return res.status(500).send("Wait Controller Internal server error");

    const resultChangeRoom = await UpdateRoom(
      TakeWait.RoomNumber,
      TakeWait.waitNumber
    );

    if (resultChangeRoom === false)
      return res.status(500).send("Room server error");

    return res.status(200).send(dataCreate);
  } catch (err) {
    console.error("🚀 ~ file: WaitControllers.js:99 ~ getNumber ~ err", err);
    next(err);
  }
};

const CheckRoom = async function (isPrioritized, type) {
  let TakeWait;

  const connection = await amqp.connect(amqpServer);
  const channel = await connection.createChannel();
  console.log(" Start Server");
  await channel.assertQueue("TakeRoomNumber");

  channel.sendToQueue(
    "GetRoomNumber",
    Buffer.from(
      JSON.stringify({
        isPrioritized: isPrioritized,
        type: type,
      })
    )
  );

  let consumeTimeout = setTimeout(() => {
    console.log(" [x] Timeout reached. No more messages to consume.");
    TakeWait = true;
  }, 3000);
  while (!TakeWait) {
    await channel.consume("TakeRoomNumber", (data) => {
      clearTimeout(consumeTimeout);
      TakeWait = JSON.parse(data.content);
      channel.ack(data);
      channel.close();
    });
  }
  channel.close();
  return TakeWait;
};

const UpdateRoom = async function (RoomNumber, waitNumber) {
  const connection = await amqp.connect(amqpServer);
  const channel1 = await connection.createChannel();
  await channel1.assertQueue("SendUpdateRoom");
  channel1.sendToQueue(
    "UpdateRoom",
    Buffer.from(
      JSON.stringify({
        RoomNumber: RoomNumber,
        waitNumber: waitNumber,
      })
    )
  );

  let consumeTimeout = setTimeout(() => {
    console.log(" [x] Timeout reached. No more messages to consume.");
    resultRoom = true;
  }, 3000);

  var resultRoom;
  while (!resultRoom) {
    await channel1.consume("SendUpdateRoom", (data) => {
      clearTimeout(consumeTimeout);
      channel1.ack(data);
      resultRoom = JSON.parse(data.content);
      channel1.close();
    });
  }
  if (typeof resultRoom === "boolean") return false;
  return true;
};

const nextNumber = async (req, res, next) => {
  try {
    if (!req.body.RoomId || !req.body.numericalOrder) {
      return res.status(403).send("please enter all request");
    }
    const wait = await WaitRepository.findOne(
      req.body.RoomId,
      req.body.numericalOrder
    );
    if (!wait) {
      return res.status(404).send("The wait order not found");
    }
    const UID = wait.UID;
    const RoomId = wait.RoomId;

    const resultSend = await SendNotification(UID, RoomId);
    if (resultSend == false) return res.status(500).send("Send Mail fail");
    return res.status(200).send("oke");
  } catch (error) {
    console.error(
      "🚀 ~ file: WaitControllers.js:145 ~ nextNumber ~ error",
      error
    );
  }
};

const SendNotification = async function (UID, RoomId) {
  const connection = await amqp.connect(amqpServer);
  const channel2 = await connection.createChannel();
  console.log("start send");
  await channel2.assertQueue("SendNotification");
  channel2.sendToQueue(
    "SendMail",
    Buffer.from(
      JSON.stringify({
        UID: UID,
        RoomId: RoomId,
      })
    )
  );

  let consumeTimeout = setTimeout(() => {
    console.log(" [x] Timeout reached. No more messages to consume.");
    ResultSend = true;
  }, 3000);
  var ResultSend;
  while (!ResultSend) {
    await channel2.consume("SendNotification", (data) => {
      clearTimeout(consumeTimeout);
      channel2.ack(data);
      const { result } = JSON.parse(data.content);
      ResultSend = result;
      channel2.close();
    });
  }
  channel2.close();
  if (typeof ResultSend === "boolean") {
    return false;
  }
  return true;
};
module.exports = {
  getNumber,
  nextNumber,
};

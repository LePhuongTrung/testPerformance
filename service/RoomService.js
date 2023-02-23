const RoomRepository = require("../Repository/RoomRepository");
const ApiError = require("../utils/ApiError");

const checkNull = async (data) => {
  if (!data.roomNumber || !data.DoctorName) {
    throw new ApiError(403, "Missing required information");
  }
};

const checkDatabase = async (roomNumber) => {
  const find = await RoomRepository.findOne(roomNumber);
  if (find) {
    throw new ApiError(403, "This room is already in the data");
  }
};

const checkNullDatabase = async (roomNumber) => {
  const find = await RoomRepository.findOne(roomNumber);
  if (!find) {
    throw new ApiError(403, "This room not already exits");
  }
};

const addToDatabase = async (data) => {
  const create = await Repository.create({
    roomNumber: data.roomNumber,
    type: data.type,
    DoctorName: data.DoctorName,
    isPrioritized: data.isPrioritized,
  });
  if (!create) {
    throw new ApiError(500, "Service error");
  }
  return create;
};

const handlerData = async (data) => {
  let Data = {};
  if (req.body.roomNumber) {
    Data = { ...Data, roomNumber: data.roomNumber };
  }
  if (req.body.DoctorName) {
    Data = { ...Data, DoctorName: data.DoctorName };
  }
  if (req.body.type) {
    Data = { ...Data, type: data.type };
  }
  if (req.body.isPrioritized) {
    Data = { ...Data, isPrioritized: data.isPrioritized };
  }
  return data;
};
module.exports = {
  checkNull,
  checkDatabase,
  addToDatabase,
  handlerData,
  checkNullDatabase,
};

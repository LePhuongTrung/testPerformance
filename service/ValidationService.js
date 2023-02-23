const RoomRepository = require("../Repository/RoomRepository");
const ApiError = require("../utils/ApiError");

const checkNull = async (data) => {
  if (!data.name || !data.type) {
    throw new ApiError(403, "Missing required information");
  }
};

const checkDatabase = async (name) => {
  const find = await RoomRepository.findOne(name);
  if (find) {
    throw new ApiError(403, "This disease is already in the data");
  }
};

const addToDatabase = async (data) => {
  const create = await RoomRepository.create({
    name: data.name,
    type: data.type,
  });
  if (!create) {
    throw new ApiError(500, "Service error");
  }
  return create;
};
module.exports = {
  checkNull,
  checkDatabase,
  addToDatabase,
};

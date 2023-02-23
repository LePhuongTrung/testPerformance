const model = require("../Database/Models/Room");

const create = async (data) => {
  try {
    const created = await model.create(data);
    return created;
  } catch (err) {
    console.error("🚀 ~ file: RoomRepository.js:15 ~ create ~ err", err);
    return err;
  }
};

const findOne = async (roomNumber) => {
  try {
    const read = await model.findOne({ roomNumber: roomNumber });
    return read;
  } catch (err) {
    console.error(
      "🚀 ~ file: SickRepository.js ~ line 20 ~ findOne ~ err",
      err
    );
    return err;
  }
};

const findAll = async (options) => {
  try {
    const room = await model.paginate({}, options);
    return room;
  } catch (err) {
    console.error("🚀 ~ file: RoomRepository.js:34 ~ findAll ~ err", err);
    return err;
  }
};

const findAllNotPaginated = async (isPrioritized, type) => {
  try {
    const room = await model.find({
      isPrioritized: isPrioritized,
      type: type,
    });

    return room;
  } catch (err) {
    console.error(
      "🚀 ~ file: RoomRepository.js:43 ~ findAllNotPaginated ~ err",
      err
    );
    return err;
  }
};

const findAllFilter = async (options, type, isPrioritized) => {
  try {
    const room = await model.paginate(
      { type: type, isPrioritized: isPrioritized },
      options
    );
    return room;
  } catch (err) {
    console.error("🚀 ~ file: RoomRepository.js:32 ~ findAll ~ err", err);
    return err;
  }
};

const updateWait = async (roomNumber, data) => {
  try {
    const updated = await model.findOneAndUpdate(
      { roomNumber: roomNumber },
      data
    );
    return updated;
  } catch (err) {
    console.error("🚀 ~ file: RoomRepository.js:76 ~ updateWait ~ err", err);
    return err;
  }
};

const deleteRoom = async (id) => {
  try {
    const del = await model.findByIdAndDelete(id);
    return del;
  } catch (err) {
    console.error(
      "🚀 ~ file: SickRepository.js ~ line 37 ~ deleteSick ~ err",
      err
    );
    return err;
  }
};

module.exports = {
  create,
  findOne,
  deleteRoom,
  findAll,
  findAllFilter,
  findAllNotPaginated,
  updateWait,
};

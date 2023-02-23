const model = require("../Database/Models/Wait");

const create = async (data) => {
  try {
    const created = await model.create(data);
    return created;
  } catch (err) {
    console.error("🚀 ~ file: WaitRepository.js:12 ~ create ~ err", err);
    return err;
  }
};

const findOne = async (RoomId, numericalOrder) => {
  try {
    const read = await model.findOne({
      RoomId: RoomId,
      numericalOrder: numericalOrder,
    });
    return read;
  } catch (err) {
    console.error("🚀 ~ file: WaitRepository.js:21 ~ findOne ~ err", err);
    return err;
  }
};

const findOneById = async (UID) => {
  try {
    const read = await model.findOne({ UID: UID });
    return read;
  } catch (err) {
    console.error("🚀 ~ file: WaitRepository.js:21 ~ findOne ~ err", err);
    return err;
  }
};

const deleteWait = async (id) => {
  try {
    const del = await model.findByIdAndDelete(id);
    return del;
  } catch (err) {
    console.error("🚀 ~ file: WaitRepository.js:30 ~ deleteWait ~ err", err);
    return err;
  }
};

const update = async (UID, MedicalForm) => {
  try {
    const update = await model.findOneAndUpdate(
      { UID: UID },
      { MedicalForm: MedicalForm }
    );
    return update;
  } catch (err) {
    console.error("🚀 ~ file: mistakeRepository.js:29 ~ update ~ err", err);
    return err;
  }
};

module.exports = {
  create,
  deleteWait,
  findOne,
  update,
  findOneById,
};

const serviceModel = require("../model/service.model");
const { v4: uuidv4 } = require("uuid");

const getAll = async () => {
  try {
    const services = await serviceModel.find();
    return services;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const get = async (id) => {
  try {
    const services = await serviceModel.findById(id);
    return services;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const createService = async (data) => {
  console.log(data);
  try {
    const id = uuidv4();
    const newService = new serviceModel({ id, ...data });
    const services = await newService.save();
    return services;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const editService = async (id, data) => {
  console.log(id);
  try {
    const services = await serviceModel.findByIdAndUpdate(id, data);
    return services;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const deleteService = async (id) => {
  console.log(id);
  try {
    const services = await serviceModel.findOneAndDelete(id);
    return services;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getAll,
  get,
  createService,
  editService,
  deleteService,
};

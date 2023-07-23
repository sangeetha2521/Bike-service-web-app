const services = require("../service/services.service");

const getAllServices = async (req, res) => {
  const service = await services.getAll();
  res.status(200).send({ meta: 200, service });
};
const getService = async (req, res) => {
  const service = await services.get(req.params.id);
  res.status(200).send({ meta: 200, service });
};
const createService = async (req, res) => {
  const service = await services.createService(req.body);
  res.status(200).send({ meta: 200, service });
};

const editService = async (req, res) => {
  console.log(req);
  const service = await services.editService(req.params.id, req.body);
  res.status(200).send({ meta: 200, service });
};
const deleteService = async (req, res) => {
  const service = await services.deleteService(req.params.id);
  res.status(200).send({ meta: 200, service });
};

module.exports = {
  getAllServices,
  getService,
  createService,
  editService,
  deleteService,
};

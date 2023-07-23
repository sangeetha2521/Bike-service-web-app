const express = require("express");
const serviceController = require("../controller/service.controller");
const { authorization } = require("../service/auth.service");

const router = express.Router();

router.get("/", authorization, serviceController.getAllServices);
router.post("/", authorization, serviceController.createService);
router.get("/:id", authorization, serviceController.getService);
router.put("/:id", authorization, serviceController.editService);
router.delete("/:id", authorization, serviceController.deleteService);

module.exports = router;

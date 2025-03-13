import User from "../manager/dao/mongo/models/user.model.js";
import usersService from "../services/user.service.js";
const createUser = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await usersService.createUser(data);
      return res.status(201).json({ message: "Created", response });
    } catch (error) {
      next(error);
    }
  };
  const readAllUser = async (req, res, next) => {
    try {
      const response = await usersService.readAllUser();
      return res.status(200).json({ message: "Read", response });
    } catch (error) {
      next(error);
    }
  };
  const readOneUser = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const response = await usersService.readOneUser(uid);
      return res.status(200).json({ message: "Read by id", response });
    } catch (error) {
      next(error);
    }
  };
  const updateOneUser = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const data = req.body;
      const opt = { new: true };
      const response = await usersService.updateUser(uid, data, opt);
      return res.status(200).json({ message: "Updated", response });
    } catch (error) {
      next(error);
    }
  };
  const destroyOneUser = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const response = await usersService.deleteUser(uid);
      return res.status(200).json({ message: "Deleted", response });
    } catch (error) {
      return next(error);
    }
  };
  export { createUser, readAllUser, readOneUser, updateOneUser, destroyOneUser}
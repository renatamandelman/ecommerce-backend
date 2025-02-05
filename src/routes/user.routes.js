import { Router } from "express";
import User from "../models/user.model.js";

const usersRouter = Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await User.create(data);
    return res.status(201).json({ message: "Created", response });
  } catch (error) {
    next(error);
  }
});
usersRouter.get("/", async (req, res, next) => {
  try {
    const response = await User.find();
    return res.status(200).json({ message: "Read", response });
  } catch (error) {
    next(error);
  }
});
usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await User.findById(uid);
    return res.status(200).json({ message: "Read by id", response });
  } catch (error) {
    next(error);
  }
});
usersRouter.put("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const opt = { new: true };
    const response = await User.findByIdAndUpdate(uid, data, opt);
    return res.status(200).json({ message: "Updated", response });
  } catch (error) {
    next(error);
  }
});
usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await User.findByIdAndDelete(uid);
    return res.status(200).json({ message: "Deleted", response });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
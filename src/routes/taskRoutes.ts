import express from "express";
import {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  toggleTaskStatus,
} from "../controllers/taskController";

const router = express.Router();

router.get("/tasks", getTasks);
router.post("/tasks", addTask);
router.delete("/tasks/:id", deleteTask);
router.put("/tasks/:id", updateTask);
router.put("/status/:id", toggleTaskStatus);

export default router;

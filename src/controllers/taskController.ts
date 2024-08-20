import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { readTasksFromFile, saveTasksToFile, Task } from "../models/Task";

export const getTasks = (req: Request, res: Response) => {
  const tasks = readTasksFromFile();
  const { search } = req.query;
  const filteredTasks = search
    ? tasks.filter((task) => task.title.includes(search as string))
    : tasks;
  res.json(filteredTasks);
};

export const addTask = (req: Request, res: Response) => {
  try {
    const tasks = readTasksFromFile();

    const { title } = req.body;

    const isNewtask = tasks.filter((task) => task.title === title);
    if (isNewtask.length === 0) {
      const newTask: Task = {
        id: uuidv4(),
        title,
        status: false,
      };

      tasks.push(newTask);
      saveTasksToFile(tasks);
      res.status(201).json(newTask);
    } else {
      res.status(404).send({
        error: "Already exist this task",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = (req: Request, res: Response) => {
  const { id } = req.params;
  let tasks = readTasksFromFile();
  tasks = tasks.filter((task) => task.id !== id);
  saveTasksToFile(tasks);
  res.status(201).json(tasks);
};

export const updateTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;

  const tasks = readTasksFromFile();
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex !== -1) {
    tasks[taskIndex].title = title;
    saveTasksToFile(tasks);
    res.status(201).json(tasks[taskIndex]);
    console.log(`Task with id ${id} updated.`);
  } else {
    console.log(`Task with id ${id} not found.`);
  }
};

export const toggleTaskStatus = (req: Request, res: Response) => {
  const { id } = req.params;

  const tasks = readTasksFromFile();
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex !== -1) {
    tasks[taskIndex].status = !tasks[taskIndex].status;
    saveTasksToFile(tasks);
    res.status(201).json(tasks[taskIndex]);
    console.log(`Task with id ${id} done.`);
  } else {
    console.log(`Task with id ${id} not done.`);
  }
};

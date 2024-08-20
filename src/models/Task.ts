import fs from "fs";
import path from "path";

interface Task {
  id: string;
  title: string;
  status: boolean;
}

const filePath = path.join(__dirname, "tasks.json");

// Read and Parse JSON File
function readTasksFromFile(): Task[] {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading file:", err);
    return [];
  }
}

// Write and Save to JSON File
function saveTasksToFile(tasks: Task[]) {
  try {
    const jsonData = JSON.stringify(tasks, null, 2);
    fs.writeFileSync(filePath, jsonData, "utf8");
  } catch (err) {
    console.error("Error writing file:", err);
  }
}

export { readTasksFromFile, saveTasksToFile, Task };

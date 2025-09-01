import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 4001;

let tasks = [];

const router = express.Router();

router.get("/tasks", (req, res) => {
  res.json(tasks);
});

router.post("/tasks/add", (req, res) => {
  const { title, description } = req.body || {};
  const id = tasks.at(-1)?.id + 1 || 1;
  tasks.push({ id, title, description });
  res.status(201).json("Task successfully added.");
});

router.delete("/tasks/delete/:id", (req, res) => {
  const { id } = req.params || {};
  const taskIndex = tasks?.findIndex(task => task?.id === Number(id));
  if (taskIndex < 0) {
    res.status(404).json("Task not found.");
    return;
  }
  tasks.splice(taskIndex, 1);
  res.status(200).json("Task successfully deleted.");
});

app.use("/api", router);
app.listen(port, () => console.log(`Server is running on port ${port}`));

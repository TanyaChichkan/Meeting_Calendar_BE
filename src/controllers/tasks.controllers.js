const TasksDB = require('../model/tasks.model');
const transformReqBody = require('../helpers/helpers').transformReqTask;
const findMissingField = require('../helpers/helpers').findMissingValue;
const sortTasks = require('../helpers/helpers').sortTasksByStartAndDuration;

const getTasksContr = async (req, res, next) => {
  try {
    const userId = req.userId;
    const tasks = await TasksDB.getTasks(userId);
    const sortedTasks = sortTasks(tasks);
    res.json({
      status: 200,
      message: 'List of tasks',
      data: sortedTasks,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const createTaskContr = async (req, res, next) => {
  const { body } = req;
  const { startTime, finishTime, title } = body;
  console.log(req.userId);

  if (title && startTime && finishTime) {
    const taskTransformed = transformReqBody(body);
    try {
      const userId = req.userId;
      const newTask = await TasksDB.createTask(userId, taskTransformed);
      const tasks = await TasksDB.getTasks(userId);
      console.log(tasks);
      const sortedTasks = sortTasks(tasks);
      res.json({
        status: 201,
        message: 'Task added',
        data: { newTask, tasks: sortedTasks },
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  } else {
    const missingField = findMissingField(startTime, finishTime, title);
    res.json({
      status: 400,
      body,
      message: `missing ${missingField} field(s)`,
    });
  }
};

const deleteTaskContr = async (req, res, next) => {
  const { taskId } = req.params;
  console.log(taskId);

  try {
    const userId = req.userId;
    console.log(userId);
    const index = await TasksDB.deleteTask(userId, taskId);
    console.log(index);

    index !== -1
      ? res.json({
          status: 200,
          message: 'Task deleted',
        })
      : res.json({
          status: 404,
          message: 'Not found',
        });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = {
  getTasksContr,
  deleteTaskContr,
  createTaskContr,
};

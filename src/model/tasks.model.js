const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is missing'],
      unique: false,
    },
    start: {
      type: String,
      required: [true, 'Start is missing'],
      unique: false,
    },
    duration: {
      type: String,
      unique: false,
      required: [true, 'Duration  is missing'],
    },

    token: {
      type: 'String',
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: false }
);

class Task {
  constructor() {
    this.db = mongoose.model('Tasks', taskSchema);
  }

  getTasks = async (userId) => {
    return await this.db.find({ owner: userId });
  };

  createTask = async (userId, userData) => {
    return await this.db.create({ ...userData, owner: userId });
  };

  deleteTask = async (userId, taskID) => {
    return await this.db.findByIdAndRemove({ _id: taskID, owner: userId });
  };

  findUserByEmail = async (query) => {
    return await this.db.findOne(query);
  };

  findUserById = async (id) => {
    return await this.db.findById(id);
  };
}

const task = new Task();
module.exports = task;

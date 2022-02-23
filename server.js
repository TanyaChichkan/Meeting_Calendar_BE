const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8081;
const { connectMongo } = require('./src/db/connection');
const tasksRouter = require('./src/api-routes/tasks.routes');
const authRouter = require('./src/api-routes/users.routes');

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

const start = async () => {
  try {
    await connectMongo();
    app.use('/auth', authRouter);
    app.use('/api/tasks', tasksRouter);

    app.use((req, res) => {
      res.status(404).json({ message: 'Task is not found' });
    });

    app.use((err, req, res, next) => {
      res.status(500).json({ message: err.message });
    });

    app.listen(PORT, (err) => {
      if (err) console.log('Error at server launch, err');
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    process.exit(1);
  }
};

start();

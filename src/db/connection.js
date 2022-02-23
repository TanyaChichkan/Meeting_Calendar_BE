const mongoose = require('mongoose');
require('dotenv').config();

const connectMongo = async () => {
  try {
    //Connection to MongoDB
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
    console.log('Database connection is successful');
  } catch (err) {
    process.exit(1);
  }
};

module.exports = { connectMongo };

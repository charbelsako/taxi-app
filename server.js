const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth/authRouter');
const userRouter = require('./routes/user');
const customerRouter = require('./routes/customer');

const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');

const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@gymappcluster.rs63kkd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const options = {
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
};

mongoose
  .connect(mongoURI, options)
  .then(() => {
    console.log('Connected to Mongodb');
  })
  .catch(err => console.log(err));

const app = express();

app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/auth/', authRouter);
app.use('/api/v1/user/', userRouter);
app.use('/api/v1/customer/', customerRouter);

if (process.env.NODE_ENV === 'production') {
  console.log('production mode');
  app.use(express.static('client/build'));
  // console.log(path.resolve(__dirname, "client/", "build/", "index.html"))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/', 'build/', 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on: http://localhost:${PORT}`);
});

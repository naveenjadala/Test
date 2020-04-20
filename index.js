const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

dotenv.config();

const userRouter = require('./router/user.router');

mongoose.connect(process.env.MONGO_URI,
    { useUnifiedTopology: true, useNewUrlParser: true,  useFindAndModify: false  })
    .then(() =>  console.log("DB Connected"))
    .catch(v => console.log(v));

mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err}`)
})

const port = process.env.PORT || 8080
app.listen(port, console.log(`${port}`));

app.use(bodyParser.json());
app.use("/", userRouter)
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({ message:'Unauthorized...' });
    }
  });


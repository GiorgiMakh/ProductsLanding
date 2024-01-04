const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
require("dotenv").config();

PORT = process.env.PORT || 3000;

// Configuring Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Allow access to public files
app.use('/public',express.static(path.join(__dirname, 'public')));

// Importing Router
app.use("/api/", require("./routes/IndexRouter.js"));

// Invalid Page handler
app.get('*', (req, res) => {
  res.status(404).send('404: Page Not Found');
});  

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// Author: GiorgiMakh

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
var fs = require('fs')
//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;
app.use(cookieParser());
app.use(cors());

app.use(express.json({limit: '50mb', type:'image/png'}));
app.use(express.urlencoded({limit: '50mb',type:'image/png'}));


app.use("/images",express.static("images"))
app.use("/uploads",express.static("uploads"))
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const volcanoesRouter = require('./routes/volcanoes');
app.use('/volcanoes', volcanoesRouter);
app.use('/users', require('./routes/users'));
app.use('/upload',require('./routes/upload'));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

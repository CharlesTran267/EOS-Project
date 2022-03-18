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

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


app.use("/images",express.static("images"))
app.use("/uploads",express.static("uploads"))
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
let{Volcano,Volcano2} = require("./models/volcano")
renameList = {
    "vd_cavw": "volc_cavw",
    "vd_tzone": "volc_tzone",
    "vd_mcont": "volc_mcont",
    "vd_com": "volc_com",
    "vd_inf_status": "volc_inf_status",
    "vd_inf_desc": "volc_inf_desc",
    "vd_inf_slat": "volc_inf_slat",
    "vd_inf_slon": "volc_inf_slon",
    "vd_inf_selev": "volc_inf_selev",
    "vd_inf_type": "volc_inf_type",
    "vd_inf_country": "volc_inf_country",
    "vd_inf_subreg": "volc_inf_subreg",
    "vd_inf_loc": "volc_inf_loc",
    "vd_inf_rtype": "volc_inf_rtype",
    "vd_inf_evol": "volc_inf_evol",
    "vd_inf_numcald": "volc_inf_numcald",
    "vd_inf_lcald_dia": "volc_inf_lcald_dia",
    "vd_inf_ycald_lat": "volc_inf_ycald_lat",
    "vd_inf_ycald_lon": "volc_inf_ycald_lon",
    "vd_inf_com": "volc_inf_com",
}
Volcano.updateMany({}, { $rename: renameList }, function(err, blocks) {
    if(err) { throw err; }
    console.log('done!');
});
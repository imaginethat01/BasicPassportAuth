// Mongoose Connection

const mongoose = require('mongoose');

var castle = process.env.camelot;
mongoose.connect(castle);

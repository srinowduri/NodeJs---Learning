// this file is used to create schema (structure) of the Database

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    level: {
        type: String
    },
    emailId: {
        type: String
    },
    phoneNum: {
        type: String
    }
})

const studentmodel = mongoose.model('students', studentSchema);
module.exports = studentmodel;


const express = require('express');
const app = express();
const port = 1000;
const mongoose = require('mongoose');
const Student = require('./student-model/student');

// use it before all route definitions
// app.use(cors({origin: 'http://localhost:2000'}));
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.listen(port, console.log(`Listening on port ${port}....`));

mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://localhost/students', {useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connecte to MongoDB...', err))

// const studentSchema = new mongoose.Schema({
//     name: {
//         type: String
//     },
//     level: {
//         type: String
//     },
//     emailId: {
//         type: String
//     },
//     phoneNum: {
//         type: String
//     },
//     date: {type: Date, default: Date.now},

// })

// const Student = mongoose.model('Student', studentSchema);

/* Creat and post request of students */
async function createStudent(stud) {
    // console.log('frontendStudent ' + JSON.stringify(stud));

    const student = new Student(stud);

    const result = await student.save();
    // const b = null;
    // console.log(result._id);

    return result;
    
}


app.post('/api/students', (req, res) => {
// console.log("**********in the POST request method**********");
    const student = {
        name: req.body.name,
        level: req.body.level,
        emailId: req.body.emailId,
        phoneNum: req.body.phoneNum
    }
    // res.send(createStudent(student));
    // console.log('*********  : '  + JSON.stringify(student));
     createStudent(student).then(a => {
        res.send(a);
     });
});


/* get request of students and getting student details */

async function getStudents() {
    let frontendStudents = [];
    const students = await Student.find(); 
    // console.log(students);
//    students.forEach(student => console.log('student id is: ' + student._id));
students.forEach(std => {
        const students = {
            id: std._id,
            name: std.name,
            level: std.level,
            emailId: std.emailId,
            phoneNum: std.phoneNum
        } 
        frontendStudents.push(students);
    });
        console.log(frontendStudents);
    return frontendStudents;   
}

// getStudents();

async function getStudentswithId(id) {
    const student = await Student.findById(id);
    // console.log(JSON.stringify(student));
    return student;
}

// getStudentswithId("6008d98a1fadca9364191033");

app.get('/api/students/:id', (req, res) => {
        getStudentswithId(req.params.id).then(std => {
        console.log(JSON.stringify(std));
        res.send(std);
    });
})

app.get('/api/students', (req, res) => {
    getStudents().then(stds => {
        res.send(stds);
    });
})


/* Update a student and put request */
async function updateStudent(std){
    // console.log('###########  this is update method #$$$$###########' + JSON.stringify(std));
    const student = await Student.findById({_id: std.id});
    console.log(JSON.stringify(student));
  
    student.name = std.name;
    student.level = std.level;
    student.emailId = std.emailId;
    student.phoneNum = std.phoneNum;

    const updatedStudent = student.save();
    return updatedStudent;
}

app.put('/api/students', (req, res) => {
    
        const student = {
            id: req.body._id,
            name: req.body.name,
            level: req.body.level,
            emailId: req.body.emailId,
            phoneNum: req.body.phoneNum
        }
         updateStudent(student).then(a => {
            res.send(a);
            // console.log('put request: ' + a);
         });

    });

async function removeStudent(id){
    const student = await Student.findByIdAndRemove(id, {useFindAndModify: false});
    // console.log(JSON.stringify(student));
}

// removeStudent('5fe26783247df6606c78f186');

app.delete('/api/students/:id', (req, res) => {
    console.log('############## student id: ' + req.params.id);
    removeStudent(req.params.id)
        .then(() => {
            res.send('Student deleted successfully');
        })
})

// anguar

// url = "http://localhost:8080/api/students/" + studentId
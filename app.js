import {StudentsDatabase} from "./student.js";
import { CoursesDatabase } from "./course.js";

import studentsJSON from "./database/students.json" assert {type:'json'};
import coursesJSON from "./database/courses.json" assert {type:'json'};


const students = new StudentsDatabase(studentsJSON);
const deniz = students.getStudentById(200709020);

const courses = new CoursesDatabase(coursesJSON);
import {StudentsDatabase} from "./StudentDatabase.js";
import { CoursesDatabase } from "./CourseDatabase.js";






const students = new StudentsDatabase();
const deniz = students.getStudentById(200709020);
console.log(deniz.getStudentDetails(true));
console.log(students.getStudentsByName("Deniz"));
console.log(deniz.getTotalActs());







const courses = new CoursesDatabase();
const ai = courses.getCourseById(7);
console.log(ai.getStudents());
console.log(ai.getAverageScore());
console.log(courses.getCoursesByInstructor("Özgür Kılıç"));

import studentsJSON from "./database/students.json" assert {type:'json'};
import coursesJSON from "./database/courses.json" assert {type:'json'};

import {StudentsDatabase} from "./StudentDatabase.js";
import { CoursesDatabase } from "./CourseDatabase.js";

import { studentsHomeMain } from "./students-home.js";
import { getAllStudentsMain } from "./get-all-students.js";
import { coursesHomeMain } from "./courses-home.js";
import { getAllCoursesMain } from "./get-all-courses.js";

// Initializing and instantiating database objects
const studentsDB = new StudentsDatabase();
studentsDB.setStudentsThenUploadToLocalStorage(studentsJSON);
const coursesDB = new CoursesDatabase();
coursesDB.setCoursesThenUploadToLocalStorage(coursesJSON);

/* My own accordion codes */
var accordion = document.getElementsByClassName("accordion");
for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener("click", function() {
        this.classList.toggle("active");

        var panel = this.nextElementSibling;
        if(panel.style.display === "block"){
            panel.style.display = "none";
        }
        else {
            panel.style.display = "block";
        }
    })
}

/* Calling main functions of the different contents */
studentsHomeMain(studentsDB, coursesDB);
getAllStudentsMain(studentsDB);
coursesHomeMain(coursesDB);
getAllCoursesMain(coursesDB);
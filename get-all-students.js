import {StudentsDatabase} from "./StudentDatabase.js";
export function getAllStudentsMain() {
    const studentsDB = new StudentsDatabase();

    /* Get Number of Students Part */
    var lenStudents = studentsDB.getCountOfAllStudents();
    var lenStudentsDiv = document.getElementById("students-length");
    lenStudentsDiv.innerHTML = lenStudents;

    // Get All Of the Students
    var studentsTable = document.getElementById("students-table");
    for (let i = 0; i < lenStudents; i++) {
        const student = studentsDB.students[i];
        var studentInfo = 
        "<tr>" +
        "<td>" + student.studentId + "</td>" +
        "<td>" + student.name + "</td>" +
        "<td>" + student.surname + "</td>" +
        "<td>" + student.getStudentGPA() + "</td>" +
        "</tr>";
        studentsTable.innerHTML += studentInfo;
    }

    var tableRows = document.querySelectorAll("#students-table tr");
    for (let i = 0; i < tableRows.length; i++) {
        if(i%2 == 0){
            tableRows[i].style.backgroundColor = "#dddddd";
        }
    }
}
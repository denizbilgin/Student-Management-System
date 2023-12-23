
export function getAllStudentsMain(studentsDb) {
    var lenStudents = studentsDb.getCountOfAllStudents();
    var lenStudentsDiv = document.getElementById("students-length");
    lenStudentsDiv.innerHTML = lenStudents;

    // Get All Of the Students
    var studentsTable = document.getElementById("students-table");
    for (let i = 0; i < lenStudents; i++) {
        const student = studentsDb.getStudentsFromLocalStorage()[i];
        var studentInfo = 
        "<tr>" +
        "<td>" + student.studentId + "</td>" +
        "<td>" + student.name + "</td>" +
        "<td>" + student.surname + "</td>" +
        "<td>" + student.getStudentGPA() + "</td>" +
        "<td>" + student.getTotalActs() + "</td>" +
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
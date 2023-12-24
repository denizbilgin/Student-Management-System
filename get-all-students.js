
export function getAllStudentsMain(studentsDb) {
    var lenStudents = studentsDb.getCountOfAllStudents();
    var lenStudentsSpan = document.getElementById("students-length");
    lenStudentsSpan.innerHTML = lenStudents;

    var studentsTable = document.getElementById("students-table");
    setStudentsTable(studentsDb.getStudentsFromLocalStorage(), studentsTable);

    const mySearchButton = document.getElementById("my-student-search-button");
    mySearchButton.addEventListener("click", function() {
        searchByStudentNameOrStudentId(studentsDb, studentsTable);
    });

    const myClearButton = document.getElementById("my-student-clear-button");
    myClearButton.addEventListener("click", function(){
        setStudentsTable(studentsDb.getStudentsFromLocalStorage(), studentsTable);
        document.getElementById("student-search-input").value = "";
    });
    
}

function setStudentsTable(students, studentsTable, tableHeader = "<tr>" + "<th>Student ID</th>" + "<th>Name</th>" + "<th>Surname</th>" + "<th>GPA</th>" + "<th>Total ACTS</th>" + "</tr>") {
    studentsTable.innerHTML = "";
    studentsTable.innerHTML += tableHeader;
    for (let i = 0; i < students.length; i++) {
        const student = students[i];
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

function capitalizeWords(input){
    let words = input.split(' ');
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
}

function searchByStudentNameOrStudentId(studentsDb, studentsTable, tableHeader = "<tr>" + "<th>Student ID</th>" + "<th>Name</th>" + "<th>Surname</th>" + "<th>GPA</th>" + "<th>Total ACTS</th>" + "</tr>") {
    studentsTable.innerHTML = "";
    studentsTable.innerHTML += tableHeader;
    var result = undefined;
    var userInput = document.getElementById("student-search-input").value;

    if (userInput) {
        userInput = capitalizeWords(userInput);
        result = studentsDb.getStudentsByName(userInput);
        if (result.length === 0) {
            setStudentsTable(studentsDb.getStudentsFromLocalStorage(), studentsTable);
        }
        else{
            setStudentsTable(result, studentsTable);
        }
    } else {
        setStudentsTable(studentsDb.getStudentsFromLocalStorage(), studentsTable);
    }
}

export function getAllStudentsMain(studentsDb) {
    /*
        This function is the main function of get-all-students page. Also this function includes the get-all-students page's javascript codes
    */

    // This code part sets the length of the students to a spesific span
    var lenStudents = studentsDb.getCountOfAllStudents();
    var lenStudentsSpan = document.getElementById("students-length");
    lenStudentsSpan.innerHTML = lenStudents;

    // This code part initializes students table
    var studentsTable = document.getElementById("students-table");
    setStudentsTable(studentsDb.getStudentsFromLocalStorage(), studentsTable);

    // This code part listens the search progress
    const mySearchButton = document.getElementById("my-student-search-button");
    mySearchButton.addEventListener("click", function() {
        searchByStudentName(studentsDb, studentsTable);
    });

    // This code part listens the clear progress
    const myClearButton = document.getElementById("my-student-clear-button");
    myClearButton.addEventListener("click", function(){
        setStudentsTable(studentsDb.getStudentsFromLocalStorage(), studentsTable);
        document.getElementById("student-search-input").value = "";
    });
    
}

function setStudentsTable(students, studentsTable, tableHeader = "<tr>" + "<th>Student ID</th>" + "<th>Name</th>" + "<th>Surname</th>" + "<th>GPA</th>" + "<th>Total ACTS</th>" + "</tr>") {
    /*
        This function sets students table that's informations comes from the current local storage
    */
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
    /*
        This function capitalizes first character of each word of given string
    */
    let words = input.split(' ');
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
}

function searchByStudentName(studentsDb, studentsTable, tableHeader = "<tr>" + "<th>Student ID</th>" + "<th>Name</th>" + "<th>Surname</th>" + "<th>GPA</th>" + "<th>Total ACTS</th>" + "</tr>") {
    /*
        This function sends given input from the search bar to the database class. Then sets the students table with data that comes from the current local storage
    */
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
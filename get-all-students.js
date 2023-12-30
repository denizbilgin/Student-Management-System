
export function getAllStudentsMain(studentsDb, coursesDB) {
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
        listenStudentsForModal(studentsDb, coursesDB);
    });

    // This code part listens the clear progress
    const myClearButton = document.getElementById("my-student-clear-button");
    myClearButton.addEventListener("click", function(){
        setStudentsTable(studentsDb.getStudentsFromLocalStorage(), studentsTable);
        document.getElementById("student-search-input").value = "";
        listenStudentsForModal(studentsDb, coursesDB);
    });

    listenStudentsForModal(studentsDb, coursesDB);
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
        "<td>" + "<a href='#' class='student-link'>" + student.studentId + "</a></td>" +
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

function listenStudentsForModal(studentsDb, coursesDB){
    /*
        This function listents the link class to show modal
    */
    var studentLinks = document.querySelectorAll(".student-link");
    studentLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            var studentId = parseInt(event.target.textContent);
            var student = studentsDb.getStudentById(studentId);
            var takenCoursesNames = [];
            for (let i = 0; i < student.takenCourses.length; i++) {
                takenCoursesNames.push(coursesDB.getCourseById(student.takenCourses[i]).name);
            }

            var modal = document.getElementById("myModal");
            var span = document.getElementsByClassName("close")[0];
            modal.style.display = "block";

            var modalHeader = document.querySelector(".modal-header");
            var modalHeaderH2 = document.createElement("h2");
            modalHeaderH2.innerHTML += student.name + " " + student.surname + "'s Details";
            modalHeader.appendChild(modalHeaderH2);

            var modalBody = document.querySelector(".modal-body");

            var userInfo = document.createElement("div");
            userInfo.classList.add("user-info");
            userInfo.innerHTML += 
                `
                    <h3 style="text-align:left;">${student.name} ${student.surname}</h3>
                    <i>${student.studentId}</i> <br>
                    <span> GPA: ${student.getStudentGPA()}</span>
                    <br> <br>
                    <h5 style="text-align:left;">Taken Courses & Grades:</h5>
                `;
            var studentDetailsTable = document.createElement("table");
            studentDetailsTable.setAttribute("id","student-details-table");
            studentDetailsTable.classList.add("my-table");
            studentDetailsTable.innerHTML += "<tr>" + "<th>Course Name</th>" + "<th>Midterm Grade</th>" + "<th>Final Grade</th>" + "<th>Letter Grade</th>" + "</tr>";
            studentDetailsTable.style.marginTop = "1rem";
            studentDetailsTable.style.marginLeft = "0rem";
            studentDetailsTable.style.marginRight = "0rem";
            studentDetailsTable.style.width = "80%"

            for (let i = 0; i < takenCoursesNames.length; i++) {
                var newRow = studentDetailsTable.insertRow();

                var courseName = newRow.insertCell(0);
                if (student.calculatePointByScale(student.takenCourses[i]) === "FF" || student.calculatePointByScale(student.takenCourses[i]) === "DD") {
                   courseName.style.color = "red";
                }
                courseName.innerHTML = takenCoursesNames[i];

                var midtermGrade = newRow.insertCell(1);
                midtermGrade.innerHTML = student.getGradesByCourse(student.takenCourses[i])[0];

                var finalGrade = newRow.insertCell(2);
                finalGrade.innerHTML = student.getGradesByCourse(student.takenCourses[i])[1];

                var letterGrade = newRow.insertCell(3);
                letterGrade.innerHTML = student.calculatePointByScale(student.takenCourses[i]);
            }

            userInfo.appendChild(studentDetailsTable);
            modalBody.appendChild(userInfo);

            span.addEventListener("click", function() {
                modal.style.display = "none";
                modalHeaderH2.remove();
                userInfo.remove()
            });

            window.addEventListener("click", function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                    modalHeaderH2.remove();
                    userInfo.remove()
                }
            });
        })
    });
}
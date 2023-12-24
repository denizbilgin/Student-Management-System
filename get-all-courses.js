export function getAllCoursesMain(coursesDb) {
    var lenCourses = coursesDb.getCountOfAllCourses();
    var lenCoursesSpan = document.getElementById("courses-length");
    lenCoursesSpan.innerHTML = lenCourses;

    var coursesTable = document.getElementById("courses-table");
    setCoursesTable(coursesDb.getCoursesFromLocalStorage(), coursesTable);
    

    const mySearchButton = document.getElementById("my-course-search-button");
    mySearchButton.addEventListener("click", function() {
        searchByCourseName(coursesDb, coursesTable);
    });

    const myClearButton = document.getElementById("my-course-clear-button");
    myClearButton.addEventListener("click", function() {
        setCoursesTable(coursesDb.getCoursesFromLocalStorage(), coursesTable);
        document.getElementById("course-search-input").value = "";
    });
}

function setCoursesTable(courses, coursesTable, tableHeader = "<tr>" + "<th>Course ID</th>" + "<th>Course Name</th>" + "<th>Instructor</th>" + "<th>ACTS</th>" + "<th>Midterm & Final Percenty</th>" + "<th>Number of Learners</th>" + "</tr>"){
    coursesTable.innerHTML = "";
    coursesTable.innerHTML += tableHeader;
    for (let i = 0; i < courses.length; i++) {
        const course = courses[i];
        var courseInfo =
            "<tr>" +
            "<td>" + course.courseId + "</td>" +
            "<td>" + course.name + "</td>" +
            "<td>" + course.instructor + "</td>" +
            "<td>" + course.acts + "</td>" +
            "<td>" + course.midtermPercent + "% - " + course.finalPercent + "%</td>" +
            "<td>" + course.getNumberOfStudents() + "</td>" +
            "</tr>";
            coursesTable.innerHTML += courseInfo;
    }

    var tableRows = document.querySelectorAll("#courses-table tr");
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

function searchByCourseName(coursesDb, coursesTable , tableHeader = "<tr>" + "<th>Course ID</th>" + "<th>Course Name</th>" + "<th>Instructor</th>" + "<th>ACTS</th>" + "<th>Midterm & Final Percenty</th>" + "<th>Number of Learners</th>" + "</tr>"){
    coursesTable.innerHTML = "";
    coursesTable.innerHTML += tableHeader;
    var userInput = document.getElementById("course-search-input").value;
    
    if (userInput) {
        userInput = capitalizeWords(userInput);
        var result = coursesDb.getCourseByName(userInput);
        if (result.length === 0) {
            setCoursesTable(coursesDb.getCoursesFromLocalStorage(), coursesTable);
        } else {
            setCoursesTable(result, coursesTable);
        }
    }
    else{
        setCoursesTable(coursesDb.getCoursesFromLocalStorage(), coursesTable);
    }

}
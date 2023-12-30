export function getAllCoursesMain(coursesDb) {
    /*
        This function is the main function of get-all-courses page. Also this function includes the get-all-courses page's javascript codes
    */

    // This code part sets the length of the courses to a spesific span
    var lenCourses = coursesDb.getCountOfAllCourses();
    var lenCoursesSpan = document.getElementById("courses-length");
    lenCoursesSpan.innerHTML = lenCourses;

    // This code part initializes courses table
    var coursesTable = document.getElementById("courses-table");
    setCoursesTable(coursesDb.getCoursesFromLocalStorage(), coursesTable);
    
    // This code part listens the search progress
    const mySearchButton = document.getElementById("my-course-search-button");
    mySearchButton.addEventListener("click", function() {
        searchByCourseName(coursesDb, coursesTable);
    });

    // This code part listens the clear progress
    const myClearButton = document.getElementById("my-course-clear-button");
    myClearButton.addEventListener("click", function() {
        setCoursesTable(coursesDb.getCoursesFromLocalStorage(), coursesTable);
        document.getElementById("course-search-input").value = "";
    });
}

function setCoursesTable(courses, coursesTable, tableHeader = "<tr>" + "<th>Course ID</th>" + "<th>Course Name</th>" + "<th>Instructor</th>" + "<th>ACTS</th>" + "<th>Midterm & Final Percenty</th>" + "<th>Number of Learners</th>" + "<th>Average Score</th>" + "</tr>"){
    /*
        This function sets courses table that's informations comes from the current local storage
    */
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
            "<td>" + course.getNumberOfStudents() + " (" + course.getFailedStudentsCount() + "F/" + (course.getNumberOfStudents()-course.getFailedStudentsCount()) +"P)</td>" +
            "<td>" + course.getAverageScore().toFixed(2) + "</td>" +
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

function searchByCourseName(coursesDb, coursesTable , tableHeader = "<tr>" + "<th>Course ID</th>" + "<th>Course Name</th>" + "<th>Instructor</th>" + "<th>ACTS</th>" + "<th>Midterm & Final Percenty</th>" + "<th>Number of Learners</th>" + "<th>Average Score</th>" + "</tr>"){
    /*
        This function sends given input from the search bar to the database class. Then sets the courses table with data that comes from the current local storage
    */
    coursesTable.innerHTML = "";
    coursesTable.innerHTML += tableHeader;
    var userInput = document.getElementById("course-search-input").value;
    
    if (userInput) {
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
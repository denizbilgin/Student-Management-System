export function coursesHomeMain(coursesDb) {
    /*
        This function is the main function of courses-home page. Also this function includes the courses-home page's javascript codes
    */

    // This code part listens the form's submitting state and then calls add course function
    document.getElementById("course-adding-form").addEventListener("submit", function(event) {
        event.preventDefault();
        courseAddingForm(coursesDb);
        updateGetAllCourses(coursesDb);
    });

    // This code part listens the form's submitting state and then calls update course function
    document.getElementById("course-updating-form").addEventListener("submit", function(event){
        event.preventDefault();
        courseUpdatingForm(coursesDb);
        updateGetAllCourses(coursesDb);
    });

    // This code part listens the form's submitting state and then calls delete course function
    document.getElementById("course-deleting-form").addEventListener("submit", function(event){
        event.preventDefault();
        courseDeletingForm(coursesDb)
        updateGetAllCourses(coursesDb);
    });
}

function updateGetAllCourses(coursesDb){
    /*
        This function updates get-all-courses page (Call this function after adding/updating/deleting a course)
    */
    var lenCourses = coursesDb.getCountOfAllCourses();
    var lenDiv = document.getElementById("courses-length");
    lenDiv.innerHTML = lenCourses;
    setCoursesTable(coursesDb.getCoursesFromLocalStorage(), document.getElementById("courses-table"));
}

function setCoursesTable(courses, coursesTable, tableHeader = "<tr>" + "<th>Course ID</th>" + "<th>Course Name</th>" + "<th>Instructor</th>" + "<th>ACTS</th>" + "<th>Midterm & Final Percenty</th>" + "<th>Number of Learners</th>" + "</tr>"){
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

function courseAddingForm(coursesDb){
    /*
        This function sends values of the inputs that are inside course adding form to the database class
    */
    var courseId = document.getElementById("add-courseId").value;
    var name = document.getElementById("add-courseName").value;
    var instructor = document.getElementById("add-instructor").value;
    var acts = document.getElementById("add-acts").value;
    var midtermPercent = document.getElementById("add-midtermPercent").value;
    var isTenBased = document.getElementById("add-isTenBased").checked;
    var description = document.getElementById("add-description").value;

    coursesDb.addCourse({
        courseId:parseInt(courseId),
        name:name,
        instructor:instructor,
        midtermPercent:parseInt(midtermPercent),
        acts:parseInt(acts),
        isTenBased:isTenBased,
        description:description
    });
}

function courseUpdatingForm(coursesDb) {
    /*
        This function sends values of the inputs that are inside course updating form to the database class
    */
    var courseId = document.getElementById("update-courseId").value;
    var name = document.getElementById("update-courseName").value;
    var instructor = document.getElementById("update-instructor").value;
    var acts = document.getElementById("update-acts").value;
    var midtermPercent = document.getElementById("update-midtermPercent").value;
    var isTenBased = document.getElementById("update-isTenBased").checked;
    var description = document.getElementById("update-description").value;

    coursesDb.updateCourse({
        courseId:parseInt(courseId),
        name:name,
        instructor:instructor,
        midtermPercent:parseInt(midtermPercent),
        acts:parseInt(acts),
        isTenBased:isTenBased,
        description:description
    });
}

function courseDeletingForm(coursesDb) {
    /*
        This function sends value of the input that are inside course deleting form to the database class
    */
    var courseId = document.getElementById("delete-courseId").value;
    coursesDb.deleteCourse(parseInt(courseId));
}
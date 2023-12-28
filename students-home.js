export function studentsHomeMain(studentsDb, coursesDb) {

    let inputCount = 0;
    let addTakenCourses = [];
    var addGrades = [];

    var addTakenCourseButton = document.getElementById("add-takenCourse-button");
    addTakenCourseButton.addEventListener("click", function(){
        inputCount = selectCoursesAndGrades(inputCount, coursesDb, "adding-takenCourses", "add-student-takenCourses-input", addTakenCourses);
    });

    document.getElementById("student-adding-form").addEventListener("submit", function(event){
        event.preventDefault();
        for (let i = 1; i < inputCount+1; i++) {
            var value = document.getElementById("add-student-takenCourses-input" + i).value
            var value = value.split(",").map(function(item){
                return parseInt(item, 10);
            });
            addGrades.push(value);
        }
        studentAddingForm(studentsDb, addTakenCourses, addGrades);
        updateGetAllStudents(studentsDb);
    });




    let updateInputCount = 0;
    let updateTakenCourses = [];
    var updateGrades = [];

    var updateTakenCourseButton = document.getElementById("update-takenCourse-button");
    updateTakenCourseButton.addEventListener("click", function(){
        updateInputCount = selectCoursesAndGrades(updateInputCount, coursesDb, "updating-takenCourses", "update-student-takenCourses-input", updateTakenCourses);
    });
    document.getElementById("student-updating-form").addEventListener("submit", function(event) {
        event.preventDefault();
        for (let i = 1; i < updateInputCount+1; i++) {
            var value = document.getElementById("update-student-takenCourses-input"+i).value;
            var value = value.split(",").map(function(item){
                return parseInt(item, 10);
            });
            updateGrades.push(value);
        }
        studentUpdatingForm(studentsDb, updateTakenCourses, updateGrades);
        updateGetAllStudents(studentsDb);
    });

    document.getElementById("student-deleting-form").addEventListener("submit", function(event){
        event.preventDefault();
        studentDeletingForm(studentsDb);
        updateGetAllStudents(studentsDb);
    })
}

function setOptionsOfSelect(coursesDb, selectElem){
    var courses = coursesDb.getCoursesFromLocalStorage();
    for (let i = -1; i < courses.length; i++) {
        var option = document.createElement("option");
        if (i === -1) {
            option.value = -1;
            option.text = "Choose an option";
        } else{
            option.value = courses[i].courseId;
            option.text = courses[i].name;
        }
        selectElem.appendChild(option);
    }
}

function updateGetAllStudents(studentsDb){
    var lenStudents = studentsDb.getCountOfAllStudents();
    var lenDiv = document.getElementById("students-length");
    lenDiv.innerHTML = lenStudents;
    setStudentsTable(studentsDb.getStudentsFromLocalStorage(), document.getElementById("students-table"));
}

function studentAddingForm(studentsDb, addTakenCourses, addGrades) {
    var studentId = document.getElementById("add-studentId").value;
    var studentName = document.getElementById("add-studentName").value;
    var studentSurname = document.getElementById("add-studentSurname").value;

    studentsDb.addStudent({
        name:studentName,
        surname:studentSurname,
        studentId:parseInt(studentId),
        takenCourses:addTakenCourses,
        grades:addGrades
    });
}

function studentUpdatingForm(studentsDb, updateTakenCourses, updateGrades){
    var studentId = document.getElementById("update-studentId").value;
    var studentName = document.getElementById("update-studentName").value;
    var studentSurname = document.getElementById("update-studentSurname").value;

    studentsDb.updateStudent({
        name:studentName,
        surname:studentSurname,
        studentId:parseInt(studentId),
        takenCourses:updateTakenCourses,
        grades:updateGrades
    });
}

function studentDeletingForm(studentsDb){
    var studentId = document.getElementById("delete-studentId").value;
    studentsDb.deleteStudent(parseInt(studentId));
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

function selectCoursesAndGrades(inputCount, coursesDb, parentOfSelectsId, textInputIdBlueprint, takenCoursesArray){
    var parentOfSelects = document.getElementById(parentOfSelectsId);
    if (inputCount != coursesDb.getCountOfAllCourses()) {
        inputCount++;

        var newInputDiv = document.createElement("div");
        newInputDiv.style.display = "flex";

        var newInput = document.createElement("select");
        newInput.setAttribute("type", "text");
        newInput.setAttribute("name", "input_" + inputCount);
        newInput.classList.add("my-input");

        var newTextInput = document.createElement("input")
        newTextInput.setAttribute("type","text");
        newTextInput.setAttribute("id", textInputIdBlueprint + inputCount);
        newTextInput.setAttribute("required","true");
        newTextInput.placeholder = "Enter 2 grades";
        newTextInput.classList.add("my-input");
        newTextInput.style.marginLeft = "1rem";

        newInputDiv.appendChild(newInput);
        newInputDiv.appendChild(newTextInput);
        parentOfSelects.appendChild(newInputDiv);
        setOptionsOfSelect(coursesDb, newInput);

        newInput.addEventListener("change", function(){
            var selectedValue = parseInt(newInput.value, 10);
            takenCoursesArray.push(selectedValue);
        });


    } else {
        console.log("You can not add courses more than number of existing courses.");
    }

    return inputCount;
}
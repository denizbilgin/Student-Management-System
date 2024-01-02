import { Student } from "./Student.js";

export class StudentsDatabase{
    constructor(){
        this.students = [];
    }

    setStudentsThenUploadToLocalStorage(studentsJSON){
        /*
            This function sets students array and then uploads the array to local storage
        */
        for (let i = 0; i < studentsJSON.length; i++) {
            this.students.push(new Student(
                studentsJSON[i].name,
                studentsJSON[i].surname,
                studentsJSON[i].studentId,
                studentsJSON[i].grades,
                studentsJSON[i].takenCourses
            ));
        }
        localStorage.setItem("students", JSON.stringify(this.students));
    }

    getStudentsFromLocalStorage(){
        /*
            This function returns current state of the students from the local storage as student object array
        */
        var studentsLS = JSON.parse(localStorage.getItem("students"));
        var students = [];
        for (let i = 0; i < studentsLS.length; i++) {
            var student = new Student(
                studentsLS[i].name,
                studentsLS[i].surname,
                studentsLS[i].studentId,
                studentsLS[i].grades,
                studentsLS[i].takenCourses);
            students.push(student);
        }
        return students;
    }

    getCountOfAllStudents(){
        /*
            This function return number of existing students from the local storage
        */
        return this.getStudentsFromLocalStorage().length;
    }

    getStudentById(studentId){
        /*
            This function returns a student object that comes from given student ID from the local storage
        */
        var students = this.getStudentsFromLocalStorage();
        for (let i = 0; i < students.length; i++) {
            if(students[i].studentId === studentId){
                return students[i];
            }
        }
        return -1;
    }

    getStudentsByName(name){
        /*
            This function returns students by student name from the local storage (can return multiple students)
        */
        var students = this.getStudentsFromLocalStorage();
        var result = [];
        for (let i = 0; i < students.length; i++) {
            if (students[i].name == name) {
                result.push(students[i]);
            }
        }
        return result;
    }

    addStudent(student){
        /*
            This function adds new student to the local storage
        */
        if (this.isStudentIdValid(student.studentId) === false || this.isCoursesOfStudentsValid(student) === false) {
            return -1;
        }
        var oldData = JSON.parse(localStorage.getItem("students"));
        oldData.push({
            name:student.name,
            surname:student.surname,
            studentId:student.studentId,
            grades:student.grades,
            takenCourses:student.takenCourses
        });
        localStorage.setItem("students", JSON.stringify(oldData));
        console.log(`Student with ID ${student.studentId} has been ADDED.`);
    }

    updateStudent(newStudent){
        /*
            This function updates the student that in the local storage. Student ID can not be updated
        */
        if (this.isCoursesOfStudentsValid(student) === false) {
            return -1;
        }
        var oldData = JSON.parse(localStorage.getItem("students"));
        var isFound = false;
        for (let i = 0; i < oldData.length; i++) {
            if(oldData[i].studentId === newStudent.studentId){
                oldData[i].name = newStudent.name;
                oldData[i].surname = newStudent.surname;
                oldData[i].grades = newStudent.grades;
                oldData[i].takenCourses = newStudent.takenCourses;

                isFound = true;
            }
        }

        if (!isFound) {
            console.log(`Student with ID ${newStudent.studentId} not found.`);
            return -1;
        }
        else {
            localStorage.setItem("students", JSON.stringify(oldData));
            console.log(`Student with ID ${newStudent.studentId} has been UPDATED.`);
        }
    }

    deleteStudent(studentId){
        /*
            This function deletes the student that's student ID is given
        */
        var oldData = JSON.parse(localStorage.getItem("students"));
        const indexToDelete = oldData.findIndex(student => student.studentId === studentId);
        if (indexToDelete !== -1) {
            oldData.splice(indexToDelete, 1);
            localStorage.setItem("students", JSON.stringify(oldData));
            console.log(`Student with ID ${studentId} has been DELETED.`);
        }
        else {
            console.log(`Student with ID ${studentId} not found.`);
            return -1;
        }
    }

    isStudentIdValid(studentId){
        /*
            This function checks is student id valid
        */
        if(this.getStudentById(studentId) !== -1){
            console.log(`Student with student ID ${studentId} is already EXISTS.\nYou should enter unique student ID.`);
            return false;
        }
        return true;
    }

    isCoursesOfStudentsValid(student){
        /*
            This function checks is courses of student valid
        */
        for (let i = 0; i < student.takenCourses.length; i++) {
            var count = student.takenCourses.filter(num => num === student.takenCourses[i]).length;
            if (count > 1) {
                console.log(`Any student with can not take any course twice. (Course number ${student.takenCourses[i]}) repeated.`)
                return false;
            }
        }
        return true;
    }
}
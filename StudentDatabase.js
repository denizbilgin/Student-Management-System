import { Student } from "./student.js";

export class StudentsDatabase{
    constructor(){
        this.students = [];
    }

    setStudentsThenUploadToLocalStorage(studentsJSON){
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
        return this.getStudentsFromLocalStorage().length;
    }

    getStudentById(studentId){
        var students = this.getStudentsFromLocalStorage();
        for (let i = 0; i < students.length; i++) {
            if(students[i].studentId === studentId){
                return students[i];
            }
        }
    }

    getStudentsByName(name){
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
        }
        else {
            localStorage.setItem("students", JSON.stringify(oldData));
            console.log(`Student with ID ${newStudent.studentId} has been UPDATED.`);
        }
    }

    deleteStudent(studentId){
        var oldData = JSON.parse(localStorage.getItem("students"));
        const indexToDelete = oldData.findIndex(student => student.studentId === studentId);
        if (indexToDelete !== -1) {
            oldData.splice(indexToDelete, 1);
            localStorage.setItem("students", JSON.stringify(oldData));
            console.log(`Student with ID ${studentId} has been DELETED.`);
        }
        else {
            console.log(`Student with ID ${studentId} not found.`);
        }
    }
}
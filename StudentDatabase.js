import studentsJSON from "./database/students.json" assert {type:'json'};
import { Student } from "./student.js";

export class StudentsDatabase{
    constructor(){
        this.students = [];
        this.setStudents(studentsJSON);
    }

    setStudents(students){
        for (let i = 0; i < students.length; i++) {
            this.students.push(new Student(
                students[i].name,
                students[i].surname,
                students[i].studentId,
                students[i].grades,
                students[i].takenCourses
            ));
        }
    }

    getCountOfAllStudents(){
        return this.students.length;
    }

    getStudentById(studentId){
        for (let i = 0; i < this.students.length; i++) {
            if(this.students[i].studentId === studentId){
                return this.students[i];
            }
        }
    }

    getStudentsByName(name){
        var result = [];
        for (let i = 0; i < this.students.length; i++) {
            if (this.students[i].name == name) {
                result.push(this.students[i]);
            }
        }

        return result;
    }

    updateJSON(students){
        const jsonData = students.map(student => JSON.stringify(student));
        console.log(jsonData);
        console.log("SONRA YAP");
    }

    addStudent(student){
        this.students.push(student);
        this.updateJSON(this.students);
        console.log("SONRA YAP");
    }

    updateStudent(student){
        console.log("SONRA YAP");
    }

    deleteStudent(studentId){
        console.log("SONRA YAP");
    }


}
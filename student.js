class Student{
    constructor(name, surname, studentId, takenCourses, grades){
        this.name = name;
        this.surname = surname;
        this.studentId = studentId;
        this.takenCourses = takenCourses;
        this.grades = grades;
    }

    getStudentDetails(){
        var text = this.studentId + " numared " + this.name + " " + this.surname +"'s GPA is: " + this.getStudentGPA() + ".";
        return text;
    }

    getStudentGPA(){
        for (let i = 0; i < this.takenCourses.length; i++) {
            console.log(this.takenCourses[i]);
        }
    }

}

export class StudentsDatabase{
    constructor(students){
        this.students = students;
    }

    getCountOfAllStudents(){
        return this.students.length;
    }

    getStudentById(studentId){
        for (let i = 0; i < this.students.length; i++) {
            if(this.students[i].studentId === studentId){
                return new Student(this.students[i].name,
                                   this.students[i].surname,
                                   this.students[i].studentId,
                                   this.students[i].takenCourses,
                                   this.students[i].grades);
            }
        }
    }


}
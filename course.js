import { StudentsDatabase } from "./StudentDatabase.js";

export class Course{
    constructor(courseId, name, instructor, description, midtermPercent, acts, isTenBased){
        this.courseId = courseId;
        this.name = name;
        this.instructor = instructor;
        this.description = description;
        this.midtermPercent = midtermPercent;
        this.acts = acts;
        this.isTenBased = isTenBased;
        this.finalPercent = 100 - midtermPercent;
    }

    getCourseDetails(){
        var text = this.name + " named course is given by " + this.instructor + ". And percenty of midterm exam is " + this.midtermPercent +
                        ", percenty of final exam is " + this.finalPercent + ". Finally description of the course is: \n" + this.description + ".";
        return text;
    }

    getStudents(){
        var result = [];
        var students = new StudentsDatabase().getStudentsFromLocalStorage();
        for (let i = 0; i < students.length; i++) {
            for (let j = 0; j < students[i].takenCourses.length; j++) {
                if (students[i].takenCourses[j] == this.courseId) {
                    result.push(students[i]);
                }
            }
        }
        return result;
    }

    getNumberOfStudents(){
        return this.getStudents().length;
    }

    getAverageScore(){
        var total = 0;
        var numberOfStudents = 0;
        var students = this.getStudents();
        for (let i = 0; i < students.length; i++) {
            var gradeAverageOfStudent = students[i].getGradeAverageByCourse(this.courseId);
            total += gradeAverageOfStudent;
            numberOfStudents++;
        }
        return total/numberOfStudents;
    }
}


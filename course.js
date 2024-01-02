import { StudentsDatabase } from "/StudentDatabase.js";

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
        /* 
            This function prints details of course to the console
        */
        var text = this.name + " named course is given by " + this.instructor + ". And percenty of midterm exam is " + this.midtermPercent +
                        ", percenty of final exam is " + this.finalPercent + ". Finally description of the course is: \n" + this.description + ".";
        return text;
    }

    getStudents(){
        /*
            This function returns learners of this course
        */
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
        /*
            This function returns number of learning of this course
        */
        return this.getStudents().length;
    }

    getAverageScore(){
        /*
            This function return average score of learners that takes this course
        */
        var total = 0;
        var numberOfStudents = this.getNumberOfStudents();
        var students = this.getStudents();
        for (let i = 0; i < students.length; i++) {
            var gradeAverageOfStudent = students[i].getGradeAverageByCourse(this.courseId);
            total += gradeAverageOfStudent;
        }
        return total/numberOfStudents;
    }

    getFailedStudentsCount(){
        /*
            This function return number of failed students' count
        */
        var takerStudents = this.getStudents();
        var failedStudents = 0;
        for (let i = 0; i < takerStudents.length; i++) {
            const student = takerStudents[i];
            if (student.calculatePointByScale(this.courseId) === "FF" || student.calculatePointByScale(this.courseId) === "DD") {
                failedStudents++;
            }
        }
        return failedStudents;
    }
}


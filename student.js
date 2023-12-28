import {CoursesDatabase} from "./CourseDatabase.js";

export class Student{
    constructor(name, surname, studentId, grades, takenCourses){
        this.name = name;
        this.surname = surname;
        this.studentId = studentId;
        this.grades = grades;
        this.takenCourses = takenCourses;
    }

    getStudentDetails(){
        var text = this.studentId + " numared " + this.name + " " + this.surname + 
            "'s GPA is: " + this.getStudentGPA() + ".";
        return text;
    }

    getStudentGPA(){
        const courses = new CoursesDatabase();
        var totalWeightedGrade = 0;
        var totalActs = 0;
        for (let i = 0; i < this.takenCourses.length; i++) {
            var course = courses.getCourseById(this.takenCourses[i]);
            var grade = this.calculatePointByScale(course.courseId);
            switch (grade) {
                case 'AA':
                    totalWeightedGrade += (4.0)*course.acts;
                    break;
                case 'BA':
                    totalWeightedGrade += (3.5)*course.acts;
                    break;
                case 'BB':
                    totalWeightedGrade += (3.0)*course.acts;
                    break;
                case 'CB':
                    totalWeightedGrade += (2.5)*course.acts;
                    break;
                case 'CC':
                    totalWeightedGrade += (2.0)*course.acts;
                    break;
                case 'CD':
                    totalWeightedGrade += (1.5)*course.acts;
                    break;
                case 'DD':
                    totalWeightedGrade += (1.0)*course.acts;
                    break;
                default:
                    totalWeightedGrade += (0.0)*course.acts;
                    break;
            }
            totalActs += course.acts;
        }
        var GPA = totalWeightedGrade / totalActs;
        return GPA.toFixed(2);
    }

    getGradesByCourse(courseId){
        for (let i = 0; i < this.takenCourses.length; i++) {
            if(this.takenCourses[i] === courseId){
                return this.grades[i];
            }
        }
    }

    getTotalActs(){
        var total = 0;
        const courses = new CoursesDatabase();
        for (let i = 0; i < this.takenCourses.length; i++) {
            var course = courses.getCourseById(this.takenCourses[i]);
            total += course.acts;
        }
        return total;
    }

    getGradeAverageByCourse(courseId){
        const courses = new CoursesDatabase();
        var course = courses.getCourseById(courseId);
        var grades = this.getGradesByCourse(courseId);
        var result = grades[0]*course.midtermPercent/100 + grades[1]*course.finalPercent/100;
        return result;
    }

    calculatePointByScale(courseId){
        const courses = new CoursesDatabase();
        var course = courses.getCourseById(courseId);
        var result = this.getGradeAverageByCourse(courseId);
        var scales = ["AA", "BA", "BB", "CB", "CC", "CD", "DD"];
        var threshold = 100;
        var number = course.isTenBased === true ? 10 : 7;

        threshold -= number;
        for (let i = 0; i < scales.length; i++) {
            if (result >= threshold){
                return scales[i];
            }
            threshold -= number;
        }
        return "FF";
    }
}


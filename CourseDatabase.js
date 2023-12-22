import coursesJSON from "./database/courses.json" assert {type:'json'};
import {Course} from "./Course.js";
import { StudentsDatabase } from "./StudentDatabase.js";

export class CoursesDatabase{
    constructor(){
        this.courses = [];
        this.setCourses(coursesJSON);
    }

    setCourses(courses){
        for (let i = 0; i < courses.length; i++) {
            this.courses.push(new Course(
                courses[i].courseId,
                courses[i].name,
                courses[i].instructor,
                courses[i].description,
                courses[i].midtermPercent,
                courses[i].acts,
                courses[i].isTenBased));
        }
    }

    getCountOfAllCourses(){
        return this.courses.length;
    }

    getCourseById(courseId){
        for (let i = 0; i < this.courses.length; i++) {
            if (this.courses[i].courseId === courseId) {
                return this.courses[i];
            }
        }
    }

    getCourseByName(name){
        var result = [];
        for (let i = 0; i < this.courses.length; i++) {
            if (this.courses[i].name == name) {
                result.push(this.courses[i]);
            }
        }

        return result;
    }

    getCoursesByInstructor(instructorName){
        var result = [];
        for (let i = 0; i < this.courses.length; i++) {
            if (this.courses[i].instructor == instructorName) {
                result.push(this.courses[i]);
            }
        }
        return result;
    }

    updateJSON(courses){
        const jsonData = courses.map(course => JSON.stringify(course));
        console.log(jsonData);
        console.log("SONRA YAP");
    }

    addCourse(course){
        this.courses.push(course);
        this.updateJSON(this.courses);
        console.log("SONRA YAP");
    }

    updateCourse(course){
        console.log("SONRA YAP");
    }

    deleteCourse(studentId){
        console.log("SONRA YAP");
    }
}
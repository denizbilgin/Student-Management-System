import {Course} from "./Course.js";

export class CoursesDatabase{
    constructor(){
        this.courses = [];
    }

    setCoursesThenUploadToLocalStorage(coursesJSON){
        for (let i = 0; i < coursesJSON.length; i++) {
            this.courses.push(new Course(
                coursesJSON[i].courseId,
                coursesJSON[i].name,
                coursesJSON[i].instructor,
                coursesJSON[i].description,
                coursesJSON[i].midtermPercent,
                coursesJSON[i].acts,
                coursesJSON[i].isTenBased));
        }
        localStorage.setItem("courses", JSON.stringify(this.courses));
    }

    getCoursesFromLocalStorage(){
        var coursesLS = JSON.parse(localStorage.getItem("courses"));
        var courses = [];
        for (let i = 0; i < coursesLS.length; i++) {
            var course = new Course(coursesLS[i].courseId,
                coursesLS[i].name,
                coursesLS[i].instructor,
                coursesLS[i].description,
                coursesLS[i].midtermPercent,
                coursesLS[i].acts,
                coursesLS[i].isTenBased);
            courses.push(course);
        }
        return courses;
    }

    getCountOfAllCourses(){
        return this.getCoursesFromLocalStorage().length;
    }

    getCourseById(courseId){
        var courses = this.getCoursesFromLocalStorage();
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].courseId === courseId) {
                return courses[i];
            }
        }
    }

    getCourseByName(name){
        var courses = this.getCoursesFromLocalStorage();
        console.log(courses);
        console.log(name);
        var result = [];
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].name == name) {
                result.push(courses[i]);
            }
        }
        return result;
    }

    getCoursesByInstructor(instructorName){
        var courses = this.getCoursesFromLocalStorage();
        var result = [];
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].instructor == instructorName) {
                result.push(courses[i]);
            }
        }
        return result;
    }

    addCourse(course){
        var oldData = JSON.parse(localStorage.getItem("courses"));
        oldData.push({
            courseId:course.courseId,
            name:course.name,
            instructor:course.instructor,
            acts:course.acts,
            description:course.description,
            midtermPercent:course.midtermPercent,
            isTenBased:course.isTenBased
        });
        localStorage.setItem("courses", JSON.stringify(oldData));
        console.log(`Course with name ${course.name} has been ADDED.`);
    }

    updateCourse(newCourse){
        var oldData = JSON.parse(localStorage.getItem("courses"));
        var isFound = false;
        for (let i = 0; i < oldData.length; i++) {
            if (oldData[i].courseId === newCourse.courseId) {
                oldData[i].name = newCourse.name;
                oldData[i].instructor = newCourse.instructor;
                oldData[i].acts = newCourse.acts;
                oldData[i].description = newCourse.description;
                oldData[i].midtermPercent = newCourse.midtermPercent;
                oldData[i].isTenBased = newCourse.isTenBased;

                isFound = true;
            }
        }

        if (!isFound) {
            console.log(`Course with ID ${newCourse.courseId} not found.`);
        }
        else {
            localStorage.setItem("courses", JSON.stringify(oldData));
            console.log(`Course with ID ${newCourse.courseId} has been UPDATED.`);
        }

    }

    deleteCourse(courseId){
        var oldData = JSON.parse(localStorage.getItem("courses"));
        const indexToDelete = oldData.findIndex(course => course.courseId === courseId);
        if (indexToDelete !== -1) {
            oldData.splice(indexToDelete, 1);
            localStorage.setItem("courses", JSON.stringify(oldData));
            console.log(`Course with ID ${courseId} has been DELETED.`);
        }
        else {
            console.log(`Course with ID ${courseId} not found.`);
        }
    }
}
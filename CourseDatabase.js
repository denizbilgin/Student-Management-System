import {Course} from "/Course.js";

export class CoursesDatabase{
    constructor(){
        this.courses = [];
    }

    setCoursesThenUploadToLocalStorage(coursesJSON){
        /*
            This function sets courses array and then uploads the array to local storage
        */
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
        /*
            This function returns current state of the courses from the local storage as course object array
        */
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
        /*
            This function return number of existing courses from the local storage
        */
        return this.getCoursesFromLocalStorage().length;
    }

    getCourseById(courseId){
        /*
            This function returns a course object that comes from given course ID from the local storage
        */
        var courses = this.getCoursesFromLocalStorage();
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].courseId === courseId) {
                return courses[i];
            }
        }
        return -1;
    }

    getCourseByName(name){
        /*
            This function returns courses by course name from the local storage (can return multiple courses)
        */
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
        /*
            This function returns courses by instructor name from the local storage (can return multiple courses)
        */
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
        /*
            This function adds new course to the local storage
        */
        if (this.isCourseIdValid(course.courseId) === false || this.isMidtermPercentValid(course.midtermPercent) === false) {
            return -1;
        }
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
        /*
            This function updates the course that in the local storage. Course ID can not be updated
        */
       if (this.isMidtermPercentValid(newCourse.midtermPercent) === false) {
            return -1;
       }
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
            return -1;
        }
        else {
            localStorage.setItem("courses", JSON.stringify(oldData));
            console.log(`Course with ID ${newCourse.courseId} has been UPDATED.`);
        }

    }

    deleteCourse(courseId){
        /*
            This function deletes the course that's course ID is given
        */
        var oldData = JSON.parse(localStorage.getItem("courses"));
        const indexToDelete = oldData.findIndex(course => course.courseId === courseId);
        if (indexToDelete !== -1) {
            oldData.splice(indexToDelete, 1);
            localStorage.setItem("courses", JSON.stringify(oldData));
            console.log(`Course with ID ${courseId} has been DELETED.`);
        }
        else {
            console.log(`Course with ID ${courseId} not found.`);
            return -1;
        }
    }

    isCourseIdValid(courseId){
        /*
            This function checks is course id valid
        */
        if (this.getCourseById(courseId) !== -1) {
            console.log(`Course with course ID ${courseId} is already EXISTS.\nYou should enter unique course ID.`);
            return false;
        }
        return true;
    }

    isMidtermPercentValid(midtermPercent){
        /*
            This function checks is midterm percent valid
        */
        if (midtermPercent < 1 || midtermPercent > 99) {
            console.log(`Midterm percent of any course can not be larger than 99.`);
            return false;
        }
        return true;
    }
}
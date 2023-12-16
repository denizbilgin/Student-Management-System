class Course{
    constructor(name, instructor, description, midtermPercent, takerStudents){
        this.name = name;
        this.instructor = instructor;
        this.description = description;
        this.midtermPercent = midtermPercent;
        this.takerStudents = takerStudents;
        this.finalPercent = 100 - midtermPercent;
    }

    getCourseDetails(){
        var text = this.name + " named course is given by " + this.instructor + ". And percenty of midterm exam is " + this.midtermPercent +
                        ", percenty of final exam is " + this.finalPercent + ". Finally description of the course is: \n" + this.description + ".";
        return text;
    }
}

export class CoursesDatabase{
    constructor(courses){
        this.courses = [];
        this.setCoursesJSON(courses);
        console.log(this.courses);
    }

    setCoursesJSON(courses){
        for (let i = 0; i < courses.length; i++) {
            var takers = [];

            this.courses.push(new Course(
                courses[i].name,
                courses[i].instructor,
                courses[i].description,
                courses[i].midtermPercent,
                courses[i].takerStudents));
        }
    }
}
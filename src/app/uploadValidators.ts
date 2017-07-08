import {FormControl} from '@angular/forms';
import {Courses} from './courses';

export class uploadValidators {
    static invalidCourse(control: FormControl) {
        var course = control.value;

        if(Courses.indexOf(course)==-1 || course=='Select Course')
            return { invalidCourse: true };
        
        return null;
    }

    static invalidType(control: FormControl) {
        var type = control.value;

        if(type=='Select Type')
            return { invalidType: true };

        return null;
    }

    static invalidSemester(control: FormControl) {
        var semester = control.value;

        if(semester=='Select Semester')
            return { invalidSemester: true };

        return null;
    }

    static invalidSession(control: FormControl) {
        var session = control.value;

        if(session=='Session, eg-2016-17')
            return { invalidSemester: true };

        return null;
    }

}
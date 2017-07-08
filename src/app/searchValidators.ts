import {FormControl} from '@angular/forms';
import {Courses} from './courses';

export class searchValidators {
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

    
    }


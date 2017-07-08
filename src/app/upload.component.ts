import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {Filetypes} from './filetypes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CoursesService} from './courses.service';
import {uploadValidators} from './uploadValidators';
import {SearchService} from './search.service';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
 
@Component({
  selector: 'upload',
  templateUrl: './upload.html',
  styleUrls: ['./app.component.css']
})
export class UploadComponent {

  uploadForm: FormGroup;
  courses = [];
  filetypes: string[] = Filetypes;
  

  constructor (private coursesService: CoursesService, fb: FormBuilder, private searchservice: SearchService) {

    this.uploadForm=fb.group({
            course:['Select Course',Validators.compose([Validators.required,uploadValidators.invalidCourse])],
            filetype:['Select Type',Validators.compose([Validators.required,uploadValidators.invalidType])],
            semester:['Select Semester',Validators.compose([Validators.required,uploadValidators.invalidSemester])],
            session:['',Validators.compose([Validators.required,uploadValidators.invalidSession])]
    })
       coursesService.getCourses().subscribe(courses => {this.courses = courses});
  }

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }


    

}
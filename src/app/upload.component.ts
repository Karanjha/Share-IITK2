import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {Filetypes} from './filetypes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
 
// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
 
@Component({
  selector: 'upload',
  templateUrl: './upload.html'
})
export class UploadComponent {
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

   
  searchForm: FormGroup;
    courses = [];
    filetypes: string[] = Filetypes;

}
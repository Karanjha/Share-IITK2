import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CoursesService} from './courses.service';
import { SearchComponent} from './search.component';
import { SearchService } from './search.service';
import {UploadComponent} from './upload.component';
import { FileSelectDirective, FileDropDirective} from 'ng2-file-upload';
import { RouterModule }   from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    UploadComponent,
    FileSelectDirective,
    FileDropDirective
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
  {
    path: 'search',
    component: SearchComponent
  }
  ]),

   RouterModule.forRoot([
  {
    path: 'upload',
    component: UploadComponent
  }
  ])
    
    
  ],
  providers: [CoursesService,SearchService,],
  bootstrap: [AppComponent]
})
export class AppModule { }

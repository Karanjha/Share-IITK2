import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SearchComponent} from './search.component';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {UploadComponent} from './upload.component';
import {DashboardComponent} from './dashboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
      Uploadchosen=false;
      Searchchosen=false;
      Dashboardchosen=false;
      
      Uploadselected(){
        this.Uploadchosen=true
        this.Searchchosen=false;
        this.Dashboardchosen=false;
      }
      Searchselected(){
        this.Searchchosen=true
        this.Uploadchosen=false;
        this.Dashboardchosen=false;
      }
      Dashboardselected(){
        this.Searchchosen=false
        this.Uploadchosen=false;
        this.Dashboardchosen=true;
      }

}

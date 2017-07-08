import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SearchComponent} from './search.component';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {UploadComponent} from './upload.component';
import {DashboardComponent} from './dashboard.component';
import { FavoriteComponent } from './favorite.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
       tabLabels: string[] = ['Dashboard', 'Upload', 'Search'];

  currTab: string = 'Dashboard';

  tabs: {} = {
    'Dashboard' : {'state': true},
    'Search': {'state': false},
    'Upload': {'state': false},
  };
   check(state) {
    this.tabs[this.currTab].state = state;
  }

  switchTab(tab: string) {
    if (this.currTab !== tab) {
      this.tabs[this.currTab].state = false;
      this.tabs[tab].state = true;
      this.currTab = tab;
    }
  }
  tweet = {
    totalLikes: 10,
    iLike: false
    
  }
}

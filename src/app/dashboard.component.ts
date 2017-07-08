import { Component } from '@angular/core';
import {FILES} from './files';
import { FavoriteComponent } from './favorite.component';


 
 @Component({
    selector: 'dashboard',
    templateUrl: './database.component.html',
    styleUrls: ['./app.component.css']
 })

 export class DashboardComponent {
     files=FILES;
     tweet = {
    totalLikes: 10,
    totalUnLikes: 10,
    iUnLike: false,
    iLike: false
    
  }
 }
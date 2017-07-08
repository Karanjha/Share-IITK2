import { Component } from '@angular/core';
import {FILES} from './files';

 
 @Component({
    selector: 'dashboard',
    templateUrl: './database.component.html',
    styleUrls: ['./app.component.css']
 })

 export class DashboardComponent {
     files=FILES;
 }

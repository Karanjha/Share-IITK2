import { Component } from '@angular/core';
import {File} from './file';
 const FILES: File[]=[
    {name: 'Intro to programming'},
    {name: 'Quantum Chemistry'},
    {name: 'ODE'},
    {name: 'linear algebra'},
    {name: 'intro to electrodynamics'}
 ]
 
 @Component({
    selector: 'dashboard',
    template: `
    <table class="files" cellspacing="500">
    
    <tr *ngFor="let file of files">
     <td>{{file.name}}</td>  
     
      <td> <a>Download</a> <td>  
      </tr>
    
    
    </table>
    ` ,
    styleUrls: ['./app.component.css']
 })

 export class DashboardComponent {
     files=FILES;
 }

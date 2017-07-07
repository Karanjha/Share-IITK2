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
    template: `<ul class="files">
    <li *ngFor="let file of files">{{file.name}}</li>
    
    </ul>`
 })

 export class DashboardComponent {
     files=FILES;
 }
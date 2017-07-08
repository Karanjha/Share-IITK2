import { Component, EventEmitter, Output, Input } from '@angular/core'

@Component({
    selector: "favorite",
    template: `
    <i
    class="glyphicon glyphicon-thumbs-up"
    [class.highlighted]="iLike"
    (click)="onClick(glyphicon)"
    value="up">
    </i>
    <span> {{ totalLikes }} </span>
    
    `,
    styles:[`
    .glyphicon-thumbs-up {
        color: #ccc;
        cursor: pointer;
    }
    
    .highlighted{
        color: black;
    }
    `] 
})

export class FavoriteComponent{
   @Input() totalLikes = 0;
    @Input() totalUnLikes = 0;
   @Input() iLike=false;
    @Input() iUnLike=false;
    onClick(glyphicon){
        
        this.iLike = !this.iLike;
        this.totalLikes+=this.iLike ? 1 : -1 ;
        
    }
}



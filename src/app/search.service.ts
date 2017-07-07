import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Injectable, Input} from '@angular/core';
@Injectable()

export class SearchService {
    @Input() _searchurl;

    constructor(private _http: Http) {
        console.log(new Observable);
    }

    getSearchResult() {
        return this._http.get(this._searchurl)
            .map(res => res.json());
    }
    
}
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ItemService {
    url;
    constructor(private http: HttpClient) {
        this.url = environment.BaseURL + 'product/';
    }

    
    search(data) {
        return this.http.post(this.url + 'search', data, this.getOptions())

    }
    
    private getOptions() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
    }

    }
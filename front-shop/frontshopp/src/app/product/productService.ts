import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import {environment} from "../../environments/environment "
import {Observable} from 'rxjs'
import {Item} from '../shared/models/item.model'

@Injectable() export class ProductService{
    url:string
    constructor(
        public http:HttpClient
    )
    {
this.url=environment.BaseURL + 'product/'
    }
    add(data)
    {
return this.http.post(this.url,data,this._getOptionsWithToken())
    }
    update(data: Item) {
        return this.http.put(this.url + data._id, data, this._getOptionsWithToken())

    }

    get() {
        return this.http.get(this.url, this._getOptionsWithToken())

    }
    getById(id: string) {
        return this.http.get(this.url + id, this._getOptionsWithToken())

    }
    remove(id: string) {
        return this.http.delete(this.url + id, this._getOptionsWithToken())

    }
    

    upload(data: Item, files: Array<any>, method) {
        // xhr request to BE
        return new Observable((observer) => {
            const xhr = new XMLHttpRequest();
            const formData = new FormData();

            if (files && files.length) {
                formData.append('img', files[0], files[0].name);
            }

            for (let key in data) {
                formData.append(key, data[key]);
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        observer.next(xhr.response);
                    } else {
                        observer.error(xhr.response);
                    }
                }
            }
            let myURL = this.url;
            if (method === "PUT") {
                myURL += data._id;
            }

            xhr.open(method, `${myURL}?token=${localStorage.getItem('token')}`, true);
            xhr.send(formData);
        })


    }

    
    private _getOptionsWithToken() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'x-access-token':localStorage.getItem('token')
            })
        }
    }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RESTAPIService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  // render BE url
  url = "https://sb-postgres.onrender.com/persons";

   // local BE url
  //  url = "http://localhost:8080/persons";

  getPersons() {
    return this.http.get<any[]>(this.url);
  }

  addPerson(blog: any) {
    return this.http.post(this.url, blog, this.httpOptions);
  }

  deletePerson(id:any){
    return this.http.delete<any[]>(this.url+"/"+id);
  }

}

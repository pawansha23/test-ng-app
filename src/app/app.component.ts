import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { RESTAPIService } from './service/restapiservice.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-ng-app';

  persons : any[]=[];
  pname: any = '';

  constructor(private service: RESTAPIService, private router: Router) { }

  ngOnInit(): void {
  }

  getPersons() {
    this.service.getPersons().subscribe( data => {
      console.log("data is fetched from DB");
      this.persons = data;
      data.forEach(element => {
        console.log('id = '+element.id+" , name = "+element.name);
      });
    });
  }

  addPerson(){
      let person = { name:this.pname };
  
      this.service.addPerson(person).subscribe( data=>{
        console.log('record saved in DB',data);
      });
  }

  clear(){
    this.persons = [];
  }

}



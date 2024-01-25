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
  showSuccessMsg = false;
  isDataPresent = false;
  isDisabled: boolean = true;

  persons : any[]=[];
  pname: any = '';

  constructor(private service: RESTAPIService, private router: Router) { }

  ngOnInit(): void {
  }

  getPersons() {
    this.showSuccessMsg = false;
    this.service.getPersons().subscribe( data => {
      console.log("data is fetched from DB");
      if(data){
        this.persons = data;
        this.isDataPresent = true;
      }
      data.forEach(element => {
        console.log('id = '+element.id+" , name = "+element.name);
      });
    });
  }

  addPerson(){
      let person = { name:this.pname };
    
      this.service.addPerson(person).subscribe( data=>{
        console.log('record saved in DB',data);
        this.showSuccessMsg = true;
      });
  }

  clear(){
    this.persons = [];
    this.showSuccessMsg = false;
    this.isDataPresent = false;
  }

  onUserInput(event:any){
    // Get the input text
    let inputText = event.target.value;
    if(inputText==''){
      this.isDisabled = true;  // Make button disabled
    }
    else{
      this.isDisabled = false; // Make button enabled
    }
  }

}



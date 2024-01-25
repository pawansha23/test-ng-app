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
  deleteSuccessMsg: boolean = false;
  isUpdatingRecord: boolean = false;
  isEditClicked: boolean = true;

  persons : any[]=[];
  pname: any = '';

  constructor(private service: RESTAPIService, private router: Router) { }

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons() {
    this.showSuccessMsg = false;
    this.isUpdatingRecord = false
    this.service.getPersons().subscribe( data => {
      console.log("data is fetched from DB");
      if(data){
        this.persons = data;
        this.isDataPresent = true;
        this.pname = '';
      }
      data.forEach(element => {
        console.log('id = '+element.id+" , name = "+element.name);
      });
    });
  }

  addPerson(){
      let person = { name:this.pname };
      this.service.addPerson(person).subscribe( data=>{
        console.log('Record saved in DB',data);
        this.showSuccessMsg = true;
        this.pname = '';
      });
      this.persons = [];
      this.getPersons();
  }

  clear(){
    this.persons = [];
    this.showSuccessMsg = false;
    this.isDataPresent = false;
    this.pname = '';
    this.deleteSuccessMsg = false;
  }

  onUserInput(event:any){
    let inputText = event.target.value;
    if(inputText==''){
      this.isDisabled = true;  // Make button disabled
    }
    else{
      this.isDisabled = false; // Make button enabled
    }
  }

  editPerson(id:any){
    console.log("editPerson fn called");
    this.isUpdatingRecord = true;
  }

  deletePerson(id:any){
    this.service.deletePerson(id).subscribe( data=>{
      console.log('Record delete from DB', data);
      this.deleteSuccessMsg = true;
      this.pname = '';
      this.getPersons();
    });
  }

}



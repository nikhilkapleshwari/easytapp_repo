import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders,HttpClient, HttpParams } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { AuthServiceService } from '../login/auth-service.service';
import { stringify } from '@angular/core/src/util';
import { Router } from '@angular/router';
import { RestUrlService } from '../service/rest-url.service';


@Component({
  selector: 'app-schedule-component',
  templateUrl: './schedule-component.component.html',
  styleUrls: ['./schedule-component.component.css']
})
export class ScheduleComponentComponent implements OnInit {

  constructor(private http:HttpClient,private authService:AuthServiceService,private restUrlService:RestUrlService,private router:Router) { }
  data:string[]=new Array();
  ngOnInit() {
  }
  
  deleteItem(rowNo){
    if(this.data.length==1){
      //console.log("removing only element");
      this.data=new Array();
    }
    else
    this.data.splice(rowNo, 1);;
  }

  displayData(){
    //console.log(this.data);
  }

  process(form:NgForm){

    let body=new URLSearchParams();
    //console.log("form value:"+JSON.stringify(form.value));
    //console.log("in schedule userEmail:"+this.authService.getUserName());
    body.set('searchString',form.value.item0+","+form.value.item1+","+form.value.item2);
    body.set('userEmail',this.authService.getUserName());

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
    this.http.post(this.restUrlService.getRestUrls("schedule"),body.toString(),options).subscribe(response=>{
    //console.log(JSON.stringify(response));   
    this.router.navigate(['/dashboard']);      
});
  }


  addToSearchArray(searchContent){
    //console.log("searchContent:"+searchContent);
    if(this.data)
    this.data.push(searchContent);
  }
}

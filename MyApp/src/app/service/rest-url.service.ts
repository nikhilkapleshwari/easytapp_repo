import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RestUrlService {

  restUrl:string[];

  constructor(private httpClient:HttpClient,private http:Http) {
    // this.httpClient.get('./assets/resturl.json').subscribe(
    //   data=>{
    //      this.restUrl=data as string[];
    //   },(err:HttpErrorResponse)=>{
    //     //console.log(err.message);
    //   });
      
   }

   load(){
     //console.log('in load........');
    return new Promise((resolve, reject) => {
      this.httpClient.get('./assets/resturl.json').subscribe(
        data=>{
           this.restUrl=data as string[];
           resolve(true);
        },(err:HttpErrorResponse)=>{
          //console.log(err.message);
        });
      
    });
  }
   
  getRestUrls(key){
    for(var i in this.restUrl){
      var obj=JSON.parse(JSON.stringify(this.restUrl[i]));
      if(obj.ID===key){
      return obj.Url;
    }
    }
  }

}

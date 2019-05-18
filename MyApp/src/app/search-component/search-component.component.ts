import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import { RestUrlService } from '../service/rest-url.service';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { Subscription } from 'rxjs';
import * as bootbox from '../../../node_modules/bootbox/bootbox.js';
declare var bootbox:any;

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent {

  isValid=false;
  searchTitle="Torrent Search";
  data:any;
  noDataFound:boolean;
  loader:boolean;

  private subscription: Subscription;
  tick;

  form=new FormGroup({
    searchString:new FormControl('',Validators.required)
  });

  
  constructor(private http:HttpClient,private domSanitizer:DomSanitizer,private restUrlService:RestUrlService){
    
  }
  
  ngOnInit() {
    // let timer = TimerObservable.create(5000);
    // this.subscription = timer.subscribe(t => {
    //   this.tick = t;
    //   console.log('tick:'+this.tick);
    // });    
  }
  process(searchData){
        this.hideLoader();
        this.data=null;
        //console.log(JSON.stringify(searchData));

        let body=new URLSearchParams();
        body.set('searchString',searchData.searchString);

        let options = {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      this.showLoader();

      var dialog = bootbox.dialog({
        message: '<p class="text-center">Searching...</p>',
        closeButton: false
    });

        this.http.post(this.restUrlService.getRestUrls("search"),body.toString(),options).subscribe(response=>{
          //this.data=response;
          this.data=JSON.parse(JSON.stringify(response));
        if(this.data==null)
        this.noDataFound=true;
        else{
          for(var i=0;i<this.data.length;i++){
            //this.data[i].download=this.urlCheck(this.data[i].download);
            this.data[i].file=this.urlCheck(this.data[i].file); //changed for piratebay
          }
        }
        this.hideLoader();
        dialog.modal('hide');
        
  },err=>{
    //console.log('No Data found!');
    this.noDataFound=true;
    this.hideLoader();
    dialog.modal('hide');
  });
  dialog.modal('hide');
}


onSearchChange(searchValue:string){
  this.noDataFound=false;
}

urlCheck(url){
return this.domSanitizer.bypassSecurityTrustUrl(url);
}

showLoader(){
  this.loader=true;
  //console.log('loader on');
}

hideLoader(){
  this.loader=false;
  //console.log('loader off');
}
}

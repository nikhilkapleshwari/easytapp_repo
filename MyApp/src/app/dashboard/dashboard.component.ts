import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from '../login/auth-service.service';
import { NgForm } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {DomSanitizer} from '@angular/platform-browser';
import { RestUrlService } from '../service/rest-url.service';
import * as bootbox from '../../../node_modules/bootbox/bootbox.js';
import {MatDialogModule, MatDialog,MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { TorrentDialogComponent } from '../torrent-dialog/torrent-dialog.component';

declare var bootbox:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // torrentDialogComponent:MatDialogRef<TorrentDialogComponent>;
data:string[]=new Array();
torrentMap=new Map();
noTorrentFound:boolean;
loader:boolean;
addString:string;
  constructor(private http:HttpClient,public authService:AuthServiceService,private restUrlService:RestUrlService,
    public dialog:MatDialog,private domSanitizer:DomSanitizer) {
    //console.log("refreshed!");
    
    if(!this.authService.getIsAccountVerified())
    bootbox.alert("Verify your account to access dashboard.");

    let temp=new Array();
    this.getData(function(list){
      if(list[0] !== 'null'){
      list.forEach(function(element){
        temp.push(element.replace(/\/"/g,'/,'));
      },this);
    }
    });
    this.data=temp;
  }

  ngOnInit() { 
  }


  getData(callback){
    let body=new URLSearchParams();
    body.set('userEmail',this.authService.getUserName());

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  
    this.http.post(this.restUrlService.getRestUrls("listTorrents"),body.toString(),options).subscribe(response=>{
      //console.log("output:"+JSON.stringify(response));
      let temp=JSON.stringify(response).replace(/\"/g,"");
      let list=temp.split(",");
      //console.log("list:"+list);
      
      callback(list);
  });

  }

  process(form:NgForm){

    let body=new URLSearchParams();
    
    //console.log("form value:"+JSON.stringify(form.value));
    //console.log("in schedule userEmail:"+this.authService.getUserName());

    body.set('searchString',form.value.item0+","+form.value.item1+","+form.value.item2);
    body.set('userEmail',this.authService.getUserName());
    body.set('isScheduledSearch',"1");

    //console.log('scheduled body:'+body);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
    this.http.post(this.restUrlService.getRestUrls("schedule"),body.toString(),options).subscribe(response=>{
    bootbox.alert(JSON.stringify(response));        
});
  }

  
  deleteItem(rowNo){

    bootbox.confirm("Are you sure to delete "+this.data[rowNo],(result)=>{
    if(result){
      if(this.data.length==1){
        this.data=new Array();
        //console.log("removing only element");
        this.torrentMap.delete(rowNo);
      }else{
            this.data.splice(rowNo, 1);
            //console.log("After deleting:"+this.data);
            this.torrentMap.delete(rowNo);
          }
    }
    });
}

showResult(rowNo){
  alert(this.data[rowNo]);
}

  addToSearchArray(searchContent){
    //console.log("searchContent:"+searchContent);
    if(searchContent)
    this.data.push(searchContent);
  }




 getTorrentList(rowNo){
    
    if(this.torrentMap.get(rowNo)===undefined){
    
    let searchData=this.data[rowNo];
    //console.log("searchData:"+JSON.stringify(searchData)+","+rowNo);

    let body=new URLSearchParams();
    body.set('searchString',searchData);
    body.set('userEmail',this.authService.getUserName());
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
  this.showLoader();  
  this.http.post(this.restUrlService.getRestUrls("getTorrentUpdate"),body.toString(),options).subscribe(response=>{
    if(response==null)
    this.noTorrentFound=true;
    else  
    this.torrentMap.set(rowNo,response);

    //console.log("torrentMap:"+this.torrentMap);
    this.hideLoader();
  }); 
  }
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

myEvent(event){
  alert(event);
}

show(rowNo){
  this.getTorrentList(rowNo);
  var dialog = bootbox.dialog({
    title: this.data[rowNo],
    message: '<p><i class="fa fa-spin fa-spinner"></i> searching...</p>',
    onEscape: true,
    closeButton:false
});
dialog.init(()=>{
    setTimeout(()=>{
        dialog.find('.bootbox-body').html('');
    },1000);
});
}

openDialog(rowNo){
  this.getTorrentListForDialog(rowNo,()=>{
    //console.log('After getting torrentList:'+this.torrentMap.get(rowNo));
    const torrentDialogComponent=this.dialog.open(TorrentDialogComponent,{
      
      data:{torrentElement:this.torrentMap.get(rowNo),
            searchString:this.data[rowNo]
      }
    });
  
    torrentDialogComponent.afterClosed().subscribe(result=>{
      //console.log("closed");
    });
  });
}



getTorrentListForDialog(rowNo,callback){
    
  if(this.torrentMap.get(rowNo)===undefined){
  
  let searchData=this.data[rowNo];
  //console.log("searchData:"+JSON.stringify(searchData)+","+rowNo);

  let body=new URLSearchParams();
  body.set('searchString',searchData);
  body.set('userEmail',this.authService.getUserName());
  let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
};
this.showLoader();  
this.http.post(this.restUrlService.getRestUrls("getTorrentUpdate"),body.toString(),options).subscribe(response=>{
  if(response==null)
  this.noTorrentFound=true;
  else  
  this.torrentMap.set(rowNo,response);

  this.hideLoader();
  callback();
}); 
}else{
  callback();
}
}
}



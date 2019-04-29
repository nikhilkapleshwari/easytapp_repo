import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-torrent-dialog',
  templateUrl: './torrent-dialog.component.html',
  styleUrls: ['./torrent-dialog.component.css']
})
export class TorrentDialogComponent implements OnInit {

  torrentArray=new Array();
  searchString;

  constructor(public dialogRef:MatDialogRef<TorrentDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private domSanitizer:DomSanitizer) { 
    this.torrentArray=this.data.torrentElement;
    //console.log('torrentArray:'+JSON.stringify(this.torrentArray));
    if(this.torrentArray!=undefined){
      for(var i=0;i<this.data.torrentElement.length;i++){
      
        this.torrentArray[i].file=this.urlCheck(this.data.torrentElement[i].file);
        //console.log("in dialog:"+this.torrentArray[i].file);
      }
    }
    
    this.searchString=this.data.searchString;
  }

  ngOnInit() {
  }
  close(): void {
    this.dialogRef.close();
  }

  urlCheck(url){
    return this.domSanitizer.bypassSecurityTrustUrl(url);
    }
  // showData():void{
  //   //console.log(this.data.torrentElement);
  //   this.torrentArray=this.data.torrentElement;
  //   //console.log(this.torrentArray[0]);
  //   //console.log("torrentElement in dailog:"+JSON.stringify(this.data.torrentElement));
  // }
}

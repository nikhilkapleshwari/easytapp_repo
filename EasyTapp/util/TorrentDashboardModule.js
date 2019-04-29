var fs=require('fs');
var propertyReader=require('../PropertyReader');

module.exports.getTorrentList=function(req,res){
    body=req.body;
    var list='';
    //console.log("**********dashboard: "+JSON.stringify(body));
    //console.log("***********output:"+body.userEmail);
    
    var scheduleUserPath=propertyReader.getProperty('SCHEDULE_USER_PATH');       
    fs.readdir(scheduleUserPath+body.userEmail, function(err, items) {
        //console.log("Items:"+items);
        
        if(items !== undefined ){
            //console.log('items is not undefined');
            this.list=undefined;
        for (var i=0; i<items.length; i++) {
           //if(items[i].indexOf('et') >=0){
                var torrentString=items[i].replace(".et","");
                //console.log('this.list:'+this.list);
                this.list=(this.list===undefined)?torrentString:this.list+","+torrentString;
            //}      
        }
        //console.log("list:"+this.list);
        res.end(JSON.stringify(this.list));
    }else{
        res.end(null);
    }    
    
    });
}
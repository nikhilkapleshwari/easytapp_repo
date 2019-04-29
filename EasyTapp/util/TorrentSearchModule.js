const RarbgApi = require('rarbg');
var fs=require('fs');
var SearchModel=require('../model/searchModel');
var ResultModel=require('../model/resultModel');
var propertyReader=require('../PropertyReader');


const rarbg = new RarbgApi();

const { search, checkIsUp, proxies } = require('piratebay-search');


module.exports.search=function(req,res){
   body=req.body;
    var searchModel=new SearchModel(body.userEmail,body.searchString,body.categoryValue,body.sortingType,body.minSeeders,body.isScheduledSearch);
    execute(searchModel,function(obj){
        //console.log('data is:'+obj);
        if(obj==''){
          //console.log('no torrent found!');
          res.end(null);
        }else
        res.end(JSON.stringify(obj));
       });
}


// piratebay search util
function execute(searchModel,callback){

       //console.log('searching:'+JSON.stringify(searchModel));

       search(searchModel.searchString, {
        baseURL: 'https://thehiddenbay.com', 
        page: 0,
        ordering: 'uploaded' 
      }).then(response =>{
        //console.log("response:"+JSON.stringify(response));
        
        var downloadPath=propertyReader.getProperty('DOWNLOAD_PATH');
        fs.writeFileSync(downloadPath+searchModel.userEmail,JSON.stringify(response));

        var scheduleUserDataPath=propertyReader.getProperty('SCHEDULE_USERDATA_PATH');
        if(searchModel.isScheduledSearch==1)
        fs.writeFileSync(scheduleUserDataPath+searchModel.userEmail+'/'+searchModel.searchString+'.etd',JSON.stringify(response));
        var obj=JSON.parse(JSON.stringify(response));
        callback(obj);
      }).catch(error=>{
         console.log('error is:'+error);
         callback(null);
      });
}



module.exports.execute=execute;
//**************************************/
